const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database

connection

    .authenticate()
    .then(() => {
        console.log("Conexão com banco de dado efetuada com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o express que eu vou usar o ejs como motor para desenho do html
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw:true, order:[
        ['id','DESC'] //ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas:perguntas

        });
    });
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
});

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({//FindOne é uma função do sequelize busca um dado com uma condição
        where:{id: id}
    }).then(pergunta =>{
        if(pergunta !=undefined){ //Pergunta encontrada

            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                });
            })
        }else{//Pergunta nao encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo:corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);
    });
})

app.listen(3000, () => {
    console.log("App rodando...");
});