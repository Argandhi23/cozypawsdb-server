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
    
        // --- HAPUS PRINT DEBUG 1 ---
        // console.log("Data User Ditemukan di DB:", user); 
        // -------------------------
    
        if (!user) {
          return res.status(400).json({ message: "Email tidak ditemukan" });
        }
    
        // Cek password (INGAT: ini tidak aman, nanti perbaiki!)
        if (user.password !== password) {
          return res.status(400).json({ message: "Password salah" });
        }
    
        // Siapkan data yang akan dikirim ke Flutter
        const responsePayload = {
          message: "Login berhasil",
          user: {
            id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role, // Pastikan field 'role' diambil dari objek 'user'
            // password: user.password, // Sebaiknya jangan kirim password
          },
        };
    
        // --- HAPUS PRINT DEBUG 2 ---
        // console.log("Data yang Dikirim ke Flutter:", responsePayload);
        // -------------------------
    
        // Kirim respons ke Flutter
        res.status(200).json(responsePayload);
    
      } catch (error) {
        console.error("Error di /auth/login:", error); // Biarkan log error ini
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
      }
    });
    
    export default router;
    

