import express from "express";
import { showAdmin, listUsers, changeRole, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== "admin") return res.status(403).send("Acceso restringido");
  next();
}

router.get("/", requireAdmin, showAdmin);
router.get("/users", requireAdmin, listUsers);
router.post("/users/:id/role", requireAdmin, changeRole);
router.post("/users/:id/delete", requireAdmin, deleteUser);

export default router;
