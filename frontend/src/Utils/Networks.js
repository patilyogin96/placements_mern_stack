import axios from "axios";

export var base_url = "http://localhost:8001/";
let access_token = "";
let local_json;

let local_json_user;
let local_json_token;
// const access_token = localStorage.getItem("persist:root");
// console.log("WWWWWW", access_token);

if (localStorage.hasOwnProperty("persist:root")) {
  access_token = localStorage.getItem("persist:root");
  local_json = JSON.parse(access_token);

  local_json_user = JSON.parse(local_json?.user);
  local_json_token = JSON.parse(local_json?.token);
} else {
  access_token = "";
  local_json_user = null;
  local_json_token = null;
}

// const local_json_token = "scscsc";

var _headers =
  local_json_token === null || local_json_token === undefined
    ? { "Content-Type": "application/json" }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local_json_token}`,
      };

export var api_open = axios.create({
  baseURL: base_url,
  timeout: 30000000,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data);
    },
  ],
});

export var api_token = axios.create({
  baseURL: base_url,
  timeout: 30000000,
  headers: _headers,
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data);
    },
  ],
});

export function setToken(token) {
  console.log("ththht", token);

  return new Promise((resolve, reject) => {
    // const token = useSelector((state) => state.token);
    // console.log("THisFunctionexecuted", token);

    try {
      api_token = axios.create({
        baseURL: base_url,
        timeout: 300000000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept:
            "application/json;version=2, text/plain, */*, application/json, text/plain, */*",
        },
        transformRequest: [
          function (data, headers) {
            return JSON.stringify(data);
          },
        ],
      });
      resolve("Successfully set agrimguru token.");
    } catch (error) {
      reject("Error to ser agrimguru token");
    }
  });
}
