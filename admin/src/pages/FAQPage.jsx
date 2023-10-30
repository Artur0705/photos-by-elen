import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FAQForm from "../components/FAQForm";
import {
  createFAQ,
  deleteFAQ,
  getFAQS,
  updateFAQ,
} from "../features/faq/faqSlice";
import { Popconfirm, message, Pagination } from "antd";

const FAQPage = () => {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faq.faqs);
  const [editFAQ, setEditFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});

  const faqsPerPage = 2;

  useEffect(() => {
    dispatch(getFAQS());
  }, [dispatch]);

  const handleCreate = (faq) => {
    dispatch(createFAQ(faq));
    setTimeout(() => {
      dispatch(getFAQS());
    }, 100);

    message.success("FAQ Created Successfully!");
    setErrors({});
  };

  const handleUpdate = (faq) => {
    const { _id, ...faqData } = faq;
    if (!_id) {
      console.error("FAQ object does not have an _id property:", faq);
      return;
    }
    dispatch(updateFAQ({ faqId: _id, faqData }));
    setEditFAQ(null);
    setTimeout(() => {
      dispatch(getFAQS());
    }, 100);

    message.success("FAQ Updated Successfully!");
    setErrors({});
  };

  const handleDelete = (id) => {
    dispatch(deleteFAQ(id));
    setTimeout(() => {
      dispatch(getFAQS());
    }, 100);

    message.success("FAQ Deleted Successfully!");
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastFAQ = currentPage * faqsPerPage;
  const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage;
  const currentFAQs = faqs.slice(indexOfFirstFAQ, indexOfLastFAQ);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">FAQs</h2>
      <FAQForm
        onSubmit={editFAQ ? handleUpdate : handleCreate}
        initialData={editFAQ}
        errors={errors}
        setErrors={setErrors}
      />
      <div className="mt-4">
        {currentFAQs.map((faq) => (
          <div key={faq._id} className="mb-2 p-2 border rounded">
            <p className="font-bold">{faq.question}</p>
            <p>{faq.answer}</p>
            <button
              onClick={() => setEditFAQ(faq)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <Popconfirm
              title="Are you sure to delete this FAQ?"
              onConfirm={() => handleDelete(faq._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                className: "bg-red-600 text-white hover:bg-red-700",
              }}
            >
              <button className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </Popconfirm>
          </div>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={faqs.length}
        pageSize={faqsPerPage}
        onChange={handleChangePage}
        className="mt-4"
      />
    </div>
  );
};

export default FAQPage;
