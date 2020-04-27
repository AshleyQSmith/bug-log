import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { bugsService } from "../services/BugsService";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.createBug)
      .get("", this.getAllBugs)
      .get("/:id", this.getBugById)
      .get("/:bugId/notes", this.getNotesByBugId)

      .put("/:id", this.editBug)
      // no true delete - just marking bug closed
      .delete("/:id", this.deleteBug);
  }

  async createBug(req, res, next) {
    try {
      // need to make sure 'body' has creatorEmail attached, otherwise need to pull in user data
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.createBug(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllBugs(req, res, next) {
    try {
      let data = await bugsService.getAllBugs(req.userInfo.email);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getBugById(req, res, next) {
    try {
      let data = await bugsService.getBugById(req.params.bugId);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getNotesByBugId(req, res, next) {}
  async editBug(req, res, next) {}
  // no true delete, just marking bug closed
  async deleteBug(req, res, next) {}
}
