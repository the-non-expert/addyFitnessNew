const API_URL = process.env.VITE_API_URL || "https://api.addyfitness.com";
console.log(API_URL, process.env.VITE_API_URL)

console.log('All env vars:', import.meta.env);
console.log('Specific API URL:', import.meta.env.VITE_API_URL);

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

  console.log(json)

  if (res.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
}

export function post(path, data, token, isFormData = false) {
  return send({ method: "POST", path, data, token, isFormData });
}