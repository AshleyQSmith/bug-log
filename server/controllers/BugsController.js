import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .get("", this.getAllBugs)
      .get("/:id", this.getBugById)
      .get("/:id/notes", this.getNotesByBugId)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.createBug)
      .put("/:id", this.editBug)
      .put("/:id", this.closeBug);
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.createBug(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllBugs(req, res, next) {
    try {
      let data = await bugsService.getAllBugs();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getBugById(req, res, next) {
    try {
      let data = await bugsService.getBugById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getNotesByBugId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async editBug(req, res, next) {
    try {
      let data = await bugsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async closeBug(req, res, next) {
    try {
      let data = await bugsService.close(req.params.id, req.userInfo.email);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
