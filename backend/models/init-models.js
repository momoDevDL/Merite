var DataTypes = require("sequelize").DataTypes;
var _Course_has_user = require("./Course_has_user");
var _Courses = require("./Courses");
var _Document = require("./Document");
var _Formation_has_modules = require("./Formation_has_modules");
var _Formations = require("./Formations");
var _Global_Roles = require("./Global_Roles");
var _Module = require("./Module");
var _Permissions = require("./Permissions");
var _Role_has_permissions = require("./Role_has_permissions");
var _Roles = require("./Roles");
var _Section = require("./Section");
var _User = require("./User");
var _User_Has_Formations = require("./User_Has_Formations");
var _User_has_roles = require("./User_has_roles");

function initModels(sequelize) {
  var Course_has_user = _Course_has_user(sequelize, DataTypes);
  var Courses = _Courses(sequelize, DataTypes);
  var Document = _Document(sequelize, DataTypes);
  var Formation_has_modules = _Formation_has_modules(sequelize, DataTypes);
  var Formations = _Formations(sequelize, DataTypes);
  var Global_Roles = _Global_Roles(sequelize, DataTypes);
  var Module = _Module(sequelize, DataTypes);
  var Permissions = _Permissions(sequelize, DataTypes);
  var Role_has_permissions = _Role_has_permissions(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var Section = _Section(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var User_Has_Formations = _User_Has_Formations(sequelize, DataTypes);
  var User_has_roles = _User_has_roles(sequelize, DataTypes);

  Course_has_user.belongsTo(Courses, { as: "course", foreignKey: "courseID"});
  Courses.hasMany(Course_has_user, { as: "Course_has_users", foreignKey: "courseID"});
  Roles.belongsTo(Courses, { as: "course", foreignKey: "courseID"});
  Courses.hasMany(Roles, { as: "Roles", foreignKey: "courseID"});
  Section.belongsTo(Courses, { as: "course", foreignKey: "courseID"});
  Courses.hasMany(Section, { as: "Sections", foreignKey: "courseID"});
  Formation_has_modules.belongsTo(Formations, { as: "idFormation_Formation", foreignKey: "idFormation"});
  Formations.hasMany(Formation_has_modules, { as: "Formation_has_modules", foreignKey: "idFormation"});
  User_Has_Formations.belongsTo(Formations, { as: "idFormation_Formation", foreignKey: "idFormation"});
  Formations.hasMany(User_Has_Formations, { as: "User_Has_Formations", foreignKey: "idFormation"});
  User.belongsTo(Global_Roles, { as: "idGlobalRole_Global_Role", foreignKey: "idGlobalRole"});
  Global_Roles.hasMany(User, { as: "Users", foreignKey: "idGlobalRole"});
  Courses.belongsTo(Module, { as: "module", foreignKey: "moduleID"});
  Module.hasMany(Courses, { as: "Courses", foreignKey: "moduleID"});
  Formation_has_modules.belongsTo(Module, { as: "idModule_Module", foreignKey: "idModule"});
  Module.hasMany(Formation_has_modules, { as: "Formation_has_modules", foreignKey: "idModule"});
  Module.belongsTo(Module, { as: "parentIdModule_Module", foreignKey: "parentIdModule"});
  Module.hasMany(Module, { as: "Modules", foreignKey: "parentIdModule"});
  Role_has_permissions.belongsTo(Permissions, { as: "permission", foreignKey: "permissionID"});
  Permissions.hasMany(Role_has_permissions, { as: "Role_has_permissions", foreignKey: "permissionID"});
  Role_has_permissions.belongsTo(Roles, { as: "role", foreignKey: "roleID"});
  Roles.hasMany(Role_has_permissions, { as: "Role_has_permissions", foreignKey: "roleID"});
  User_has_roles.belongsTo(Roles, { as: "role", foreignKey: "roleID"});
  Roles.hasMany(User_has_roles, { as: "User_has_roles", foreignKey: "roleID"});
  Document.belongsTo(Section, { as: "section", foreignKey: "sectionID"});
  Section.hasMany(Document, { as: "Documents", foreignKey: "sectionID"});
  Course_has_user.belongsTo(User, { as: "user", foreignKey: "userID"});
  User.hasMany(Course_has_user, { as: "Course_has_users", foreignKey: "userID"});
  Formations.belongsTo(User, { as: "idResponsable_User", foreignKey: "idResponsable"});
  User.hasMany(Formations, { as: "Formations", foreignKey: "idResponsable"});
  User_Has_Formations.belongsTo(User, { as: "idUser_User", foreignKey: "idUser"});
  User.hasMany(User_Has_Formations, { as: "User_Has_Formations", foreignKey: "idUser"});
  User_has_roles.belongsTo(User, { as: "user", foreignKey: "userID"});
  User.hasMany(User_has_roles, { as: "User_has_roles", foreignKey: "userID"});

  return {
    Course_has_user,
    Courses,
    Document,
    Formation_has_modules,
    Formations,
    Global_Roles,
    Module,
    Permissions,
    Role_has_permissions,
    Roles,
    Section,
    User,
    User_Has_Formations,
    User_has_roles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
