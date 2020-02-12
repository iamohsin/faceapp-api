const handleSigin=(req,res,db,bcrypt)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect info');
     }
    db.select('email','hash').from('login')
    .where('email','=',email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if(isValid){
            return db.select('*').from('user')
            .where('email','=',email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=>res.json('unable to get user'))
            
        }else{
                res.json('Worng info')
        }
    
}) .catch(err=>  res.json('Worng info   '))
}
module.exports={
    handleSigin:handleSigin 
}