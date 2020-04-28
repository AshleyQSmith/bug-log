<template>
  <tr class="Note">
    <th scope="row">{{noteData.creatorEmail}}</th>
    <td>{{noteData.content}}</td>
    <td>
      <button class="btn btn-danger" @click="deleteNote()">Delete</button>
    </td>
  </tr>
</template>


<script>
export default {
  name: "Note",
  props: ["noteData"],
  data() {
    return {};
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