import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { token } = useContext(DoctorContext);

  const [appointments, setAppointments] = useState([]);
const navigate = useNavigate();
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/user/getAppointments",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success === true) {
        setAppointments(data.appointments.reverse());
        // console.log("fetched appointments details", data.appointments);
      } else {
        console.log("no data found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
    }
  }, [token]);

  //cancel appointments

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/user/cancelAppointment",
        { appointmentId }, // You're sending only appointmentId here
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getUsersAppointments(); // refresh
      } else {
        console.log("Error from response:", data);
        toast.error(data.message);
      }

      console.log("Cancelled ID:", appointmentId);
    } catch (error) {
      console.log("Axios Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //payment razorpay integation

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      descriptin: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            "http://localhost:9000/api/user/verifyRazorpay",
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if(data.success){
            getUsersAppointments()
            navigate('/myAppointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/user/paymentRazorpay",
        { appointmentId }, // You're sending only appointmentId here
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(data.order);

      if (data.success) {
        initPay(data.order);
        // console.log(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium border-b text-zinc-700 ">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b "
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">
                Fees: {item.docData.fees}$
              </p>

              <p>
                <span className="text-xs mt-1 text-zinc-800">
                  Date & Time:{" "}
                </span>
                {slotDateFormat(item.slotDate)} |{" "}
                <span className="text-sm text-neutral-700 font-medium">
                  {item.slotTime}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">

            {!item.cancelled && item.payment && <button className="sm:min-w-48 py-2 border rounded text-green-600 bg-indigo-50">Paid</button>}
              {!item.cancelled && !item.payment && (
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-500 "
                  onClick={() => appointmentRazorpay(item._id)}
                >
                  Pay Online
                </button>
              )}

              {
               item.cancelled ?(
                <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border rounded ">
                  This Appointment is cancelled
                </button>
              ):<button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500"
                >
                  Cancel Appointment
                </button>
              }

              {/* {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500"
                >
                  Cancel Appointment
                </button>
              )} */}

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
