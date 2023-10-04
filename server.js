const express = require("express");
const PORT = 8000;
const products = require("./products.json");
let app = express();

app.use(function (req, res, next) {
  console.log("before executing the function");
  next();
  console.log("after executing the function");
});

// it will convert the req body to json using express library
app.use(express.json());

// send file
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// send text
app.get("/users", (req, res) => {
  res.send("Get All users");
});

// getting json
// getting json with query parameter

app.get("/products", (req, res) => {
  // res.json(products)
  let { title } = req.query;

  if (title) {
    const searchedProduct = products.products.find(
      (product) => product.title === title
    );
    res.json(searchedProduct || []);
  } else {
    res.json(products);
  }
});

// getting json with path param
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.products.find(
    (product) => product.id === Number.parseInt(id)
  );
  res.json(product);
});

// post call
app.post("/products", (req, res) => {
  console.log("body data", req.body);
  // taking the request body whatever user is passing to the body in post call
  products.products.push(req.body);
  // sending the same
  res.json(req.body);
});

app.delete("/products/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const filteredProduts = products.products.filter(
    (product) => idToDelete !== product.id
  );
  res.status(200).json(filteredProduts);
});
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
