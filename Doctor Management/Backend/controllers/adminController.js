import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/DoctorModel.js"
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken"

//api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body; // received information from the body //destructing or properties ko extract kar rha hu saari ki saari body se
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      res.json({ success: false, message: "all details are mandatory" });
    }

    //validating email
    if (!validator.isEmail(email)) {
     return res.json({ success: false, message: "enter a valid email" });
    }

    //validating the strong password
    if (!validator.isStrongPassword(password)) {
    return res.json({ success: false, message: "please enter the strong password" });
      
    }

    //image file uploading handle

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
    //hashing the password that no one can hack the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //another method of hashing the password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password,salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url; //In most cases, secure_url refers to a URL that uses HTTPS (instead of HTTP), meaning it's a secure version of a link — typically returned by services like Cloudinary, Firebase, Amazon S3, or other cloud storage or CDN platforms.

    const doctorsData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorsData);
    await newDoctor.save();

    res.json({success:true,message:"doctor added successfully"})
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false,message:error.message})
  }
};

//api for admin login 
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { auth: email + password },
        process.env.JWT_SECRET
      );

      res.json({ success: true, token, message: "User logged in successfully" });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//api for exporting all doctors  or we can say that all doctors 

const allDoctors = async (req,res)=>{ 
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
    
  } catch (error) {
    console.log(error)
     res.status(500).json({ success: false, message: error.message });
  }
}

export { addDoctor, loginAdmin,allDoctors};
