import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";
import { getServices } from "../features/service/serviceSlice";
import { Spin, notification } from "antd";
import Select from "react-select";
import Layout from "../components/Layout";
import { Title } from "../components/Intro";
import { unwrapResult } from "@reduxjs/toolkit";

const Contact = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { isError, message, isLoading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    eventDate: "",
    serviceType: "",
    totalPeoplePhoto: "",
    applicationAddress: "Elen's Studio in Clyde North",
    addedQuestionsOrInfo: "",
  });

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      serviceType: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createQuery(formData));
      unwrapResult(resultAction);
      notification.success({
        message: "Submission Successful",
        description:
          "Thank you for your enquiry. We'll get back to you shortly.",
      });
      setFormData({
        name: "",
        mobile: "",
        email: "",
        eventDate: "",
        serviceType: "",
        totalPeoplePhoto: "",
        applicationAddress: "",
        addedQuestionsOrInfo: "",
      });
    } catch (error) {
      notification.error({
        message: "Submission Failed",
        description: error.message,
      });
    }
  };
  return (
    <Layout>
      <div className="px-4 py-8 bg-transparent">
        <div className="max-w-2xl mx-auto text-zinc-500">
          <Title title="Contact Me" />
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-opacity-50 bg-white p-6 rounded shadow-lg mt-6"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
              required
            />
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Mobile"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
              required
            />
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              placeholder="Event Date"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
              required
            />
            <Select
              name="serviceType"
              onChange={handleSelectChange}
              options={services
                .map((service) => ({
                  label: service.name,
                  value: service.name,
                }))
                .concat({ label: "Other", value: "Other" })}
              required
            />
            <input
              type="number"
              name="totalPeoplePhoto"
              value={formData.totalPeoplePhoto}
              onChange={handleInputChange}
              placeholder="Total People for Photo"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
              required
            />
            <input
              type="text"
              name="applicationAddress"
              value={formData.applicationAddress}
              onChange={handleInputChange}
              placeholder="Application Address"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
              disabled
            />
            <textarea
              name="addedQuestionsOrInfo"
              value={formData.addedQuestionsOrInfo}
              onChange={handleInputChange}
              placeholder="Additional Questions or Info"
              className="w-full p-2 border border-gray-300 rounded bg-zinc-300"
            ></textarea>
            {isLoading && (
              <div className="flex justify-center items-center mt-4">
                <Spin size="large" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-zinc-700 text-zinc-400 px-8 py-2 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105"
            >
              Submit
            </button>
          </form>
          {isError && <div className="text-red-500 mt-4">{message}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
