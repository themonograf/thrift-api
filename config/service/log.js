const log4js = require("log4js");

log4js.configure({
    appenders: { thriftApi: { type: "file", filename: "thrift-api.log" } },
    categories: { default: { appenders: ["thriftApi"], level: "error" } },
});

const service = {}
service.logger = log4js.getLogger("thriftApi");

module.exports = service
