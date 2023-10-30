import React from "react";
import { Button, Popconfirm } from "antd";

const ServiceCard = ({ service, editService, deleteServiceAction }) => (
  <div className="bg-white p-4 mb-4 rounded shadow">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-bold">{service.name}</h2>
      <div>
        <Button onClick={() => editService(service)}>Edit</Button>
        <Popconfirm
          title="Are you sure to delete this service?"
          onConfirm={() => deleteServiceAction(service._id)}
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
      </div>
    </div>
    <p>Description: {service.description}</p>
    <p>
      Image:
      <img
        src={service.imageUrl}
        alt={service.name}
        className="w-full h-auto"
      />
    </p>
    <p>Price: {service.price}</p>
    <p>Duration: {service.duration}</p>
    <p>Disclaimer: {service.disclaimer}</p>
  </div>
);

export default ServiceCard;
