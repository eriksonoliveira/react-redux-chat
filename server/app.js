const WebSocket = require("ws");

// Initialise wss as a new Websocket Server running in port 8989
const wss = new WebSocket.Server({ port: 8989 });

// Array of users currently logged in. Serves as the Database.
let users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", ws => {
  // Random number
  const userId = Math.floor(Math.random() * 10 * 10);

  ws.on("message", message => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "ADD_USER": {
        users.push({ name: data.name, id: userId });
        ws.send(
          JSON.stringify({
            type: "USERS_LIST",
            users
          })
        );
        broadcast(
          {
            type: "USERS_LIST",
            users
          },
          ws
        );
        break;
      }
      case "ADD_MESSAGE": {
        broadcast(
          {
            type: "ADD_MESSAGE",
            message: data.message,
            author: data.author
          },
          ws
        );
        break;
      }
      default:
        break;
    }
  });

  // When the connection is closed, remove the user with userId
  ws.on("close", () => {
    users = users.filter(user => {
      return user.id !== userId;
    });

    // Send updated user list to all the connected users
    broadcast(
      {
        type: "USERS_LIST",
        users
      },
      ws
    );
  });
});
