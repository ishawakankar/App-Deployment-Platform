const express = require("express");
const router = express.Router();

const { Observable } = require("rxjs");
const { pluck, tap } = require("rxjs/operators");
const appModel = require("../db/models/apps");
const io = require("../server.js");


function webhook_push(req, res) {
    let repoUrl, repo, appID;

    const requestResponseObservable = Observable.create(o => {
        o.next({ req, res });
    });

    const request = requestResponseObservable.pipe(pluck("req"));

    console.log("RES BODY-----------------------:", req.body);

    const url = request.pipe(
        pluck("body"),
        pluck("collector"),
        pluck("url"),
        tap(urlOld => {
            console.log("url entered is *************** ", urlOld);
        })
    );

    const databaseEntry = require("./deploy")(url);

    databaseEntry.subscribe(
        x => {
            console.log("data", x);
            io.io.emit("chat", x);
        },
        e => {
            console.error("error object", e);
        },
        () => console.log("completed")
    );

    // res.json({ status: "ok" });

}

module.exports.webhook_push = webhook_push;