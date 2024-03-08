"use client"
import ImageGrid from "@/app/ui/dashboard/image-grid";
import Head from 'next/head';
import { useEffect, useState  } from "react";
import AWS from 'aws-sdk';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { useSelector, useDispatch } from 'react-redux'

export default function Page() {

  const descriptions = useSelector(state => state.descriptions);



async function submitImageData() {

  const items = Object.entries(descriptions).map(([imageId, description]) => ({
    imageId,
    description,
  }));

  const response = await fetch('/api/imagedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
    // Assuming no body is required since items are hard-coded in the function.
    // If dynamic, you'd send data here.
  });

  if (response.ok) {
    const data = await response.json();
    //console.log('Success:', data);
  } else {
    console.error('Failed to submit image data');
  }
}

const images = Object.keys(descriptions);

return (
<div>
<Head>
  <title>Bookmarked Gallery</title>
</Head>
<main className="min-h-screen bg-gray-100 p-8">
<div>
  </div>
  <h1 className="text-center text-2xl font-bold mb-8 text-black">Bookmarked Images</h1>
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