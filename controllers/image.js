const handleImage = (req,res,db)=>{
    const {id} =req.body;
    db('user')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
        
    })
    .catch(err=>{
        res.json('error')
    })
}

module.exports={
        handleImage:handleImage
    }