import ImageGrid from "@/app/ui/dashboard/image-grid";
import Head from 'next/head';

export default function Page() {
    const images = [
        "/me.jpg",
        "/mea.jpg",
        "/mea.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
        "/me.jpg",
       
        // Add more image URLs here
      ];
  return (
    <div>
    <Head>
      <title>Image Gallery</title>
    </Head>
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-2xl font-bold mb-8">Image Gallery</h1>
      <ImageGrid images={images} />
    </main>
  </div>
  );
}
