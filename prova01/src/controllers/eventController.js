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

export const criarEvent = async ( request, response ) => {
    const { titulo, datas, palestrante_id } = request.body;
    const disponivel = 1;

    ///buscar user por token
    const token = getToken(request)
    const palestrante = await getUserByToken(token)
    // console.log(user)

    if (!titulo) {
        return response.status(400).json({ message: "O titulo do evento é obrigatório" })
    }
    if (!datas) {
        return response.status(400).json({ message: "A data do evento é obrigatória" })
    }
    if (!palestrante_id) {
        return response.status(400).json({ message: "O palestrante_id do evento é obrigatório" })
    }

    const evento_id = uuidv4();
    const palestrantesId = palestrante.palestrante_id;
    const eventoSql = /*sql*/`INSERT INTO evento (??, ??, ??, ??) VALUES (?, ?, ?, ?)`;

    const eventoValues = [
        "evento_id", "titulo", "datas", "palestrante_id",
        evento_id, titulo, datas, palestrantesId
    ];

    conn.query(eventoSql, eventoValues, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao adicionar evento" });
        }
        else {
            response.status(201).json({ message: "Objeto criado com sucesso!" })
        };
    });
};

export const inscriberEvent = async ( request, response ) => {
    const { evento, participante } = request.body;
    if (!evento) {
        return response.status(400).json({ message: "O evento é obrigatório" })
    }
    if (!participante) {
        return response.status(400).json({ message: "O participante é obrigatório" })
    }
    const checkEmailSQL = /*sql*/`SELECT * FROM evento WHERE ?? = ?`
    const checkData = ["evento", evento_id];
    connection.query(checkEmailSQL, checkData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao verificar email" });
            return
        }
        if (data.length > 0) {
            return response.status(400).json({ message: "Email já está cadastrado." })
        }

        const id = uuidv4();
        const insertSQL = /*sql*/`INSERT INTO clientes (??, ??, ??) VALUES (?, ?, ?)`
        const insertData = [
            "cliente_id", 
            "nome", 
            "email", 
            "senha", 
            id, 
            nome, 
            email, 
            senha
            ];//lembrar de terminar
        connection.query(insertSQL, insertData, (err, data) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao cadastrar cliente" });
                return
            }
            response.status(201).json({ message: "Cliente cadastrado com sucesso" });
        });
    });

    const { evento_id } = request.params
    const eventoSQL = /*sql*/`SELECT * FROM evento WHERE ?? = ?`
    const checkEvento = [
        "evento_id", id
    ]
    const { participante_id } = request.params
    const participanteSQL = /*sql*/`SELECT * FROM participante WHERE ?? = ?`
    const checkParticipante = [
        "participante_id", id
    ]

    //Faltou terminar minha logica nessa, perdon
};