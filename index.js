const { NlpManager } = require('node-nlp')
const express = require('express');
const mgr = new NlpManager(({ languages: ['en', 'vn'] }))
const app = express()
const serverless = require('serverless-http')
mgr.addDocument('en', 'hello', 'greeting')
mgr.addDocument('en', 'hi', 'greeting')
mgr.addDocument('en', 'good morning', 'greeting')
mgr.addDocument('en', 'hey', 'greeting')
mgr.addDocument('en', 'good afternoon', 'greeting')

mgr.addDocument('en', 'fine', 'feeling')
mgr.addDocument('en', 'good', 'feeling')
mgr.addDocument('en', 'Feeling good', 'feeling')
mgr.addDocument('en', `I'm fine`, 'feeling')

mgr.addDocument('vn', 'xin chao', 'greeting-vn')
mgr.addDocument('vn', 'chao', 'greeting-vn')



mgr.addAnswer('en', 'greeting', 'Hi')
mgr.addAnswer('en', 'greeting', 'Hi there')
mgr.addAnswer('en', 'greeting', 'Hi! How are you? ')

mgr.addAnswer('en', 'feeling', 'Great! What do you want')
mgr.addAnswer('en', 'feeling', 'Great!')

mgr.addAnswer('vn', 'greeting-vn', 'Xin chao')
mgr.addAnswer('vn', 'greeting-vn', 'Chao ban')

const router = express.Router()

mgr.train().then(async () => {
    mgr.save()
    router.get('/bot', async(req, res) => {
        let resp = await mgr.process('en', req.query.message)
        res.send(resp.answer)
    })
    
    app.use('/.netlify/',router)

    app.listen(3000)

})

module.exports.handler = serverless(app)
