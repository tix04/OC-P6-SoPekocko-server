const SauceModel = require('../models/sauce');
const fs = require('fs'); 

exports.createSauce = (req, res, next) => {
  let initialAmount = 0;
  let emptyArray = [];

  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new SauceModel({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.sauce.heat,
    likes: initialAmount,
    dislikes: initialAmount,
    usersLiked: JSON.stringify(emptyArray),
    usersDisliked: JSON.stringify(emptyArray)
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.setLikes = (req, res, next) => {
  let userId = req.body.userId;
  let like = req.body.like;
  
  let usersLikedArray;
  let usersDislikedArray;
  let updatedArray;
  console.log(userId, like);

  SauceModel.findOne({_id: req.params.id}).then(
    (sauceFound) => {
        let sauce = new SauceModel({ _id: req.params._id });
        
        if(like === 1) {
          let usersLiked = JSON.parse(sauceFound.usersLiked);
                usersLiked.push(userId);
                updatedArray = JSON.stringify(usersLiked);
                likes = sauceFound.likes + 1;
                console.log(updatedArray, likes);

                sauce = {
                    _id: req.params.id,
                    userId: sauceFound.userId,
                    name: sauceFound.name,
                    manufacturer: sauceFound.manufacturer,
                    description: sauceFound.description,
                    imageUrl: sauceFound.imageUrl,
                    heat: sauceFound.heat,
                    likes: likes,
                    dislikes: sauceFound.dislikes,
                    usersLiked: updatedArray,
                    usersDisliked: sauceFound.usersDisliked
                };
        }else if (like === -1) {
          let usersDisliked = JSON.parse(sauceFound.usersDisliked);
                usersDisliked.push(userId);
                updatedArray = JSON.stringify(usersDisliked);
                likes = sauceFound.dislikes + 1;
                console.log(updatedArray, likes);

                sauce = {
                    _id: req.params.id,
                    userId: sauceFound.userId,
                    name: sauceFound.name,
                    manufacturer: sauceFound.manufacturer,
                    description: sauceFound.description,
                    imageUrl: sauceFound.imageUrl,
                    heat: sauceFound.heat,
                    likes: sauceFound.likes,
                    dislikes: likes,
                    usersLiked: sauceFound.usersLiked,
                    usersDisliked: updatedArray
                };
        } else if (like === 0) {
          usersLikedArray = JSON.parse(sauceFound.usersLiked);
          usersDislikedArray = JSON.parse(sauceFound.usersDisliked);

          if(usersLikedArray.includes(userId)) {
            let userIdIndex = usersLikedArray.indexOf(userId);
            usersLikedArray.splice(userIdIndex, 1);
            updatedArray = JSON.stringify(usersLikedArray);
            likes = sauceFound.likes - 1;

            sauce = {
                _id: req.params.id,
                userId: sauceFound.userId,
                name: sauceFound.name,
                manufacturer: sauceFound.manufacturer,
                description: sauceFound.description,
                imageUrl: sauceFound.imageUrl,
                heat: sauceFound.heat,
                likes: likes,
                dislikes: sauceFound.dislikes,
                usersLiked: updatedArray,
                usersDisliked: sauceFound.usersDisliked
                };
        } else if(usersDislikedArray.includes(userId)) {
            let userIdIndex = usersDislikedArray.indexOf(userId);
            usersDislikedArray.splice(userIdIndex, 1);
            updatedArray = JSON.stringify(usersDislikedArray);
            likes = sauceFound.dislikes - 1;

            sauce = {
                _id: req.params.id,
                userId: sauceFound.userId,
                name: sauceFound.name,
                manufacturer: sauceFound.manufacturer,
                description: sauceFound.description,
                imageUrl: sauceFound.imageUrl,
                heat: sauceFound.heat,
                likes: sauce.likes,
                dislikes: likes,
                usersLiked: sauceFound.usersLiked,
                usersDisliked: updatedArray
                };
            }
        }
        
        SauceModel.updateOne({_id: req.params.id}, sauce).then(
            () => {
                res.status(201).json({
                message: 'Likes updated successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                error: error
            });
        });
    }
  );  
};

exports.getOneSauce = (req, res, next) => {
  SauceModel.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new SauceModel({ _id: req.params._id });
  
  if (req.file) {  //Commented out if else statement to ssee if this is the problem
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    console.log(req.body.sauce);
    sauce = {
      _id: req.params.id,
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      /*likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked*/
    };
  
  } else {  //Commentend if else statements to see if this is the problem
    //const url = req.protocol + '://' + req.get('host');
    console.log(req.body);
    sauce = {
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      //imageUrl: url + '/images/' + req.file.filename,
      //imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      /*likes: req.body.likes,
      dislikes: req.body.dislikes,
      usersLiked: req.body.usersLiked,
      usersDisliked: req.body.usersDisliked*/
    };
  }
  SauceModel.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  SauceModel.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        SauceModel.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  SauceModel.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};