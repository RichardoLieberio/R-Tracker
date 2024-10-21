function sizeLimiter(req, res, next) {
    const contentLength = req.headers['content-length'];
    if (contentLength && +contentLength > +process.env.ACCEPT_JSON_MAX_SIZE_IN_MB * 1024 * 1024) return res.json({status: 413, msg: 'Payload Too Large'});
    next();
}

module.exports = sizeLimiter;