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
exports.listImage = exports.addImages = void 0;
const image_1 = __importDefault(require("../models/image"));
exports.addImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = [];
        if (req.files) {
            if (req.files.length > 0) {
                // @ts-ignore
                req.files.forEach(image => {
                    url.push(image.filename);
                });
            }
        }
        const register = yield image_1.default.create({ filenames: url });
        res.status(200).json(register);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Error occurred in create pet',
        });
    }
});
exports.listImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield image_1.default.find().exec();
        res.status(200).json(register);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'An error occurred on List pets',
        });
    }
});
