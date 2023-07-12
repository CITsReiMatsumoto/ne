//ライブラリ利用宣言
const express = require("express");
const app = express();

//データベース交信
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dataNE');       //dataNE = 作成データ

//データGneの取得
app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select name, kind, mw, ld, from Gne;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"EROOR"});
            }
            res.render('select', {data:row});
        })
    })
})



//未発見時の表記
app.use(function(req, res, next) {
  res.status(404).send('No page');
});

//終了
app.listen(8080, () => console.log("Example app listening on port 8080!"));
