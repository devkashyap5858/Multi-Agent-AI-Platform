import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL)

// CREATE REDIS CONNECTION
redis.on("connect",()=>{
  console.log("Redis Connected...");
})

export default redis