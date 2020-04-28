<template>
  <div class="Note">
    <tr>
      <th scope="row">{{noteData.creatorEmail}}test</th>
      <td>{{noteData.content}}test</td>
      <td>
        <button class="btn btn-danger" @click="deleteNote()">Delete</button>
      </td>
    </tr>
  </div>
</template>


<script>
export default {
  name: "Note",
  props: ["noteData"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getNotesByBugId", this.noteData.id);
  },
  computed: {
    note() {
      return this.$store.state.activeNotes.noteId;
    },
    bug() {
      return this.$store.state.activeBug;
    }
  },
  methods: {
    deleteNote() {
      if (confirm("Are You Sure?")) {
        this.$store.dispatch("deleteNote", this.noteData.id);
      } else {
        console.log("Delete Canceled");
      }
    }
  },
  components: {}
};
</script>


<style scoped>
</style>