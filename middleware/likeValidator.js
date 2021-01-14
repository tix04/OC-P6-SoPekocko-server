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
    updateLikeOrDisliked: updateLikeOrDisliked,
    verifyCancelledLike: verifyCancelledLike
}