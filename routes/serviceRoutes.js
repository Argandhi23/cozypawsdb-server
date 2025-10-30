import express from "express";
import Service from "../models/Service.js"; // Import model Service

const router = express.Router();

/* =====================================================
   🔹 CREATE (POST) - Tambah Service Baru
===================================================== */
router.post("/", async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error); // Tambah log error
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 READ (GET ALL) - Ambil Semua Services
===================================================== */
router.get("/", async (req, res) => {
  try {
    const services = await Service.find(); // Ambil semua data service
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error); // Tambah log error
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔹 UPDATE (PUT BY ID) - Perbarui Service
   INI BAGIAN YANG DITAMBAHKAN
===================================================== */
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id, // Ambil ID dari URL (misal: /api/services/xyz123)
      req.body,      // Ambil data baru dari body request Flutter
      { new: true }   // Opsi agar mengembalikan dokumen yang sudah di-update
    );

    // Cek jika dokumen dengan ID tersebut tidak ditemukan
    if (!updatedService) {
      return res.status(404).json({ message: "Service tidak ditemukan" });
    }
    // Kirim balik data yang berhasil di-update
    res.status(200).json(updatedService);
  } catch (error) {
    // Tangani error server (misal: ID tidak valid, masalah koneksi DB)
    console.error("Error updating service:", error); // Tambah log error
    res.status(500).json({ message: "Gagal mengupdate service: " + error.message });
  }
});

/* =====================================================
   🔹 DELETE (DELETE BY ID) - Hapus Service
   INI BAGIAN YANG DITAMBAHKAN
===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id); // Hapus berdasarkan ID dari URL

    // Cek jika dokumen tidak ditemukan
    if (!deletedService) {
      return res.status(404).json({ message: "Service tidak ditemukan" });
    }
    // Kirim pesan sukses
    res.status(200).json({ message: "Service berhasil dihapus" });
  } catch (error) {
    // Tangani error server
    console.error("Error deleting service:", error); // Tambah log error
    res.status(500).json({ message: "Gagal menghapus service: " + error.message });
  }
});

export default router;