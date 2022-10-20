import {authPath} from "./basePath" ;

export const loginService = async (email, password) => {
    return await fetch(`${authPath}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => res.json());
};


export const registerService = async (user) => {
    return await fetch(`${authPath}register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export const verifyTokenService = async (token) => {
    return await fetch(`${authPath}verify`, {
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    });

}

export const confirmAccountService = async (token) => {
    return await fetch(`${authPath}confirm`, {
        method:'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'token': token})
    }) ;
}

export const refreshService = async (user) => {
    return await fetch(`${authPath}refresh`, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: {"refreshToken": user.refreshToken}
        }
    ) ;
}

export const askResetPassword = async (email) => {
    return await fetch(`${authPath}reset-password`, {
        method: 'PATCH',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({email:email})
    });
} ;

export const confirmResetPassword = async (password, code) => {
    return await fetch(`${authPath}confirm-reset-password`,{
        method: 'PATCH',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            password:password,
            code : code
        })
    });
}
