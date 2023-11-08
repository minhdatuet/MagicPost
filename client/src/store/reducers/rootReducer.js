import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfix = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfix,
    key: 'auth',
    whitelist: ['isLogged', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer
})

export default rootReducer