const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();

const PORT = 8000;

const prisma = new PrismaClient();

// 新規ユーザー登録API
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await prisma.user.create({
    dataa: {
      username,
      email,
      password,
    },
  });

  return res.json({ user });
});

app.listen(PORT, () => console.log(`server is runing on Port ${PORT}`));
