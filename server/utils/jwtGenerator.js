const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(usuario_id) {
    const payload = {
        usuario: usuario_id
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;