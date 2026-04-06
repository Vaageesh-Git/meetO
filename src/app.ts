import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

// Main base routing mapping
app.use("/api", routes);

export { app };