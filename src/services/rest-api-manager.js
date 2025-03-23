import { get, post, put, del, unknownError } from "./axios-manager";
import { restAPIEndPoints } from "@/resources/api-endpoints";
import store from "@/store";
export async function apiRequestHandler(
  endpointKey,
  requestParameter,
  queryParams = ""
) {
  try {
    // Fetch the endpoint configuration from restAPIEndPoints
    const endpointConfig = restAPIEndPoints[endpointKey];

    if (!endpointConfig) {
      throw new Error(`Endpoint ${endpointKey} does not exist`);
    }
    // Determine the HTTP method and make the appropriate API call
    const isPostMethod = endpointConfig.method === "POST";
    const isPutMethod = endpointConfig.method === "PUT";
    const isDeleteMethod = endpointConfig.method === "DELETE";
    const apiResponse = isPostMethod
      ? await post(endpointConfig, requestParameter, queryParams)
      : isPutMethod
      ? await put(endpointConfig, requestParameter, queryParams)
      : isDeleteMethod
      ? await del(endpointConfig, requestParameter)
      : await get(endpointConfig, requestParameter); //HERE REQUEST PARAMETER IS NOTHING BUT QUERY PARAMSs
    return apiResponse;
  } catch (apiError) {
    return unknownError();
  }
}

export function showFailureAlert(message) {
  store.dispatch("showSnackbar", {
    show: true,
    text: message,
    color: "error",
  });
}
