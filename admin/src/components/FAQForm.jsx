import React, { useState, useEffect } from "react";

const FAQForm = ({ onSubmit, initialData, errors, setErrors }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!question.trim()) {
      newErrors.question = "Question is required";
    }

    if (!answer.trim()) {
      newErrors.answer = "Answer is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formData = { question, answer };
    if (initialData && initialData._id) {
      formData._id = initialData._id;
    }
    onSubmit(formData);
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label
          htmlFor="question"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={`shadow appearance-none border ${
            errors.question ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.question && (
          <p className="text-red-500 text-xs italic">{errors.question}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="answer"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Answer:
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`shadow appearance-none border ${
            errors.answer ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20`}
        />
        {errors.answer && (
          <p className="text-red-500 text-xs italic">{errors.answer}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default FAQForm;
