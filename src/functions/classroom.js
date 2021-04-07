import axios from "axios";

export const createClassroom = async (classroomData) => 
{
  const { subjectName, subjectCode, subGroups, email, branchName, branchYear } = classroomData;
  await axios(
    {
      method: "POST",
      url: `${process.env.REACT_APP_API}/classroom/create`,
      data: { subjectName, subjectCode, subGroups, email, branchName, branchYear },
    }
  ).then((res) =>
  {
    console.log("Classroom created.");
  }).catch((err) =>
  {
    console.log(err);
  })
};