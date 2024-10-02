import conn from "../config/connectionDB.js";

const tableParticipante = /*sql*/`
    CREATE TABLE IF NOT EXISTS participante(
        participante_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableParticipante, (err, results, fields) => {
    if(err){
        return console.error(err);
    }
    console.log("Tabela [participante] criada com sucesso!");
});