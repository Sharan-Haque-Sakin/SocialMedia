function decHtml (title){
    return function (req,res,next){
        res.locals.html = true;
        res.locals.title = `${title} - Twitter 2.0`
    next()
    }
    
}

module.exports = {
    decHtml
}