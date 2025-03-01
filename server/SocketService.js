const socketIO = require("socket.io");
const PTYService = require("./PTYService");

class SocketService {
    constructor() {
        this.socket = null;
        this.pty = null;
    }

    attachServer(server) {
        if (!server) {
            throw new Error("Server not found...");
        }

        const io = socketIO(server, {
            cors: {
                origin: "http://localhost:5173", // Allow React frontend
                methods: ["GET", "POST"]
            }
        });

        console.log("Socket server created. Waiting for client connections...");

        io.on("connection", (socket) => {
            console.log("Client connected:", socket.id);
            this.socket = socket;
            this.pty = new PTYService(this.socket);

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });

            socket.on("input", (input) => {
                this.pty.write(input);
            });
        });
    }
}

module.exports = SocketService;
