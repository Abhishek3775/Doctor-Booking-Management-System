import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/DoctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
// Api to register user

export const registerUser = async (req, res) => {

  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password || !phone ) {
      return res.json({ success: false, message: "Missing Details"});
    }

    // Check if user already exists with this email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email " });
    }

    //validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "password minimum length is 8" });
    }

    //uploading image file at the time of the register

    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageURL = imageUpload.secure_url;

    //async user password

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      phone,
      image: imageURL,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    //_id by using this property we will create the token _id is provided by the database

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
   return res.json({ success: true, token,
      user: userData });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("sending login data", { email, password });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (isMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(401).json({
        success: false,
        message: "unauthorized access or invalid credientials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get the profile details here

export const userProfile = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log("User ID:", userId);

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log("Error fetching user profile:", error);
    res.json({ success: false, message: error.message });
  }
};

//api for the update user profile

export const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const updatedData = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address,
        dob,
        gender,
      },
      {
        new: true,
      }
    );

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    return res.json({
      success: true,
      message: "profile uploaded successfully!",
      updatedData,
      image: "image File Data ;",
      imageFile,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//api to boook the appointment details

export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId; // from auth middleware

    // Fetch user and doctor data (excluding password)
    const userData = await userModel.findById(userId).select("-password");
    const docData = await doctorModel.findById(docId).select("-password");

    console.log("Doc Address:", docData.address);

    if (!userData || !docData) {
      return res
        .status(404)
        .json({ success: false, message: "User or Doctor not found" });
    }

    // Handle slots booking logic
    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Prepare appointment data — using already fetched userData & docData
    const appointmentData = {
      userId: userId,
      docId: docId,
      userData: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        image: userData.image,
      },
      docData: {
        name: docData.name,
        speciality: docData.speciality,
        image: docData.image,
        fees: docData.fees,
        address: {
          line1: docData.address.line1,
          line2: docData.address.line2,
        },
      },
      slotDate,
      slotTime,
      amount: docData.fees,
      date: Date.now(),
      cancelled: 0,
    };

    // Save appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor slot availability
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment booked Successfully",
      allData: "all data",
      appointmentData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

//api to getBookedappointment data
export const getBookedAppointment = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    console.log(userId);

    // Fetch all appointments for the logged-in user
    const Appointments = await appointmentModel.find({ userId });

    console.log("Appointments found:", Appointments);

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments: Appointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//api to cancel the appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId; // from auth middleware

    let appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // verify appointment user
    if (appointmentData.userId.toString() !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized action" });
    }

    // Mark as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    if (doctorData && doctorData.slots_booked[slotDate]) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((e) => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    return res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

//api to pay the appointment fees using RAZORPAY PAYMENT GATEWAY

// console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID); // Should not be undefined
// console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // console.log(" Appointment ID received:", appointmentId);

    const appointmentData = await appointmentModel.findById(appointmentId);
    // console.log(" Appointment Data:", appointmentData);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or Not Found",
      });
    }

    const amount = appointmentData?.amount || appointmentData?.docData?.fees;
    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is missing in appointment" });
    }

    const options = {
      amount: amount * 100, // amount in paisa
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId,
    };

    // console.log(" Creating Razorpay order with options:", options);

    const order = await razorpayInstance.orders.create(options);
    // console.log(" Razorpay order created:", order);

    res.json({ success: true, order });
  } catch (error) {
    // console.error(" Razorpay Order Creation Failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error?.error?.description || error.message || "Unknown error",
    });
  }
};

//api to verify payment of razorpay

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "payment successful" });
    } else {
      res.json({ success: false, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
