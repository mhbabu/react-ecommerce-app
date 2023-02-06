import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/attributes";

function getAttributeUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getAttributes() {
  return http.get(apiEndPoint);
}

export function getAttribute(attributeId) {
  return http.get(getAttributeUrl(attributeId));
}

export function saveAttribute(attribute) {
  if (attribute._id) {
    const body = { ...attribute };
    delete body._id;
    return http.put(getAttributeUrl(attribute._id), body);
  }
  return http.post(apiEndPoint, attribute);
}

export function deleteAttribute(attributeId) {
  return http.delete(getAttributeUrl(attributeId));
}
