import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  headers: {
    "Content-Type": "application/json"
  },
  transformRequest: [
    function (data, headers) {
      let plaintext = JSON.stringify(data);
      let encoder = new TextEncoder();
      plaintext = encoder.encode(plaintext);

      let payload = encrypt(plaintext);
      if(!payload?.value) return false;
      payload = JSON.stringify(payload);
      payload = btoa(payload)

      return JSON.stringify({payload});
    }
  ]
})