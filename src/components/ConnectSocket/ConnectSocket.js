import io from "socket.io-client";

const wsURL = process.env.REACT_APP_DB_BASE_URL;
export const socket = io(wsURL, {
  transports: ["websocket"],
});
