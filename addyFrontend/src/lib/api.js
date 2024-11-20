const API_URL = "http://localhost:5000/api"; // Adjust this to your backend URL

async function send({ method, path, data, token }) {
  const opts = { method, headers: {} };

  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
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

export function post(path, data, token) {
  return send({ method: "POST", path, data, token });
}
