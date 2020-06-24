"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
router.get('/api/listUsersRole', user_controller_1.listUsersRole);
exports.default = router;
