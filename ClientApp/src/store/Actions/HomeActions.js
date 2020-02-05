//import axios from 'axios';

//export const REQUEST_HOME = 'REQUEST_HOME';
//export const USER_TOKEN = 'USER_TOKEN';

//export function fetchHomes() {
//    return function (dispatch) {
//        dispatch({
//            type: REQUEST_HOME,
//            home: "hi"
//        })
//    }
//}

//export function login(email, password) {
//    return dispatch => {
//        var url = `${ROOT_API_URL}/users/login`;
//        axios.post(url, {
//            email: email,
//            password: password
//        }).then((res) => {
//            // console.log(response);
//            if (res && res.data && res.data.success) {
//                var user = {
//                    token: res.data.token,
//                    email: res.data.userName,
//                    roles: res.data.roles
//                }
//                auth.setToken(user);
//                if (auth.isInRole('INTERNAL')) {
//                    history.push('/admin/users');
//                } else if (auth.isInRole('RANGER')) {
//                    history.push('/admin/rangers');
//                } else {
//                    history.push('/dashboard');
//                }
//                dispatch({
//                    type: USER_TOKEN,
//                    userLogin: user
//                })
//            } else {
//                dispatch({
//                    type: USER_TOKEN,
//                    userLogin: {
//                        loginError: res.data.message
//                    }
//                });
//            }
//        }).catch((response) => {
//            console.log(response);
//            dispatch({
//                type: USER_TOKEN,
//                userLogin: {
//                    loginError: "Login Error."
//                }
//            });
//        })
//    }
//}

//export function destroyUserToken() {
//    return function (dispatch) {
//        dispatch({
//            type: USER_TOKEN,
//            userLogin: {
//                userToken: "",
//                userEmail: "",
//                loginError: ""
//            }
//        })
//    }
//}