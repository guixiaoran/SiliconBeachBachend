/**
 * Created by Sanchit
 */
import User from "./user";
import Service from "./service";
import Admin from "./admin";
import Comment from "./comment";
import Token from "./token";
import SSO from "./sso";

const ForgetPassword = require("./forgotPasswordRequest");

export default {
  User,
  Service,
  ForgetPassword,
  Admin,
  Token,
  SSO,
  Comment,
};
