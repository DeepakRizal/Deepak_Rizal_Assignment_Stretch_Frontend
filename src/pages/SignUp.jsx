import Button from "../components/Button";
import FormField from "../components/FormField";
import MultiSelect from "../components/MultiSelect";
import Select from "../components/Select";
import { useDispatch, useSelector } from "react-redux";
import { signOut, signup } from "../authAPI";
import { useNavigate } from "react-router-dom";
import {
  signinStart,
  signinSuccess,
  signinFailure,
  logout,
} from "../features/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    date: "",
    github: "",
    website: "",
    location: "",
    bio: "",
    fieldOfInterest: "",
    seeking: [],
    techStack: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {
      const data = await signup(formData);
      const user = data.data.user;
      const token = data.token;
      dispatch(signinSuccess({ user, token }));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error));
    }
  };

  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleSelect = (e, identifier) => {
    const selectedValue = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [identifier]: [...prevFormData[identifier], selectedValue],
    }));
  };

  const fieldOfInterestOptions = [
    { value: "fieldOfInterest", label: "Field of Interest" },
    { value: "frontend development", label: "Frontend Development" },
    { value: "backend development", label: "Backend Development" },
    { value: "fullstack development", label: "Fullstack Development" },
    { value: "mobile development", label: "Mobile Development" },
    { value: "data science", label: "Data Science" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "security", label: "Cybersecurity" },
    { value: "devops", label: "DevOps" },
    { value: "design", label: "UI/UX Design" },
  ];

  const seekingFields = ["Internship", "Remote", "FT Position", "Not seeking"];
  const techStack = [
    "React",
    "Angular",
    "Vue.js",
    "Express.js",
    "Django",
    "Spring Boot",
    "ASP.NET",
    "Ruby on Rails",
    "Laravel",
    "Flask",
    "Node.js",
    "jQuery",
    "Bootstrap",
    "Tailwind CSS",
    "TensorFlow",
    "PyTorch",
    "Django REST Framework",
    "Spring Framework",
    "Hibernate",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "Oracle",
    "Microsoft SQL Server",
    "Redis",
    "Firebase",
    "Cassandra",
    "Elasticsearch",
  ];

  return (
    <div className=" mt-5">
      <div className="sm:flex sm:items-center sm:justify-center lg:absolute  top-3 lg:top-[4.0rem] right-2 lg:pr-20">
        <Button buttonText="Browse Students" />
        {isAuthenticated && (
          <button className="bg-gray-500  mx-2 lg:ml-6 hover:bg-blue-700 text-white font-bold py-[6px] px-4 lg:px-10 rounded text-xs lg:text-base">
            <Link to="/editProfile">Edit profile</Link>
          </button>
        )}
        {isAuthenticated && (
          <Button handleClick={handleLogout} buttonText="Log out" />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-5 lg:mt-20 px-4 grid grid-cols-1  md:grid-cols-2 gap-8"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">Academy Student Sign Up</h2>
            <FormField
              handleChange={handleChange}
              value={formData.name}
              name="name"
              label="Name"
              id="name"
              placeholder="Enter your name"
              type="text"
            />
            <FormField
              handleChange={handleChange}
              label="Email"
              name="email"
              id="email"
              placeholder="Please enter your email"
              value={formData.email}
              type="text"
            />
            <FormField
              handleChange={handleChange}
              label="Password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={formData.password}
              type="text"
            />
            <FormField
              handleChange={handleChange}
              label="Confirm password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm your password"
              value={formData.passwordConfirm}
              type="text"
            />
            <FormField
              handleChange={handleChange}
              label="Date of Grad"
              id="date"
              type="date"
              name="date"
              value={formData.date}
            />
            <FormField
              handleChange={handleChange}
              label="Github"
              id="github"
              placeholder="Username"
              name="github"
              value={formData.github}
              type="text"
            />
            <div className="flex flex-col md:flex-row gap-3">
              <FormField
                label="Website"
                id="website"
                placeholder="Website"
                name="website"
                value={formData.website}
                handleChange={handleChange}
                type="text"
              />
              <FormField
                handleChange={handleChange}
                label="Location"
                name="location"
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <label htmlFor="bio" className="self-start font-semibold">
                Bio
              </label>
              <textarea
                className="border border-2-gray-800 flex-1 resize-none p-2"
                name="bio"
                id="bio"
                cols="30"
                rows="2"
                value={formData.bio}
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-5 mt-6 md:mt-0">
            <div className="flex flex-col gap-3">
              <label className="font-semibold" htmlFor="fileInput">
                Upload Profile Pic
              </label>
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept=".pdf, .jpg, .png"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold" htmlFor="">
                Field of interest
              </label>
              <Select
                options={fieldOfInterestOptions}
                defaultValue="fieldOfInterest"
                className="border border-2-gray-500 p-1"
                handleChange={handleChange}
                name="fieldOfInterest"
              />
            </div>
            <MultiSelect
              handleSelect={handleSelect}
              label="Seeking"
              id="seeking"
              options={seekingFields}
              className="overflow-y-auto border border-2-black-900"
              identifier="seeking"
            />
            <MultiSelect
              label="Tech Stack"
              id="tech-stack"
              options={techStack}
              className="overflow-y-auto border border-2-black-900"
              handleSelect={handleSelect}
              identifier="techStack"
            />
          </div>
        </div>
        <div className=" flex justify-center md:col-span-2">
          <Button buttonText="Sign Up" className="mt-5 md:mt-0" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
