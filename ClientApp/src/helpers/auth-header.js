export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token
        };
    } else {
        return {};
    }
}



export const ROOT_API_URL = `https://localhost:44327/api`;