import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  updateContactStatus,
} from "../features/contact/contactSlice";
import EnquiryDetails from "../components/EnquiryDetails";
import ReactPaginate from "react-paginate";
import { Spin, message } from "antd";

const EnquiriesPage = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading, isError } = useSelector(
    (state) => state.contact
  );
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const enquiriesPerPage = 5;
  const pagesVisited = pageNumber * enquiriesPerPage;

  const pageCount = Math.ceil(contacts.length / enquiriesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleStatusChange = (contactId, status) => {
    dispatch(updateContactStatus({ contactId, status }));
    setTimeout(() => {
      dispatch(getContacts());
    }, 100);
    message.success("Status updated successfully");
  };

  const handleEnquiryClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      )}
      {isError && <div>Error loading contacts</div>}
      <ul className="divide-y divide-gray-200">
        {contacts
          .slice(pagesVisited, pagesVisited + enquiriesPerPage)
          .map((contact) => (
            <li key={contact._id} className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div
                  className="flex flex-col cursor-pointer"
                  onClick={() => handleEnquiryClick(contact)}
                >
                  <span className="text-gray-900 font-bold">
                    {contact.name}
                  </span>
                  <span className="text-gray-600">{contact.email}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <select
                    value={contact.status}
                    onChange={(e) =>
                      handleStatusChange(contact._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={
          "paginationButtons flex justify-center items-center border-t border-gray-200 mt-4 pt-4"
        }
        pageLinkClassName={
          "px-3 py-2 border rounded border-gray-300 mx-1 hover:bg-gray-200 transition duration-150 ease-in-out"
        }
        previousLinkClassName={
          "previousButton px-3 py-2 border rounded border-gray-300 mr-2 hover:bg-gray-200 transition duration-150 ease-in-out"
        }
        nextLinkClassName={
          "nextButton px-3 py-2 border rounded border-gray-300 ml-2 hover:bg-gray-200 transition duration-150 ease-in-out"
        }
        disabledClassName={"paginationDisabled opacity-50 cursor-not-allowed"}
        breakClassName={"px-3 py-2 mx-1"}
      />

      {selectedEnquiry && (
        <EnquiryDetails
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
        />
      )}
    </div>
  );
};

export default EnquiriesPage;
