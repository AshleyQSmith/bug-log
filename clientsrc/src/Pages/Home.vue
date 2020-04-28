<template>
  <div class="home text-center">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>Welcome to Your Bug Log</h1>
    <h3>Current Bugs</h3>

    <div class="bugs container-fluid bg-style">
      <div class="row">
        <div class="col-sm-8 mx-auto my-4">
          <form @submit.prevent="addBug()">
            <div class="form-row">
              <div class="col-md-5">
                <input
                  class="form-control form-control-sm m-1"
                  type="text"
                  maxlength="50"
                  placeholder="Bug title..."
                  v-model="newBug.title"
                  required
                />
              </div>
              <div class="col-md-5">
                <input
                  class="form-control form-control-sm m-1"
                  type="text"
                  maxlength="100"
                  placeholder="Description..."
                  v-model="newBug.description"
                />
              </div>
              <div class="col-md-2 ml-2 ml-md-0">
                <button class="btn btn-sm btn-primary mt-1" type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Reported By</th>
                <th scope="col">Status</th>
                <th scope="col">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <bugPreview v-for="bug in bugs" :bugData="bug" :key="bug.id"></bugPreview>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bugPreview from "../components/BugPreview.vue";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    profile() {
      return this.$auth.user;
    },
    bugs() {
      return this.$store.state.bugs;
    }
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = {
        title: "",
        description: ""
      };
    }
  },
  components: { bugPreview }
};
</script>

<style scoped>
/* .bg-style {
  background-color: beige;
} */
</style>