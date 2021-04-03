const models = require('../../models');

export async function rolesInCourse(courseID) {
    return new Promise((resolve, reject) => {
        models.Roles.findAll({
            attribute: ['idcourse'],
            where: {
                courseID: courseID
            }
        }).then(roles => {
            if (roles) {
                resolve(roles);
            } else {
                reject("There is no roles in this course");
            }
        });
    });
}

export async function getPermissionID(permissionName) {
    return new Promise((resolve, reject) => {
        models.Permissions.findOne({
            attribute: ['name'],
            where: {
                name: permissionName
            }
        }).then(permission => {
            if (permission) {
                resolve(permission.id);
            } else {
                reject("No permission with the name '" + permissionName + "' in the database");
            }
        });
    });
}

export async function getRolesAllowed(roles, editID, permissionName) {
    return new Promise((resolve, reject) => {
        let rolesAllowed = [];
        let cpt = 0;
        roles.forEach(role => {
            models.Role_has_permissions.findOne({
                attribute: ['roleID', 'permissionID'],
                where: {
                    roleID: role.id,
                    permissionID: editID
                }
            }).then(roleAllowed => {
                cpt++;
                if (roleAllowed) {
                    rolesAllowed.push(role);
                }
                if (cpt === roles.length && rolesAllowed.length != 0) {
                    resolve(rolesAllowed);
                }
                if (cpt === roles.length && rolesAllowed.length === 0) {
                    reject("There is no role with permission '" + permissionName + "' in this course");
                }
            });
        });
    });
}

export async function userAllowedTo(courseID, payload, permissionName) {
    return new Promise(async(resolve, reject) => {
        if (payload.idGlobalRole) {
            resolve({ error: null, status: 200, isAllowed: true });
        } else {
            const permissionID = await getPermissionID(permissionName).catch((error) => resolve({ error: error, status: 400, isAllowed: false }));
            const roles = await rolesInCourse(courseID).catch((error) => resolve({ error: error, status: 400, isAllowed: false }));
            const rolesAllowed = await getRolesAllowed(roles, permissionID, permissionName).catch((error) => resolve({ error: error, status: 400, isAllowed: false }));

            let cpt = 0;

            rolesAllowed.forEach(role => {
                models.User_has_roles.findOne({
                    attribute: ['roleID', 'userID'],
                    where: {
                        roleID: role.id,
                        userID: payload.username
                    }
                }).then(roleAllowed => {
                    if (roleAllowed) {
                        resolve({ error: null, status: 200, isAllowed: true });
                    }
                    cpt++;
                    if (cpt === rolesAllowed.length) {
                        resolve({ error: "the user dosn't have any role with the permission '" + permissionName + "' in this course", status: 403, isAllowed: false });
                    }
                });
            });
        }
    });
}