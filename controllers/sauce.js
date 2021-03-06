const SauceModel = require('../models/sauce');
const fs = require('fs');
const likeValidator = require('../middleware/likeValidator');

exports.createSauce =(req, res, next) => {
  
    let initialAmount = 0;
    let emptyArray = [];
    let url = req.protocol + '://' + req.get('host');
    let mimetypeRegExp = /jpeg|jpg|png|gif/;
    let authorizedFile = mimetypeRegExp.test(req.file.filename.extension);
    let mimetype = req.file.mimetype;

    console.log(authorizedFile, mimetype);
    //req.body.sauce = JSON.parse(req.body.sauce);
    //Find a way not to save file to folder also if it is not correct mimetype
    //Right now file is saved on local file even if it is not saved on database
    if (!mimetypeRegExp.test(mimetype)) {
      return res.status(415).json({ //Changed error code
        message: 'Only .png, .jpg and .jpeg files are allowed!'
      });
    }else {
      //req.file.filename = */
      
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
          console.log(sauce);
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
    }
};

exports.setLikes = (req, res, next) => {
  let userId = req.body.userId;
  let like = req.body.like;

  
  //console.log(userId, like, usersLikdeArray, usersDislikedArray);

  
  SauceModel.findOne({_id: req.params.id}).then(
    (sauceFound) => {
        let usersLikedArray = JSON.parse(sauceFound.usersLiked);
        let usersDislikedArray = JSON.parse(sauceFound.usersDisliked);
        let data;
        let sauce = new SauceModel({ _id: req.params._id });
        
        if(like === 1) {
          
          if(usersLikedArray.includes(userId)) {
            data = {array: sauceFound.usersLiked, likes: sauceFound.likes};
            sauce = {
              _id: req.params.id,
              userId: sauceFound.userId,
              name: sauceFound.name,
              manufacturer: sauceFound.manufacturer,
              description: sauceFound.description,
              imageUrl: sauceFound.imageUrl,
              heat: sauceFound.heat,
              likes: data.likes,
              dislikes: sauceFound.dislikes,
              usersLiked: data.array,
              usersDisliked: sauceFound.usersDisliked
            };
            SauceModel.updateOne({_id: req.params.id}, sauce).then(
              () => {
              return res.status(/*403*//*204*/202).json({
              message: 'More than One Like or Dislike is unauthorized!!'
              });
            }
            ).catch(
              (error) => {
                  res.status(400).json({
                  error: error
              });
            });
            /*return res.status(204).json({ //(403) initial error message. App halts
              message: 'More than One Like or Dislike is unauthorized!!'
              });*/
          }else if(usersDislikedArray.includes(userId)){
            data = {array: sauceFound.usersDisliked, likes: sauceFound.dislikes};
            sauce = {
              _id: req.params.id,
              userId: sauceFound.userId,
              name: sauceFound.name,
              manufacturer: sauceFound.manufacturer,
              description: sauceFound.description,
              imageUrl: sauceFound.imageUrl,
              heat: sauceFound.heat,
              likes: sauceFound.likes,
              dislikes: data.likes,
              usersLiked: sauceFound.usersLiked,
              usersDisliked: data.array
            };
            SauceModel.updateOne({_id: req.params.id}, sauce).then(
              () => {
              return res.status(/*403*//*204*/202).json({
              message: 'Liking or disliking same sauce is unauthorized!!'
              });
            }
            ).catch(
              (error) => {
                  res.status(400).json({
                  error: error
              });
            });
          }else {
            data = likeValidator.updateLikeOrDisliked(usersLikedArray, userId, sauceFound.likes);
            sauce = {
              _id: req.params.id,
              userId: sauceFound.userId,
              name: sauceFound.name,
              manufacturer: sauceFound.manufacturer,
              description: sauceFound.description,
              imageUrl: sauceFound.imageUrl,
              heat: sauceFound.heat,
              likes: data.likes,
              dislikes: sauceFound.dislikes,
              usersLiked: data.array,
              usersDisliked: sauceFound.usersDisliked
            };
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
            /*return res.status(204).json({ //(403) initial error message. App halts
              message: 'Liking or disliking same sauce is unauthorized!!'
              });*/
          }
        }else if(like === -1){
         
          if(usersDislikedArray.includes(userId)) {
            data = {array: sauceFound.usersDisliked, likes: sauceFound.dislikes};
            sauce = {
              _id: req.params.id,
              userId: sauceFound.userId,
              name: sauceFound.name,
              manufacturer: sauceFound.manufacturer,
              description: sauceFound.description,
              imageUrl: sauceFound.imageUrl,
              heat: sauceFound.heat,
              likes: sauceFound.likes,
              dislikes: data.likes,
              usersLiked: sauceFound.usersLiked,
              usersDisliked: data.array
            };
            SauceModel.updateOne({_id: req.params.id}, sauce).then(
              () => {
              return res.status(/*403*//*204*/202).json({
              message: 'More than One Like or Dislike is unauthorized!!'
              });
            }
            ).catch(
              (error) => {
                  res.status(400).json({
                  error: error
              });
            });
            /*return res.status(204).json({ //(403) initial error message. App halts
              message: 'More than One Like or Dislike is unauthorized!!'
              });*/
          }else if(usersLikedArray.includes(userId)){
            data = {array: sauceFound.usersLiked, likes: sauceFound.likes};
            sauce = {
              _id: req.params.id,
              userId: sauceFound.userId,
              name: sauceFound.name,
              manufacturer: sauceFound.manufacturer,
              description: sauceFound.description,
              imageUrl: sauceFound.imageUrl,
              heat: sauceFound.heat,
              likes: data.likes,
              dislikes: sauceFound.dislikes,
              usersLiked: data.array,
              usersDisliked: sauceFound.usersDisliked
            };
            SauceModel.updateOne({_id: req.params.id}, sauce).then(
              () => {
              return res.status(/*403*//*204*/202).json({
              message: 'Liking or disliking same sauce is unauthorized!!'
              });
            }
            ).catch(
              (error) => {
                  res.status(400).json({
                  error: error
              });
            });
            /*return res.status(204).json({ //(403) initial error message. App halts
              message: 'Liking or disliking same sauce is unauthorized!!'
              });*/
          }else {
            data = likeValidator.updateLikeOrDisliked(usersDislikedArray, userId, sauceFound.dislikes);
            sauce = {
              _id: req.params.id,
              userId: sauceFound.userId,
              name: sauceFound.name,
              manufacturer: sauceFound.manufacturer,
              description: sauceFound.description,
              imageUrl: sauceFound.imageUrl,
              heat: sauceFound.heat,
              likes: sauceFound.likes,
              dislikes: data.likes,
              usersLiked: sauceFound.usersLiked,
              usersDisliked: data.array
            };
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
        }else if(like === 0 && usersLikedArray.includes(userId)){
          
          data = likeValidator.verifyCancelledLike(usersLikedArray, userId, sauceFound.likes);
          sauce = {
            _id: req.params.id,
            userId: sauceFound.userId,
            name: sauceFound.name,
            manufacturer: sauceFound.manufacturer,
            description: sauceFound.description,
            imageUrl: sauceFound.imageUrl,
            heat: sauceFound.heat,
            likes: data.likes,
            dislikes: sauceFound.dislikes,
            usersLiked: data.array,
            usersDisliked: sauceFound.usersDisliked
            };
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
        }else if(like === 0 && usersDislikedArray.includes(userId)){
          
          data = likeValidator.verifyCancelledLike(usersDislikedArray, userId, sauceFound.dislikes);
          sauce = {
            _id: req.params.id,
            userId: sauceFound.userId,
            name: sauceFound.name,
            manufacturer: sauceFound.manufacturer,
            description: sauceFound.description,
            imageUrl: sauceFound.imageUrl,
            heat: sauceFound.heat,
            likes: sauceFound.likes,
            dislikes: data.likes,
            usersLiked: sauceFound.usersLiked,
            usersDisliked: data.array
            };
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
             
      });
        
  };

exports.getOneSauce = (req, res, next) => {
  
  SauceModel.findOne({
    _id: req.params.id,
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
  
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    
    let mimetypeRegExp = /jpeg|jpg|png|gif/;
    let authorizedFile = mimetypeRegExp.test(req.file.filename.extension);
    let mimetype = req.file.mimetype;

    console.log(authorizedFile, mimetype);
    //req.body.sauce = JSON.parse(req.body.sauce);
    //Find a way not to save file to folder also if it is not correct mimetype
    //Right now file is saved on local file even if it is not saved on database
    //Also need to find a way to replace and delete old image from local files even if it changes in the database
    //Need to refactor this code , too many if else statements
    if (!mimetypeRegExp.test(mimetype)) {
      return res.status(400).json({
        message: 'Only .png, .jpg and .jpeg files are allowed!'
      });
    }else {sauce = {
      _id: req.params.id,
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      
    };
  }
    
  
  } else { 
    console.log(req.body);
    sauce = {
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      heat: req.body.heat,
     
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