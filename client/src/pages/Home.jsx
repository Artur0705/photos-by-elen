import React from "react";
import Intro from "../components/Intro";
import Welcome from "../components/Welcome";
import EventsIntro from "../components/EventsIntro";
import Fashion from "../components/Fashion";
import Layout from "../components/Layout";
import ChristmasPhoto from "../components/ChristmasPhoto";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Layout>
        <Intro />
        <Welcome />
        <EventsIntro />
        <Fashion />
        <ChristmasPhoto />
        <div className="text-white text-center text-xl italic">
          <Link to="/services">
            <button className="btn text-center">More Services</button>
          </Link>
        </div>
      </Layout>
    </>
  );
}
