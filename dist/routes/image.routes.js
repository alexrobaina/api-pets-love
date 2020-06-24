"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const image_controller_1 = require("../controllers/image.controller");
router.post('/api/pet/images', image_controller_1.addImages);
router.get('/api/pet/listImages', image_controller_1.listImage);
exports.default = router;
