exports.notAuthorized = (res) => {
    return res.status(401).send({
        message: "Not Authorized"
    });
}

exports.forbidden = (res) => {
    return res.status(403).send({
        message: "Forbidden: Access Denied"
    });
}

exports.notFound = (res) => {
    return res.status(404).send({
        message: "Not Found"
    });
}