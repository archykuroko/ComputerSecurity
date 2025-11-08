import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export function showLogin(req, res) {
  res.render("login", { error: null, ok: null });
}

export function showRegister(req, res) {
  res.render("register", { error: null });
}

export async function registerUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.render("register", { error: "Completa los campos." });

    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) return res.render("register", { error: "Ese correo ya está registrado." });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await prisma.user.create({ data: { email: email.toLowerCase(), password: hash } });

    res.redirect("/login");
  } catch (e) {
    console.error(e);
    res.render("register", { error: "Error al registrar." });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: (email || "").toLowerCase() } });
    const bad = () => res.status(401).render("login", { error: "Credenciales inválidas", ok: null });

    if (!user) return bad();
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return bad();

    //Guarda objeto de sesión compacto
    req.session.user = { id: user.id, email: user.email, role: user.role };

    res.redirect("/user");
  } catch (e) {
    console.error(e);
    res.status(500).render("login", { error: "Error interno", ok: null });
  }
}

export function logoutUser(req, res) {
  req.session.destroy(() => res.redirect("/login"));
}

export function userPage(req, res) {
  if (!req.session.user) return res.redirect("/login");
  res.render("user"); // user ya llega vía res.locals.user
}
