import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { notesService } from "../services/NotesService";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.createNote);
  }

  async createNote(req, res, next) {
    try {
      // need to make sure 'body' has creatorEmail attached, otherwise need to pull in user data
      req.body.creatorEmail = req.userInfo.email;
      let data = await notesService.createNote(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getNotesByBugId(req.params.bugId);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
