import express from "express";
import auth from '../middleware/auth.js'; 
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.route('/').get(auth, getAllNotes).post(auth, createNote);
router.route('/:id').get(auth, getNoteById).put(auth, updateNote).delete(auth, deleteNote);

export default router;