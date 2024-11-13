function errorHandler(handler, useNext=false) {
    return async function(req, res, next) {
        try {
            useNext ? await handler(req, res, next) : await handler(req, res);
        } catch(error) {
            console.error(error);
            res.json({status: 503, msg: 'Service unavailable. Please try again later.'});
        }
    }
}

module.exports = errorHandler;