import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db_family_db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "family_travel_tracker_db",
  password: "pg$eRv@",
  port: 5432,
});
db_family_db.connect();

const db_countries = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "pg$eRv@",
  port: 5432,
});
db_countries.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function populateUsersList() {
  try {
    // SQL query to retrieve data from the "family_member" table
    const result = await db_family_db.query(
      "SELECT id, first_name, color FROM family_member"
    );

    // Map the query result to the desired JSON format and push each item into the users array
    result.rows.forEach((row) => {
      users.push({
        id: row.id,
        name: row.first_name,
        color: row.color,
      });
    });

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

async function checkVisisted() {
  // [X] Only fetch country codes of currentUserId

  const result_new = await db_family_db.query(
    "SELECT family_member.id, country_code, family_member_id FROM family_member JOIN visited_country ON family_member.id = family_member_id WHERE family_member_id = $1",
    [currentUserId]
  );

  let countries_new = [];
  result_new.rows.forEach((country) => {
    countries_new.push(country.country_code);
  });

  return countries_new;
}

app.get("/", async (req, res) => {
  // [X] Create function that checks the list of family members SQL table & populates the "users = []" with the id, name & color

  if (users.length === 0) {
    await populateUsersList();
  }

  const countries = await checkVisisted();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

app.post("/add", async (req, res) => {
  // [X] Convert this function to use my SQL tables
  // [X]  - Get country code from countries SQL table
  // [X]  - Insert into "visited_country" table with the relevant family_member_id, get from "currentUserId" - need to ensure that
  //       "currentUserId" gets changed when switching family member's tab

  const input = req.body["country"];
  // console.log(input);
  // console.log("currentUserId", currentUserId);

  try {
    const result = await db_countries.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const countryCode = result.rows[0].country_code;
    console.log("countryCode", countryCode);
    try {
      await db_family_db.query(
        "INSERT INTO visited_country (country_code, family_member_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  // console.log(req.body);

  if (req.body.add) {
    res.render("new.ejs");
  } else {
    // [X] Set "currentUserId" to this id (get id from "users = []")
    // [X] Then redirect to "/" - where it shows the data of the currentUserId
    currentUserId = req.body.user;
    res.redirect("/");
    console.log("currentUserId", currentUserId);
    // console.log("This must id from family members SQL table");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  // console.log(req.body);

  // [X] Take the req.body & add to the list of family_members in the SQL table
  // [X] Then update the "users = []" with the new family members SQL table list

  try {
    const result = await db_family_db.query(
      "INSERT INTO family_member (first_name, color) VALUES ($1, $2) RETURNING id",
      [req.body.name, req.body.color]
    );

    let id_new = result.rows[0].id;
    console.log("id", id_new);

    let data = { id: id_new, name: req.body.name, color: req.body.color };
    users.push(data);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
