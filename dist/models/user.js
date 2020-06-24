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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    location: { type: Object },
    password: { type: String },
    role: { type: String, required: true },
    state: { type: Boolean, default: true },
    terms: { type: Boolean, default: true },
    name: { type: String, lowercase: true },
    image: { type: String, required: false },
    phone: { type: Number, required: false },
    aboutUs: { type: String, required: false },
    canTransit: { type: Boolean, default: false },
    dateCreate: { type: Date, default: Date.now },
    textAddress: { type: String, required: false },
    requirementsToAdopt: { type: String, required: false },
    lastname: { type: String, lowercase: true, required: true, trim: true },
    firstname: { type: String, lowercase: true, required: true, trim: true },
    username: { type: String, lowercase: true, required: false, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.password !== undefined && user.password !== '') {
            if (!user.isModified('password'))
                return next();
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
        }
        user.name = `${user.firstname} ${user.lastname}`;
        next();
    });
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = mongoose_1.model('User', userSchema);
