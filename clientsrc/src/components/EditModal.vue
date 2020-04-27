<template>
  <div class="editModal modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-light">{{title}}</h5>
          <button
            type="button"
            class="close"
            id="close-btn"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EditBug from "../components/EditBug.vue";
export default {
  name: "editModal",
  props: ["title"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: { EditBug }
};
</script>


<style scoped>
</style>