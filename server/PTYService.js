const os = require("os");
const pty = require("node-pty");

class PTY {
    constructor(socket) {
        this.shell = process.env.SHELL || "/bin/bash";
        this.ptyProcess = null;
        this.socket = socket;

        this.startPtyProcess();
    }

    startPtyProcess() {
        this.ptyProcess = pty.spawn(this.shell, [], {
            name: "xterm-color",
            cwd: process.env.HOME,
            env: process.env,
        });

        this.ptyProcess.on("data", (data) => {
            this.sendToClient(data);
        });
    }

    write(data) {
        this.ptyProcess.write(data);
    }

    sendToClient(data) {
        this.socket.emit("output", data);
    }
}

module.exports = PTY;
