const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const expect = chai.expect;
const express = require('express')


chai.use(chaiHttp);
// app.use(express.json)

describe('Calendar API', () => {
  let server; 

//   before((done) => {
//   server = app.listen(4000, (err) => {
//     if (err) {
//       console.error(err);
//       done(err);
//     } else {
//       console.log('Server is running on port 3000');
//       done();
//     }
//   });
// });

  after((done) => {
    if (server) {
      server.close(() => {
        console.log('Server has been closed for testing');
        done();
      });
    } else {
      console.error('Server is undefined; could not close it.');
      done();
    }
  });

  it('should create a new event', (done) => {
    chai
      .request(app)
      .post('/api/events')
      .send({
        title: 'Test Event',
        description: 'This is a test event',
        start: new Date(),
        end: new Date(),
        priority: 'high',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', 'Test Event');
        done();
      });
  });
});
