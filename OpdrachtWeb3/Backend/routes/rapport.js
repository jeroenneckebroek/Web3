const express = require("express");
const router = express.Router();
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

router.get("/", async (req, res) => {
  try {
    const rapport = await prisma.rapport.findMany({
      include: {
        vraagStudent: true,
      },
    });
    res.status(200).json(rapport);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const rapport = await prisma.rapport.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        student: true,
      },
    });
    res.status(200).json(rapport);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id/:opdrachtElementId", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const opdrachtElementId = Number(req.params.opdrachtElementId);
    const element = await prisma.opdrachtElement.findFirst({
      where: {
        id: opdrachtElementId,
      },
      include: {
        opdracht: true,
      },
    });
    res.json(element);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/host/:opdrachtElementId", async (req, res) => {
  try {
    const opdrachtElementId = Number(req.params.opdrachtElementId);
    const rapport = await prisma.rapport.findMany({
      where: {
        opdrachtElementId: opdrachtElementId,
      },
      include: {
        student: true,
      },
    });
    res.status(200).json(rapport);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/status", async (req, res) => {
  try {
    const rapport = await prisma.rapport.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        status: req.body.status,
      },
    });
    res.status(200).json(rapport);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/extraMinuten", async (req, res) => {
  try {
    const { id } = req.body;
    const { extraMinuten } = req.body;
    const rapport = await prisma.rapport.update({
      where: { id: parseInt(id) },
      data: { extraMinuten },
    });
    res.status(200).json(rapport);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/vragen", async (req, res) => {
  try {
    const { beschrijving } = req.body;
    const { id } = req.body;
    const vraag = await prisma.vraagStudent.create({
      data: {
        beschrijving,
        rapport: { connect: { id: parseInt(id) } },
      },
      include: { rapport: true },
    });
    res.status(200).json(vraag);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
