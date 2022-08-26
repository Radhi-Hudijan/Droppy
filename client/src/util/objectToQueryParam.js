export default function objectToQueryParam(obj) {
  let str = "";

  if (obj) {
    for (const key in obj) {
      str += "&" + key + "=" + obj[key];
    }
  }

  return str;
}
