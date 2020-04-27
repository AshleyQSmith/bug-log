import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 15000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    // user: {},
    bugs: [],
    activeBug: {},
    profile: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit, dispatch }) {
      try {
        let res = await api.get("bugs");
        commit("setBugs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugById({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId);
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addBug({ commit, dispatch }, bugData) {
      try {
        await api.post("bugs", bugData);
        dispatch("getBugById", bugData.id);
        // need to change pages on create, code below doesn't work yet
        // commit("setActiveBug", bugData);
        // router.push({
        //   name: "Bug",
        //   params: { bugId: bugData.id },
        // });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBug({ commit, dispatch }, bugId) {
      // shouldn't delete permanently? maybe needs changed to soft-delete
      try {
        await api.delete("bugs/" + bugId);
        this.dispatch("getBugs");
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ commit, dispatch }, bugData) {
      try {
        await api.put("bugs/" + bugData.id, bugData);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
