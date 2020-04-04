/*  

ordem de comando

npm init -y
npm i express
npm i nodemon


function nome(parametros)
{
    console.log()
    return 
}

objeto

const nome = {

    nomeatributo: valor,
    nomeatributo2: valor2,

    nomedafuncao()
    {
        logica
    }

    estaSujo(simNao)
    {
        return simNao
    }
}

nome.nomeatributo

nome.nomedafuncao()

*/

// express pra criar e configurar servidor
const express = require("express")
const server = express()

// configurar arquivos estáticos css scripts imagens

const db = require("./db")


/* const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url: "https://github.com/LeonardoMonte"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saude",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url: "https://github.com/LeonardoMonte"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url: "https://github.com/LeonardoMonte"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em familia",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url: "https://github.com/LeonardoMonte"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url: "https://github.com/LeonardoMonte"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Recortes",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url: "https://github.com/LeonardoMonte"
    },
] */





server.use(express.static("public"))

//habilitar uso do reqbody

server.use(express.urlencoded({extended: true}))

// configuração do nunjucs

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})




// criou uma rota /
// capturou o pedido do cliente para responder

server.get("/",function(req,res)
{

    db.all(`SELECT * FROM ideas`,function(err,rows)
    {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas)
        {
            if(lastIdeas.length < 2)
            {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {ideas: lastIdeas})
    }) 

})

server.get("/ideias",function(req,res)
{

    

    db.all(`SELECT * FROM ideas`,function(err,rows)
    {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {ideas: reversedIdeas})
    }) 

    
})

server.post("/delete",function(req,res)
{
    
    db.run(`DELETE FROM ideas WHERE id = ?`,[req.body.id],function(err)
    {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }


        console.log("DELETE", this)
        return res.redirect("/ideias")
        

    })

})

server.post("/",function(req,res)
{
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query,values,function(err)
    {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideias")
        
    })
})

server.listen(8000)
