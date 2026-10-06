function logger(req, next){
    console.log(req.path, req.method) //log the path and request method e.g.
    next() //move on to the next middleware or controller
}

module.exports = logger