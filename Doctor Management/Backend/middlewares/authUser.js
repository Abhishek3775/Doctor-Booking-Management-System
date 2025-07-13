import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("\n--- AUTH MIDDLEWARE DEBUG ---");
    console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Bearer token found");
      return res.status(401).json({ success: false, message: "No token, login again" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    // TEMP: Log secret
    console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

    // Verify token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); // or hardcode here to test
    console.log("Decoded token:", tokenDecode);

    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.error(" Token verification failed:",error, error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
