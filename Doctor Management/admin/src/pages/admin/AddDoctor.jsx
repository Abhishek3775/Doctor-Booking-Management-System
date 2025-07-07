import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [button, setButton] = useState("Add Doctor");

  //    console.log("checking in localstorage:", localStorage.getItem("Admintoken") )

  const { backendUrl, adminToken } = useContext(AdminContext);
  console.log("printing admintoken on 24 line0", adminToken);

  const onSubmitHandler = async (e) => {
    setButton("Adding Doctor");
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //console logging form data for each

      formData.forEach((value, key) => console.log(`${key} :${value}`));

      console.log(backendUrl);
      console.log("admintoken:", adminToken);

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        //reset all
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setAbout("");
        setFees("");
        setDegree("");
        setButton("Add Doctor");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    console.log(e);
  };

  return (
    <form
      action=""
      className="mx-10 my-10 p-4 shadow-[0_0_4px_black] rounded-xl"
      onSubmit={onSubmitHandler}
    >
      <ToastContainer />
      <p>Add Doctor</p>

      <div className="w-xl p-4 flex flex-col mt-2">
        <div className="flex items-center gap-2">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-15 cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            onChange={(e) => setDocImg(e.target.files[0])}
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div>
          <div className="flex flex-wrap justify-between gap-4 p-2">
            <div className=" flex flex-col gap-3">
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="w-60 border p-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className=" flex flex-col gap-3">
              <p>Speciality</p>
              {/* <input type="select" placeholder='Speciality' required className='w-60 border p-1' /> */}
              <select
                name=""
                id=""
                className="border w-60 p-1"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="Select Speciality">Select Speciality</option>
                <option value="Gynaclogist">Gynaclogist</option>
                <option value="General physician">General physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-60 border p-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="w-60 border p-1"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <div>
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-60 border p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p>Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                className="w-60 border p-1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                className="w-60 border p-1"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div>
              <p>Experience</p>
              <select
                name=""
                id=""
                className="border w-60 p-1"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="" disabled>
                  Experience
                </option>
                <option value="1 Years">1 Years</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years or More">4 Years or More</option>
              </select>
            </div>

            <div>
              <p>Fees</p>
              <input
                type="number"
                placeholder="Fees"
                required
                className="w-60 border p-1"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>

            <div>
              <p>About me</p>
              <textarea
                name=""
                id=""
                placeholder="write about yourself"
                className=" border"
                rows={4}
                cols={60}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            className="w-30 p-1 rounded bg-blue-700 text-white cursor-pointer hover:bg-blue-400"
            type="submit"
          >
            {button}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
