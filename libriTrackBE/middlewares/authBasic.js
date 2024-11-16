const authBasic = (req, res, next) => {
    console.log("Authorization header:", req.headers.authorization);

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Basic ")) {
        return res.status(401).send({ message: "Authorization header missing or malformed" });
    }

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [email, password] = credentials.split(":");

    if (!email || !password) {
        return res.status(400).send({ message: "Invalid Basic Auth credentials" });
    }

    req.auth = { email, password };
    next();
};

module.exports = authBasic;
