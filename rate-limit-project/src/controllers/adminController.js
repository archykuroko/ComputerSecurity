import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function showAdmin(req, res) {
  if (!req.session.user || req.session.user.role !== "admin") return res.status(403).send("Acceso restringido");
  const usersCount = await prisma.user.count();
  res.render("admin", { usersCount });
}

export async function listUsers(req, res) {
  if (!req.session.user || req.session.user.role !== "admin") return res.status(403).send("Acceso restringido");
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  res.render("adminUsers", { users });
}

export async function changeRole(req, res) {
  if (!req.session.user || req.session.user.role !== "admin") return res.status(403).send("Acceso restringido");
  const { id } = req.params;
  const { role } = req.body;
  if (!["admin", "user"].includes(role)) return res.status(400).send("Rol inválido");
  await prisma.user.update({ where: { id: Number(id) }, data: { role } });
  res.redirect("/admin/users");
}

export async function deleteUser(req, res) {
  if (!req.session.user || req.session.user.role !== "admin") return res.status(403).send("Acceso restringido");
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.redirect("/admin/users");
}
