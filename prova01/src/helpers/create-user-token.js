import jwt from "jsonwebtoken";

const createUserToken = async (palestrante, request, response) => {
    //criar o token
    const token = jwt.sign(
    { 
        name: palestrante.nome,
        id: palestrante.palestrante_id
    },
    "SENHASUPERSEGURA",//Senha de criptografia
    );
   //retornar o token
    response.status(200).json({
        message: "Você está autenticado",
        token: token,
        palestranteId: palestrante.palestrante_id,
    });
}

export default createUserToken;