import { expect } from 'chai';
import feedController from '../controllers/feed.js';
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

afterEach(async () => {
    await User.deleteMany({});
});

// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

describe('feed Controller',()=>{

    it('should add a created post to the posts of the creator', async () => {
        // create dummy user
        const user = new User({
            email: 'addpost@test.com',
            password: 'hashedpassword',
            name: 'Test User',
            posts: [],
            _id: new mongoose.Types.ObjectId(), 
        });
        await user.save();

        //  dummy req
        const req = {
            body:{
                title : 'Test Post',
                content:'A test Post'
            },
            file:{
                path: 'fakepath/image.jpg'
            },
            userId: user._id.toString()
        }

        // dummy response 
        const res = {
            statusCode: 500,
            
            // res.status(200) and res.json(data)
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(data) {
                this.data = data;
            }
        };
        
    
        const savedUser = await feedController.createPost(req, res, () => {});
    
        expect(savedUser).to.have.property('posts');
        expect(savedUser.posts).to.have.length(1);
        
    });
});
