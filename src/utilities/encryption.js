// Function to convert JSON object to encoded string
export function encodeJsonWithKey(jsonObj, key) {
  if (key.length !== 10) {
    throw new Error("Key must be exactly 10 characters long.");
  }
  const jsonString = JSON.stringify(jsonObj);
  let encodedString = "";

  for (let i = 0; i < jsonString.length; i++) {
    const charCode = jsonString.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    encodedString += String.fromCharCode(charCode ^ keyCharCode);
  }

  return btoa(unescape(encodeURIComponent(encodedString)));
}

// Function to decode the encoded string back to JSON
export function decodeJsonWithKey(encodedString, key) {
  if (key.length !== 10) {
    throw new Error("Key must be exactly 10 characters long.");
  }

  const decodedBase64 = decodeURIComponent(escape(atob(encodedString)));
  let decodedString = "";

  for (let i = 0; i < decodedBase64.length; i++) {
    const charCode = decodedBase64.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    decodedString += String.fromCharCode(charCode ^ keyCharCode);
  }

  return JSON.parse(decodedString);
}
