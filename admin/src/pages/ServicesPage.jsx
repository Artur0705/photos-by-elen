import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Result, Spin } from "antd";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../features/service/serviceSlice";
import { uploadImage } from "../features/upload/uploadSlice";
import useMediaQuery from "../utils/useMediaQuery";
import ServiceCard from "../components/ServiceCard";
import ServiceTable from "../components/ServiceTable";
import ServiceModal from "../components/ServiceModal";
import { openNotification } from "../utils/notifications";

const ServicesPage = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dispatch = useDispatch();
  const { services, isLoading, isError } = useSelector(
    (state) => state.service
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (imageFile) {
          const formData = new FormData();
          formData.append("file", imageFile);
          dispatch(uploadImage(formData)).then((uploadResponse) => {
            if (uploadResponse.payload && uploadResponse.payload.imageUrl) {
              const serviceData = {
                ...values,
                imageUrl: uploadResponse.payload.imageUrl,
              };
              saveService(serviceData);
            } else {
              console.log("Image upload failed");
            }
          });
        } else {
          const serviceData = {
            ...values,
            imageUrl: editingService ? editingService.imageUrl : null,
          };
          saveService(serviceData);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const saveService = (serviceData) => {
    if (editingService) {
      dispatch(
        updateService({
          serviceId: editingService._id,
          serviceData,
        })
      ).then(() => {
        dispatch(getServices());
        openNotification("success", "Service updated successfully!");
      });
    } else {
      dispatch(createService(serviceData)).then(() => {
        dispatch(getServices());
        openNotification("success", "Service created successfully!");
      });
    }
    setIsModalVisible(false);
    form.setFieldsValue({ imageUrl: serviceData.imageUrl });
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const editService = (service) => {
    form.setFieldsValue(service);
    setImageFile(null);
    setEditingService(service);
    setIsModalVisible(true);
  };

  const deleteServiceAction = (serviceId) => {
    dispatch(deleteService(serviceId)).then(() => {
      dispatch(getServices());
      openNotification("success", "Service deleted successfully!");
    });
  };

  return (
    <div className="services-page p-4 md:p-8">
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center min-h-screen">
          <Result
            status="401"
            subTitle="An error occurred. Please try again."
          />
        </div>
      )}

      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#1890ff",
          color: "#fff",
          borderColor: "#1890ff",
          margin: "40px",
        }}
      >
        Add New Service
      </Button>
      <ServiceModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        setImageFile={setImageFile}
      />
      {isDesktop ? (
        <ServiceTable
          services={services}
          editService={editService}
          deleteServiceAction={deleteServiceAction}
        />
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            editService={editService}
            deleteServiceAction={deleteServiceAction}
          />
        ))
      )}
    </div>
  );
};

export default ServicesPage;
