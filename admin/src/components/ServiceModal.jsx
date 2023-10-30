import React from "react";
import { Modal, Form, Input } from "antd";

const ServiceModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  form,
  setImageFile,
}) => (
  <Modal
    title="Service"
    open={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    okButtonProps={{
      style: {
        backgroundColor: "#1890ff",
        color: "#fff",
        borderColor: "#1890ff",
      },
    }}
  >
    <Form form={form} layout="vertical">
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Service Name" />
      </Form.Item>
      <Form.Item name="description" rules={[{ required: true }]}>
        <Input placeholder="Description" />
      </Form.Item>
      <Form.Item name="imageUrl">
        <Input placeholder="Image URL" disabled />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Please input the price!" },
          {
            validator(_, value) {
              if (!value || isNaN(value)) {
                return Promise.reject(new Error("Price must be a number"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input placeholder="Price" type="number" />
      </Form.Item>
      <Form.Item
        name="duration"
        rules={[
          { required: true, message: "Please input the duration!" },
          {
            validator(_, value) {
              if (!value || isNaN(value)) {
                return Promise.reject(new Error("Duration must be a number"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input placeholder="Duration" type="number" />
      </Form.Item>
      <Form.Item name="disclaimer">
        <Input placeholder="Disclaimer" />
      </Form.Item>
      <Form.Item label="Image">
        <Input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      </Form.Item>
    </Form>
  </Modal>
);

export default ServiceModal;
