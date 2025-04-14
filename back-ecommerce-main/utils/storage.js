const Minio = require('minio');
const keys = require('../config/keys');

exports.s3Upload = async (image) => {
  if (!keys.minio.accessKeyId || !image) {
    console.warn('Missing MinIO keys or image');
    return { imageUrl: '', imageKey: '' };
  }

  const minioClient = new Minio.Client({
    endPoint: keys.minio.endpoint,
    useSSL: true,
    accessKey: keys.minio.accessKeyId,
    secretKey: keys.minio.secretAccessKey,
  });

  const objectName = image.originalname;
  const metaData = { 'Content-Type': image.mimetype };

  try {
    await minioClient.putObject(keys.minio.bucketName, objectName, image.buffer, metaData);
    const imageUrl = `https://${keys.minio.endpoint}/${keys.minio.bucketName}/${objectName}`;
    return { imageUrl, imageKey: objectName };
  } catch (error) {
    return { imageUrl: '', imageKey: '' };
  }
};
