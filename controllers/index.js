const router = require('express').Router();
const { WatchListContents } = require('../models');
const cors = require('cors')
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
// obtain data from database
//get
router.get('/watch-list-contents', cors(corsOptions), async (req, res) => {
    try{ 
        const tag = req.query.tag;
        const user = req.query.user;
        const dbGetData = await WatchListContents.findAll({
            where: {
                user_id: user, 
                tag_id: tag,
            }
        });
        res.status(200).json(dbGetData);
    }catch(err){
        console.error('error', err)
        res.status(500).json(err);
    }
});


//post
router.post('/watch-list-contents', cors(corsOptions), async (req, res) => {
    try{ 
        const dbWatchListContentsData = await WatchListContents.create({
            title: req.body.title,
            image_url: req.body.image_url,
            tag_id: req.body.tag_id,
            user_id: req.body.user_id
        }, {
            plain: true
        });
        res.status(200).json({ message: "Content added" });
    }catch(err){
        console.error('error', err)
        res.status(500).json(err);
    }
});

module.exports = router;