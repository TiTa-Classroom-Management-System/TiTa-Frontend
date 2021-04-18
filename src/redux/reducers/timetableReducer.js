export default function timetableReducer(state = null, action) {
    switch (action.type) {
        case "UPDATE_TIMETABLE":
            return [...action.payload];
        default:
            return state;
    }
}
