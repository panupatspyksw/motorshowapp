const express = require('express');
const dotEnv = require('dotenv');
dotEnv.config();
const process = require('process'); // Required to mock environment variables
const {format} = require('util');
const app = express();
const path = require('path');
const cors = require('cors');
const connection = require('./database/connection');
const PORT = process.env.PORT || 5100;
const cookieParser = require('cookie-parser');
const Multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const GCS = require('./cloudstorage/serve')
const projectId = process.env.PROJECT_ID
const keyFilename = './cloudstorage/jsonkey.json'
const storage = new Storage({projectId, keyFilename});
const url = require('url');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var bodyParser = require('body-parser');

app.set('socketio', io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });
  
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);


// no cache
app.use(function(req, res, next) {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	res.setHeader("Expires", "0"); // Proxies.
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});

app.get("/testquery",(req,res)=>{
  res.send(req.query)
})
app.use(cookieParser());

// db conectivity
// cors
app.use(cors())
app.use(express.static('public'))
// app.set('views', path.join(__dirname, 'views/admin'));


// request payload middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// set app to read ejs
app.set('view engine', 'ejs');
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
app.use("/css",express.static(path.join(__dirname, "/node_modules/bootstrap-icons/font/")))
app.use("/css",express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css/")))
app.use("/css",express.static(path.join(__dirname, "/node_modules/hamburgers/dist/")))
app.use("/css",express.static(path.join(__dirname, "/node_modules/gridjs/dist/theme/")))
app.use("/js",express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/gridjs/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/moment/min/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/selectize/dist/js/standalone")))
app.use("/css", express.static(path.join(__dirname, "/node_modules/selectize/dist/css")))
app.use("/css", express.static(path.join(__dirname, "/node_modules/@toast-ui/chart/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/@toast-ui/chart/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/xlsx/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/file-saver/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/pdfmake/build/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/dom-to-image/dist/")))
app.use("/js", express.static(path.join(__dirname, "/public/js/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/@yaireo/tagify/dist/")))
app.use("/css", express.static(path.join(__dirname, "/node_modules/@yaireo/tagify/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/quill/dist/")))
app.use("/css", express.static(path.join(__dirname, "/node_modules/quill/dist/")))
app.use("/css", express.static(path.join(__dirname, "/node_modules/@splidejs/splide/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/@splidejs/splide/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/gsap/dist/")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/socket.io/client-dist/")))
app.use("/js", express.static(path.join(__dirname, "node_modules/bodymovin/build/player/")))
app.use("/js", express.static(path.join(__dirname, "node_modules/lottie-web/build/player/")))
app.use("/js", express.static(path.join(__dirname, "node_modules/progressbar.js/")))

//send privilege to ejs
app.use(function(req,res,next){
    try{
    req.io = io;
    res.locals.rooturl = `http://localhost:${PORT}`
    res.locals.user = { userid: req.cookies.jwt.id, usertype : req.cookies.jwt.usertype, username : req.cookies.jwt.username, token: req.cookies.jwt.token }
    res.locals.url = req.originalUrl;
    next()
    }
    catch{ next() }
})

app.use("/app", require('./routes/approuter'))


app.get("*",(req,res)=>{
  res.redirect("/app/login")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(400).send({
        status: 500,
        message: err.message,
        body: {}
    })
})
  



server.listen(PORT, ()=> console.log(`server listening on port ${PORT} open : http://localhost:${PORT}`))
