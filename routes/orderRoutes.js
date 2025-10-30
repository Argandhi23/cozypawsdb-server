import express from "express";
import Order from "../models/Order.js"; // Import model Order

const router = express.Router();

/* =====================================================
   🔹 CREATE (POST) - Buat Pesanan Baru
===================================================== */
router.post("/", async (req, res) => {
  try {
    // Ambil data pesanan dari body request (akan dikirim Flutter)
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Gagal membuat pesanan: " + error.message });
  }
});

/* =====================================================
   🔹 READ (GET ALL) - Ambil Semua Pesanan (Untuk Admin)
===================================================== */
router.get("/", async (req, res) => {
  try {
    // Ambil semua pesanan dan 'populate' data user (nama & email)
    const orders = await Order.find().populate('userId', 'nama email').sort({ createdAt: -1 }); // Urutkan dari terbaru
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Gagal mengambil pesanan: " + error.message });
  }
});

/* =====================================================
   🔹 UPDATE (PUT) - Update Status Pesanan (Untuk Admin)
===================================================== */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body; // Admin hanya bisa update status
    
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status }, // Hanya update field status
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Gagal update status: " + error.message });
  }
});


export default router;