module.exports = {
    server: {
        trust_proxy_host: "127.0.0.1",
        port: 8080,
    },
    store: {
        storeDBMS: "",
        mysqlHost: "",
        mysqlPort: "",
        mysqlUser: "",
        mysqlPassword: "",
        mysqlDatabase: "",
        ConnectionLimit: 1000,
        ConnectionIdle: 10000
    },
    redis: {
        redisHost: "52.79.83.252",
        redisPort: 6379,
        redisDatabase: 1,
        redisPassword: "botredis123$"
    }
};
