import { REQUEST_HOME, USER_TOKEN } from '../Actions/HomeActions';

export const reducer = (state = { home: "set", userLogin: {userToken: "", userEmail: "", loginError: ""} }, action) => {
    switch (action.type) {
        case REQUEST_HOME:
            return {
                ...state,
                home: action.home
            };
        case USER_TOKEN:
            return {
                ...state,
                userLogin: action.userLogin
            };
        default:
            return state;
    }
}
