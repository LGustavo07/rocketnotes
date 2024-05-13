import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-rocketnotes-wl1n.onrender.com",
});

//api.get("/users:id");
