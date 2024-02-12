import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("/api/v1/students/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post("/api/v1/students/signin", userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.get("/api/v1/students/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // remove the JWT cookie
      return true;
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

export const getAllStudents = async (str) => {
  let queryString = "";

  if (str) {
    if (str === "fieldOfInterest" || str === "techStack") {
      // If searching by field of interest or techStack, use sort query parameter
      queryString = `sort=${str}`;
    } else {
      // Otherwise, search by name, techStack, and bio
      queryString = `name=${str}`;
    }
  }

  try {
    let response;
    // If no query string provided, fetch all students
    if (!queryString) {
      response = await axios.get("/api/v1/students/getAllStudents");
    } else {
      response = await axios.get(
        `/api/v1/students/getAllStudents?${queryString}`
      );
    }
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateStudent = async (formData, token) => {
  try {
    const response = await axios.patch("/api/v1/students/updateMe", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
