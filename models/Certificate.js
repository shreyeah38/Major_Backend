const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    enrollment: { type: String, required: true },
    name: { type: String, required: true },
    batch: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    documentLink: { type: String, required: true }, // Cloudinary link
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Certificate', certificateSchema);
