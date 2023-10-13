const { Router } = require('express');

const auth = Router();
auth.post('/api/signup', 'something');
auth.post('/api/login', 'something');
auth.get('/api/logout', 'test');


export default auth;