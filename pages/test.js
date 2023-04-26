import React, { useState, useEffect } from "react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3000/test");
    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    newSocket.addEventListener("message", (event) => {
      const data = event.data;

      if (data instanceof Blob) {
        // check if the data is a Blob object
        const reader = new FileReader();

        reader.addEventListener("loadend", () => {
          const message = JSON.parse(reader.result); // parse the result as JSON
          setMessages((messages) => [...messages, message]);
        });

        reader.readAsText(data);
      } else {
        const message = JSON.parse(data); // parse the data as JSON
        setMessages((messages) => [...messages, message]);
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket.readyState === WebSocket.OPEN) {
      // check if the WebSocket is open
      const newMessage = { text: message };
      const jsonMessage = JSON.stringify(newMessage);
      socket.send(jsonMessage);

      const myMessage = { text: message}
      setMessages((messages) => [...messages, myMessage]);
      setMessage("");
    } else {
      console.log("WebSocket not open, message not sent");
    }
  };
  console.log(messages);
  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Home;
