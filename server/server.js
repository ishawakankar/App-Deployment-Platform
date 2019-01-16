/* eslint prefer-destructuring:0 */
/* eslint no-underscore-dangle:0 */
/* eslint import/no-unresolved:0 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const port = process.env.PORT || 5000;
const sockets = require("socket.io");
const config = require("config");
const path = require("path");
const expressWinston = require("express-winston");
const winston = require("winston");
const session = require("express-session");
const authRouter = require("./routes/authentication");
const profileRoute = require("./routes/profileRoute");
const appsRoute = require("./routes/appsRoute");
const logoutRoute = require("./routes/logoutRoute");
const { Observable } = require("rxjs");
const { pluck, tap, map } = require("rxjs/operators");

// const hook = require("./webhook/webhook");
// const { Observable } = require("rxjs");
// const appModel = require("../db/models/apps");
// const { zip, fromEvent, merge } = require('rxjs');
// const { tap, pluck, map, concatMap } = require('rxjs/operators');
// const { spawn } = require('child_process');
// const fs = require('fs');
// const appDb = require('./db/db.apps');
// const passportSetup = require('./passport');
// const authRouter = require('./routes/authentication');
// const appModel = require('./db/models/apps');
const webhook_push = require("./routes/webhook_push");
const deployRoute = require("./routes/deployRoute");

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.static(path.join(__dirname, "./logs")));

// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true,
//     }),
//     new winston.transports.File({
//       filename: 'access.log',
//       level: 'info',
//     }),
//   ],
// }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "data",
    cookie: {
      httpOnly: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const server = app.listen(port, () => {
  console.log(`listening on port ${process.env.HPORT} for app${config.get("rxjs.app")}`);
});

const io = sockets(server);

app.use("/profile", profileRoute);


app.use("/deploy", deployRoute.router);

// app.post('/deploy', (req, res) => {
//   // if (req.body.collector.username !== "" &&
//   //   req.body.collector.password !== "" &&
//   //   appModel.find({ app_URL: req.body.collector.url })
//   // ) {
//   hook(req.body.collector.username, req.body.collector.password, req.body.collector.url);
//   // } else {
//   //   hello(req, res);
//   //   res.send({ status: "ok" })
//   // }

//   let repoUrl, repo, appID;

//   const requestResponseObservable = Observable.create(o => {
//     o.next({ req, res });
//   });

//   const request = requestResponseObservable.pipe(pluck("req"));

//   console.log("RES BODY-----------------------:", req.body);

//   const url = request.pipe(
//     pluck("body"),
//     pluck("collector"),
//     pluck("url"),
//     tap(urlOld => {
//       console.log("url entered is *************** ", urlOld);
//     })
//   );


//   const repoName = url.pipe(map(urlOld => urlOld.split('/').pop().toLowerCase()),
//     tap((repoOld) => {
//       console.log('inside repoOld>>>>>>>>>>> ', repoOld);
//     }));

//   const zipped = zip(url, repoName);
//   const date = new Date();

//   const emission = zipped.pipe(concatMap((data) => {
//     const command = spawn('./scripts/script2.sh', [data[0], data[1]]);
//     repoUrl = data[0];
//     repo = data[1];
//     console.log('hello:21312312: ', repoUrl, repo)
//     const stdout = fromEvent(command.stdout, 'data');
//     const stderr = fromEvent(command.stderr, 'data');
//     return merge(stdout, stderr).pipe(map(dataOld => dataOld.toString('utf-8')));
//   }));

//   const logs = emission.pipe(tap((x) => {
//     fs.stat('logs', (err) => {
//       if (err) {
//         fs.mkdir('logs', (errOld) => {
//           console.error('error occured while creating directory', errOld);
//         });
//       }
//       fs.stat(`logs/${repo}`, (err) => {
//         if (err) {
//           fs.mkdir(`logs/${repo}`, (errOld) => {
//             console.log('created new app logs folder', errOld)
//           })
//         }

//         const data = `[  ${new Date()} ]:- ${x}`;
//         console.log('writing to log file', date.toString())
//         fs.writeFile(`logs/${repo}/${date}.log`, data, { flag: 'a' }, (errOld) => {
//           if (errOld) throw errOld;
//           console.log('The file has been saved!');
//         });
//       })
//     });
//   }));

//   function storeData(urlRec, appName, appId, statusOld) {
//     console.log('in storedata', date)
//     appDb.findAndUpdateApp({
//       appId,
//       userId: 'admin',
//       app_name: appName,
//       status: statusOld,
//       app_URL: urlRec,
//       date: date,
//     });
//   }

//   databaseEntry = logs.pipe(tap((x) => {
//     appID = x.split(' ')[x.split(' ').length - 1];
//     if (String(x).includes('Successfully built')) {
//       appModel
//         .findOne({ app_URL: repoUrl }, (err, success) => {
//           if (success) {

//             appModel.findOneAndUpdate({ app_URL: repoUrl }, { appId: appID, status: 'true', timestamp: date, $push: { deploy_history: date } }, { safe: true }, () => {
//               console.log('IF INSIDE IF CONDITION');
//             });
//           } else {
//             console.log('inside else condition')
//             storeData(repoUrl, repo, appID, 'true');
//           }
//         });
//     } else {

//       storeData(repoUrl, repo, -1, 'false');
//     }
//   }));


//   databaseEntry.subscribe(
//     x => {
//       console.log("data", x);
//       io.emit("chat", x);
//     },
//     e => {
//       console.error("error object", e);
//     },
//     () => console.log("completed")
//   );

//   res.send({ 'status': 'ok' })

// })




app.post("/github_push", (req, res) => {
  console.log('GITHUB PUSH :::::::::::::::::::::::::;;', req);
  console.log("hello: ********************** ", req.body);


  const requestResponseObservable = Observable.create(o => {
    o.next({ req, res });
  });


  const request = requestResponseObservable.pipe(pluck("req"));
  const url = request.pipe(
    pluck("body", "payload"),
    map(i => JSON.parse(i)),
    //tap((data)=>console.log("body" , data)),
    pluck("repository"),
    pluck("clone_url"),
    tap(urlOld => {
      console.log("url entered is *************** ", urlOld);
    })
  );

  const databaseEntry = require("./routes/deploy")(url);

  databaseEntry.subscribe(
    x => {
      console.log("data", x);
      io.emit("chat", x);
    },
    e => {
      console.error("error object", e);
    },
    () => console.log("completed")
  );

  res.json({ status: "ok" });


});























app.use("/apps", appsRoute);

app.use("/logout", logoutRoute);

// app.use('/downloadLog/:name', downloadRoute);

app.get("/downloadLog/:repname/:name", (req, res) => {
  // console.log(req.params);
  //   res.send("file is being downloaded")
  console.log("req.params.name is : ", req.params.name);
  res.download(`${__dirname}/logs/${req.params.repname}/${req.params.name}.log`);
});

// app.use(
//   expressWinston.errorLogger({
//     transports: [
//       new winston.transports.Console({
//         json: true,
//         colorize: true
//       }),
//       new winston.transports.File({
//         filename: "access.log",
//         level: "error"
//       })
//     ]
//   })
// );

module.exports.app = app;
module.exports.io = io;
