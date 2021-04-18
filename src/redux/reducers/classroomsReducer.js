export default function classroomsReducer(state = null, action) {
    switch (action.type) {
        case "UPDATE_CLASSROOMS":
            return [...action.payload];
        default:
            return state;
    }
}
