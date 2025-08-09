import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastConfig";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("https://api.unsplash.com/search/photos", {
          params: {
            query: "technology",
            per_page: 10,
            orientation: "portrait",
          },
          headers: {
            Authorization:
              "Client-ID your_unsplash_api_key_here",
          },
        });
        setImages(res.data.results.map((img) => img.urls.full));
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:3000/auth/register", {
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (res.status === 201) {
      toast.success("Registration successful! 🎉", toastOptions);
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        // User already exists
        toast.error("Account already exists. Please login.", toastOptions);
      } else if (error.response.status === 400) {
        // Validation or bad input
        toast.error(error.response.data.message || "Invalid details provided.", toastOptions);
      } else {
        // Any other server error
        toast.error("Something went wrong. Please try again.", toastOptions);
      }
    } else {
      toast.error("Network error. Please check your connection.", toastOptions);
    }
  }
};


  return (
    <div className="flex min-h-full">
      {/* Image Section */}
      <div className="relative hidden w-0 flex-1 lg:block">
        {images.length > 0 && (
          <img
            alt="Random from Unsplash"
            src={images[currentImageIndex]}
            className="absolute inset-0 h-screen w-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        )}
      </div>

      {/* Form Section */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col justify-center items-center">
            <img alt="Induction program" src={Logo} className="h-40 w-auto " />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Register
              </button>
              <p className="mt-2 text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  Login &rarr;
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
