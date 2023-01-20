const express = require("express");
const router = express.Router();
const cors = require("cors");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { email, code } = req.body;
    const student = await prisma.student.findFirst({
      where: { email, code },
    });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).send("Geen student met deze gegevens gevonden");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server fout");
  }
});

module.exports = router;
