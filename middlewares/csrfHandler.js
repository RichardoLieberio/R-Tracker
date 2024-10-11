function csrfHandler(handler) {
    return function(req, res, next) {
        handler(req, res, function(error) {
            if (error) return res.json({status: 403, msg: 'CSRF Token is invalid or missing'});
            next();
        });
    }
}

module.exports = csrfHandler;