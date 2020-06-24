"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicalDogSchema = new mongoose_1.Schema({
    lastVisitVet: { type: String },
    isCastrated: { type: Boolean, default: false },
    rabiesVaccine: { type: Boolean, default: false },
    vet: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    distemperVaccine: { type: Boolean, default: false },
    hepatitisVaccine: { type: Boolean, default: false },
    parvovirusVaccine: { type: Boolean, default: false },
    leptospirosisVaccine: { type: Boolean, default: false },
    parainfluenzaVaccine: { type: Boolean, default: false },
    bordetellaBronchisepticVaccine: { type: Boolean, default: false },
});
exports.default = mongoose_1.model('MedicalDog', medicalDogSchema);
