import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../features/service/serviceSlice";
import Layout from "../components/Layout";
import { Title } from "../components/Intro";
import { Result, Spin } from "antd";

const Services = () => {
  const dispatch = useDispatch();
  const { services, isLoading, isError } = useSelector(
    (state) => state.service
  );
  const bookingUrl = process.env.REACT_APP_BOOKING_URL;

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Title title="Services" />
        {isLoading && (
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center min-h-screen">
            <Result status="401" subTitle="Error loading services." />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex flex-col p-4 border-b border-white md:flex-row"
            >
              <div className="w-full md:w-1/3">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="object-cover rounded-l h-[400px] w-full md:object-contain md:mt-0 mt-32"
                />
              </div>
              <div className="w-full p-4 ml-4 flex flex-col justify-between space-y-4 md:w-2/3">
                <div>
                  <h2 className="text-xl font-bold mt-2 text-white text-center">
                    {service.name}
                  </h2>
                  <p className="text-white mt-8">{service.description}</p>
                  <div className="mt-8 flex justify-between">
                    <span className="text-lg font-bold text-white">
                      Price: ${service.price}
                    </span>
                    <span className="text-gray-500">
                      Duration: {service.duration} mins
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-12">
                    {service.disclaimer}
                  </p>
                </div>
                <div className="flex justify-end">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-zinc-700 text-zinc-400 px-8 py-2 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105">
                      Book Now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
