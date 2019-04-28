import { App } from '../src/app';
import { expect } from 'chai';
import sinon from 'sinon';
import { logger } from '../src/utils/logger';
import winston = require('winston');
import sinonChai  from 'sinon-chai'
import chai from 'chai';
import { Server } from 'http';

chai.use(sinonChai);

describe("App", ()=>{
    beforeEach(function() {
        this.stubLogger = sinon.stub(logger, 'info');
      })
      afterEach(function(){
          this.stubLogger.restore();
      })
    it("initialize app", function(){
        const app = new App(1234);
        expect(app).is.exist;
    })
    it("listen method return server", function(){
        const app = new App(1234);
        var server = app.listen();
        expect(server instanceof Server).to.be.true;
    })
})