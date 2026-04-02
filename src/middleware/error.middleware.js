// Global Error Handler Middleware
//  Handles all errors in one place
export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  };