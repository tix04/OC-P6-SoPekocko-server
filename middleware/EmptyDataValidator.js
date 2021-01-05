const {check, validationResult} = require('express-validator');

module.exports =  
[check('name').trim().escape().not().isEmpty().withMessage('These Fields can not be empty'),
check('manufacturer').trim().escape().not().isEmpty().withMessage('These Fields can not be empty'),
check('description').trim().escape().not().isEmpty().withMessage('These Fields can not be empty'),
check('mainPepper').trim().escape().not().isEmpty().withMessage('These Fields can not be empty'),
    (req, res, next) => {
        const errors = validationResult(req.body.sauce); //req.body.sauce
        console.log(errors);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        } else {
            next();
        }
    }
];

