const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const expressLayout = require('express-ejs-layouts');
const fs = require('fs');
const csv = require('csv-parser');
const fast = require('fast-csv');
const multer = require('multer')
const path = require('path')
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayout);


app.use(express.static("./public"));

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});


app.get('/', (req, res) => {
    res.render('index');
  });

   app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
    console.log("req.file.filename",req.file.filename);
    let stream = fs.createReadStream(__dirname + '/uploads/' + req.file.filename);
    let csvData = [];
    console.log("going to parse the csv file");
    
stream.pipe(fast.parse())
.on('data', row => csvData.push(row))
.on('error', function (data){
    console.log("data is ",csvData);
    return false;
})
.on('end', function(){
     res.render('render',{
        status : 200,
        data : csvData});
    // res.render('/');
});
   });
// function UploadCsvDataToMySQL(filePath){
//     let stream = fs.createReadStream(filePath);
//     let csvData = [];
//     console.log("going to parse the csv file");
    
// stream.pipe(fast.parse())
// .on('data', row => csvData.push(row))
// .on('error', function (data){
//     console.log("data is ",csvData);
//     return false;
// })
// .on('end', function(){
//     res.json({data : csvData});   
// }
// )
// }

const PORT =  8000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
