const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



/**
 * @route POST /api/users/login 
 * @desc log in 
 * @access Public
 */

const login = async(req, res) => {
    try{
        const {email, password } = req.body
    
        if (!email || !password) {
            return res.status(400).json({message: 'Fill in the required fields'})
        }
    
        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });
        
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
        
        const secret = process.env.JWT_SECRET;
    
        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({id: user.id}, secret, {expiresIn: '1d'})
            }) 
        } else {
            return res.status(400).json({message: 'Login or password uncorrect'})
        }
    } catch{
        return res.status(400).json({message: 'Authentication error'})
    }

}

/**
 * @route POST api/users/register 
 * @descr registred
 * @access Public
 */
const register = async(req, res) => {
    try{
        const { email, password, name } = req.body;
    
        if(!email || !password || !name) {
            return res.status(400).json({ message: 'Fill in the required fields'})
        }
    
        const registredUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
    
        if (registredUser) {
            return res.status(400).json({message: 'user was registred'})
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });
    
        const secret = process.env.JWT_SECRET;
    
        if (user && secret){
            res.status(201).json({
                id: user.id,
                email: user.email,
                name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d'})
            });
        }else{
            return res.status(400).json({ message: "User don't created"});
        }
    } catch{
        return res.status(400).json({ message: "Failed to register"});
    }
} 

/**
 * @router GET app/users/current
 * @desc current user
 * @access Private
 */
const current = async(req, res) => {
    try{
        return res.status(200).json(req.user)
    }catch{
        return res.status(400).json('Data acquisition error')
    }
}

module.exports = {
    login, 
    register,
    current
}