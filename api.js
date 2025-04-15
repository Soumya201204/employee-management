const { FOODIE, FOODITEMS } = require("./dbconnection");

const cors = require("cors");

require("dotenv").config();

const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.get("/", function (request, response) {
  response.json({ message: "this is home page", data: "nothing" });
});

app.post("/api/register", function (request, response) {
  console.log("register data from react: ", request.body);
  console.log("register form data route is working");
  console.log("data from register frontend: ", request.body);

  let registerData = request.body;

  console.log("Register Data:", registerData.email);

  FOODIE.findOne({ email: registerData.email })

    .then(function (queryResult) {
      console.log("find one is executed successfully", queryResult);

      if (queryResult) {
        response.json({ message: "user already created", status: false });
      } else {
        FOODIE.insertOne(registerData)

          .then(function (queryResult) {
            console.log("Registered data inserted successfully");
            response
              .status(201)
              .json({
                message: "user data registered successfully",
                status: true,
              });
          })

          .catch(function (error) {
            console.log("Failed to insert register data", error);
            response.json({
              message: "Failed to insert user registered data",
              status: false,
            });
          });
      }
    })

    .catch(function (error) {
      console.log("Failed to execute find One query", error);
    });
});

app.post("/api/login", function (request, response) {
  console.log("login form data", request.body);
  const loginData = request.body;
  console.log("login email:", loginData.email);
  0;

  FOODIE.findOne({ email: loginData.email })

    .then(function (queryResult) {
      console.log("login data in database:", queryResult);

      if (queryResult) {
        if (queryResult.password === loginData.password) {
          response
            .status(200)
            .json({ message: "Login Successfull", status: true });
        } else {
          response
            .status(203)
            .json({ message: "Incorrect password", status: false });
        }
      } else {
        response
          .status(203)
          .json({ message: "user does not exits...", status: false });
      }
    })

    .catch(function (error) {
      console.log("Failed to search login data:", error);
    });
});

app.post("/api/addFoodItem", function (request, response) {
  console.log("food data from frontend: ", request.body);

  FOODITEMS.insertOne(request.body)

    .then(function (queryResult) {
      console.log("data inserted successfully:", queryResult);
      response.json({ message: "Inserted data successfully", status: true });
    })

    .catch(function (error) {
      console.log("failed to insert data: ", error);
      response.json({ messgae: "failed to insert data", status: false });
    });
});

app.get("/api/food", function (request, response) {
  console.log("Food items Query Data: ", request.query);
  let { filterQuery, searchQuery } = request.query;

  if (filterQuery === "all" && searchQuery === "") {
    FOODITEMS.find()
      .then(function (result) {
        response.json(result);
      })
      .catch(function (error) {
        response.json({ message: "Failed to fetch food data", err: error });
      });
  } else if (filterQuery === "all" && searchQuery !== "") {
    FOODITEMS.find({ name: { $regex: searchQuery, $options: "i" } })
      .then(function (result) {
        response.json(result);
      })
      .catch(function (error) {
        response.json({ message: "Failed to fetch food data", err: error });
      });
  } else {
    FOODITEMS.find({name: { $regex: searchQuery, $options: "i" },category: { $regex: filterQuery, $options: "i" },})
      .then(function (result) {
        response.json(result);
      })
      .catch(function (error) {
        response.json({ message: "Failed to fetch food data", err: error });
      });
  }
});

let PORT = process.env.API_PORT || 5050;

app.listen(PORT, function () {
  console.log(`your api is running in ${PORT}`);
});
