"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        return res.status(400).json({
            success: false,
            message: message,
        });
    }
    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        return res.status(400).json({
            success: false,
            message: message,
        });
    }
    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        return res.status(400).json({
            success: false,
            message: message,
        });
    }
    // JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired, try again`;
        return res.status(400).json({
            success: false,
            message: message,
        });
    }
    // Handle other errors
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
