'use client';
import React, { useState, useEffect } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase.config';

const Reels = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reels"));
        const urls = querySnapshot.docs.map(doc => doc.data().imageUrl);
        setVideoUrls(urls);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
        <div className='text-xl md:text-2xl md:font-medium font-bold  my-4 '>See Some Videos </div>
      <div className="flex overflow-x-auto space-x-4">
        {videoUrls.map((url, index) => (
          <div
            key={index}
            className="relative w-56 h-96 flex-shrink-0 cursor-pointer"
            onClick={() => setSelectedVideo(url)}
          >
            <div className="w-full h-full">
              <iframe
                className="w-full h-full"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Reel Video ${index}`}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full md:w-1/2 md:h-3/4">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={selectedVideo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Selected Reel Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reels;

