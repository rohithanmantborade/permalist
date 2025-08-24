import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const db=new pg.Client({
 user: "postgres",
  host: "XXXX",
  database: "XXXX",//enter your database name
  password: "XXXXX",//enter your password
  port: XXX,//enter your port number that server running on that port
});
let items = [];
db.connect();
app.get("/", async(req, res) => {
const result=await db.query("SELECT* FROM items");
  items=result.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
  console.log(items);
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  
  const result=await db.query("INSERT INTO items (title) VALUES ($1)",[item]);
     items=result.rows;
  res.redirect("/");
});

app.post("/edit", (req, res) => {
   const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
 db.query("UPDATE items SET title=($1) WHERE id=($2)",[item,id]);
 res.redirect("/");

});

app.post("/delete", (req, res) => {
  const deletingID=req.body.deleteItemId;
db.query("DELETE FROM items WHERE id=($1)",[deletingID]);
res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
