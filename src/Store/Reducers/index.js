import { combineReducers } from "redux";
import userReducer from "./userReducer"
import userTypeReducer from './userTypeReducer'
const reducers = combineReducers({
    user:userReducer,
    userType:userTypeReducer
})

export default reducers