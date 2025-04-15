const express = require("express");

const { USERS } = require("./Database/dbconnect");

const { name } = require("ejs");

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.get("/", function (request, response) {

  response.sendFile(__dirname + "/welcome.html");
});

app.get("/login", function (request, response) {

  response.sendFile(__dirname + "/loginpsge.html");
});

app.post("/login-form-data", function (request, response) {

  console.log("login form data", request.body);
  const loginData = request.body;
  console.log("login email:", loginData.email);
  0;

  USERS.findOne({ email: loginData.email })

    .then(function (queryResult) {

      console.log("login data in database:", queryResult);

      if (queryResult) {

        if (queryResult.password === loginData.password) {

          response.redirect("/dashboard");
        } 
        
        else {

          response.render('message.ejs', {message: 'incorrect password', text_message: 'your password is not correct please create password'});
        }

      } 
      
      else {

        response.render('message.ejs', {message: 'user does not exits...', text_message: 'your account is not created please create your account'});

      }

    })

    .catch(function (error) {

      console.log("Failed to search login data:", error);
    });

});

app.get("/register", function (request, response) {

  response.sendFile(__dirname + "/Register.html");
});

app.post(`/Register-form-data`, function (request, response) {

  console.log("register form data route is working");
  console.log("data from register frontend: ", request.body);

  let registerData = request.body;

  console.log("Register Data:", registerData.email);

  USERS.findOne({ email: registerData.email })

    .then(function (queryResult) {

      console.log("find one is executed successfully", queryResult);

      if (queryResult) {

        response.send("user already exists with this email");
      }

       else {

        USERS.insertOne(registerData)

          .then(function () {

            console.log("Registered data inserted successfully");
            response.redirect('/login')
          
          })

          .catch(function (error) {

            console.log("Failed to insert register data", error);
            response.send("Failed to insert user registered data ");
          });

      }

    })

    .catch(function (error) {

      console.log("Failed to execute find One query", error);
    });

});

let empData = [
  { name: "soumya", job: "operator" },
  { name: "sai", job: "engineer" },
  { name: "srushti", job: "operator" },
];

app.get("/dashboard", function (request, response) {

  console.log('searched data by user: ', request.query)
  const searchData = request.query.searchData?.trim() || ''

  USERS.find()


    .then(function (queryResult) {

      console.log("all users data in dashboard:", queryResult);

       let final_data = queryResult.filter(function(user){

         return user.name?.toLowerCase().includes(searchData.toLowerCase()) || user.email?.toLowerCase().includes(searchData.toLowerCase()) || user.company?.toLowerCase().includes(searchData.toLowerCase())
      })

      response.render("dashboard.ejs", { data: final_data });
    })

    .catch(function (error) {

      console.log("failed to fetch all users data:", error);
      response.send("failed to fetch all users data from database");
    });

});

app.get("/delete-user/:user_id", function (request, response) {

  console.log("delete ID: ", request.params);
  console.log("Only id from Delete: ", request.params.user_id);

  USERS.deleteOne({ _id: request.params.user_id })

    .then(function (queryResult) {

      console.log("deleted users Id result: ", queryResult);
      response.redirect("/dashboard")
    })

    .catch(function (error) {

      console.log("Failed to delte user data: ", error);
      response.send("failed to delete User Id data");
    });

});

app.get('/search', function (request, response){

  console.log("Quaries from frontend: ", request.query);
  response.send("search functionality is working")
})

app.get("/edit-user/:userId", function (request, response) {

  console.log("Edit user ID: ", request.params);
  console.log("Only ID form Edit: ", request.params.userId);

  USERS.findOne({ _id: request.params.userId })

    .then(function (queryResult) {

      console.log("edit User Data: ", queryResult);
      response.render("edit.ejs", { userdata: queryResult });
    })

    .catch(function (error) {

      console.log("Got some Error while fetching Edit Data:", error);
      response.send("Failed to Fetch edit data of User");
    });

});

app.post(`/update-form-data/:userId`, function (request, response) {

  console.log('update data form edit form:', request.body);
  console.log('update user ID: ', request.params.userId);

  USERS.updateOne({ _id: request.params.userId }, { $set: request.body })

    .then(function (queryResult) {

      console.log('updated User Data:', queryResult);
      response.redirect('/dashboard')
    })

    .catch(function (error) {

      console.log('Failed to update User Data:', error);
      response.send('Failed to update User Data');
    }); 

});

let PORT = 12000;
app.listen(PORT, function () {
  console.log(`your server is running in http://localhost:${PORT}`);
});
