import cookie from 'js-cookie';

// set token in cookie.
export const setCookie = (key, value) => {
    if (window) {
        cookie.set(key, value, {
            expires: 1
        });
    }
}

// remove token from cookie.
export const removeCookie = (key) => {
    if (window) {
        cookie.remove(key, {
            expires: 1
        });
    }
}

// get the stored token from the cookie.
export const getCookie = (key) => {
    if (window) {
        return cookie.get(key);
    }
}

// set "user data" in local storage.
export const setLocalStorage = (key, value) => {
    if (window) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// remove "user data" from local storage.
export const removeLocalStorage = (key) => {
    if (window) {
        localStorage.removeItem(key);
    }
}

// authenticate the user during signin.
export const authenticate = (response, next) => {
    setCookie('token', response.token);
    setLocalStorage('user', response.user);
    next();
}

// access user info from local-storage.
export const isAuth = () => {
    if (window) {
        const savedToken = getCookie('token');
        if (savedToken) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

// sign out user.
export const signOut = (next) => {
    removeCookie("token");
    removeLocalStorage('user');
    next();
}

// update user in local-storage
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};