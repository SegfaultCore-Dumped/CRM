require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
//const mysql = require('mysql');
const db2 = require("./models");
//const cors = require("cors");
const bcrypt = require("bcryptjs");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const generator = require("generate-password");
var session = require("express-session");
const config = require("./config/config.js");
var path = require("path");
const Chart = require("chart.js");
const cookieParser = require("cookie-parser");
const { db } = require("./config/config.js");
const { prototypes } = require("events");
const fetch = require("node-fetch");
const account = require("./models/account");
const { Console } = require("console");

//session connection
var user;
var login;
var super_data;

// connection to mysql
// var connection = mysql.createConnection({
//     host: db.DB_HOST,
//     user: db.DB_USER,
//     password: db.DB_PASS,
//     database: db.DB_NAME
// });

const app = express();

//set up templates
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

var today = new Date();
var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

// LOGIN PAGE
app.get("/", async (req, res) => {
    //res.sendFile(path.join(__dirname + '/login.html'));
    // const data = await a();
    // console.log("jejeejjee", data);
    if (login == true && user == req.session.username) res.redirect("/home");
    else res.render(__dirname + "/views/login");
});

const Account = db2.models.account;
const Restaurant = db2.models.restaurant;

function comparePasswords(p1, p2) {
    try {
        let result = bcrypt.compareSync(p1, p2);
        return result;
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

async function loGin(usern, pass) {
    const account = await Account.findOne({ where: { username: usern } });
    if (!account) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, account.password);
    if (!isPasswordValid) {
        return null;
    }
    return account;
}

async function alreadyloGin(usern) {
    const data = await Account.findAll({
        where: {
            username: usern,
        },
    });
    return data;
}

async function getAllUsers() {
    const data = await Account.findAll();
    return data;
}

async function getRoles() {
    const data = await Account.findAll({
        where: {
            roles: "ROLE_SUPER_ADMIN",
        },
    });
    return data;
}

function hashPassword(password, salt = 10) {
    try {
        return bcrypt.hashSync(password, salt);
    } catch (e) {
        console.log(`Bcrypt Error: Unable to hash password.`);
    }
}

async function addUser(user) {
    if (
        (await Account.findAll({ where: { username: user.username } })).length
    ) {
        return undefined;
    }

    const data = await Account.create({
        roles: user.roles,
        firstname: user.firstname,
        lastname: user.lastname,
        gender_id: user.gender_id,
        username: user.username,
        password: hashPassword(user.password),
        registration_date: dateTime,
        address: user.address,
        postal_code: user.postal_code,
        cgu_status: 1,
        enabled: 1,
        birthdate: null,
        restaurant_id: 3,
    });
    return data;
}

async function updateUser(user, id) {
    const data = await Account.update(
        {
            roles: user.roles,
            firstname: user.firstname,
            lastname: user.lastname,
            gender_id: user.gender_id,
            //username: user.username,
            registration_date: dateTime,
            address: user.address,
            postal_code: user.postal_code,
            cgu_status: 1,
            enabled: 1,
            birthdate: null,
            restaurant_id: 3,
        },
        {
            where: {
                id: id,
            },
        }
    );
    return data;
}

async function deleteUser(id) {
    const data = await Account.destroy({
        where: {
            id: id,
        },
    });
    return data;
}

async function getRestaurants() {
    const data = await Restaurant.findAll();
    return data;
}
// async function a() {
//     const data = await b();
//     return data;
// }

function comparePasswords(p1, p2) {
    try {
        let result = bcrypt.compareSync(p1, p2);
        return result;
    } catch (e) {
        throw new Api500Error(
            `Bcrypt Error. Unable to compare passwords.  Error: ${e}`
        );
    }
}

//VERIFY LOGIN
app.post("/auth", async function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        console.log("pipi");
        data = await loGin(username, password);
        console.log("caca");
        if (Object.keys(data).length > 0) {
            console.log(data);
            super_data = data;
            request.session.loggedin = true;
            login = true;
            request.session.username = username;
            user = username;
            response.redirect("/home");
        } else {
            response.redirect("/");
        }
    } else {
        response.redirect("/");
        //response.end();
    }
});

//HOME PAGE
app.get("/home", function (request, response) {
    if (request.session.loggedin) {
        //console.log("heheheh", super_data);
        response.render(__dirname + "/views/home", {
            id: data.id,
            name: data.firstname,
            lastname: data.lastname,
            numRows: data.id,
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
        //});
    } else {
        response.redirect("/");
    }
    console.log("home");
    //response.end();
});

//Restaurants page
app.get("/restaurants", function (request, response) {
    if (request.session.loggedin) {
        // connection.query('SELECT id, firstname, lastname FROM account WHERE username = ? AND (roles = "SUPER_ADMIN" OR roles = "ROLE_SUPER_ADMIN")', [request.session.username], function (err, results, fields) {
        //if (err) throw err;
        //console.log(results);
        response.render(__dirname + "/views/restaurants", {
            id: data.id,
            name: data.firstname,
            lastname: data.lastname,
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
    } else {
        response.redirect("/");
    }
    console.log("restaurants");
    //response.end();
});

//profil page
app.get("/profil", function (request, response) {
    if (request.session.loggedin) {
        console.log(data);
        response.render(__dirname + "/views/profil", {
            id: data.id,
            name: data.firstname,
            lastname: data.lastname,
            // address: super_data.address,
            // postal_code: super_data.postal_code
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
    } else {
        response.redirect("/");
    }
    console.log("profil");
    //response.end();
});

//finances page
app.get("/finances", function (request, response) {
    if (request.session.loggedin) {
        response.render(__dirname + "/views/finances", {
            id: data.id,
            name: data.firstname,
            lastname: data.lastname,
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
    } else {
        response.redirect("/");
    }
    console.log("finances");
});

//data-analysys page
app.get("/data-analysis", function (request, response) {
    if (request.session.loggedin) {
        //console.log(super_data);
        response.render(__dirname + "/views/data-analysis", {
            id: data.id,
            name: data.firstname,
            lastname: data.lastname,
            numRows: data.length,
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
    } else {
        response.redirect("/");
    }
    console.log("data-analysis");
    //response.end();
});

//faq page
app.get("/faq", function (request, response) {
    if (request.session.loggedin) {
        response.render(__dirname + "/views/faq", {
            id: data.id,
            name: data.firstname,
            lastname: data.lastname,
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
    } else {
        response.redirect("/");
    }
    console.log("faq");
    //response.end();
});

//Conexions page
app.get("/connexions", function (request, response) {
    if (request.session.loggedin) {
        //console.log(results);
        response.render(__dirname + "/views/connexions", {
            id: super_data.id,
            name: super_data.firstname,
            lastname: super_data.lastname,
        }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
    } else {
        response.redirect("/");
    }
    console.log("connnexions");
});

app.get("/test", function (request, response) {
    if (request.session.loggedin) {
        connection.query(
            'SELECT id, firstname, lastname FROM account WHERE username = ? AND (roles = "SUPER_ADMIN" OR roles = "ROLE_SUPER_ADMIN")',
            [request.session.username],
            function (err, results, fields) {
                if (err) throw err;
                //console.log(results);
                response.render(__dirname + "/views/test", {
                    id: results.id,
                    name: results.firstname,
                    lastname: results.lastname,
                }); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
            }
        );
    } else {
        response.send("Please login to view this page!");
    }
    console.log("test");
});

app.get("/api/users", async function (req, res) {
    if (login == true && user == req.session.username) {
        const data = await getAllUsers();
        res.send(data);
    } else res.redirect("/");
});

//call route to display all clients on backoffice homepage (home.ejs)
app.get("/api/clients", async function (req, res) {
    if (login == true && user == req.session.username) {
        const data = await getRoles();

        const modifiedResponse = data.map((account) => {
            const copy = {
                ...account,
            };
            copy.dataValues.registration_date = new Date(
                account.dataValues.registration_date
            ).toLocaleString();
            return copy;
        });
        res.send(data);
    } else res.redirect("/");
});

//get show restaurants
app.get("/api/restaurants", async function (req, res) {
    if (login == true && user == req.session.username) {
        const data = await getRestaurants();
        console.log(data);
        res.send(data);
    } else res.redirect("/");
});

function createPassword(length = 16) {
    return generator.generate({
        length: 16,
        numbers: true,
        symbols: true,
    });
}

function sendEmail({ subject, templateId, sender, params, receiver }) {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.templateId = templateId;
    sendSmtpEmail.sender = { name: "CRM", email: sender };
    sendSmtpEmail.to = [{ email: receiver }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = params;
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
            console.log(
                "API called successfully. Returned data: " +
                    JSON.stringify(data)
            );
        },
        function (error) {
            console.error(error);
        }
    );
}
//POST ADD CLIENT
app.post("/api/clients", async function (req, res) {
    if (login == true && user == req.session.username) {
        var client = {
            roles: req.body.roles,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender_id: req.body.gender_id,
            username: req.body.username,
            password: createPassword(),
            registration_date: dateTime,
            address: req.body.address,
            postal_code: req.body.postal_code,
            cgu_status: 1,
            enabled: 1,
            birthdate: null,
            restaurant_id: 3,
        };
        const data = await addUser(client);
        if (!data) {
            res.status(400).send({ message: "USER_ALREADY_EXISTS" });
            return;
        }
        sendEmail({
            subject: "New account",
            templateId: 1,
            sender: "olakasenahora@gmail.com",
            params: { password: client.password },
            receiver: client.username,
        });
        res.send(data);
    } else res.redirect("/");
});

//UPDATE CLIENT INFO
app.put("/api/clients/:id", async function (req, res) {
    if (login == true && user == req.session.username) {
        var client = {
            roles: req.body.roles,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender_id: req.body.gender_id,
            username: req.body.username,
            registration_date: dateTime,
            address: req.body.address,
            postal_code: req.body.postal_code,
            cgu_status: 1,
            enabled: 1,
            birthdate: null,
            restaurant_id: 3,
        };
        const data = await updateUser(client, req.params.id);
        res.send(data);
    } else res.redirect("/");
});

//DELETE CLIENT
app.delete("/api/clients/:id", async function (req, res) {
    if (login == true && user == req.session.username) {
        //console.log(req.body);
        const data = await deleteUser(req.params.id);
        res.sendStatus(200);
    } else res.redirect("/");
});

//LOGOUT
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/"); //Inside a callback… bulletproof!
    });
});

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
