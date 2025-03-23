// src/store/index.js
import { createStore } from "vuex";
import Cookies from "js-cookie";
import router from "@/router";
import { encodeJsonWithKey } from "@/utilities/encryption";
import { setUserPermissions } from "@/services/auth";
//STATE VALUES
const store = createStore({
  state: {
    user: { email: "", phone: "", name: "" },
    permissions: {},
    snackbarAlert: {},
    alert: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setPermissions(state, permissions) {
      state.permissions = permissions;
    },
    showSnackbar(state, snackbarAlert) {
      state.snackbarAlert = snackbarAlert;
    },
    showAlert(state, alert) {
      state.alert = alert;
    },
  },
  actions: {
    setUser({ commit }, user) {
      if (Object.keys(user).length > 0) {
        Cookies.set("token", user.token);
        Cookies.set("organizationId", user.organization_id);
        localStorage.setItem(
          "userData",
          encodeJsonWithKey(user, process.env.VUE_APP_USER_DATA_ENCRYPTION_KEY)
        ); //USED FOR PERSISTING THE USER DATA FOR THE SESSION
        commit("setUser", user);
        setUserPermissions();
      } else {
        // Remove cookies if the user object is empty
        Cookies.remove("token");
        Cookies.remove("organizationId");
        localStorage.setItem("userData", null);
        commit("setUser", {});
        commit("setPermissions", {});

        router.push({ name: "Login" });
      }
    },
    showSnackbar({ commit }, snackbarAlert) {
      commit("showSnackbar", snackbarAlert);
    },
    setPermissions({ commit }, permissions) {
      commit("setPermissions", permissions);
    },
    showAlert({ commit }, alert) {
      commit("showAlert", alert);
    },
  },
  getters: {
    currentUser: (state) => state.user,
    permissions: (state) => state.permissions,
    snackbar: (state) => state.snackbarAlert,
    alert: (state) => state.alert,
  },
});

export default store;
