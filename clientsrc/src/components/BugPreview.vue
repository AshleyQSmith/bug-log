<template>
  <div class="bug-preview col-sm-4">
    <div class="card my-3">
      <h3 class="text-wrap p-2">{{bugData.title}}</h3>
      <h6 class="text-muted text-wrap p-2">{{bugData.description}}</h6>
      <div class="text-center m-2">
        <button class="btn btn-sm btn-outline-primary" @click="openBug()">Open</button>
        <button class="btn btn-sm btn-outline-danger" @click="deleteBug()">Delete</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "bug-preview",
  props: ["bugData"],

  data() {
    return {};
  },
  computed: {
    bugs() {
      return this.$store.bugs;
    },
    user() {
      return this.$store.user;
    }
  },
  methods: {
    deleteBug() {
      this.$store.dispatch("deleteBug", this.bugData.id);
    },
    openBug() {
      this.$store.commit("setActiveBug", {});
      this.$router.push({
        name: "Bug",
        params: { bugId: this.bugData.id }
      });
    }
  },
  components: {}
};
</script>


<style scoped>
/* .card {
  background-color: white;
} */
</style>