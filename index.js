const express = require("express")
const mongo = require("mongoose")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 5000
const Film = require("./model/filmdb")
const Categ = require("./model/categor")
const che = require("cheerio")
const requests = require("request")
const { urlencoded } = require("express")

app.use("/", express.static("public"))
app.use(urlencoded({extended:true}))


const db = "mongodb+srv://valod:1233110v@cluster0.lqjb8pg.mongodb.net/?retryWrites=true&w=majority"
const createPage = (page) => path.resolve(__dirname, "view", `${page}.ejs`)

mongo.connect(db).then((res)=>{
    console.log("conn");
}).catch((e)=>{
    console.log('====================================');
    console.log(e);
    console.log('====================================');
})

app.set("view engine", "ejs")
app.get("/", (req, res)=>{
    Film.find()
    .then((film) => res.render(createPage("index"), {film}))
    .catch((e) => console.log(e))
    
})
app.get("/filmy/:id", (req, res) =>{
    const id = req.params.id

    Film.findById(id)
        .then((film) => res.render(createPage("pagefilmitem"), {film}))
        .catch((e) => console.log(e))
})
app.get("/add", (req, res)=>{
    const name = "Морбиус (2022)"
    const title = "Морбиус (2022) смотреть онлайн"
    const date = "2022"
    const img = "img/a3d548b61811d3384a7dfbce9f055bd1ca5e74ae4577b492e394ff0e2f10cc74._RI_V_TTW_.jpg"
    const category = [
        "Фантастика", "Фильмы", "Боевик ", "Триллер", "Ужасы ", "Фэнтези"
    ]
    const producer = "Даниэль Эспиноса"
    const film = "https://synthezoid.as.alloeclub.com/?token_movie=36323422f81c2db8fcc1017078cf7c&token=055b70ce4c4621dd67624ee85e636a"
    const comment = 1
    const actors = [
       "Джаред Лето", "Джаред Харрис", "Майкл Китон", "Мэтт Смит" 
    ]
    const description = ""
    const categid = '629231535769f46d55b97350'
    filmAdd = new Film({title, name, date, img, category, producer, actors, description, film, comment, categid})
    filmAdd.save()
    .then((res) =>{
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    })
    .catch((e) =>{
        console.log(e);
    })
    res.render(createPage("index"))
})
app.get("/addfilm", ()=>{
    for (let i = 1; i < 70; i++) {
        requests(`https://gidonline.cc/page/${i}/`, (err, respose, html) =>{
        if(!err && respose.statusCode == 200){
            const $ = che.load(html)
            // console.log($(".mainlink").text());
            $(".mainlink").each((i, el) =>{
                const item = $(el).find("a").attr("href")
                requests(item, (er, resp, ht) =>{
                    if(!er && resp.statusCode == 200){
                        const at = []
                        const category = []
                        const s = che.load(ht)
                        const titles = s("#single").find("h1[itemprop=name]")
                        s("#single").find("div.rl-2").each((i, el) =>{
                            const ias = $(el)
                            at.push(ias.text())
                        })
                        s("div[itemprop=genre]").find("a").each((i, elses) =>{
                            const a = $(elses)
                            category.push(a.text())
                        })
                        const name = at[0]
                        const date = at[1]
                        const categid = "629231535769f46d55b97350"
                        const comment = "1"
                        const actors = at[5].split(",")
                        const producer = at[6]
                        const film = s(".tray").find("iframe").attr("src")
                        const imgage = s("#single").find("img.t-img").attr("src")
                        const img = "https://gidonline.cc" + imgage
                        const description = s(".infotext").text()
                        const title = titles.text()
                        filmAdd = new Film({title, name, date, img, category, producer, actors, description, film, comment, categid})
                        filmAdd.save()
                            .then(ers => console.log("ok" + name))
                            .catch(e => console.log(e))

                    }
                }) 
            })
        }
        })
    }
})
app.get("/categ", (req, res)=>{
    Categ.find()
        .then(cat => res.send(cat))
})
app.get("/pots/:id", (req, res)=>{
    Film.find()
        .then(cat => {
            const cats = []

            for (let i = 0; i < cat.length; i++) {
                if(cat[i].categid == req.params.id){
                    cats.push(cat[i])
                }
            }
            return res.render(createPage("pots"), {cats})
        })
        .catch((e) => console.log(e))
})

app.get("/catega", (req, res)=>{

    const cartId = 1
    const title = "ФИЛЬМЫ"

    const ad = new Categ({ cartId, title})
    ad.save()
    .then(res => console.log(res))
    .catch(e => console.log(e))
})
app.get("/search/:id", (req, res)=>{
    console.log('====================================');
    console.log(req.params.id);
    console.log('====================================');
}) 

app.get("/search", (req, res) =>{
    Film.find({
        filmsas: {
            title: req.query.q
        }
    })
    .then(search => {
        console.log(search);

        return res.render(createPage("search"), {search})
    })

})
app.use((req, res) =>{
    res.send("404")
}) 
app.listen(PORT, () =>{
    console.log("server connexxxt...." + PORT);
})


