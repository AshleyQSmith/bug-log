<template>
  <!-- <div class="bugPreview col-sm-4">
    <div class="card my-3">
      <h3 class="text-wrap p-2">{{bugData.title}}</h3>
      <h6 class="text-muted text-wrap p-2">{{bugData.description}}</h6>
      <div class="text-center m-2">
        <button class="btn btn-sm btn-outline-primary" @click="openBug()">Open</button>
        <button class="btn btn-sm btn-outline-danger" @click="deleteBug()">Delete</button>
      </div>
    </div>
  </div>-->

  <div class="bugPreview">
    <tr @click="openBug()">
      <th scope="row">{{bugData.title}}</th>
      <td>{{bugData.creatorEmail}}</td>
      <td>
        <div v-if="bugData.closed == false" class="green-text">Open</div>
        <div v-else class="red-text">Closed</div>
      </td>
      <td>{{bugData.updatedAt}}</td>
    </tr>
  </div>
</template>


<script>
export default {
  name: "bugPreview",
  props: ["bugData"],

  data() {
    return {};
  },
  computed: {
    bugs() {
      return this.$store.bugs;
    },
    profile() {
      return this.$auth.user;
    }
  },
  methods: {
    openBug() {
      this.$store.commit("setActiveBug", this.bugData);
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
.green-text {
  color: chartreuse;
}
.red-text {
  color: crimson;
}
</style>