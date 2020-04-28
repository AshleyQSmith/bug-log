import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugService {
  async createBug(rawData) {
    let data = await dbContext.Bugs.create(rawData);
    return data;
  }
  async getAllBugs(userEmail) {
    return await dbContext.Bugs.find({ creatorEmail: userEmail }).populate(
      "creator",
      "name picture"
    );
  }
  async getBugById(id, userEmail) {
    let data = await dbContext.Bugs.findOne({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you did not create this bug");
    }
    return data;
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you did not create this bug");
    }
    return data;
  }
  async close(id, userEmail) {
    let data = await dbContext.Bugs.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      { closed: true },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you did not create this bug");
    }
    return data;
  }
}
export const bugsService = new BugService();