import { expect } from 'chai';
import authMiddleware from '../middleware/is-auth.js';

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
    
})
