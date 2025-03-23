// Helper Method - stringFrom - used for parsing data to string
export function stringFrom(value, defaultValue = "") {
  if (typeof value === "string") return value;
  else if (typeof value === "number") return value.toString();
  else return defaultValue;
}

// Helper Method - intFrom - used for parsing data to int
export function intFrom(value, defaultValue = 0) {
  if (typeof value === "number") return Math.floor(value);
  else if (typeof value === "string") {
    const parsedValue = parseInt(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  } else return defaultValue;
}

// Helper Method - floatFrom - used for parsing data to double
export function floatFrom(value, defaultValue = 0.0) {
  //Float
  if (typeof value === "number") return value;
  else if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  } else return defaultValue;
}

// Helper Method - arrayFrom - used for parsing data to array
export function arrayFrom(data) {
  if (data === null) return [];
  else if (Array.isArray(data)) return data;
  else return [];
}

// Helper Method - objectFrom - used for parsing data to object
export function objectFrom(data) {
  if (data === null) return {};
  else if (typeof data === "object") return data;
  else return {};
}
// Helper Method - boolFrom - used for parsing data to boolean
export function boolFrom(value) {
  if (typeof value === "boolean") return value;
  else if (typeof value === "number") return value === 1;
  else if (typeof value === "string")
    return value.toLowerCase() === "true" || value === "1";
  return false;
}

// Helper Method - isKeyPresent - used for checking if the object has a key
export function isKeyPresent(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
