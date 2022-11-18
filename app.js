const express = require('express');

const app = express();
const db = require('./models/db');
const bodyParser = require("body-parser")
const path = require("path");

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));



app.get('/', function(req, res){
   res.render('academia/tela_cadastro/index.ejs');
   
    
});
app.post('/areaaluno', function(req, res){
   let cmd_insert = "insert into cadastro(nome, sobrenome, e_mail,celular, senha, conf_senha, sexo, conf_plano) values (?,?,?,?,?,?,?,?) "
   let dados_body = [req.body.firstname,
                     req.body.lastname,
                     req.body.email,
                     req.body.number,
                     req.body.password,
                     req.body.confirmPassword,
                     req.body.genero,
                     req.body.plano

] 

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            console.log(error)
        }
    });
    res.send("Nome: " + req.body.firstname + 
    "<br>Sobrenome: "+req.body.lastname + 
    "<br>E_mail:" + req.body.email + 
    "<br>Celular:" + req.body.number + 
    "<br>Senha:" + req.body.password + 
    "<br>Confirme a senha:" + req.body.confirmPassword +
    "<br>Gênero:"+ req.body.genero + 
    "<br>Confirme seu Plano:" +req.body.plano)

        
})



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



// cadastrar pedido // cadastrar pedido // cadastrar pedido //


// get pesquisa geral//
app.get('/pedido',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM PEDIDO;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por id é pesquisa de um po um, '/pedido/:id'//
app.get('/pedido/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_selectId = "SELECT * FROM PEDIDO WHERE ID = ?";
    db.query(cmd_selectId, id,(err, row)=>{
        res.status(200).json(row);    
    });
});

// criamos este post, para gravar esses dois dados no postman e do postman vai para o SQlworkend//

app.post('/pedido', (req, res)=>{
    let dados = req.body;
    let cmd_insert = "INSERT INTO PEDIDO (id_pedido,id, nome, sobrenome, e_email, celular,dt_pedido) VALUES (?,?,?,?,?,?,?)";
    let dados_body = [dados.id_pedido, dados.id, dados.nome, dados.sobrenome, dados.e_email, dados.celular, dados.dt_pedido];

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Pedido salvo com sucesso!"});
        } 
    });
});

//delete através do id//

app.delete('/pedido/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_delete = "DELETE FROM PEDIDO WHERE ID = ?";

    db.query(cmd_delete,id,(error,result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Pedido excluido com sucesso"});
        }    
        
    });
});

// para alterar um contato pelo id//

app.put('/pedido/:id', (req,res)=>{
    let dados = req.body;
    let id = req.params.id;
    let cmd_update = "UPDATE PEDIDO SET ID = ?, NOME = ?, SOBRENOME = ?, E_EMAIL = ?, CELULAR = ?, DT_PEDIDO = ? WHERE ID_PEDIDO = ?";
    let dados_body = [dados.id, dados.nome, dados.sobrenome, dados.e_email, dados.celular, dados.dt_pedido, id_pedido];

    db.query(cmd_update, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Pedido alterado com sucesso!"});
        } 
    });
})

// cadastrar cartao // cadastrar cartao // cadastrar cartao //


// get pesquisa geral//
app.get('/cartao',(req, res)=>{
    let cmd_selectAll = "SELECT * FROM CARTAO;";
    db.query(cmd_selectAll,(err, rows)=>{
        console.log(err);
        res.status(200).json(rows);

    });
});
// get por id é pesquisa de um po um, '/cartao/:id'//
app.get('/cartao/:numero',(req, res)=>{
    let id = req.params.numero;
    let cmd_selectId = "SELECT * FROM CARTAO WHERE NUMERO = ?";
    db.query(cmd_selectId, numero,(err, row)=>{
        res.status(200).json(row);    
    });
});

// criamos este post, para gravar esses dois dados no postman e do postman vai para o SQlworkend//

app.post('/cartao', (req, res)=>{
    let dados = req.body;
    let cmd_insert = "INSERT INTO CARTAO ( tipo, nome, validade, codigo, numero) VALUES (?,?,?,?,?)";
    let dados_body = [dados.tipo, dados.nome, dados.validade, dados.codigo, dados.numero];

    db.query(cmd_insert, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cartâo salvo com sucesso!"});
        } 
    });
});

//delete através do id//

app.delete('/cartao/:numero',(req, res)=>{
    let id = req.params.numero;
    let cmd_delete = "DELETE FROM CARTAO WHERE NUMERO = ?";

    db.query(cmd_delete,numero,(error,result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cartão excluido com sucesso"});
        }    
        
    });
});

// para alterar um cartao pelo id//

app.put('/cartao/:numero', (req,res)=>{
    let dados = req.body;
    let id = req.params.numero;
    let cmd_update = "UPDATE CARTAO SET TIPO = ?, NOME = ?, VALIDADE = ?, CODIGO = ? WHERE ID = ?";
    let dados_body = [dados.tipo, dados.nome, dados.validade, dados.codigo, id];

    db.query(cmd_update, dados_body,(error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "Cartão alterado com sucesso!"});
        } 
    });
})