"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// morgan sirve para ver las peticiones a la api cuando esta corriendo el servidor en la consola
const morgan_1 = __importDefault(require("morgan"));
// sirve para comunicarnos con otros tipos de servidores de desarrollo
const cors_1 = __importDefault(require("cors"));
// initializations
const app = express_1.default();
// settings
app.set('port', process.env.PORT || 3000);
// middleware
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// routes
app.get('/', (req, res) => {
    res.send(`THE API is at http://localhost:${app.get('port')}`);
});
exports.default = app;
