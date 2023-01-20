const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const opdrachtElementen = await prisma.opdrachtElement.findMany({
      include: {
        opdracht: true,
      },
    });
    res.json(opdrachtElementen);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const opdrachtElement = await prisma.opdrachtElement.findFirst({
      where: {
        id: Number(req.params.id),
      },
      include: {
        rapporten: true,
      },
    });
    res.json(opdrachtElement);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const opdrachtElement = await prisma.opdrachtElement.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        geldig: req.body.geldig,
      },
    });
    res.json(opdrachtElement);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id/:opdrachtElementId", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const opdrachtElementId = Number(req.params.opdrachtElementId);
    const element = await prisma.rapport.findMany({
      where: {
        id,
      },
      include: {
        opdrachtElement: {
          where: {
            id: opdrachtElementId,
          },
        },
      },
    });
    res.json(element);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
