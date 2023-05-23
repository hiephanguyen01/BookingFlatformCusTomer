import io from "socket.io-client";

const wsURL = process.env.REACT_APP_DB_BASE_URL.split("://")[1];
export const socket = io(`ws://${wsURL}/`, {
  transports: ["websocket"],
});
