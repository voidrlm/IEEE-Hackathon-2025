import store from "@/store";
import { decodeJsonWithKey } from "@/utilities/encryption";
import Cookies from "js-cookie";
export function logout(operation = "") {
  store.dispatch("setUser", {});
  store.dispatch("showSnackbar", {
    show: true,
    text:
      operation == "error"
        ? "Something went wrong, and we had to log you out. Please try signing in again."
        : "You have successfully logged out.",
    color: operation == "error" ? "error" : "success",
  });
}

export function setCurrentUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    const userData = localStorage.getItem("userData");
    store.dispatch(
      "setUser",
      userData
        ? decodeJsonWithKey(
            userData,
            process.env.VUE_APP_USER_DATA_ENCRYPTION_KEY
          )
        : {}
    );
    setUserPermissions();
  }
}

export function setUserPermissions() {
  var permissions = {};
  permissions["isStaff"] = store.getters.currentUser.is_staff;
  permissions["isAdmin"] = store.getters.currentUser.is_admin;

  var grantedPermissions = [];
  if (
    store.getters.currentUser.is_superuser ||
    store.getters.currentUser.is_admin
  ) {
    grantedPermissions.push("allowFullAccess");
  } else {
    const permissionMapping = {
      viewSamplePage: "customer.view_samplepage",
    };
    const userPermissions = store.getters.currentUser.permissions || [];
    grantedPermissions = Object.keys(permissionMapping).filter((key) =>
      userPermissions.includes(permissionMapping[key])
    );
  }
  permissions["roles"] = grantedPermissions;

  store.dispatch("setPermissions", permissions);
}
