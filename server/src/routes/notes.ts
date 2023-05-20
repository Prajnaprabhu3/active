import express from "express";
const router = express.Router();

//importing controller functions
import * as NotesController from "../controllers/notesController";

router.route("/").get(NotesController.getAllNotes);
router.route("/").post(NotesController.createNote);
router.route("/:id").get(NotesController.getSingleNote);
router.route("/:id").patch(NotesController.updateNote);
router.route("/:id").delete(NotesController.deleteNote);

export default router;
