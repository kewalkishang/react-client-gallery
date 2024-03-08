import AWS from 'aws-sdk';

export default async function get(req, res) {
   // console.log("Handler called");
  // Load AWS credentials from environment variables
  // AWS.config.update({
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_REGION,
  // });

  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    // Specify the folder using the Prefix parameter
    Prefix: 'kewalkishang@gmail.com/',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    //console.log(data);
    const images = data.Contents.map((item) => {
      return {
        key: item.Key,
        url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
      };
    });
    res.status(200).json(images);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Error fetching from S3" });
  }
}
