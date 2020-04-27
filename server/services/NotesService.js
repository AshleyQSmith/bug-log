import { dbContext } from "../db/DbContext";

class NoteService {
  async getNotesByBugId(bugId) {
    let notes = await dbContext.Notes.findById({ bugId: bugId.id });
    return notes;
  }
  async createNote(rawData) {
    let data = await dbContext.Notes.create(rawData);
    return data;
  }
}
export const notesService = new NoteService();
