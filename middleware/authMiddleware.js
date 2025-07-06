const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    try {
        console.log("verify token api started....", req.headers.authorization);
        const authHeader = req.headers.authorization;
        console.log("authHeader", authHeader)
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            console.log("here=-=-=-=-==-=")
            return res.status(401).json({ message: "authorization header is missing" });

        }
        console.log("=--=-=-=====-=")
        const token = authHeader.split(" ")[1];
        console.log("token", token)
        const decoded = jwt.verify(token, process.env.secret || "your_private_key");
        console.log("decoded###############", decoded);
        req.user = decoded;
        console.log("req.user", req.user);
        next();

    } catch (err) {
        console.log("err", err)
    }
}
module.exports = verifyToken;