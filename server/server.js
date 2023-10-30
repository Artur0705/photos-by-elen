const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const db = require("./config/connection.js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

const adminRoutes = require("./routes/adminRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const contactRoutes = require("./routes/contactRoutes");
const faqRoutes = require("./routes/faqRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const { notFound, errorHandler } = require("./middlewares/errorHandler.js");

app.use("/api/admin", adminRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/admin", express.static(path.join(__dirname, "../admin/build")));
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(notFound);
app.use(errorHandler);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on PORT:${PORT}`);
  });
});
