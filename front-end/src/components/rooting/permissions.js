export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
    ADVISOR: 'advisor',
}

export const SCOPES = {
    CREATE : 'create',
    READ : 'read',
    UPDATE : 'update',
    DELETE : 'delete',
    ADMIN: 'admin',
    ADVISOR: 'advisor'
}

export const PERMISSIONS = {
    [ROLES.ADMIN]: [SCOPES.ADMIN,
        SCOPES.CREATE, SCOPES.READ, SCOPES.UPDATE, SCOPES.DELETE, SCOPES.ADVISOR],
    [ROLES.USER]: [SCOPES.CREATE, SCOPES.READ, SCOPES.UPDATE, SCOPES.DELETE],
    [ROLES.GUEST]: [SCOPES.READ],
    [ROLES.ADVISOR]: [SCOPES.CREATE, SCOPES.READ, SCOPES.UPDATE, SCOPES.DELETE, SCOPES.ADVISOR],
}

export const useRole = (user) => {
    if (user) {
        if (user.role === ROLES.ADMIN)
            return ROLES.ADMIN ;
        else if (user.role === ROLES.ADVISOR)
            return ROLES.ADVISOR ;
        return ROLES.USER ;
    } return ROLES.GUEST ;
}

export const hasPermission = ({perms, scopes}) => {
    const scopesMap = {} ;
    scopes.forEach(scope => scopesMap[scope] = true) ;
    return perms.some(perms => scopesMap[perms]) ;
}