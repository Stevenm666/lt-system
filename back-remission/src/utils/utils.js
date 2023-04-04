const connectionDB = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'remission'
};

const sucessResponse = (res, data, message = "") => {
    if(!data?.length) {
        res.status(404).json({
            status: 'success',
            data: data || [],
            message 
        })
        return;
    }

    if (data?.length > 1) {
        res.status(200).json({
            status: 'success',
            data: data,
            message 
        })
        return;
    }
    res.status(200).json({
        status: 'success',
        data: data[0],
        message
    })
}

const errorReponse = (res, codeStatus, message = "") => {
    res.status(codeStatus).json({
        status: 'error',
        message,
        data: [],
    })
}

module.exports = {
    connectionDB,
    sucessResponse,
    errorReponse,
}