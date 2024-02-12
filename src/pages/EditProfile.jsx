import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import FormField from "../components/FormField";
import MultiSelect from "../components/MultiSelect";
import { signOut, updateStudent } from "../authAPI";
import { useNavigate } from "react-router-dom";
import { signinFailure, logout, updateUser } from "../features/authSlice";
import { useEffect, useState } from "react";

function EditProfile() {
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form data
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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        date: user.date || "",
        github: user.github || "",
        website: user.website || "",
        location: user.location || "",
        bio: user.bio || "",
        fieldOfInterest: user.fieldOfInterest || "",
        seeking: user.seeking || [],
        techStack: user.techStack || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateStudent(formData, token);
      const updatedUser = response.data.updatedStudent;

      // Update specific fields in formData with updated user data
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        date: updatedUser.date || "",
        github: updatedUser.github || "",
        website: updatedUser.website || "",
        location: updatedUser.location || "",
        bio: updatedUser.bio || "",
        fieldOfInterest: updatedUser.fieldOfInterest || "",
        seeking: updatedUser.seeking || [],
        techStack: updatedUser.techStack || [],
      }));

      // Dispatch action to update user state in Redux
      dispatch(updateUser({ user: updatedUser }));

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

  const handleClick = () => {};
  return (
    <div className=" mt-5">
      <div className="sm:flex sm:items-center sm:justify-center lg:absolute  top-3 lg:top-[4.0rem] right-2 lg:pr-20">
        <Button buttonText="Browse Students" />
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
              type="text"
            />
            <FormField
              handleChange={handleChange}
              label="Confirm password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm your password"
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

              <select
                className="border border-2-gray-500 p-1"
                value={formData.fieldOfInterest}
                onChange={handleChange}
                name="fieldOfInterest"
              >
                <option value={formData.fieldOfInterest}>
                  {formData.fieldOfInterest}
                </option>
              </select>
            </div>
            <MultiSelect
              handleSelect={handleSelect}
              label="Seeking"
              id="seeking"
              options={formData.seeking}
              className="overflow-y-auto border border-2-black-900"
              identifier="seeking"
            />
            <MultiSelect
              label="Tech Stack"
              id="tech-stack"
              options={formData.techStack}
              className="overflow-y-auto border border-2-black-900"
              handleSelect={handleSelect}
              identifier="techStack"
            />
          </div>
        </div>
        <div className=" flex justify-center md:col-span-2">
          <Button
            onClick={handleClick}
            buttonText="Delete account"
            className="mt-5 md:mt-0"
          />
          <button type="submit">Edit Profile</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
