import doctorModel from "../models/DoctorModel.js"

const doctorList = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        console.log({success:false,message:error.message})
    }
}

export {doctorList}