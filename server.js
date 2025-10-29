import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Load variabel dari .env

const app = express();

// =======================
// 🔹 Middleware Umum
// =======================
app.use(cors({
  origin: "*", // bisa diganti domain Flutter Web nanti
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // parse JSON body

// =======================
// 🔹 Koneksi MongoDB
// =======================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cozypaws";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // stop server kalau gagal konek
  });

// =======================
// 🔹 Routing API
// =======================
app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// =======================
// 🔹 Endpoint Tes
// =======================
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to CozyPaws API 🐾",
    status: "Running",
    endpoints: {
      admins: "/api/admins",
      users: "/api/users",
      auth: "/api/auth",
    },
  });
});

// =======================
// 🔹 Jalankan Server
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
