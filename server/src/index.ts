import express, { type Request, type Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import slotsRoutes from './routes/slots.js';
import usersRoutes from './routes/users.js';
import requestRoutes from "./routes/req.js";
import staffRouter from "./routes/staff.js";
import path from 'path';
import { fileURLToPath } from 'url';
import pollsRouter from "./routes/polls.js";

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors()); // allow cross-origin requests from the React dev server
app.use(express.json()); // parse incoming JSON request bodies
app.use(express.static(path.join(__dirname, '../../client/dist'))); // serve the built React app

// authentication routes (register, login)
app.use("/api/auth", authRoutes);

// office hours slot management routes (create, activate, delete, book, cancel)
app.use("/api/oh", slotsRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/polls", pollsRouter);
app.use("/api/requests", requestRoutes);
app.use("/api/staff", staffRouter);

// catch-all (serve React's index.html for any non-API route)
app.get('/{*path}', (_req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});




// start server on port `PORT`
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

