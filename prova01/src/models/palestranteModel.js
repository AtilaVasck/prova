import conn from "../config/connectionDB.js";

const tablePalestrante = /*sql*/`
    CREATE TABLE IF NOT EXISTS palestrante(
        palestrante_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        expertise VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )ENGINE=InnoDB;
`
conn.query(tablePalestrante, (err, results, fields) => {
    if(err){
        return console.error(err);
    }
    console.log("Tabela [palestrante] criada com sucesso!");
});

export default tablePalestrante;