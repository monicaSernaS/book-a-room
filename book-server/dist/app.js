"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas principales
app.use('/api/auth', authRoutes_1.default);
app.use('/api/rooms', roomRoutes_1.default);
app.use('/api/reservations', reservationRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API Running 🚀');
});
exports.default = app;
