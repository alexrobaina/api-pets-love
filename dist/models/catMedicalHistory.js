"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const catMedicalHistorySchema = new mongoose_1.Schema({
    notes: { type: String },
    lastVisitVet: { type: String },
    rabiesVaccine: { type: Boolean, default: false },
    distemperVaccine: { type: Boolean, default: false },
    felineFluVaccine: { type: Boolean, default: false },
    felineLeukemiaVaccine: { type: Boolean, default: false },
    felineInfectiousPeritonitisVaccine: { type: Boolean, default: false },
});
exports.default = mongoose_1.model('CatMedicalHistory', catMedicalHistorySchema);
