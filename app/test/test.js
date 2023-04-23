let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../test-server.js');

chai.should();

chai.use(chaiHttp);

describe("TEST STOCKY", () => {
    //GET
    describe("GET LOGIN PAGE", (done) => {
        it("It should render login page", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });
    //POST
    describe("CHECK AUTH", (done) => {
        it("It should check username and password", (done) => {
            const auth = {
                username: "lol",
                password: "lol"
            };
            chai.request(server)
                .post("/auth")
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    //GET
    describe("GET CLIENTS LIST", (done) => {
        it("It should render a list of clients", (done) => {
            chai.request(server)
                .get("/api/clients")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

    //POST
    describe("ADD CLIENT", (done) => {
        it("It should add a client", (done) => {
            const client = {
                roles: "ROLE_ADMIN",
                firstname: "bro",
                lastname: "bro",
                gender_id: 1,
                username: "kiwi",
                password: "bro",
                registration_date: '2021-05-22 22:12:20',
                address: "lol",
                postal_code: "lol",
                cgu_status: 1,
                enabled: 1,
                birthdate: '2021-05-22 22:12:20',
                restaurant_id: 3
            };
            chai.request(server)
                .post("/api/clients")
                .send(client)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    //UPDATE 
    describe("UPDATE CLIENT", (done) => {
        it("It should update client info", (done) => {
            const client = {
                roles: "ROLE_ADMIN",
                firstname: "baby",
                lastname: "bro",
                gender_id: 1,
                username: "kiwi",
                password: "bro",
                registration_date: '2021-05-22 22:12:20',
                address: "lol",
                postal_code: "lol",
                cgu_status: 1,
                enabled: 1,
                birthdate: '2021-05-22 22:12:20',
                restaurant_id: 3
            };
            chai.request(server)
                .put("/api/clients/66")
                .send(client)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    //DELETE 
    describe("DELETE CLIENT", (done) => {
        it("It should delete a client", (done) => {
            chai.request(server)
                .delete("/api/clients/66")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    //GET
    describe("GET RESTAURANTS", (done) => {
        it("It should display the restaurants", (done) => {
            chai.request(server)
                .get("/restaurants")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });
    //GET
    describe("GET ORDERS", (done) => {
        it("It should display a list of orders", (done) => {
            chai.request(server)
                .get("/orders")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    //GET
    describe("GET DISHES", (done) => {
        it("It should display a list of dishes", (done) => {
            chai.request(server)
                .get("/dishes")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    //LOGOUT
    describe("LOGOUT", (done) => {
        it("It should logout", (done) => {
            chai.request(server)
                .get("/logout")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })
});