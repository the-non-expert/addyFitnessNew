const API_URL = import.meta.env.API_URL || "http://localhost:8000";
console.log(API_URL, import.meta.env.API_URL)

async function send({ method, path, data, token, isFormData = false }) {
  const opts = { method, headers: {} };

  if (data) {
    if (isFormData) {
      opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
      opts.body = data; // data should be URLSearchParams
    } else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(data);
    }
  }

  if (token) {
    opts.headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, opts);
  const json = await res.json();

  if (res.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
}

export function post(path, data, token, isFormData = false) {
  return send({ method: "POST", path, data, token, isFormData });
}