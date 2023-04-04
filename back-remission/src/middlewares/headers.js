const middlewareHeaders = (req, res, next) => {
    const { headers } = req;
    if (headers["x-access-api-key"] === "qwerty123"){
        next();
    }else{
        res.status(405).json({message: "ACCESS DENIED", headers: "x-access-api-key"})
    }
};

module.exports = middlewareHeaders;