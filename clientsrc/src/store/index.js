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
    activeNotes: [],
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
    setActiveNotes(state, notes) {
      state.activeNotes = notes;
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
        let res = await api.post("bugs/", bugData);
        dispatch("getBugPage", res.data.id);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugPage({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId);
        commit("setActiveBug", res.data);
        router.push("bugs/" + bugId);
      } catch (error) {
        console.error(error);
      }
    },
    async closeBug({ commit, dispatch }, bug) {
      try {
        debugger;
        await api.put("bugs/" + bug.id, { closed: bug.closed });
        dispatch("getBugById", bug.id);
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
    async addNote({ commit, dispatch }, noteData) {
      try {
        console.log(noteData);
        let res = await api.post("notes/", noteData);
        dispatch("getNotesByBugId", noteData.bugId);
      } catch (error) {
        console.error(error);
      }
    },
    async getNotesByBugId({ commit, dispatch }, bugId) {
      try {
        debugger;
        let res = await api.get("bugs/" + bugId + "/notes");
        commit("setActiveNotes", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
