import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token, Login Again" });
        }

        const adminToken = authHeader.split(" ")[1];
        const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);

        // ✅ Fix: Check the auth property inside decoded token
        if (tokenDecode.auth !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            console.log("authentication revoked");
            return res.status(401).json({ success: false, message: "Authentication failed" });
        }

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export default authAdmin;
