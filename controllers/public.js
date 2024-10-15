function verifyAccount(req, res) {
    res.send({token: req.params.token});
}

module.exports = {verifyAccount};