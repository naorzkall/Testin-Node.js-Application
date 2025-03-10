import { expect } from 'chai';
import authController from '../controllers/auth.js';
import sinon from 'sinon';

import mongoose from 'mongoose';
import User from '../models/User.js';

// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

before(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-RestApi', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

after(async () => {
    await mongoose.disconnect();
});

/* afterEach(async () => {
    await User.deleteMany({});
}); */

// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

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

    it('should send a response with valid user status for an existing user', async () => {
        // إنشاء مستخدم وهمي
        const user = new User({
            email: 'test@test.com',
            password: 'hashedpassword',
            name: 'Test User',
            posts: [],
            _id: new mongoose.Types.ObjectId(), 
        });
        await user.save();
    
        const req = { userId: user._id.toString() };
        
        const res = {
            statusCode: 500,
            userStatus: null,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(data) {
                this.userStatus = data.status;
            }
        };
    
        await authController.getUserStatus(req, res, () => {});
    
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal('I am new');
    });
});
