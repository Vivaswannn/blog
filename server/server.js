require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const File = require('./models/File');

const app = express();
const PORT = process.env.PORT || 5001;

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-resources', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, PNG, and DOC files are allowed.'));
    }
  }
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Server is working!' });
});

// File upload route
app.post('/api/files/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Upload request received:', {
      file: req.file ? {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      } : null,
      body: req.body,
      headers: req.headers
    });

    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!req.body.topicId) {
      console.log('No topicId in request');
      return res.status(400).json({ error: 'Topic ID is required' });
    }

    if (!req.body.userId) {
      console.log('No userId in request');
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('Creating file record with:', {
      name: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      type: req.file.mimetype,
      topicId: req.body.topicId,
      uploadedBy: req.body.userId
    });

    const file = new File({
      name: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      type: req.file.mimetype,
      topicId: req.body.topicId,
      uploadedBy: req.body.userId
    });

    await file.save();
    console.log('File saved successfully:', file);

    res.json({
      id: file._id,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: file.uploadedAt
    });
  } catch (error) {
    console.error('Upload error details:', error);
    res.status(500).json({ error: error.message || 'Failed to save file information' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`Test endpoint available at: http://localhost:${PORT}/api/test`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
  }
}); 