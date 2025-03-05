import { expect } from 'chai';
import authMiddleware from '../middleware/is-auth.js';
import jwt from 'jsonwebtoken'
import sinon from 'sinon';

// descripe is a mocha method to organize the tests
describe('Auth Middleware',()=>{

    it('should throw an error if no authorization header is present',()=>{
        const req = {
            get: (headerName)=>{
                return null;
            }
        };
        /* 
            I expect this function call to throw an error
            because there is not Authorization header (I give it a req with get function that return null)
        */
        // this gonna pass
        expect(authMiddleware.bind(this,req, {}, ()=>{})).to.throw('Not authenticated');
        
        // ex: this will giva an error
        //expect(authMiddleware.bind(this,req, {}, ()=>{})).to.throw('Not authenticated!');
    
        // you can change somethign in the original function to get an error, like changing an condtition
    });
    
    it('should throw an error if the authorization header is only one string',()=>{
        const req = {
            get: (headerName)=>{
                return 'zdfs';
            }
        };
        // you can pass nothing to 'throw' method if care it the function throw an error
        expect(authMiddleware.bind(this,req, {}, ()=>{})).to.throw(); 
    
    })

    //************************JWT********************************
    /* when do not test if the jwt.verify() works correctly
        we test if our code after that => behaves correctly when verification fails or when Succeed
        (like when we do not get back an object that has a userId for example)

        - for fail we can pass any dummy token
        - for Succeed we have a problem
            we gonna solve it in the next commit

    */
    // fail test
    it('should throw an error if the token cannot be verified',()=>{
        const req = {
            get: (headerName)=>{
                return 'Bearer zdfs';
            }
        };
        expect(authMiddleware.bind(this,req, {}, ()=>{})).to.throw(); 
    })

    // Succeed test using Manual Mocking
    it('should yeild a userId after decoding the token',()=>{
        const req = {
            get: (headerName)=>{
                return 'Bearer dfgdfgdfgdfgdfg';
            }
        };

        // using Manual Mocking
        /* 
        jwt.verify = ()=> {
            return { userId: 'abc' }
        } 
        */

        // using Sinon
        //Create Stub to replace `jwt.verify`
        const verifyStub = sinon.stub(jwt, 'verify');
        // Specify the value to return when `jwt.verify` is called
        verifyStub.returns({ userId: 'abc' });

        authMiddleware(req, {}, ()=>{});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc'); 
        // Ensure that jwt.verify() is running inside the middleware.
        expect(verifyStub.called).to.be.true;

        // Restore original function after testing
        verifyStub.restore();
    })


    
})
