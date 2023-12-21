const connectionDB = {
    host: "127.0.0.1",
    user: "root",
    password: "F0712020",
    database: "remission",
    port: 3306 
};

// const connectionDB = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "",
//     database: "remission",
//     port: 33306 
// };

const sucessResponse = (res, data, message = "") => {
    if(!data?.length) {
        res.json({
            status: 'success',
            data: data || [],
            message 
        })
        return;
    }

    if (data?.length > 1) {
        res.json({
            status: 'success',
            data: data,
            message 
        })
        return;
    }else{
        res.json({
            status: 'success',
            data: data[0],
            message
        });
        return;
    }
}

const errorReponse = (res, codeStatus, message = "") => {
    res.json({
        message,
        data: [],
    }).status(codeStatus)
}

module.exports = {
    connectionDB,
    sucessResponse,
    errorReponse,
}
