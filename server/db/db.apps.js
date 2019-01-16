const { Subject } = require('rxjs');
const AppsModel = require('../db/models/apps');

const s = new Subject();
// addApp is not returning anything.. return the document which is being save by using complete
function addApp(req) {
  const app = new AppsModel(req);
  app.save();
}

function findAndUpdateApp(req) {
  // const updates = { timestamp : Date.now() }

  // var date1 = new Date();
  // date1 = date1.toString();
  // var pushobj = AppsModel.find(req)
  AppsModel.findOneAndUpdate({
    appId: req.appId,
    app_URL: req.app_URL,
    userId: req.userId,
    app_name: req.app_name,
    status: req.status,
    
  }, {
    timestamp: req.date,
    deploy_history: req.date,
    // $push: {deploy_history: req.date},
    // $push : { updates : updates }
  }, {
    upsert: true,
    safe: true,
    new: true,
  }, (error, doc) => {
    try {
      s.next(doc);
    } catch (err) {
      s.error(err);
    }
  });
  return s;
}

function getUserApps(data) {
  return new Promise((resolve) => {
    AppsModel.find(data, (err, doc) => {
      resolve(doc);
    });
  });
}

function getAppByAppURL(req) {
  AppsModel.find(req, (err, doc) => {
    try {
      s.next(doc);
    } catch (error) {
      s.error(error);
    }
  });
  return s;
}

function deleteApp(req) {
  AppsModel.findOneAndDelete({ app_URL: req.app_URL, userId: req.userId, appId: req.appId },
    (err, doc) => {
      try {
        s.next(doc);
      } catch (error) {
        s.error(error);
      }
    });
  return s;
}

module.exports = {
  addApp,
  findAndUpdateApp,
  getUserApps,
  getAppByAppURL,
  deleteApp,
};
