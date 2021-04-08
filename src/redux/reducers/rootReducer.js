import { combineReducers } from "redux";
import timetableReducer from "./timetableReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  timetable: timetableReducer,
});

export default rootReducer;
