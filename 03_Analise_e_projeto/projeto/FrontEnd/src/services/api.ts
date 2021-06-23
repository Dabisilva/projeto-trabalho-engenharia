import axios from "axios";

//development
// export const api = axios.create({
//   baseURL: "http://127.0.0.1:5000",
// });

//producation
export const api = axios.create({
  baseURL: "https://api-moveit-trabalho.herokuapp.com/",
});
