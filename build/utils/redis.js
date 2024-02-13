"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = () => {
    if (process.env.REDIS_URL) {
        const client = new ioredis_1.Redis(process.env.REDIS_URL);
        // Handling connection errors
        client.on("error", (error) => {
            console.error(`Redis connection error: ${error}`);
        });
        // Handling connection established
        client.on("connect", () => {
            console.log(`Redis connected`);
        });
        return client;
    }
    throw new Error('REDIS_URL environment variable is not defined');
};
exports.redis = redisClient();
