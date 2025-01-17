export default (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message = err.message || "Internal server Error";

    res.status(statusCode).json({
        success: false,
        error: {
            message,
        },
    });
};