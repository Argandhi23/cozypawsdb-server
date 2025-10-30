import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // Kita akan simpan ID user yang memesan
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Merujuk ke model 'User'
      required: true,
    },
    // Info dari form pemesanan
    packageName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    catName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date, // Kita simpan sebagai tipe Date
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    // Status pesanan (penting untuk admin)
    status: {
      type: String,
      enum: ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Selesai', 'Dibatalkan'],
      default: 'Menunggu Konfirmasi',
    },
  },
  { timestamps: true } // Otomatis menambah createdAt dan updatedAt
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;