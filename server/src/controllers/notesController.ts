import e, { RequestHandler } from "express";

//import model
import Note from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getAllNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw createHttpError(401);
    const notes = await Note.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
    alert(error);
  }
};

export const getSingleNote: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await Note.findById(req.params.id).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface NoteBody {
  title?: string;
  detail?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  const { title, detail } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, "Title needed");
    }
    const note = await Note.create({
      title,
      detail,
    });

    res.json(note).status(200);
  } catch (error) {
    next(error);
  }
};

interface NoteUpdateParams {
  id: string;
}

export const updateNote: RequestHandler<
  NoteUpdateParams,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newDetail = req.body.detail;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Title needed");
    }

    const note = await Note.findById(id).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = newTitle;
    note.detail = newDetail;

    const updatedNote = await note.save();

    res.json(updatedNote).status(200);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    await note.deleteOne();

    res
      .json({
        sucess: true,
        message: "Product delete successfuly",
      })
      .sendStatus(204);
  } catch (error) {
    next(error);
  }
};
