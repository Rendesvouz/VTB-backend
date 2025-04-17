const multer = require("multer");
const S3Storage = require("../service/upload/s3");
const storage = multer.memoryStorage();

// Custom validation function for file uploads
const validateFile = (file, fieldName) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/heif",
    "image/svg+xml",
    "image/avif",
    "image/x-icon",
    "video/mp4",
    "video/x-matroska",
    "video/quicktime",
    "video/x-ms-wmv",
    "video/x-flv",
    "video/webm",
    "video/mpeg",
    "video/3gpp",
    "video/avi",
    "audio/mpeg",
    "audio/wav",
    "audio/aac",
    "audio/flac",
    "audio/ogg",
    "audio/mp4",
    "audio/x-ms-wma",
    "audio/alac",
    "audio/opus",
  ];

  const maxSize = 50 * 1024 * 1024;

  if (!file) {
    return `${fieldName} is required.`;
  }
  if (!allowedTypes.includes(file.mimetype)) {
    return `${fieldName} must be a valid file type.`;
  }
  if (file.size > maxSize) {
    return `${fieldName} must be less than 50MB.`;
  }
  return null;
};

/**
 * This middleware function is used to handle errors that occur when the uploaded file size exceeds the maximum limit. If the error code is "LIMIT_FILE_SIZE", it returns a 400 Bad Request response with a JSON payload indicating the error. Otherwise, it calls the next middleware function.
 *
 * @param {Error} err - The error object containing information about the file size limit error.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function to be called.
 */
async function handlefileSizeLimitError(err, req, res, next) {
  try {
    if (err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({
        success: false,
        message: "File size exceeds the maximum limit",
      });
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Filter function to determine which files should be accepted for upload.
 * @param {Express.Request} req - The Express request object.
 * @param {object} file - The file object to be filtered.
 * @param {function} cb - The callback function to be called with the filtering result.
 * @returns {void}
 */
async function fileFilter(req, file, cb) {
  try {
    const allowedExtension = [
      "jpeg",
      "png",
      "jpg",
      "gif",
      "bmp",
      "tiff",
      "webp",
      "heif",
      "svg",
      "eps",
      "raw",
      "pdf",
      "ico",
      "avif",
      "mp4",
      "avi",
      "mkv",
      "mov",
      "wmv",
      "flv",
      "webm",
      "mpeg",
      "3gp",
      "mp3",
      "wav",
      "aac",
      "flac",
      "ogg",
      "m4a",
      "wma",
      "alac",
      "opus",
    ];
    const fileExtension = file?.originalname.split(".").pop().toLowerCase();
    if (allowedExtension.includes(fileExtension)) {
      return cb(null, true);
    }
    const error = new Error(
      "Unsupported file type, please upload a supported file type"
    );
    error.code = "UNSUPPORTED_FILE_TYPE";
    return cb(error);
  } catch (err) {
    logger.error(err.message);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

/*
 * Middleware to choose storage based on environment
 */
async function fileUpload(req, res, next) {
  try {
    req.storage = await S3Storage();
    next();
  } catch (error) {
    console.error("Error initializing file storage:", error);
    next(new Error("Failed to initialize file storage"));
  }
}

module.exports = { upload, fileUpload, handlefileSizeLimitError };
