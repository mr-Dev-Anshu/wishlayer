import Image from 'next/image';
import React from 'react';

const UploadCake = () => {
  return (
    <div className="h-8 w-[400px]">
      <Image
        src={'https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/uploads%2F663970fb4a5cf165220264f914b61d1a.png?alt=media&token=7bb8cdc0-e548-4fee-90b3-5b40d650beea'}
        alt="Cake Image"
       
        width={200}
        height={60}
        className="w-full object-cover"
      />
    </div>
  );
};

export default UploadCake;
