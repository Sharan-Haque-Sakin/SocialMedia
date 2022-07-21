const createHttpError = require("http-errors")

// createHttpError()
    function notFoundHandler(req,res,next){
    next(createHttpError(404,"Your requested ULR was not found!"))
}

const defaultHandler = (err ,req,res,next) => {
res.locals.title = 'Error Page'

    res.status(err.status || 500)

    if(res.locals.html){
        res.render('error' , {
            title : res.locals.title,
            msg : err.message
        })
    } else{
        res.json(
            {
                errors : {
                    msg : err.message   
                }
            }
        )
    } 

    console.log(err)
}

module.exports = {
    defaultHandler,
    notFoundHandler 
}