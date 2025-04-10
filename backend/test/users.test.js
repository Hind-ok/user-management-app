const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const app = require('../server'); // Assure-toi que ce fichier exporte bien l'app express

describe('Test de l\'API Users', () => {
  it('GET /users devrait retourner un tableau', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
