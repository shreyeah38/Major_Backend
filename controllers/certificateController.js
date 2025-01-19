const Certificate = require('../models/Certificate');
const cloudinary = require('cloudinary').v2;

// Submit a certificate
exports.submitCertificate = async (req, res) => {
  const { enrollment, name, batch, email, title, description } = req.body;
  const file = req.file; // Assuming the file is uploaded via multipart form data

  if (!file) {
    return res.status(400).json({ message: 'Document file is required' });
  }

  try {
    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw', // Automatically detect file type
      folder: 'certificates', // Optional folder in Cloudinary
    });

    // Create and save certificate in MongoDB
    const certificate = new Certificate({
      enrollment,
      name,
      batch,
      email,
      title,
      description,
      documentLink: uploadResult.secure_url,
    });

    await certificate.save();

    res.status(201).json({ message: 'Certificate submitted successfully', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting certificate', error: error.message });
  }
};

exports.getCertificates = async (req, res) => {
    try {
      const certificates = await Certificate.find(); // Fetch all certificates
  
      res.status(200).json({
        message: 'Certificates retrieved successfully',
        certificates,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching certificates', error: error.message });
    }
  };

exports.getStudentCertificates = async (req, res) => {
  const { enrollment } = req.params;

  try {
    const certificates = await Certificate.find({ enrollment }); // Find certificates by enrollment number

    if (certificates.length === 0) {
      return res.status(404).json({ message: 'No certifications found for this enrollment number' });
    }

    res.status(200).json({
      message: 'Certifications retrieved successfully',
      certificates,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certifications', error: error.message });
  }
};
