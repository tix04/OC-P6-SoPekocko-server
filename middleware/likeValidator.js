function validateLikesOrDislikes(array1, array2, userId, res) {
    if(array1.includes(userId)) {
        return res.status(403).json({
          message: 'More than One Like or Dislike is unauthorized!!'
        });
      }else if(array2.includes(userId)){
        return res.status(403).json({
          message: 'Liking or disliking same sauce is unauthorized!!'
        });
      }
}

function updateLikeOrDisliked(array, userId, val) {
    let parsedArray = /*JSON.parse(array)*/array;
    let likes;
    let updatedArray;
    parsedArray.push(userId);
    updatedArray = JSON.stringify(parsedArray);
    likes = val + 1;

    let values = {array: updatedArray, likes: likes};
    return values;
}

function verifyCancelledLike(array, userId, val) {
    let userIdIndex = array.indexOf(userId);
    let updatedArray;
    let likes;
    array.splice(userIdIndex, 1);
    updatedArray = JSON.stringify(array);
    likes = val - 1;

    let values = {array: updatedArray, likes: likes};
    return values;

    
}

module.exports = {
    validateLikes: validateLikesOrDislikes,
    updateLikeOrDisliked: updateLikeOrDisliked,
    verifyCancelledLike: verifyCancelledLike
}