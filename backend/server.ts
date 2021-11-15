import express from "express";
/* const express = require('express'); */
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require("mongoose");
import cors = require("cors");
import "dotenv/config";

const db_url:string = process.env.DB_URL ? process.env.DB_URL : "";
const user: string = process.env.DB_USERNAME ? process.env.DB_USERNAME : "";
const password:string = process.env.PASSWORD ? process.env.PASSWORD : ""
const database:string = process.env.DATABASE ? process.env.DATABASE : "";

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app

    });

    app.use(cors());

    await mongoose.connect(`mongodb://${user}:${password}@${db_url}/${database}?authSource=it2810&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    console.log("Mongoose connected..")

    app.listen(4000, () => console.log("Server is running on port 4000"));
}
startServer();

export {}