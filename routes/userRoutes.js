import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =====================================================
   🔹 REGISTER (POST USER BARU)
===================================================== */
router.post("/", async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nama, email, dan password wajib diisi" });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const newUser = new User({ nama, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User berhasil ditambahkan",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 RESET PASSWORD (diletakkan SEBELUM :id)
===================================================== */
router.put("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email dan password baru wajib diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 GET USER BY EMAIL (untuk forgot password)
===================================================== */
router.get("/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 GET SEMUA USER
===================================================== */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 GET USER BY ID
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 UPDATE USER BY ID
===================================================== */
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User tidak ditemukan" });

    res.status(200).json({
      message: "User berhasil diperbarui",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 DELETE USER BY ID
===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: "User tidak ditemukan" });

    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
