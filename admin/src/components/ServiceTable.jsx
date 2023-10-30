import React from "react";
import { Table, Button, Popconfirm } from "antd";

const ServiceTable = ({ services, editService, deleteServiceAction }) => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Image", dataIndex: "imageUrl", key: "imageUrl" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Disclaimer", dataIndex: "disclaimer", key: "disclaimer" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => editService(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this service?"
            onConfirm={() => deleteServiceAction(record._id)}
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
            <Button danger>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={services} rowKey="_id" />;
};

export default ServiceTable;
