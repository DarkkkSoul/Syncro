const errorHandler = async (error, req, res, next) => {
    try {
        let err = { ...error }

        err.message = error.message || "Something went wrong!"
        console.log(err.message);

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    } catch (error) {
        next(error);
    }
}

export default errorHandler;    