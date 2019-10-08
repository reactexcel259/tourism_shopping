export function image_formatter(url, size) {
  if (url.includes("cloudinary")) {
    return url.replace("upload/", `upload/w_${size}/`);
  }
  return url;
}
export function jsonToFormData (inJSON, inTestJSON, inFormData, parentKey) {
  let form_data = inFormData || new FormData();
  let testJSON = inTestJSON || {};
  for ( let key in inJSON ) {                     
      let constructedKey = key;
      if (parentKey) {
          constructedKey = parentKey + "." + key;
      }

      let value = inJSON[key];
      if (value && value.constructor === {}.constructor) {          
          jsonToFormData (value, testJSON, form_data, constructedKey);
      } else {
          form_data.append(constructedKey, inJSON[key]);
          testJSON[constructedKey] = inJSON[key];
      }
  }
  return form_data;
}