function errorHandler(handler, useNext=false) {
    return async function(req, res, next) {
        try {
            useNext ? await handler(req, res, next) : await handler(req, res);
        } catch(error) {
            console.error(error);
            res.json({status: 400, msg: 'Unknown dependency error.'});
        }
    }
}

module.exports = errorHandler;