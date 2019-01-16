/* eslint import/no-unresolved: 0 */
/* global it describe beforeEach: true */
const chai = require('chai');
chai.should();
const expect = chai.expect;
const supertest = require('supertest');
const assert = chai.assert;
const chaiHttp = require('chai-http');
// const serverObject = require('../server');
const serverObject = require('../server');
const { app } = serverObject;
chai.use(chaiHttp);


describe('App deployment platform:', () => {
  let request, appName='client-server-db-docker';
  let appUrl='https://github.com/Bhabaranjan19966/Client-Server-Db-Docker';
  let data = {
    'name': 'user',
    'email': 'user@hotmail.com',
    'username': 'user123',
    'profileurl': 'https://gitlab.com/user123'
  }
  beforeEach(() => {
    request = supertest(app);
    console.log('\n');
  });


  it('Should return Login page:  /auth', function(done) {
        request.get('/auth')
          .end((err, res) => {
            if (err) throw err;
    
              res.should.status(302)
            done();
          });
    
       
      });

  it('Should logout', function(done) { 
        request.get('/logout')
          .end((err, res) => {
            if (err) throw err;
            
            expect(res.headers.location).to.equal('/')
            res.should.status(302);
            done();
          });
    
        
      });


  it('ExpressRoute:  /profile', function (done)  {
          request.get('/profile').send({
            data: data
          })
            .end((err, res) => {
              
              expect(res.body.testdata.data.name).to.equal(data.name);
              expect(res.body.testdata.data.email).to.equal(data.email);
              expect(res.body.testdata.data.username).to.equal(data.username);
              expect(res.body.testdata.data.profileurl).to.equal(data.profileurl);
              done();
            })
          
        });  



 


  it('ExpressRoute:  /deploy', function (done) {
        request.post('/deploy').send({
          url: appUrl,
        })
          .end((err, res) => {
            if (err) throw err;
              console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]',res.body)
            // expect(res.body.status).to.equal(1)
            // expect(res.body).to.not.be.a(null)
            done();
          });
    
        
      });


  it('ExpressRoute:  /apps', function(done) {    
        request.get('/apps')
        .send({
          app: appName
        })
          .end((err, res) => {
            if (err) throw err;
            expect(appName).to.equal(res.body[0].app_name)
            done();
          });
    
        
      });

});