const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Initialize the Cloudflare R2 Client
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const R2_BUCKET = process.env.R2_BUCKET_NAME;

/**
 * Uploads a file to Cloudflare R2 storage.
 * @param {Buffer} fileBuffer - The file buffer to upload.
 * @param {string} key - The key (file name) in R2.
 * @returns {Promise<string>} A promise that resolves with the public URL of the uploaded file.
 * @throws {Error} If there is an error during the upload process.
 */
async function S3Storage() {
  return {
    async uploadFile(fileBuffer, key) {
      try {
        const uploadParameters = {
          Bucket: R2_BUCKET,
          Key: key,
          Body: fileBuffer,
        };

        const command = new PutObjectCommand(uploadParameters);
        await s3Client.send(command);

        const publicDomain =
          "https://pub-08be10b6cc074c21b638af3d8ff441f0.r2.dev";
        const viewUrl = `${publicDomain}/${key}`;

        console.log(
          `File uploaded successfully to Cloudflare R2. Public URL: ${viewUrl}`
        );
        return viewUrl;
      } catch (err) {
        console.log(`Error uploading file to Cloudflare R2: ${err.message}`);
        throw new Error(`Failed to upload file: ${err.message}`);
      }
    },
  };
}

module.exports = S3Storage;
