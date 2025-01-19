const Notification = require('../models/Notification');
const cloudinary = require('../config/cloudinary');

// Create Notification (only for Admin)
exports.createNotification = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file; // Assuming the file is uploaded via multipart form data

  if (!file) {
    return res.status(400).json({ message: 'Document file is required' });
  }

  try {
    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw', // Automatically detect file type (pdf, jpg, png, etc.)
      folder: 'notifications' // Optional: specify a folder in Cloudinary
    });
    // console.log(uploadResult.secure_url); // Verify this is the correct URL

    // Create and save notification in MongoDB
    const notification = new Notification({
      title,
      description,
      documentLink: uploadResult.secure_url
    });

    await notification.save();

    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notifications', error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    await notification.deleteOne();

    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting notification', error: error.message });
  }
};
