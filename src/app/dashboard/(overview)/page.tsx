"use client"
import ImageGrid from "@/app/ui/dashboard/image-grid";
import Head from 'next/head';
import { useEffect, useState  } from "react";
import AWS from 'aws-sdk';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../../lib/features/counter/counterSlice';
import { fetchDescriptions, deleteDescription} from '../../../lib/features/imageData/descriptionSlice';
import { useSession } from  'next-auth/react';
import { redirect } from "../../../../node_modules/next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default function Page() {
  const { data : session }  = useSession(
    {
      required : true,
      onUnauthenticated() {
        redirect('/api/auth/signin')
      }
    }
  )

  console.log(session?.name);
  console.log(session?.user.email);
  console.log(session?.user.name);


  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const [images, setImagesa] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      //console.log("Handler called");
    //console.log(process.env.AWS_REGION);
    const client = new S3Client({
      region : process.env.AWS_REGION,
      credentials : {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });
   // const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      // Specify the folder using the Prefix parameter
      Prefix: session?.user.email,
    };
  
    try {
      const baseURL = process.env.CLOUDFRONT_URL;
    //  const data = await s3.listObjectsV2(params).promise();
    const command = new ListObjectsV2Command(params);
const data = await client.send(command);
     // console.log(data);
      const keys = data.Contents.map(item => baseURL + item.Key);

      setImagesa(keys); // Update state with fetched images
    //  console.log(keys);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };
  fetchImages();
  }, []);

useEffect(() => {
  dispatch(fetchDescriptions());
}, []);

const descriptions = useSelector(state => state.descriptions);

async function submitImageData() {
//  console.log(descriptions);
  const items = Object.entries(descriptions).map(([imageId, description]) => ({
    imageId,
    description,
  }));
 // console.log(items);
  const response = await fetch('/api/imagedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (response.ok) {
    const data = await response.json();
    //console.log('Success:', data);
  } else {
   // console.error('Failed to submit image data');
  }
}

  return (
    <div>
    <Head>
      <title>Image Gallery</title>
    </Head>
    <main className="min-h-screen bg-gray-100 p-8">
    {/* <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div> */}
      <h1 className="text-center text-2xl font-bold mb-8 text-black">Image Gallery</h1>
      <button
          aria-label="Upload data"
          onClick={() => submitImageData()}
        >
          Upload
        </button>
      <ImageGrid images={images} />
    </main>
  </div>
  );
}
