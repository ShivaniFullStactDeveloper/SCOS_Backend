import express from "express";
import cors from "cors";
import routeManager from "./route_manager/index.js";
import {errorHandler} from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
// Serve static files (like images) from the "public/images" directory
app.use("/images", express.static("src/public/images"));

// routes
app.use("/api", routeManager);

// error handler (always last)
app.use(errorHandler);

export default app;


