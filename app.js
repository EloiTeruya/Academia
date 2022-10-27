const express = require('express');

const app = express();
const db = require('./models/db');


const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port,()=>{
    console.log("Projeto executando:" + port);
});
// esse get foi para pesquisa de todos, '/contato'//

app.get('/login',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM LOGIN;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por id é pesquisa de um po um, '/contato/:id'//
app.get('/login/:login',(req, res)=>{
    let login = req.params.login;
    let cmd_selectId = "SELECT * FROM LOGIN WHERE LOGIN = ?";
    db.query(cmd_selectId, login,(err, row)=>{
        res.status(200).json(row);    
    });
});

// criamos este post, para gravar esses dois dados no postman e do postman vai para o SQlworkend//

app.post('/login', (req, res)=>{
    let dados = req.body;
    let cmd_insert = "INSERT INTO LOGIN (login, senha) VALUES (?,?)";
    let dados_body = [dados.login, dados.senha];

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cadastro salvo com sucesso!"});
        } 
    });
});

app.delete('/login/:login',(req, res)=>{
    let login = req.params.login;
    let cmd_delete = "DELETE FROM LOGIN WHERE login = ?";

    db.query(cmd_delete,login,(error,result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cadastro excluido com sucesso"});
        }    
        
    });
});

// para alterar um contato pelo id//

app.put('/login/:id', (req,res)=>{
    let dados = req.body;
    let cmd_update = "UPDATE LOGIN SET LOGIN = ?, SENHA = ? WHERE LOGIN = ?";
    let dados_body = [dados.login, dados.senha, dados.login];

    db.query(cmd_update, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cadastro alterado com sucesso!"});
        } 
    });
})
