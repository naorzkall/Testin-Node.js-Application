import { expect } from 'chai';
import authMiddleware from '../middleware/is-auth.js';

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
