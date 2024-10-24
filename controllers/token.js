function getCSRFToken(req, res) {
    res.json({status: 200, msg: 'CSRF token generated successfully.', token: req.csrfToken()});
}

module.exports = {getCSRFToken};