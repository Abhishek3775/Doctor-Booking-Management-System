import doctorModel from "../models/DoctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

//doctor list creation here
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    console.log({ success: false, message: error.message });
  }
};

//creating an api for the doctors login

const loginDoctor = async (req, res) => {
  try {
    let {email, password } = req.body;
    let doctor = await doctorModel.findOne({email});
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "No Doctor found.." });
    }

    const isMatched = await bcrypt.compare(password, doctor.password);

    if (isMatched) {
      const doctorToken = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
      return res.status(200).json({success:true,
         message:"Logged in Successfully",
        doctorToken
      })
    }else{
        return res.status(401).json({success:false,message:"Wrong Password"})
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
};

//creating an api to fetch the details of all the appointments 

const appointmentsDoctor = async (req,res)=>{
try {
    const docId = req.docId;//extracting from the doctor token 
    const appointments = await appointmentModel.find({docId});
    console.log(appointments)
    return res.status(200).json({success:true,message:"appointment fetched",
        appointments
    })
    
    
} catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"internal server error",error})
}
}

//api for loading the doctor Profile 

const doctorProfile = async (req,res)=>{
    try {
        const docId = req.docId;
        const profile = await doctorModel.findById(docId);
        // console.log(profile)
        return res.status(200).json({success:true,
            message:"doctor profile fetched successfully!",
            profile
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

//api for updating the profile of the doctor 

const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const imageFile = req.file;

    // Access form data fields
    const {
      name,
      email,
      degree,
      experience,
      about,
      address
    } = req.body;

   

    const updateFields = {
      name,
      email,
      degree,
      experience,
      about,
      address,
    };

    // If image is uploaded, upload to Cloudinary
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateFields.image = imageUpload.secure_url;
    }

    const updatedData = await doctorModel.findByIdAndUpdate(
      docId,
      updateFields,
      { new: true }
    );
// console.log("address",address) its getting undefined again and again 
    return res.json({
      success: true,
      message: "Profile updated successfully!",
      updatedData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


//api to get dashboard data for doctor panel 

const doctorDashboard = async (req,res)=>{
  try {
    const docId = req.docId;
    // console.log(docId)
    const appointment = await appointmentModel.find({docId})
    let earnings = 0;

    appointment.map((item)=>{
      if(item.isCompleted || item.payment){
        earnings+=item.amount
      }
  })

  let patients = []

  appointment.map((item)=>{
if(!patients.includes(item.userId)){
  patients.push(item.userId)
}
  })

  const dashData = {
    earnings,
    appointment:appointment.length,
    patients:patients.length,
    latestAppointments:appointment.reverse().slice(0,5)
  }
    
  return res.status(200).json({success:true,dashData})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//cancel appointment from the doctor side 

const appointmentCancelFromDocSide = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    //  console.log("appointment id ",appointmentId)
    let appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // ✅ Mark as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // ✅ release doctor slot
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

//api to complete the appointment 

const completeAppointment = async (req,res)=>{
   try {
    const { appointmentId } = req.body;
    //  console.log("appointment id ",appointmentId)
    let appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // ✅ Mark as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    // ✅ release doctor slot
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

    return res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}

//get all the appointments 

const getAllAppointmentsFromDocSide = async (req,res)=>{
   try {
    const appointments = await appointmentModel.find({});
    return res.status(200).json({success:true,appointments})

  } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: error.message });
  }
}
  

export { doctorList,loginDoctor,appointmentsDoctor,doctorProfile,updateDoctorProfile,doctorDashboard,appointmentCancelFromDocSide,completeAppointment};
