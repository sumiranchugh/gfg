// import sinon from "sinon";
// import products from './products';
import app from "../src/app";
import chai from 'chai';
import chaiHttp from 'chai-http';
import util from 'util';
import productService from '../src/services/productService';
import proxy from 'proxyquire';
import sinon from 'sinon';

chai.use(chaiHttp);
let expect = chai.expect;

// proxy('../src/services/productService',{'getTopProducts': []});

describe('products router',  () => {
  it('get all products fail',  (done) => {
    chai.request(app)
                 .get('/api/products/')
                 .end((err, res) => {
                     expect(res.status).to.equal(500);
                     done();
                  });
  });
  it('get all products pass',  (done) => {
    const mock = sinon.mock(productService);
    mock.expects("getTopProducts").once();
    chai.request(app)
                 .get('/api/products/')
                 .end((err, res) => {
                     expect(res.status).to.equal(500);
                     done();
                  });
    mock.verify();              
  });
  it('get filter products pass',  (done) => {
    const mock = sinon.mock(productService);
    mock.expects("getFilteredByName").once();
    chai.request(app)
                 .get('/api/products/filter?q="test"')
                 .end((err, res) => {
                     expect(res.status).to.equal(500);
                     done();
                  });
    mock.verify();              
  });

});