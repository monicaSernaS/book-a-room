"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../services/database");
const jwtService_1 = require("../services/jwtService");
const register = (req, res, next) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const [existingUsers] = yield database_1.pool.query('SELECT id FROM users WHERE email = ?', [email]);
            if (existingUsers.length > 0) {
                return res.status(400).json({ message: '❗Email already registered' });
            }
            yield database_1.pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hashedPassword]);
            return res.status(201).json({ message: '✅ User registered successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: '❌ Server error during registration' });
        }
    }))().catch(next);
};
exports.register = register;
const login = (req, res, next) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const [users] = yield database_1.pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (users.length === 0) {
                return res.status(404).json({ message: '⚠️ User not found' });
            }
            const user = users[0];
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(401).json({ message: '❗Invalid credentials' });
            }
            const token = (0, jwtService_1.generateToken)({ id: user.id, email: user.email });
            return res.json({ token });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: '❌Server error during login' });
        }
    }))().catch(next);
};
exports.login = login;
