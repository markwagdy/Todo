
const validateRequest=(schema)=>(req,res,next)=>{
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();

}
const ValidateQueryParams=(schema)=>(req,res,next)=>{
    const {error}=schema.validate(req.query);
    if(error)
    {
        return res.status(400).json({error:error.details[0].message})
    }

    next();
}

const ValidatePathVariable=(schema)=>(req,res,next)=>{
    
    const {error}=schema.validate(req.params)
    
    if (error)
    {
        return res.status(400).json({error:error.details[0].message})
    }
    next();
}


module.exports={validateRequest,ValidateQueryParams,ValidatePathVariable}