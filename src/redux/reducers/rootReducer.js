import { combineReducers } from "redux";
import timetableReducer from "./timetableReducer";
import userReducer from "./userReducer";
import classroomReducer from "./classroomsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  timetable: timetableReducer,
  classrooms: classroomReducer,
});

export default rootReducer;
