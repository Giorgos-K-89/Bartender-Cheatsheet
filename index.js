import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const cocktail = response.data.drinks[0];
    res.render("index.ejs", { data: [cocktail] });
  } catch (error) {
    res.render("index.ejs", {
      error: "An error occurred while fetching cocktails.",
    });
  }
});

app.post("/search-cocktail", async (req, res) => {
  const name = req.body.name;
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    const cocktails = response.data.drinks;
    if (cocktails === null) {
      res.render("index.ejs", { error: "No cocktails found with that name." });
    } else {
      res.render("index.ejs", { data: cocktails });
    }
  } catch (error) {
    console.error("Failed to make request:", error);
    res.render("index.ejs", {
      error: "An error occurred while fetching cocktails.",
    });
  }
});
// anchor tag apo to spirits.ejs--------------------
app.get("/search-cocktail/:name", async (req, res) => {
  const cocktailName = decodeURIComponent(req.params.name);
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    );
    const cocktails = response.data.drinks;
    if (cocktails === null) {
      res.render("index.ejs", { error: "No cocktails found with that name." });
    } else {
      res.render("index.ejs", { data: cocktails });
    }
  } catch (error) {
    console.error("Failed to make request:", error);
    res.render("index.ejs", {
      error: "An error occurred while fetching cocktails.",
    });
  }
});
// anchor tag apo to spirits.ejs--------------------
app.post("/search-spirit", async (req, res) => {
  const name = req.body.spirit;
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
    );
    const cocktails = response.data.drinks;
    res.render("spirits.ejs", { data: cocktails });
  } catch (error) {
    res.render("index.ejs", {
      error: "An error occurred while fetching cocktails.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
