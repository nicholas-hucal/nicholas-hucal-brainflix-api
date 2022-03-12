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

exports.created = (res, details) => {
    return res.status(201).json(details);
}

exports.success = (res, details) => {
    return res.status(200).json(details);
}