import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ success: false, message: "No token, Login Again" });
        }

        const doctorToken = authHeader.split(" ")[1];
        if(!doctorToken){
            return res.status(401).json({ success: false, message: "Authentication failed" });
        }

        const tokenDecode = jwt.verify(doctorToken, process.env.JWT_SECRET);
        //  console.log("Decoded token:", tokenDecode);
        req.docId = tokenDecode.id;
        // console.log("authdoctor middleware ",req.docId)



        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export default authDoctor;
