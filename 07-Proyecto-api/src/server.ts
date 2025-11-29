import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // <-- agrega esto
import subscriptionsRoutes from "./routes/subscriptions.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

// Middleware
app.use(cors());          // <-- permite conexiones desde cualquier frontend
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("SubTracker API");
});

app.use("/subscriptions", subscriptionsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SubTracker API escuchando en http://localhost:${PORT}`);
});
