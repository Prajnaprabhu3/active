import { Request, Response, NextFunction, RequestHandler } from "express";

//import model
import Note from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getAllNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw Error("hello");
    const notes = await Note.find().exec();
    res.send(notes).status(200);
  } catch (error) {
    next(error);
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

interface Note {
  title?: string;
  details?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  Note,
  unknown
> = async (req, res, next) => {
  const { title, details } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, "Title needed");
    }
    const note = await Note.create({
      title,
      details,
    });

    res.json(note).status(200);
  } catch (error) {
    next(error);
  }
};
