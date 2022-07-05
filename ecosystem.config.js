const os = require('os');
module.exports = {
    apps: [
        {
            port: 2567,
            name: "PROXY",
            script: "./node_modules/@colyseus/proxy/bin/proxy",
            instances: 1, // scale this up if the proxy becomes the bottleneck
            exec_mode: 'cluster',
            env: {
                PORT: 2567,
                REDIS_URL: "redis://127.0.0.1:6379/0"
            }
        },
        {
            port: 3000,
            name: "GAME-SERVER",
            script: "lib/index.js", // your entrypoint file (typescript needs to be transpiled for this to work)
            instances: os.cpus().length, // one instance for each core
            exec_mode: 'fork', // IMPORTANT: do not use cluster mode.
            env: {
                DEBUG: "colyseus:errors",
                NODE_ENV: "production",
            }
        }
    ]
}