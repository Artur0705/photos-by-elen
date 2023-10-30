const Contact = require("../models/contactModel");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(404).send(error.message);
  }
};

exports.createContact = async (req, res) => {
  const {
    name,
    mobile,
    email,
    eventDate,
    serviceType,
    totalPeoplePhoto,
    applicationAddress,
    addedQuestionsOrInfo,
  } = req.body;

  const contactDetails = {
    Name: name,
    Contact: mobile,
    Email: email,
    "Event Date": eventDate,
    "Type of Service": serviceType,
    "Number of People for Photo": totalPeoplePhoto,
    Address: applicationAddress,
    "Additional Questions": addedQuestionsOrInfo,
  };

  const htmlMessage = `
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 50px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 50px 40px;">
              <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">You have a new inquiry</h1>
              ${Object.keys(contactDetails)
                .map(
                  (label) => `
              <p style="margin-bottom: 10px; font-size: 16px; color: #666;">
                <strong style="color: #333;">${label}:</strong> ${contactDetails[label]}
              </p>
              `
                )
                .join("")}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

  const emailData = {
    from: email,
    to: process.env.ADMIN_USERNAME,
    subject: "Photos By Elen: Contact Form Enquiry",
    html: htmlMessage,
  };

  const confirmationHtml = `
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 50px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 50px 40px;">
              <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Thank you for contacting me!</h1>
              <p style="font-size: 16px; color: #666;">I have received your inquiry and will get back to you as soon as possible.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;
  const confirmationEmailData = {
    from: process.env.ADMIN_USERNAME,
    to: email,
    subject: "Thank You for Contacting Me",
    html: confirmationHtml,
  };

  try {
    await sendEmail(emailData);
    await sendEmail(confirmationEmailData);
    await Contact.create(req.body);
    res.send("Thank you, I will get back to you ASAP.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).send("Contact not found");
    }
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).send("Contact not found");
    }
    res.json(deletedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
