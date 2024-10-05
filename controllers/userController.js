const User = require("../models/User");
const jwt = require("jsonwebtoken");

// generacion de tokens
const generateAccessToken = (user) => {
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const generateRefreshToken = (user) => {
    const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }
        const user = await User.create({ username, email, password });
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                rol: user.rol
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const flag = await user.matchPassword(password)
        if (user && flag) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            return res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    rol: user.rol
                },
                accessToken,
                refreshToken,
            });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

const refreshAccessToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Falta el token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateAccessToken({ _id: decoded.id });
        return res.json({ accessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = { registerUser, loginUser, refreshAccessToken };