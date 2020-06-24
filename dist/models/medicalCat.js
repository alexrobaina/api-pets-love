"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicalPetSchema = new mongoose_1.Schema({
    lastVisitVet: { type: String },
    isCastrated: { type: Boolean, default: false },
    rabiesVaccine: { type: Boolean, default: false },
    vet: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    distemperVaccine: { type: Boolean, default: false },
    felineFluVaccine: { type: Boolean, default: false },
    felineLeukemiaVaccine: { type: Boolean, default: false },
    felineInfectiousPeritonitisVaccine: { type: Boolean, default: false },
});
exports.default = mongoose_1.model('MedicalPet', medicalPetSchema);
