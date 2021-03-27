import axios from "axios";

export const createClassroom = async (classroomData) => {
  await axios.post(`${process.env.REACT_APP_API}/api/classroom`, classroomData);
};