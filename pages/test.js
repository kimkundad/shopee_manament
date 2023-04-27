import React, { useState, useEffect } from "react";

const Index = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:3000");
    setWs(newWs);

    newWs.addEventListener("open", () => {
      console.log("Connected to WebSocket");
    });

    newWs.addEventListener("message", (event) => {
      const message = event.data;
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      newWs.close();
    };
  }, []);

  const handleJoinRoom = () => {
    if (room) {
      const data = { type: "joinRoom", room };
      ws.send(JSON.stringify(data));
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const data = { type: "message", message, room };
      ws.send(JSON.stringify(data));
      setMessage("");
    }
  };
  return (
    <div>
      <h1>WebSocket Example</h1>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room name"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Index;
