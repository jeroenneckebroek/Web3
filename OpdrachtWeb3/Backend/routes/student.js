const express = require("express");
const router = express.Router();
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

async function getStudent(req, res) {
  try {
    const student = await prisma.Student.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function getRapport(req, res) {
  try {
    const student = await prisma.Student.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!student) {
      res.status(404).send("Student not found");
      return;
    }

    const opdrachtElement = await prisma.OpdrachtElement.findUnique({
      where: {
        id: parseInt(req.params.opdrachtelementId),
      },
    });
    if (!opdrachtElement) {
      res.status(404).send("Opdracht element not found");
      return;
    }

    const rapport = await prisma.Rapport.findFirst({
      where: {
        studentId: student.id,
        opdrachtElementId: opdrachtElement.id,
      },
    });

    if (!rapport) {
      const newRapport = await prisma.Rapport.create({
        data: {
          studentId: student.id,
          opdrachtElementId: opdrachtElement.id,
        },
      });
      res.status(200).json(newRapport);
    } else {
      res.status(200).json(rapport);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", getStudent);

router.get("/:id/rapport/:opdrachtelementId", getRapport);

module.exports = router;
