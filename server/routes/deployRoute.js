const express = require("express");
const router = express.Router();

const { Observable } = require("rxjs");
const { pluck, tap } = require("rxjs/operators");
const appModel = require("../db/models/apps");
const io = require("../server.js");
const hook = require("../webhook/webhook");
console.log(io);

router.post("/", (req, res) => {
  if (
    req.body.collector.username !== "" &&
    req.body.collector.password !== "" &&
    appModel.find({ app_URL: req.body.collector.url })
  ) {
    // let user_url = req.body.collector.url.split('/');
    // let store = user_url.length - 1;
    // console.log("this is user url: ", user_url[store]);
    hook(req.body.collector.username, req.body.collector.password, req.body.collector.url);
  } else {
    hello(req, res);
    // res.send({ status: "ok" })
  }
});

function hello(req, res) {
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

module.exports = {
  router: router,
  hello: hello
};