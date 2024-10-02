import conn from "../config/connectionDB.js";

const tableEvento = /*sql*/`
    CREATE TABLE IF NOT EXISTS evento(
        evento_id VARCHAR(60) PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        datas VARCHAR(60) NOT NULL,
        tablePalestrante INT,
        FOREIGN KEY (tablePalestrante) REFERENCES palestrante_id (tablePalestrante),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )ENGINE=InnoDB;
`
conn.query(tableEvento, (err, results, fields) => {
    if(err){
        return console.error(err);
    }
    console.log("Tabela [evento] criada com sucesso!");
});