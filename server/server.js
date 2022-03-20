require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// Swagger API Doc
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Server API",
      description: "Server API Information",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

app.use(cors());

// API Documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const doctorsRouter = require("./routes/doctor");
const patientsRouter = require("./routes/patient");
const aadhaarRouter = require("./routes/aadhaar");
const prescriptionsRouter = require("./routes/prescription");
const retailerRouter = require("./routes/retailer");
const purchaseRouter = require("./routes/purchase");
const drugRouter = require("./routes/drug");
const itemRouter = require("./routes/item");
const otpRouter = require("./routes/otp");

app.use("/api/doctor", doctorsRouter);
app.use("/api/patient", patientsRouter);
app.use("/api/prescription", prescriptionsRouter);
app.use("/api/aadhaar", aadhaarRouter);
app.use("/api/retailer", retailerRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/drug", drugRouter);
app.use("/api/item", itemRouter);
app.use("/api/otp", otpRouter);
// UI
app.get("/", (req, res) => {
  res.send("HackOverflow API");
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started ...."));
