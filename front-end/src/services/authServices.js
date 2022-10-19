const basePath = "http://localhost:4000/api/auth" ;

export const loginService = async (email, password) => {
    return await fetch(`${basePath}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json());
};


export const registerService = async (user) => {
    return await fetch(`${basePath}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export const verifyTokenService = async (token) => {
    return await fetch(`${basePath}/confirm`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token:token
        })
    });
}
