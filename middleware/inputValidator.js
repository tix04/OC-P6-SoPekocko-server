module.exports = (req, res, next) => {
    let inputRegex = /^\s*$/;
    req.body.sauce = JSON.parse(req.body.sauce);

    //console.log(inputRegex.test(req.body.sauce.manufacturer));
    let userInput = req.body.sauce;
    //console.log(req.body.sauce);
    if(inputRegex.test(userInput.name) || inputRegex.test(userInput.manufacturer) || inputRegex.test(userInput.description) || inputRegex.test(userInput.mainPepper)) {
        return res.status(422).json({
            error: new Error('Invalid user input')
        });
     }else {
         console.log('inputValidator passed');
         next();
     }
};