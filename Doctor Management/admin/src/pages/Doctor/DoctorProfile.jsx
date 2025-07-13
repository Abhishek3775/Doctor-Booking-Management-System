import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../../../Frontend/src/assets/assets';

function DoctorProfile() {
  const { backendUrl, doctorToken } = useContext(AdminContext);
  const [doctorData, setDoctorData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });
      const profile = response.data.profile;

    //   if (typeof profile.address === 'string') {
    //     profile.address = JSON.parse(profile.address);
    //   }

      setDoctorData(profile);
    } catch (error) {
      console.log("Error while fetching doctor profile:", error);
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", doctorData.name);
      formData.append("email", doctorData.email);
      formData.append("degree", doctorData.degree);
      formData.append("experience", doctorData.experience);
      formData.append("about", doctorData.about);
formData.append("address", doctorData.address);


      formData.append("userId", doctorData._id);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchDoctorProfile();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!doctorData) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center text-blue-600">Doctor Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative w-24 h-24">
              <img
                src={image ? URL.createObjectURL(image) : doctorData.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              {!image && (
                <img
                  src={assets.upload_icon}
                  alt="Upload"
                  className="absolute bottom-0 right-0 w-6 h-6"
                />
              )}
            </div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={doctorData.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
        {isEdit ? (
          <>
            <input
              type="text"
              value={doctorData.name}
              placeholder="Full Name"
              onChange={(e) => setDoctorData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <input
              type="text"
              value={doctorData.degree}
              placeholder="Degree"
              onChange={(e) => setDoctorData((prev) => ({ ...prev, degree: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <input
              type="text"
              value={doctorData.experience}
              placeholder="Experience"
              onChange={(e) => setDoctorData((prev) => ({ ...prev, experience: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <textarea
              rows="4"
              placeholder="About the doctor..."
              value={doctorData.about}
              onChange={(e) => setDoctorData((prev) => ({ ...prev, about: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
            ></textarea>
          </>
        ) : (
          <>
            <p><span className="font-semibold">Name:</span> {doctorData.name}</p>
            <p><span className="font-semibold">Degree:</span> {doctorData.degree}</p>
            <p><span className="font-semibold">Experience:</span> {doctorData.experience}</p>
            <p><span className="font-semibold">About:</span> {doctorData.about}</p>
          </>
        )}
      </div>

      <hr className="border-gray-200" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
        {isEdit ? (
          <>
            <input
              type="email"
              value={doctorData.email}
              placeholder="Email"
              onChange={(e) => setDoctorData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <input
  type="text"
  value={doctorData.address}
  placeholder="Address"
  onChange={(e) =>
    setDoctorData((prev) => ({
      ...prev,
      address: e.target.value,
    }))
  }
  className="w-full border border-gray-300 px-3 py-2 rounded"
/>
           
          </>
        ) : (
          <>
            <p><span className="font-semibold">Email:</span> {doctorData.email}</p>
            <p><span className="font-semibold">Address:</span> {doctorData.address}</p>
          </>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {isEdit ? (
          <>
            <button
              onClick={updateUserProfileData}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                fetchDoctorProfile();
                setIsEdit(false);
                setImage(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;
