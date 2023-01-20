const express = require("express");
const router = express.Router();
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.opdracht.findMany({
      include: {
        opdrachtElementen: true,
      },
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await prisma.opdracht.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        opdrachtElementen: true,
      },
    });
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get(":id/:opdrachtElement", async (req, res) => {
  try {
    const opdrachtElementen = await prisma.opdrachtElement.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        opdracht: true,
      },
    });
    res.status(200).json(opdrachtElementen);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const opdracht = await prisma.opdracht.create({
      data: {
        naam: req.body.naam,
        opdrachtElementen: {
          create: {
            naam: req.body.opdrachtElementen,
            beschrijving: req.body.beschrijving,
          },
        },
      },
    });
    res.status(200).json(opdracht);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const opdracht = await prisma.opdracht.delete({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        opdrachtElementen: true,
      },
    });
    res.status(200).json(opdracht);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.patch("/update", async (req, res) => {
  try {
    const opdracht = await prisma.opdracht.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        naam: req.body.naam,
        geldig: parseInt(req.body.geldig),
        opdrachtElementen: {
          update: {
            where: {
              id: parseInt(req.body.opdrachtElementId),
            },
            data: {
              naam: req.body.opdrachtElementen,
              beschrijving: req.body.beschrijving,
              geldig: parseInt(req.body.geldig),
            },
          },
        },
      },
    });
    res.status(200).json(opdracht);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
