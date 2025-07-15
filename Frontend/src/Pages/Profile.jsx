import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { DoctorContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {

  const { userData, setUserData, token, loadUserProfileData,backendUrl } =
    useContext(DoctorContext);


  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address[line1]", userData.address.line1);
      formData.append("address[line2]", userData.address.line2);
      formData.append("userId",userData._id)

      if (image) {
        formData.append("image", image);
      }
//       console.log("form DAta",formData)
//       for (let pair of formData.entries()) {
//   console.log(`${pair[0]}: ${pair[1]}`);
// }

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log("hello ji ",data)


      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        console.log(data)
        console.log(data.message)
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // console.log(userData)

  return (
    userData && (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative w-24 h-24">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300"
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
                onChange={(e) => {
    console.log(e.target.files[0]); // Check this
    setImage(e.target.files[0]);
  }}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              placeholder="Enter full name"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border border-gray-300 px-3 py-2 rounded w-full text-center"
            />
          ) : (
            <p className="text-xl font-semibold">{userData.name}</p>
          )}
        </div>

        <hr className="border-gray-200" />

        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-semibold mb-1">
              CONTACT INFORMATION
            </p>
            <div className="text-gray-700 space-y-2 flex flex-col">
              {isEdit ? (
                <>
                  <input
                    type="email"
                    value={userData.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={userData.phone}
                    placeholder="Phone"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={userData.address.line1}
                    placeholder="Address Line 1"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    placeholder="Address Line 2"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    className="border px-3 py-2 rounded"
                  />
                </>
              ) : (
                <>
                  <p>
                    <span className="font-medium">Email:</span> {userData.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {userData.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-gray-600 font-semibold mb-1">
              BASIC INFORMATION
            </h3>
            <div className="text-gray-700 space-y-2">
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>
                  <span className="font-medium">Gender:</span>{" "}
                  {userData.gender}
                </p>
              )}

              {isEdit ? (
                <input
                  type="text"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              ) : (
                <p>
                  <span className="font-medium">Birthday:</span>{" "}
                  {userData.dob}
                </p>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-end space-x-3">
            {isEdit ? (
              <>
                <button
                  onClick={()=>{
                    updateUserProfileData()
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save Information
                </button>
                <button
                  onClick={() => {
                    loadUserProfileData();
                    setIsEdit(false);
                    setImage(false);
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
      </div>
    )
  );
}

export default Profile;
