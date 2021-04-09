import axios from "axios";

export const createClassroom = async (classroomData) => 
{
  const { subjectName, subjectCode, subGroups, email, branchName, branchYear } = classroomData;
  return await axios(
    {
      method: "POST",
      url: `${process.env.REACT_APP_API}/classroom/create`,
      data: { subjectName, subjectCode, subGroups, email, branchName, branchYear },
    }
  )
};