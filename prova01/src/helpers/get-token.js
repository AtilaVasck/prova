const getToken = (request) => {
    //extrair o token
    const authHeader = request.headers.authorization
    //(bearer token)
    const token = authHeader.split(' ')[1]

    return token;
}

export default getToken;