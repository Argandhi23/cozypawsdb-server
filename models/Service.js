import mongoose from 'mongoose';

// 1. Kita buat skema untuk 'packages' (data yang di dalam data)
const ServicePackageSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  facilities: [{ type: String }] // Ini adalah array of string
});

// 2. Ini adalah skema utama untuk 'Service'
const ServiceSchema = new mongoose.Schema({
  // Field Umum (ada di semua service)
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Ini harga dasar
  description: { type: String },
  imageUrl: { type: String },

  // Field ini PENTING untuk membedakan tipe service
  serviceType: {
    type: String,
    required: true,
    // enum: ['Grooming', 'Boarding', 'Vaksinasi', 'AntarJemput']
  },

  // Field Spesifik (kita masukkan semua, yang tidak dipakai akan bernilai null)
  breed: { type: String },
  duration: { type: Number }, // <-- Milik Grooming
  days: { type: Number }, // <-- Milik Boarding
  includeFood: { type: Boolean }, // <-- Milik Boarding
  vaccineType: { type: String }, // <-- Milik Vaksinasi
  area: { type: String }, // <-- Milik AntarJemput
  distance: { type: Number }, // <-- Milik AntarJemput

  // 4. Array 'packages' yang menggunakan skema di atas
  packages: [ServicePackageSchema]
}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);
export default Service;