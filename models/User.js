import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  pet_id: mongoose.Schema.Types.ObjectId,
  nama: String,
  jenis: String,
  ras: String,
  umur: Number,
  gender: String
});

const notificationSchema = new mongoose.Schema({
  pesan: String,
  tanggal_kirim: Date,
  status: String
});

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
  // --- INI PERUBAHAN YANG DITAMBAHKAN ---
  role: {
    type: String,
    enum: ['user', 'admin'], // Hanya boleh diisi 'user' atau 'admin'
    default: 'user',        // PENTING: Semua pendaftaran baru otomatis jadi 'user'
  },
  // ------------------------------------

  telepon: String,
  alamat: String,
  pets: [petSchema],
  notifications: [notificationSchema]
});

export default mongoose.model("User", userSchema);