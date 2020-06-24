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
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
const pet_routes_1 = __importDefault(require("./routes/pet.routes"));
const image_routes_1 = __importDefault(require("./routes/image.routes"));
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// initializations
const app = express_1.default();
// settings
app.set('port', process.env.PORT || 3000);
// middleware
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: (req, file, cd) => {
        cd(null, '_petsLove_' + uuid_1.v4() + path_1.default.extname(file.originalname));
    },
});
app.use(multer_1.default({
    storage: storage,
}).array('image'));
// routes
app.get('/', (req, res) => {
    res.send(`Welcome to petslove. Running in http://localhost:${app.get('port')}`);
});
app.use(auth_routes_1.default);
app.use(private_routes_1.default);
app.use(image_routes_1.default);
app.use(pet_routes_1.default);
exports.default = app;
