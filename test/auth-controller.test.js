import { expect } from 'chai';
import authController from '../controllers/auth.js';
import sinon from 'sinon';

import User from '../models/User.js';

describe('Auth Controller',()=>{
    // done from mocha means wait to done
    it('should throw an error with code 500 if accessing the database fails',(done)=>{
        const req = {
            body: {
                email:'test@test.com',
                password: 'tester'
            }
        };
        
        sinon.stub(User,'findOne');
        User.findOne.throws();
        
        authController.login(req,{},()=> {}).then(result => {
            //console.log(result);
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode',500);
            done();

        })
        User.findOne.restore();
    })
});
