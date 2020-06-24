"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    filenames: [String],
});
exports.default = mongoose_1.model('Image', imageSchema);
