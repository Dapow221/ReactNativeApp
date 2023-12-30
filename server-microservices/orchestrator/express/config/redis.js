const Redis = require("ioredis");
const redis = new Redis(
  "redis://default:IpsfSC2ncvsg6UtLbFkBhWCXyPDSJi7r@redis-10258.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:10258"
);

module.exports = redis;
