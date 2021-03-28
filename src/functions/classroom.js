import axios from "axios";

export const createClassroom = async (classroomData) => 
{
  const { subjectName, subjectCode, subGroups } = classroomData;
  await axios(
    {
      method: "POST",
      url: `${process.env.REACT_APP_API}/classroom/create`,
      data: { subjectName, subjectCode, subGroups },
    }
  ).then((res) =>
  {
    console.log("Classroom created.");
  }).catch((err) =>
  {
    console.log(err);
  })
};