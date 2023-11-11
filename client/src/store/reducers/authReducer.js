import actionTypes from "../actions/actionTypes";

const initState = {
    isLogged: false,
    token: null,
    msg: ''
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLogged: true,
                token: action.data
            }
            case actionTypes.REGISTER_FAIL:
                return {
                    ...state,
                    isLogged: false,
                    token: null,
                    msg: action.data
                }

        default: 
            return state;
    }
}

export default authReducer