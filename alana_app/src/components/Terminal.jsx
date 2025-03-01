import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { io } from "socket.io-client";

const TerminalComponent = ({ isVisible }) => {
    const terminalRef = useRef(null);
    const terminal = useRef(null);
    const socket = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!isVisible) return;

        // Initialize Xterm.js
        terminal.current = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#1E1E1E",
                foreground: "#FFFFFF",
            },
        });

        // Attach terminal to DOM
        terminal.current.open(terminalRef.current);
        terminal.current.write("Connecting to server...\r\n");

        // Connect to WebSocket
        socket.current = io("http://localhost:8080");

        socket.current.on("connect", () => {
            terminal.current.write("\r\nConnected to server.\r\n");
            setConnected(true);
        });

        socket.current.on("output", (data) => {
            terminal.current.write(data);
        });

        terminal.current.onData((data) => {
            socket.current.emit("input", data);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [isVisible]);

    return (
        <div
            ref={terminalRef}
            style={{
                display: isVisible ? "block" : "none",
                width: "100%",
                height: "400px",
                background: "black",
                padding: "10px",
            }}
        />
    );
};

export default TerminalComponent;
