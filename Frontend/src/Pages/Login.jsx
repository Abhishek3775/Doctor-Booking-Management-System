import axios from "axios";
import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DoctorContext } from "../Context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken } = useContext(DoctorContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone,setPhone] = useState("");
  const [loading,setLoading] = useState(false)
  // console.log("backend url is",backendUrl)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async request (e.g., axios call)
    setTimeout(() => {
      setLoading(false);
      // alert(`${state} success`);
    }, 2000);
  };
    // console.log("name",name);
    // console.log("email",email);
    // console.log("password",password)
    // console.log(e);


    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
          phone,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          toast.success("token set successfully!");
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        // console.log("backend url aa rha hai ", backendUrl);
        // console.log("sending login data", { email, password });

        const { data } = await axios.post(backendUrl + "/api/user/userLogin", {
          password,
          email,
        });
        console.log("Signup response:", data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex flex-center">
      <ToastContainer />
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-60 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">

            <div className="w-full">
              <p>Full Name</p>
              <input
                placeholder="Enter the full name"
                className="border border-zinc-300 rounded w-full  p-2"
                type="text"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            {/* //this is for the phone number */}

                <div className="w-full">
              <p>Enter Phone Number</p>
              <input
                placeholder="Enter the Phone Number"
             className="border border-zinc-300 rounded w-full  p-2"
                type="Number"
                value={phone}
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            {/* //this is for the date of birth */}




          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            placeholder="enter the email"
            className="border border-zinc-300 rounded w-full  p-2"
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            placeholder="enter the password"
            className="border border-zinc-300 rounded w-full p-2"
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded-md cursor-pointer"
        disabled={loading}
      >
        {loading
          ? state === "Sign Up"
            ? "Creating Account..."
            : "Logging..."
          : state === "Sign Up"
          ? "Create Account"
          : "Login"}
      </button>
        {state === "Sign Up" ? (
          <p>
            Already have an Account ?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new Account ?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-blue-600 underline cursor-pointer"
            >
              Click-here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
