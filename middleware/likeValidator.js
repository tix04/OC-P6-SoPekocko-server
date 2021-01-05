const likeValidator = (req, res, next) => {
    let userId = req.body.userId;
    let like = req.body.like;
    let usersLikedArray = JSON.parse(sauceFound.usersLiked);
    let usersDislikedArray = JSON.parse(sauceFound.usersDisliked);
    if(usersLikedArray.includes(userID) || like === 1 ) {
        return res.status(401).json({message: 'More than one likes is not authorized'});
    }else if(usersLikedArray.includes(userID) || like === -1) {
        return rest.status(401).json({message: 'More than one dislike is not authorized'});
    }else {
        next();
    }
};

module.exports = likeValidator;