const express = require('express');
const router = express.Router();

// const bodyParser = require('body-parser');
const {
    zip, fromEvent, merge,
} = require('rxjs');
const {
    map, concatMap, tap,
} = require('rxjs/operators');
const { spawn } = require('child_process');
const fs = require('fs');
const appDb = require('../db/db.apps');
// const passportSetup = require('./passport');
// const authRouter = require('./routes/authentication');
const appModel = require('../db/models/apps');

module.exports = (url) => {

    const repoName = url.pipe(map(urlOld => urlOld.split('/').pop().toLowerCase()),
        tap((repoOld) => {
            console.log('inside repoOld>>>>>>>>>>> ', repoOld);
        }));

    const zipped = zip(url, repoName);
    const date = new Date();

    const emission = zipped.pipe(concatMap((data) => {
        const command = spawn('./scripts/script2.sh', [data[0], data[1]]);
        repoUrl = data[0];
        repo = data[1];
        console.log('hello:21312312: ', repoUrl, repo)
        const stdout = fromEvent(command.stdout, 'data');
        const stderr = fromEvent(command.stderr, 'data');
        return merge(stdout, stderr).pipe(map(dataOld => dataOld.toString('utf-8')));
    }));

    const logs = emission.pipe(tap((x) => {
        fs.stat('logs', (err) => {
            if (err) {
                fs.mkdir('logs', (errOld) => {
                    console.error('error occured while creating directory', errOld);
                });
            }
            fs.stat(`logs/${repo}`, (err) => {
                if (err) {
                    fs.mkdir(`logs/${repo}`, (errOld) => {
                        console.log('created new app logs folder', errOld)
                    })
                }

                const data = `[  ${new Date()} ]:- ${x}`;
                console.log('writing to log file', date.toString())
                fs.writeFile(`logs/${repo}/${date}.log`, data, { flag: 'a' }, (errOld) => {
                    if (errOld) throw errOld;
                    console.log('The file has been saved!');
                });
            })
        });
    }));

    function storeData(urlRec, appName, appId, statusOld) {
        console.log('in storedata', date)
        appDb.findAndUpdateApp({
            appId,
            userId: 'admin',
            app_name: appName,
            status: statusOld,
            app_URL: urlRec,
            date: date,
        });
    }

    return databaseEntry = logs.pipe(tap((x) => {
        appID = x.split(' ')[x.split(' ').length - 1];
        if (String(x).includes('Successfully built')) {
            appModel
                .findOne({ app_URL: repoUrl }, (err, success) => {
                    if (success) {

                        appModel.findOneAndUpdate({ app_URL: repoUrl }, { appId: appID, status: 'true', timestamp: date, $push: { deploy_history: date } }, { safe: true }, () => {
                            console.log('IF INSIDE IF CONDITION');
                        });
                    } else {
                        console.log('inside else condition')
                        storeData(repoUrl, repo, appID, 'true');
                    }
                });
        } else {

            storeData(repoUrl, repo, -1, 'false');
        }
    }));
}