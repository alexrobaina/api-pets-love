"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dogMedicalHistorySchema = new mongoose_1.Schema({
    notes: { type: String },
    lastVisitVet: { type: String },
    rabiesVaccine: { type: Boolean, default: false },
    hepatitisVaccine: { type: Boolean, default: false },
    parvovirusVaccine: { type: Boolean, default: false },
    leptospirosisVaccine: { type: Boolean, default: false },
    parainfluenzaVaccine: { type: Boolean, default: false },
    bordetellaBronchisepticVaccine: { type: Boolean, default: false },
});
exports.default = mongoose_1.model('DogMedicalHistory', dogMedicalHistorySchema);
