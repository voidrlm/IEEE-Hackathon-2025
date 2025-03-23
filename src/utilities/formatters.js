import {
  format,
  getUnixTime,
  add,
  parseISO,
  getTime,
  formatDistance,
  parse,
} from "date-fns";

export function getFileCategory(mimeType) {
  const categories = {
    image: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image",
    ],
    video: [
      "video/mp4",
      "video/mov",
      "video/mpeg",
      "video/ogg",
      "video/webm",
      "video/quicktime",
      "video",
    ],
    doc: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ],
    txt: ["text/plain"],
    dwg: ["application/acad"],
    audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
    pdf: ["application/pdf"],
    exe: ["application/octet-stream"],
    xls: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    ppt: [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  };

  for (const [category, types] of Object.entries(categories)) {
    if (types.includes(mimeType)) {
      return category;
    }
  }
  return "file";
}
export function getMonogramColor(name) {
  let hash = 0;
  if (name) {
    for (let i = 0; i < name.length; i++) {
      hash = (Math.imul(31, hash) + name.charCodeAt(i)) | 0;
    }
  }
  const h = hash % 360;
  return `hsl(${h}, 60%, 50%)`;
}
export function getMonoGramText(name) {
  if (typeof name != "string") return "--";
  try {
    if (name) {
      const nameParts = name.trim().split(" ");
      let monogram = "";
      if (nameParts.length > 0 && nameParts[0]) {
        monogram += nameParts[0].charAt(0).toUpperCase();
      }
      if (nameParts.length > 1 && nameParts[1]) {
        monogram += nameParts[1].charAt(0).toUpperCase();
      }
      return monogram || "--";
    } else return "--";
  } catch (error) {
    console.error(error);
    return "--";
  }
}
export function formatAmount(value) {
  try {
    // Convert the value to a number if it's a string
    const numberValue = typeof value === "string" ? Number(value) : value;

    // Check if the conversion was successful and format
    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString("en-IN");
    }
  } catch (err) {
    return "";
  }
}
export function stringSentenceCase(value) {
  try {
    if (!value) return "";
    value = value.replace(/\s+/g, " ");
    return value
      .toLowerCase()
      .trimEnd()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(" ");
  } catch (error) {
    console.error(error);
    return value;
  }
}

export function currentDateFormat(formatType = "") {
  try {
    const currentDate = new Date();
    return formatType
      ? format(currentDate, formatType)
      : getUnixTime(currentDate);
  } catch (error) {
    return new Date();
  }
}
export function getDateRange(dateArray) {
  try {
    // Check if input is an array and has dates
    if (!Array.isArray(dateArray) || dateArray.length === 0) {
      return "";
    }
    // Format the start and end dates
    const startDate = formatISODateTime(dateArray[0]);
    if (dateArray.length == 1) {
      return startDate;
    }
    const endDate = formatISODateTime(dateArray[dateArray.length - 1]);
    return `${startDate} - ${endDate}`;
  } catch (error) {
    return "";
  }
}

export function getRelativeTimeFromTimestamp(timestamp) {
  try {
    const now = Date.now();
    return formatDistance(new Date(timestamp), new Date(now), {
      addSuffix: true,
    });
  } catch (error) {
    return "";
  }
}
export function formatISODateTimeToTimeStamp(isoString) {
  try {
    const timestamp = getTime(parseISO(isoString));
    return timestamp;
  } catch (error) {
    return isoString;
  }
}
export function formatDateTime(value, outputFormat) {
  try {
    const date = new Date(value);
    return format(date, outputFormat);
  } catch (error) {
    return value;
  }
}
export function formatISODateTime(isoDateStr, output = "date") {
  try {
    const date = new Date(isoDateStr);
    return format(
      date,
      output == "date" ? "MMM dd, yyyy" : "MMM dd, yyyy HH:mm a"
    );
  } catch (error) {
    return isoDateStr;
  }
}

export function addDaysToDate(isoDateStr, days) {
  try {
    const newDate = add(new Date(isoDateStr), { days: days });
    // Format the new date in "MMM dd, yyyy" format
    return format(newDate, "MMM dd, yyyy");
  } catch (error) {
    return null; // or handle the error as needed
  }
}
export function formatDateToTimestamp(dateValue) {
  // Parse the date string
  const date = parse(dateValue, "MMM dd, yyyy", new Date());
  // Get the timestamp
  const timestamp = getTime(date);
  return timestamp;
}
export function formatDateString(dateString, formatType = "MMM dd, yyyy") {
  try {
    return format(parseISO(dateString), formatType);
  } catch (error) {
    return dateString;
  }
}
