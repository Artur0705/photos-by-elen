import React from "react";

const Intro = () => {
  return (
    <div className="flex h-[85vh] xl:h-[90vh]">
      <div className="flex flex-col w-full justify-center text-white">
        <Title title="Captured Moments" />
        <Subtitle subtitle="Every Snapshot Tells a Story" />
        <IntroParagraph />
      </div>
    </div>
  );
};

export const Title = ({ title }) => {
  return (
    <div className="flex w-full justify-center text-white tracking-widest sm:tracking-normal text-6xl pb-4 lg:py-4">
      <p className="text-center mt-10 text-zinc-300 ">{title}</p>
    </div>
  );
};

export const Subtitle = ({ subtitle }) => {
  return (
    <div className="flex w-full justify-center text-white tracking-wider sm:tracking-normal text-3xl pb-4 lg:py-4">
      <p className="text-center italic">{subtitle}</p>
    </div>
  );
};

export const IntroParagraph = () => {
  return (
    <div className="flex w-full justify-center px-6 text-lg lg:px-32">
      <p className="text-center">
        Welcome to a realm where each snapshot unveils a unique story, where
        every frame captures a fleeting moment in time. Our photography services
        are tailored to narrate your individual tale through captivating
        visuals. Explore the diverse range of photography styles we offer to
        find the one that speaks to your narrative. Your voyage towards
        immortalizing life’s precious moments begins here.
      </p>
    </div>
  );
};

export default Intro;
