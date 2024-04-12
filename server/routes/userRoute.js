import express from "express";
import passport from "passport";
import adminMiddleware from "../middlewares/admin.js";
import {
  logout,
  profile,
  getAdminUsers,
  getAdminStats,
  sendEmail,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

userRoute.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: "http://localhost:5173",
  })
);

userRoute.get("/me", isAuthenticated, profile);
userRoute.get("/logout", logout);

userRoute.post("/sendemail", sendEmail);

// Admin  Routes
userRoute.get(
  "/admin/users",
  isAuthenticated,
  adminMiddleware("admin"),
  getAdminUsers
);
userRoute.get(
  "/admin/stats",
  isAuthenticated,
  adminMiddleware("admin"),
  getAdminStats
);

export default userRoute;
