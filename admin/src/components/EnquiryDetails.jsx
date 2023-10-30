import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteContact,
  getContacts,
  updateContactStatus,
} from "../features/contact/contactSlice";
import { Button, Popconfirm, message } from "antd";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EnquiryDetails = ({ enquiry, onClose }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (status) => {
    dispatch(updateContactStatus({ contactId: enquiry._id, status }));
    setTimeout(() => {
      dispatch(getContacts());
    }, 100);
    onClose();
    message.success("Status updated successfully");
  };

  const handleDelete = () => {
    dispatch(deleteContact(enquiry._id));
    setTimeout(() => {
      dispatch(getContacts());
    }, 100);
    onClose();
    message.success("Enquiry deleted successfully");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full shadow-lg space-y-4">
        <div className="text-center">
          <span className="text-gray-900 font-bold text-xl mb-2">
            Enquiry Details
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <label className="text-gray-700 font-bold mr-2" htmlFor="name">
              Name:
            </label>
            <span className="text-gray-900" id="name">
              {enquiry.name}
            </span>
          </div>
          <div className="flex items-center">
            <label className="text-gray-700 font-bold mr-2" htmlFor="email">
              Email:
            </label>
            <span className="text-gray-600" id="email">
              {enquiry.email}
            </span>
          </div>
          <div className="flex items-center">
            <label className="text-gray-700 font-bold mr-2" htmlFor="mobile">
              Mobile:
            </label>
            <span className="text-gray-600" id="mobile">
              {enquiry.mobile}
            </span>
          </div>
          <div className="flex items-center">
            <label className="text-gray-700 font-bold mr-2" htmlFor="eventDate">
              Event Date:
            </label>
            <span className="text-gray-600" id="eventDate">
              {formatDate(enquiry.eventDate)}
            </span>
          </div>
          <div className="flex items-center">
            <label
              className="text-gray-700 font-bold mr-2"
              htmlFor="serviceType"
            >
              Service Type:
            </label>
            <span className="text-gray-600" id="serviceType">
              {enquiry.serviceType}
            </span>
          </div>
          <div className="flex items-center">
            <label
              className="text-gray-700 font-bold mr-2"
              htmlFor="totalPeoplePhoto"
            >
              Total People Photo:
            </label>
            <span className="text-gray-600" id="totalPeoplePhoto">
              {enquiry.totalPeoplePhoto}
            </span>
          </div>
          <div className="flex items-center">
            <label
              className="text-gray-700 font-bold mr-2"
              htmlFor="applicationAddress"
            >
              Application Address:
            </label>
            <span className="text-gray-600" id="applicationAddress">
              {enquiry.applicationAddress}
            </span>
          </div>
          <div className="flex items-center">
            <label
              className="text-gray-700 font-bold mr-2"
              htmlFor="addedQuestionsOrInfo"
            >
              Additional Questions/Info:
            </label>
            <span className="text-gray-600" id="addedQuestionsOrInfo">
              {enquiry.addedQuestionsOrInfo}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <label
            className="text-gray-700 font-bold mr-2"
            htmlFor="statusSelect"
          >
            Status:
          </label>
          <select
            id="statusSelect"
            value={enquiry.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-4"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="text-right">
          <button
            onClick={onClose}
            className="text-gray-700 font-bold p-6 text-lg"
          >
            Close
          </button>
          <Popconfirm
            title="Are you sure to delete this enquiry?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: {
                backgroundColor: "#1890ff",
                color: "#fff",
                borderColor: "#1890ff",
              },
            }}
          >
            <Button danger>Delete Enquiry</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetails;
