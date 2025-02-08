import { clearAuth } from "$lib/stores/auth.js"; // Import clearAuth function

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:8000"
// console.log('API URL:', API_URL);
// console.log('All env vars:', import.meta.env);

async function send({ method, path, data, token, isFormData = false }) {
  // console.log('Starting request with:', { 
  //   method, 
  //   path, 
  //   url: `${API_URL}${path}`,
  //   hasToken: !!token,
  //   tokenValue: token
  // });

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
    // console.log('Request headers:', opts.headers); // Check the headers
  }

  // console.log('Full request options:', opts);

  try {
    const res = await fetch(`${API_URL}${path}`, opts);
    // console.log('Response status:', res.status);

    if (res.status === 401) {
      // Clear the stored token
      clearAuth();  // Your auth clear function
      // Redirect to login
      window.location.href = '/signin';
      throw new Error('Session expired. Please login again.');
    }
  
    const json = await res.json();
    // console.log('Response body:', json);

    if (res.ok) {
      return json;
    } else {
      throw new Error(json.detail || json.message || 'Request failed');
    }
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

export function post(path, data, token, isFormData = false) {
  return send({ method: "POST", path, data, token, isFormData });
}

export function get(path, token) {
  return send({ method: "GET", path, token });
}

export function put(path, data, token) {
  return send({ method: "PUT", path, data, token });
}