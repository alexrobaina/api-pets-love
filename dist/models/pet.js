"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    foundLocation: {
        lat: { type: Number },
        lng: { type: Number },
    },
    name: { type: String },
    gender: { type: String },
    history: { type: String },
    adopted: { type: Boolean },
    category: { type: String },
    birthday: { type: String },
    activityLevel: { type: String },
    lost: { type: Boolean, default: false },
    terms: { type: Boolean, default: true },
    state: { type: Boolean, default: true },
    update: { type: Date, default: Date.now },
    urgent: { type: Boolean, default: false },
    image: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Image' },
    userCreator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    userAdopter: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    userTransit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    dogMedicalHistory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'DogMedicalHistory' },
    catMedicalHistory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CatMedicalHistory' },
});
exports.default = mongoose_1.model('Pet', petSchema);
