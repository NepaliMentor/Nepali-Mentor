"use strict";
import { Redis } from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redisClient = (): Redis => {
    if (process.env.REDIS_URL) {
        const client = new Redis(process.env.REDIS_URL);

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

export const redis = redisClient();
