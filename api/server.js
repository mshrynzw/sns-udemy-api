const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const PORT = 8000;
const prisma = new PrismaClient();

app.use(express.json());
// 新規ユーザー登録API
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user });
});

//ユーザーログインAPI
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "そのユーザーは存在しません。" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwerd);
  if (isPasswordValid) {
    return res.status(401).json({ error: "そのパスワードは間違っています。" });
  }

  return res.json({ user });
});

app.listen(PORT, () => console.log(`server is runing on Port ${PORT}`));
