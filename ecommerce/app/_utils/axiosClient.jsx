const { default: axios } = require("axios");

const apiUrl = "http://localhost:1337/api";
const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
// const apiKey =
//   "5e89fbba08d69e52a2466e6db1afdc0c2a70d4712f12cb97a2fac02b9ccbf895bb763d910da7e22b2d4211794b4adba04e9284c87371de065bad67340ec50912c8c337b0ce9162439b57d726f00e716d646211d544eea1cea7722216a31225ea01fe38d83396f44ae50eecfecb8ecfa88f7a8481fcf65022ba6fbd81807ed12e";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
});

export default axiosClient;
