var DataTypes = require("sequelize").DataTypes;
var _Module = require("./Module");
var _course = require("./course");
var _course_has_user = require("./course_has_user");
var _document = require("./document");
var _permission = require("./permission");
var _role = require("./role");
var _role_has_permission = require("./role_has_permission");
var _section = require("./section");
var _user = require("./user");
var _user_has_role = require("./user_has_role");
var _global_role = require("./global_role");

function initModels(sequelize) {
    var Module = _Module(sequelize, DataTypes);
    var course = _course(sequelize, DataTypes);
    var course_has_user = _course_has_user(sequelize, DataTypes);
    var document = _document(sequelize, DataTypes);
    var permission = _permission(sequelize, DataTypes);
    var role = _role(sequelize, DataTypes);
    var role_has_permission = _role_has_permission(sequelize, DataTypes);
    var section = _section(sequelize, DataTypes);
    var user = _user(sequelize, DataTypes);
    var user_has_role = _user_has_role(sequelize, DataTypes);

    course.belongsTo(Module, { as: "module", foreignKey: "moduleID" });
    Module.hasMany(course, { as: "courses", foreignKey: "moduleID" });
    course_has_user.belongsTo(course, { as: "course", foreignKey: "courseID" });
    course.hasMany(course_has_user, { as: "course_has_users", foreignKey: "courseID" });
    role.belongsTo(course, { as: "course", foreignKey: "courseID" });
    course.hasMany(role, { as: "roles", foreignKey: "courseID" });
    section.belongsTo(course, { as: "course", foreignKey: "courseID" });
    course.hasMany(section, { as: "sections", foreignKey: "courseID" });
    role_has_permission.belongsTo(permission, { as: "permission", foreignKey: "permissionID" });
    permission.hasMany(role_has_permission, { as: "role_has_permissions", foreignKey: "permissionID" });
    role_has_permission.belongsTo(role, { as: "role", foreignKey: "roleID" });
    role.hasMany(role_has_permission, { as: "role_has_permissions", foreignKey: "roleID" });
    user_has_role.belongsTo(role, { as: "role", foreignKey: "roleID" });
    role.hasMany(user_has_role, { as: "user_has_roles", foreignKey: "roleID" });
    document.belongsTo(section, { as: "section", foreignKey: "sectionID" });
    section.hasMany(document, { as: "documents", foreignKey: "sectionID" });
    course_has_user.belongsTo(user, { as: "user", foreignKey: "userID" });
    user.hasMany(course_has_user, { as: "course_has_users", foreignKey: "userID" });
    user_has_role.belongsTo(user, { as: "user", foreignKey: "userID" });
    user.hasMany(user_has_role, { as: "user_has_roles", foreignKey: "userID" });

    return {
        Module,
        course,
        course_has_user,
        document,
        permission,
        role,
        role_has_permission,
        section,
        user,
        user_has_role,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;