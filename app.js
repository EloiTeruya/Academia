const express = require('express');

const app = express();
const db = require('./models/db');
const bodyParser = require("body-parser")


const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.get('', function(req, res){
    res.render('/academia/tela_cadastro/index.java.html')
    res.send("ola mundo");
})
app.post('/academia/retorno/retorno.html', function(req, res){
    res.send("Nome: " + req.body.firstname + 
    "<br>Sobrenome: "+req.body.lastname + 
    "<br>E_mail:" + req.body.email + 
    "<br>Celular:" + req.body.number + 
    "<br>Senha:" + req.body.password + 
    "<br>Confirme a senha:" + req.body.confirmPassword +
    "<br>Gênero:"+ req.body.genero + "<br>Confirme seu Plano:" +req.body.gender)
})

app.get('areadoaluno.html', function(req,res){
    res.render('cadastro.html');
})
app.post('cadastro.html', function(req, res){
    res.send("Primeiro Nome: " + req.body.firstname + "<br>Sobrenome:" + req.body.lastname + "<br>")
});

app.listen(port,()=>{
    console.log("Projeto executando:" + port);
});
// esse get foi para pesquisa de todos, '/login'//

app.get('/login',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM LOGIN;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por login é pesquisa de um po um, '/login/:login'//
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

//delete através do login//

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

// para alterar um contato pelo login//

app.put('/login/:login', (req,res)=>{
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


// cadastrar planos // cadastrar planos // cadastrar planos //


// get pesquisa geral//
app.get('/planos',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM PLANOS;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por id é pesquisa de um po um, '/planos/:id'//
app.get('/planos/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_selectId = "SELECT * FROM PLANOS WHERE ID = ?";
    db.query(cmd_selectId, id,(err, row)=>{
        res.status(200).json(row);    
    });
});

// criamos este post, para gravar esses dois dados no postman e do postman vai para o SQlworkend//

app.post('/planos', (req, res)=>{
    let dados = req.body;
    let cmd_insert = "INSERT INTO PLANOS (id, plano, valor, validade) VALUES (?,?,?,?)";
    let dados_body = [dados.id, dados.plano, dados.valor, dados.validade];

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Plano salvo com sucesso!"});
        } 
    });
});

//delete através do id//

app.delete('/planos/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_delete = "DELETE FROM PLANOS WHERE ID = ?";

    db.query(cmd_delete,id,(error,result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Plano excluido com sucesso"});
        }    
        
    });
});

// para alterar um contato pelo id//

app.put('/planos/:id', (req,res)=>{
    let dados = req.body;
    let id = req.params.id;
    let cmd_update = "UPDATE PLANOS SET PLANO = ?, VALOR = ?, VALIDADE = ? WHERE ID = ?";
    let dados_body = [dados.plano, dados.valor, dados.validade, id];

    db.query(cmd_update, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "PLano alterado com sucesso!"});
        } 
    });
})


// cadastre-se // cadastre-se // cadastre-se //


// get pesquisa geral//
app.get('/cadastro',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM CADASTRO;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por id é pesquisa de um po um, '/cadastro/:id'//
app.get('/cadastro/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_selectId = "SELECT * FROM CADASTRO WHERE ID = ?";
    db.query(cmd_selectId, id,(err, row)=>{
        res.status(200).json(row);    
    });
});

// criamos este post, para gravar  dados no postman e do postman vai para o SQlworkend//

app.post('/cadastro', (req, res)=>{
    let dados = req.body;
    let cmd_insert = "INSERT INTO CADASTRO (id, nome, sobrenome, e_mail, celular, senha, conf_senha, sexo, conf_plano ) VALUES (?,?,?,?,?,?,?,?,?)";
    let dados_body = [dados.id, dados.nome, dados.sobrenome, dados.e_mail, dados.celular, dados.senha, dados.conf_senha, dados.sexo, dados.conf_plano];

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cadastro salvo com sucesso!"});
        } 
    });
});

//delete através do id//

app.delete('/cadastro/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_delete = "DELETE FROM CADASTRO WHERE ID = ?";

    db.query(cmd_delete,id,(error,result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cadastro excluido com sucesso"});
        }    
        
    });
});

// para alterar um contato pelo id//

app.put('/cadastro/:id', (req,res)=>{
    let dados = req.body;
    let id = req.params.id;
    let cmd_update = "UPDATE CADASTRO SET NOME = ?, SOBRENOME = ?, E_MAIL = ?, CELULAR = ?, SENHA = ?, CONF_SENHA = ?, SEXO = ?, CONF_PLANO = ? WHERE ID = ?";
    let dados_body = [dados.nome, dados.sobrenome, dados.e_mail, dados.celular, dados.senha, dados.conf_senha, dados.sexo, dados.conf_plano, id];

    db.query(cmd_update, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cadastro alterado com sucesso!"});
        } 
    });
})







// produto // produto// produto // produto // produto //


// get pesquisa geral//
app.get('/produto',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM PRODUTO;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por id é pesquisa de um po um, '/produto/:id'//
app.get('/produto/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_selectId = "SELECT * FROM PRODUTO WHERE ID = ?";
    db.query(cmd_selectId, id,(err, row)=>{
        res.status(200).json(row);    
    });
});

// criamos este post, para gravar  dados no postman e do postman vai para o SQlworkend//

app.post('/produto', (req, res)=>{
    let dados = req.body;
    let cmd_insert = "INSERT INTO PRODUTO (id, nome, marca, validade, quantidade, tamanho, preco_custo, preco_venda ) VALUES (?,?,?,?,?,?,?,?)";
    let dados_body = [dados.id, dados.nome, dados.marca, dados.validade, dados.quantidade, dados.tamanho, dados.preco_custo, dados.preco_venda];

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Produto salvo com sucesso!"});
        } 
    });
});

//delete através do id//

app.delete('/produto/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_delete = "DELETE FROM PRODUTO WHERE ID = ?";

    db.query(cmd_delete,id,(error,result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Produto excluido com sucesso"});
        }    
        
    });
});

// para alterar um produto pelo id//

app.put('/produto/:id', (req,res)=>{
    let dados = req.body;
    let id = req.params.id;
    let cmd_update = "UPDATE PRODUTO SET NOME = ?, MARCA = ?, VALIDADE = ?, QUANTIDADE = ?, TAMANHO = ?, PRECO_CUSTO = ?, PRECO_VENDA = ? WHERE ID = ?";
    let dados_body = [dados.nome, dados.marca, dados.validade, dados.quantidade, dados.tamanho, dados.preco_custo, dados.preco_venda, id];

    db.query(cmd_update, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Produto alterado com sucesso!"});
        } 
    });
})