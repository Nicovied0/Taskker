const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./src/configs/mongo");
const routes = require("./src/routes/index.routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/", routes);

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:4200', 'https://taskker.vercel.app'];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

async function startServer() {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log("Successfully connected to MongoDB");
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
