const express = require("express");
const router = express.Router();
const db = require("../models");

// Rota básica para testar o servidor
router.get("/", (req, res) => {
  res.send("Servidor está funcionando!");
});

// Exemplo de rota para criar uma reserva
router.post("/reservas", async (req, res) => {
  try {
    const reserva = await db.Reserva.create(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exemplo de rota para buscar todas as reservas
router.get("/reservas", async (req, res) => {
  try {
    const reservas = await db.Reserva.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exemplo de rota para buscar uma reserva por ID
router.get("/reservas/:id", async (req, res) => {
  try {
    const reserva = await db.Reserva.findByPk(req.params.id);
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exemplo de rota para atualizar uma reserva por ID
router.put("/reservas/:id", async (req, res) => {
  try {
    const reserva = await db.Reserva.findByPk(req.params.id);
    if (reserva) {
      await reserva.update(req.body);
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exemplo de rota para deletar uma reserva por ID
router.delete("/reservas/:id", async (req, res) => {
  try {
    const reserva = await db.Reserva.findByPk(req.params.id);
    if (reserva) {
      await reserva.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
