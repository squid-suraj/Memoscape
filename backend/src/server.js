import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Global Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// Define Routes
app.use("/api/notes", notesRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => res.send("API Running"));

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  });
});