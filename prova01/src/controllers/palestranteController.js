import conn from "../config/connectionDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

//helpers
import { response } from "express";
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import verifyToken from "../helpers/verify-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export const registerPalestrante = ( request, response ) => {
    const { nome, expertise } = request.body

    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!expertise) {
        return response.status(400).json({ error: 'o campo expertise é obrigatório' })
    }
};

export const checkPalestrante = async ( request, response ) => {
    let palestranteAtual;
    if (request.headers.authorization) {
        //extrair o token -> barear TOKEN
        const token = getToken(request)
        console.log(token)
        //descriptografar o token jwt.decode
        const decoded = jwt.decode(token, "SENHASUPERSEGURA")
        console.log(decoded)

        const palestranteId = decoded.id
        const selectSql = /*sql*/`SELECT nome, expertise FROM palestrante WHERE ?? = ?`
        const selectSqlData = ['palestrante_id', palestranteId];
        conn.query(selectSql, selectSqlData, async (err, data) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao verificar palestrante' })
            }
            palestranteAtual = data[0]
            response.status(200).json(palestranteAtual)
        })
    } else {
        palestranteAtual = null
        response.status(200).json(palestranteAtual)
    }
};

