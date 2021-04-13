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

export const getClassroom=async(classroom_id)=>{
  return await axios.get(`${process.env.REACT_APP_API}/classroom/${classroom_id}`);
}

export const joinClassroom = async (classroomData) => 
{
  const { classid, email, selected_grp_no } = classroomData;
  return await axios(
    {
      method: "POST",
      url: `${process.env.REACT_APP_API}/classroom/join`,
      data: { classid, email, selected_grp_no },
    }
  )
};