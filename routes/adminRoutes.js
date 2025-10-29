import express from "express";
import Admin from "../models/Admin.js";

const router = express.Router();

// 🔹 GET semua admin
router.get("/", async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

// 🔹 POST tambah admin baru
router.post("/", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.json({ message: "Admin berhasil ditambahkan", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
