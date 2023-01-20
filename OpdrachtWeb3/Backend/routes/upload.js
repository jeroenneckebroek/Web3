const express = require("express");
const router = express.Router();
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

router.get("/", (req, res) => {
  res.send("Upload route");
});

router.post("/opdrachten", async (req, res) => {
  try {
    const opdrachten = req.body;

    const newOpdracht = await prisma.opdracht.create({
      data: {
        naam: opdrachten[0].Opdracht,
      },
    });

    const tasks = opdrachten
      .filter((opdracht) => opdracht.Opdracht !== "")
      .map(async (opdracht) => {
        return prisma.opdrachtElement.create({
          data: {
            naam: opdracht.Titel,
            beschrijving: opdracht.Beschrijving,
            minuten: parseInt(opdracht.Duurtijd),
            opdracht: {
              connect: {
                id: newOpdracht.id,
              },
            },
          },
          include: {
            opdracht: true,
          },
        });
      });

    await Promise.all(tasks);
    res.status(200).json(true);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/student", async (req, res) => {
  try {
    const groepen = req.body;
    const cursusgroepen = new Set();
    const students = [];

    groepen.forEach((groep) => cursusgroepen.add(groep.Cursusgroepen));

    for (const cursusgroep of cursusgroepen) {
      const existingGroep = await prisma.groep.findFirst({
        where: {
          naam: cursusgroep,
        },
      });

      if (!existingGroep) {
        await prisma.groep.create({
          data: {
            naam: cursusgroep,
          },
        });
      }
    }

    for (const student of groepen) {
      const existingGroep = await prisma.groep.findFirst({
        where: {
          naam: student.Cursusgroepen,
        },
      });

      const newStudent = await prisma.student.create({
        data: {
          code: student.Code,
          gebruikersNaam: student.Gebruikersnaam,
          familieNaam: student.Familienaam,
          voorNaam: student.Voornaam,
          sorteerNaam: student.Sorteernaam,
          email: student.Email,
          groep: {
            connect: { id: existingGroep.id },
          },
        },
      });

      students.push(newStudent);
    }

    res.status(200).json({ cursusgroepen, students });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
