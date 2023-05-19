import express from "express";
const router = express.Router();

//importing controller functions
import * as NotesController from "../controllers/notesController";

router.route("/").get(NotesController.getAllNotes);
router.route("/").post(NotesController.createNote);
router.route("/:id").get(NotesController.getSingleNote);

export default router;
