const router = require('express').Router();
const { WatchListContents } = require('../models');


// obtain data from database

router.get('/watch-list-contents', async (req, res) => {
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


module.exports = router;