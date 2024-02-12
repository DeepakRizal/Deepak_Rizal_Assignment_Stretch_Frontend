import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Profile from "../components/Profile";
import Select from "../components/Select";

import { logout } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getAllStudents, signOut } from "../authAPI";
import { useEffect, useState } from "react";

function ProfileList() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const fieldOfInterestOptions = [
    { value: "fieldOfInterest", label: "Field of Interest" },
  ];

  const techStackOptions = [{ value: "techStack", label: "Tech stack" }];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStudents = await getAllStudents();
        setStudents(fetchedStudents.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = async (keyword) => {
    try {
      const response = await getAllStudents(keyword);
      console.log(response);
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching searched students:", error);
    }
  };

  const handleInputChange = (e) => {
    // Extract the keyword from the input
    const keyword = e.target.value.trim();
    // Call your main search function
    setSearchKeyword(keyword);
  };

  const handleClick = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const queryObj = { [name]: value };
    const str = queryObj[name];

    try {
      const response = await getAllStudents(str);
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching sorted students:", error);
    }
  };

  return (
    <div className="mt-4 flex flex-col  relative px-2 lg:mx-24 ">
      <div className="sm:flex sm:items-center sm:justify-center lg:absolute right-2 lg:pr-20 ">
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
      <div className="mt-10 lg:mt-20 p-5 lg:p-0 ">
        <h3>Sort By</h3>
        <div className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 sm:justify-center lg:grid-cols-4">
          <Select
            options={fieldOfInterestOptions}
            defaultValue="fieldOfInterest"
            name="Field of Interest"
            className="mt-2 mr-2 border border-2-gray-500 p-1"
            handleClick={handleClick}
          />
          <Select
            options={techStackOptions}
            name="Tech Stack"
            defaultValue="techStack"
            className="border mt-2 border-2-gray-500 p-1"
            handleClick={handleClick}
          />

          <div
            className="flex gap-2 items-center ml-3  lg:ml-10
        "
          >
            <button className="text-blue-500 underline">Sort by Cohort</button>
            <form>
              <input
                className="w-[120px]"
                placeholder=""
                type="date"
                id="cohortDate"
                name="cohortDate"
              />
            </form>
          </div>
          <div className="flex gap-1   items-center">
            <fieldset className="flex items-center border border-gray-300 w-full ">
              <legend className="border-r ">Keyword search</legend>
              <input
                type="text"
                onChange={handleInputChange}
                className="w-full "
                placeholder="search by name"
              />
            </fieldset>
            <Button
              buttonText="Search"
              handleClick={() => handleSearch(searchKeyword)}
            />
          </div>
        </div>
        <div className="mt-5 lg:mt-10 px-3 md:p-0 lg:p-0 overflow-y-auto max-h-[525px] lg:max-h-[435px]">
          {students.map((student) => (
            <Profile
              key={student.name}
              name={student.name}
              fieldInterest={student.fieldOfInterest}
              techStack={student.techStack}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileList;
