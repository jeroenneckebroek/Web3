const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/rapport/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rapport = await prisma.rapport.findMany({
      where: { opdrachtElementId: Number(id) },
      include: { opdrachtelement: true, vragenStudent: true, student: true },
    });
    res.status(200).json(rapport);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
