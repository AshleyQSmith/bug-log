<template>
  <div class="EditBug">
    <form>
      <div class="form-group">
        <label for>Title</label>
        <input type="text" class="form-control" placeholder="Edit bug title..." v-model="bug.title" />
      </div>
      <div class="form-group">
        <label for>Description</label>
        <input
          class="form-control"
          type="text"
          placeholder="Edit description..."
          v-model="bug.description"
        />
      </div>
      <button
        type="submit"
        data-dismiss="modal"
        class="btn btn-sm btn-primary"
        @click="editBug()"
      >Submit Changes</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "EditBug",
  data() {
    return {};
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    }
  },
  methods: {
    editBug() {
      this.$store.dispatch("editBug", this.bug);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>