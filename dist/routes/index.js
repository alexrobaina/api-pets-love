"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const router = express_promise_router_1.default();
router.use('', auth_routes_1.default);
exports.default = router;
