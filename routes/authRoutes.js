import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔹 LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    // Cek user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    // Cek password
    if (user.password !== password) {
      return res.status(400).json({ message: "Password salah" });
    }

    // Berhasil login
    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user._id,
        nama: user.nama,
        email: user.email,
        password: user.password, // sementara dikirim ke Flutter
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
});

export default router;
