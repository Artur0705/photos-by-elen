import React, { useEffect, useState } from "react";
import { getAdminInfo } from "../utils/getAdminInfo";
import { Card, Statistic } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import moment from "moment";

const DashboardPage = () => {
  const adminInfo = getAdminInfo();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Melbourne&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const images = [
    "https://images.pexels.com/photos/106011/pexels-photo-106011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3804415/pexels-photo-3804415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2858669/pexels-photo-2858669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/730616/pexels-photo-730616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        dynamicHeight={true}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-screen relative">
            <img
              src={image}
              alt="Slide"
              className="w-full h-full md:object-contain object-cover"
            />
          </div>
        ))}
      </Carousel>{" "}
      <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between bg-gradient-to-b from-transparent to-black">
        <div className="flex justify-between">
          <Card className="bg-transparent border-0 text-white">
            <Statistic
              title="Current Time"
              value={time}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
          <Card className="bg-transparent border-0 text-white">
            <Statistic
              title="Today's Date"
              value={moment().format("MMMM Do YYYY")}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </div>
        <div className="flex justify-between">
          <Card className="bg-transparent border-0 text-white">
            <h2 className="text-lg font-bold mb-2 text-zinc-500">
              Admin Information
            </h2>
            {adminInfo ? (
              <>
                <p className="text-sm text-zinc-500">
                  Username: {adminInfo.username}
                </p>
              </>
            ) : (
              <p>No admin information available.</p>
            )}
          </Card>
          <Card className="bg-transparent border-0 text-white">
            <h2 className="text-lg font-bold mb-2 text-zinc-500">Weather</h2>
            {weather ? (
              <>
                <p className="text-sm text-zinc-500">
                  Temp: {Math.round(weather.main.temp - 273.15)}°C
                </p>
                <p className="text-sm text-zinc-500">
                  Weather: {weather.weather[0].description}
                </p>
              </>
            ) : (
              <p>Loading weather information...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
