
const octokit = require('@octokit/rest')();
const ngrok = require('ngrok');

let url_new;
(async function () {
  url_new = await ngrok.connect(5000);
})();

module.exports = function hook(username, password, repo) {
  console.log('username in hook______________________________________', username);
  console.log('password in hook______________________________________', password);
  console.log('reponame in hook______________________________________', repo);

  const lastslashindex = repo.lastIndexOf('/');
  var result = repo.substring(lastslashindex + 1).replace(".git", "")
  octokit.authenticate({
    type: 'basic',
    username: "ishawakankar",
    password: "Saif@12345",
  });

  octokit.repos.createHook({

    owner: "ishawakankar",
    repo: result,
    name: 'web',
    events: ['push'],

    config: {
      content_type: 'application/json',
      url: `${url_new}/github_push`,
    },
  }).then(result => console.log('response from github after webhook enabled', result))


};


