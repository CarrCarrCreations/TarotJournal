import axios from "axios";

const instance = axios.create({
  baseURL: "https://tarotjournal-bf848.firebaseio.com/"
});

export default instance;
