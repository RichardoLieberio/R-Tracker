function getCSRFToken(req, res) {
    res.json({token: req.csrfToken()});
}

module.exports = {getCSRFToken};