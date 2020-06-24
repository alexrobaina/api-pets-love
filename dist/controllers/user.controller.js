"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersRole = exports.userId = exports.update = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwrSecret, {
        expiresIn: 86400,
    });
}
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Please, Send your email and password',
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'The user already exist' });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Please, Send your email and password',
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'the user does not exist' });
    }
    const isMath = yield user.comparePassword(password);
    if (isMath) {
        return res.status(200).json({
            user,
            token: createToken(user),
        });
    }
    return res.status(400).json({
        message: 'The email or password are incorrect',
    });
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = {};
        const pass = req.body.password;
        if (pass !== undefined) {
            const password = yield bcrypt_1.default.hash(pass, 10);
            data.password = password;
        }
        // @ts-ignore
        if (req.files[0] !== undefined) {
            // @ts-ignore
            data.image = req.files[0].filename;
        }
        Object.entries(req.body).forEach(([key, value]) => {
            if (key !== 'password') {
                // @ts-ignore
                data[key] = value;
            }
        });
        // @ts-ignore
        const register = yield user_1.default.findByIdAndUpdate({ _id: req.body._id }, data);
        res.status(200).json(register);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Error occurred services update',
        });
    }
});
exports.userId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ _id: req.query._id });
        if (!user) {
            res.status(404).send({
                message: 'User not found',
            });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal error on services listUsersRole',
        });
    }
});
exports.listUsersRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().sort({
            name: 1,
        });
        let register = users.filter(user => {
            return user.role === req.query.role;
        });
        if (!register) {
            res.status(404).send({
                message: 'Not found users',
            });
        }
        else {
            res.status(200).json(register);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal error on services listUsersRole',
        });
    }
});
