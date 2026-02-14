const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretkey";

module.exports = function(req, res, next) {

    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: "No token" });

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.id;

        next();

    } catch {

        res.status(401).json({ message: "Invalid token" });

    }

};