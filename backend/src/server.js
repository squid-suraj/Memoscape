import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from './routes/auth.js';
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Global Middleware
// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: "http://localhost:5173",
//     })
//   );
// }

app.use(express.json());
app.use(rateLimiter);

// Define Routes
app.use("/api/notes", notesRoutes);
app.use('/api/auth', authRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

app.get("/", (req, res) => res.send("API Running"));

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  });
});