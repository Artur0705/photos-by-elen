import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFAQS } from "../features/faq/faqSlice";
import Layout from "../components/Layout";
import { Title } from "../components/Intro";
import { Link } from "react-router-dom";
import { Result, Spin } from "antd";

const FAQ = () => {
  const dispatch = useDispatch();
  const { faqs, isLoading, isError } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(getFAQS());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Result status="401" subTitle="Error loading FAQs." />
      </div>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-8 bg-transparent">
        <div className="max-w-2xl mx-auto text-zinc-500">
          <Title title="FAQs" />
          <p className="text-sm text-center mb-8">Frequently Asked Questions</p>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-opacity-50 bg-white p-6 rounded shadow-lg transform transition-transform duration-300 hover:scale-105" // Updated this line
              >
                <h3 className="text-xl font-semibold mb-2 text-center text-zinc-200">
                  {faq.question}
                </h3>
                <p className="text-center text-zinc-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg mb-4 text-zinc-400">
              Didn't find the answer to your questions? No worries!
            </p>
            <p className="mb-6 text-zinc-500">
              I'm here to assist you. Click the button below to get in touch,
              and I'd be happy to provide the information you need.
            </p>
            <Link to="/contact">
              <button className="bg-zinc-700 text-zinc-400 px-8 py-2 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
