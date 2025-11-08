import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_ATTENDANCE;

// POST attendance record
export const markAttendance = async (attendanceData) => {
  try {
    const url = `${BASE_URL}mark-attendance`;

    const response = await axios.post(url, attendanceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Attendance marked successfully",
    };
  } catch (error) {
    console.error("Error marking attendance:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to mark attendance",
    };
  }
};
