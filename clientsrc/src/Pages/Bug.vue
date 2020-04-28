<template>
  <!-- <div class="bug-details">
    <p>The details view provides some additional information about the bug, as well as showing all the notes made by other users. Here notes can be created or removed.</p>
  </div>-->

  <div class="Bug container-fluid bg-style">
    <div class="row pt-4">
      <div class="col-12">
        <div class="d-flex align-items-center">
          <h1>{{bug.title}}</h1>

          <button
            class="btn btn-warning"
            @click="triggerEditBug()"
            data-toggle="modal"
            data-target="#editBugModal"
            v-if="!bug.closed"
          >
            Edit
            <!-- <i class="fas fa-pencil-alt text-warning"></i> -->
          </button>
        </div>
        <EditModal id="editBugModal" title="Edit your Bug Report">
          <EditBug></EditBug>
        </EditModal>
        <div class="row">
          <div class="col-6">
            <h6>Reported by:</h6>
            <h5>{{bug.creatorEmail}}</h5>
          </div>
          <div class="col-6">
            <h6>Status:</h6>
            <h5>
              <div v-if="bug.closed == false" class="green-text">Open</div>
              <div v-else class="red-text">Closed</div>
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-10 border mx-auto">
            <p>{{bug.description}}</p>
          </div>
        </div>
      </div>
      <button class="btn btn-danger ml-auto mr-5 mt-1" @click="closeBug()">
        Close Bug
        <!-- <i class="fas fa-trash-alt text-danger"></i> -->
      </button>
    </div>

    <div class="row mt-5">
      <div class="col-6">
        <h3>Bug Notes</h3>
      </div>
      <div class="col-6">
        <div class="col-10 mx-auto">
          <form action="submit">
            <div class="form-row">
              <div class="col-9">
                <input
                  type="text"
                  class="form-control add-note-form"
                  placeholder="Add a note..."
                  v-model="newNote.title"
                />
              </div>
              <div class="col-3">
                <button
                  type="submit"
                  @submit.prevent="addNote()"
                  class="btn btn-primary add-note-form"
                >
                  <!-- <i class="fas fa-plus text-white pb-2"></i> -->
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-9 mx-auto">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Message</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <Note v-for="note in notes" :noteData="note" :key="note.id" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import Note from "../components/Note.vue";
import EditModal from "../components/EditModal.vue";
import EditBug from "../components/EditBug.vue";
export default {
  name: "Bug",
  data() {
    return {
      newNote: {}
    };
  },
  computed: {
    profile() {
      return this.$auth.user;
    },
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.activeNotes;
    }
  },
  mounted() {
    debugger;
    this.$store.dispatch("getBugById", this.$route.params.bugId);
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
  },
  methods: {
    triggerEditBug() {
      this.$store.commit("setActiveBug", this.bug);
    },
    addNote() {
      this.newNote.bugId = this.bug.id;
      this.newNote.creatorEmail = this.bug.creatorEmail;
      this.$store.dispatch("addNote", this.newNote);
      this.newNote = {};
    },
    closeBug() {
      if (confirm("Are You Sure?")) {
        this.bug.closed = true;
        this.$store.dispatch("closeBug", this.bug);
      } else {
        console.log("Close Canceled");
      }
    }
  },
  props: ["bugId"],
  components: { EditModal, EditBug, Note }
};
</script>


<style scoped>
.green-text {
  color: chartreuse;
}
.red-text {
  color: crimson;
}
</style>