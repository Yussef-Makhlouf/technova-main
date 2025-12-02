import CustomError from '../utilities/customError.js'



export default function catchError(callBack) {
    return (req, res, next) => {
        callBack(req, res, next).catch(err => {
            // If err is already a CustomError, pass it through
            if (err instanceof CustomError) {
                return next(err);
            }
            // Extract error message properly
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message || errorMessage;
            } else if (typeof err === 'string') {
                errorMessage = err;
            } else if (err && typeof err === 'object') {
                errorMessage = err.message || err.toString() || errorMessage;
            }
            // Create new CustomError with proper message
            next(new CustomError(errorMessage, 400));
        });
    };
}



export const globalResponse = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Safely extract error message
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
    } else if (typeof err === 'string') {
        errorMessage = err;
    } else if (err && typeof err === 'object' && err.message) {
        errorMessage = err.message;
    }

    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
}
