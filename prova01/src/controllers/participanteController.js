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


export const registerParticipante = ( request, response ) => {
    const { nome, email } = request.body
    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!email) {
        return response.status(400).json({ error: 'o campo email é obrigatório' })
    }
    if (!email.includes("@")) {
        return response.status(409).json({ error: 'Digite um email válido com @' })
    }
    const checkSql = /*sql*/`SELECT * FROM participante WHERE ?? = ?`
    const checkSqlData = ['email', email];
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ error: 'Erro ao verificar se o email já existe' });
        }
        //2°
        if (data.length > 0) {
            return response.status(409).json({ error: 'Email já está em uso.' })
        }
        //Posso fazer o registro
        const salt = await bcrypt.genSalt(12)
        // console.log(salt)
        const senhaHash = await bcrypt.hash(senha, salt)
        // console.log("Senha digitada:", senha)
        // console.log("Senha criptografada:", senhaHash)

        //criar user
        const id = uuidv4();

        const insertSql = /*sql*/`INSERT INTO participante (??, ??, ??)
    VALUES (?, ?, ?)`
        const insertSqlData = ["participante_id", "nome", "email",
            id, nome, email];

        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao cadastrar usuário' })
            }
            //1° criar token
            //2° passar o token para o front-end    
            const participanteSql = /*sql*/`SELECT * FROM users WHERE ?? = ?`
            const participanteSqlData = ['participante_id', id];
            conn.query(participanteSql, participanteSqlData, async (err, data) => {
                if (err) {
                    console.log(err)
                    return response.status(500).json({ error: 'Erro ao fazer login' })
                }
                const participante = data[0]

                try {
                    await createParticipanteToken(participante, request, response)
                } catch (error) {
                    console.log(error)
                    response.status(500).json({ err: "Erro ao processar requisição" })
                }

            })
            // response.status(201).json({ message: "Usuário cadastrado" })
        })
    })
};
