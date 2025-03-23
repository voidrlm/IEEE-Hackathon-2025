// axios-manager.js
import axios from "axios";
import Cookies from "js-cookie";

// Base Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

function constructUrl(apiConfig, queryParams) {
  var url;
  if (queryParams == "") {
    url = apiConfig.url;
  } else if (typeof queryParams === "object") {
    url = apiConfig.url;
    for (const [key, value] of Object.entries(queryParams)) {
      url = url.replace(new RegExp(`{${key}}`, "g"), value);
    }
  } else {
    url = apiConfig.url.replace(/{id}/g, queryParams);
  }
  return url;
}
// POST method
export const post = async (
  apiConfig,
  requestParameter = {},
  queryParams = ""
) => {
  try {
    // Prepare the headers
    const headers = {};
    // Check if authentication is required
    if (!apiConfig.isPublic) {
      const authToken = Cookies.get("token");
      const organizationId = Cookies.get("organizationId");
      headers.Authorization = `token ${authToken}`; // Set Authorization header
      headers["X-OrganizationId"] = organizationId; // Set X-OrganizationId header
    }
    var url = constructUrl(apiConfig, queryParams);
    const response = await axiosInstance.post(url, requestParameter, {
      headers: headers,
    });
    return {
      success: true,
      status: "success",
      data: response.data.result || response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: "error",
      errorMessage: error,
    };
  }
};

// GET method
export const get = async (apiConfig, queryParams = {}) => {
  try {
    // Prepare the headers
    const headers = {};
    // Check if authentication is required
    if (!apiConfig.isPublic) {
      const authToken = Cookies.get("token");
      const organizationId = Cookies.get("organizationId");
      headers.Authorization = `token ${authToken}`; // Set Authorization header
      headers["X-OrganizationId"] = organizationId; // Set X-OrganizationId header
    }
    var url = constructUrl(apiConfig, queryParams);
    const response = await axiosInstance.get(url, {
      headers: headers,
    });
    return {
      success: true,
      status: "success",
      data: response.data.result || response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: "error",
      errorMessage: error,
    };
  }
};
// PUT method
export const put = async (apiConfig, requestParameter = {}, queryParams) => {
  try {
    // Prepare the headers
    const headers = {};
    // Check if authentication is required
    if (!apiConfig.isPublic) {
      const authToken = Cookies.get("token");
      const organizationId = Cookies.get("organizationId");
      headers.Authorization = `token ${authToken}`; // Set Authorization header
      headers["X-OrganizationId"] = organizationId; // Set X-OrganizationId header
    }
    var url = constructUrl(apiConfig, queryParams);
    const response = await axiosInstance.put(url, requestParameter, {
      headers: headers,
    });
    return {
      success: true,
      status: "success",
      data: response.data.result || response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: "error",
      errorMessage: error,
    };
  }
};

// DELETE method
export const del = async (apiConfig, queryParams = {}) => {
  try {
    // Prepare the headers
    const headers = {};
    // Check if authentication is required
    if (!apiConfig.isPublic) {
      const authToken = Cookies.get("token");
      const organizationId = Cookies.get("organizationId");
      headers.Authorization = `token ${authToken}`; // Set Authorization header
      headers["X-OrganizationId"] = organizationId; // Set X-OrganizationId header
    }
    var url = constructUrl(apiConfig, queryParams);
    const response = await axiosInstance.delete(url, {
      headers: headers,
    });
    return {
      success: true,
      status: "success",
      data: response.data.result || response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: "error",
      errorMessage: error,
    };
  }
};
// Error handler for unknown errors
export const unknownError = () => ({
  success: false,
  status: "error",
  errorMessage: {
    message: "an unknown error occurred. please try again later.",
    result: "unknown error",
  },
});
