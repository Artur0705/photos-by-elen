import React from "react";

const Welcome = () => {
  return (
    <div className="h-screen w-full text-white">
      <div className="flex h-screen w-full absolute bg-zinc-200 opacity-80"></div>
      <div className="flex flex-col h-screen w-full justify-center items-center absolute z-40">
        <p className="text-center text-4xl tracking-widest uppercase">
          Welcome to My Lens
        </p>
        <p className="text-center text-xl italic mt-8">
          Every picture tells a story, let me help tell yours.
        </p>
        <p className="text-center text-md mt-4 px-6 leading-10">
          Greetings! I'm a passionate photographer based in Clyde North with a
          cozy, well-equipped studio ready to frame your cherished moments. My
          camera and I are here to capture a spectrum of occasions: newborn
          bliss, Christmas cheer, Valentine's warmth, Mother's Day love, and the
          simple yet profound beauty of everyday moments. <br />
          With each click, we weave the essence of the moment into a visual
          narrative that's as unique as you are. Discover the range of
          photography services tailored to suit your story, and let’s
          immortalize your moments together.
        </p>
      </div>
      <img
        src="https://scontent.fmel8-1.fna.fbcdn.net/v/t39.30808-6/307157663_461968762643750_280072976037077670_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Ptk6qXBry9QAX__1tnG&_nc_ht=scontent.fmel8-1.fna&oh=00_AfDkoccD9FTqVcjsNQPvJgJ0RUPVlfOEyeDlEmboZ4oxzg&oe=65446363"
        alt="welcome"
        className="h-screen w-full bg-center overflow-hidden	md:object-contain object-cover -z-999	opacity-40"
      />
    </div>
  );
};

export default Welcome;
