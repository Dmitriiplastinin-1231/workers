const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/employees
 * @desc get all emloyees
 * @access Private
 */
const all = async (req, res) => {
    try{
        const employees = await prisma.employee.findMany();

        return res.status(200).json(employees)

    } catch{
        return res.status(500).json({message: 'Failed to get employees'})
    }
}

/**
 * @route POST /api/employees/add
 * @desc add emloyee
 * @access Private  
 */
const add = async (req, res) => {
    try{
        const data = req.body;


        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({message: 'All field are required'})
        };

        // await prisma.user.update({
        //     where: {
        //         id: req.user.id
        //     },
        //     data: {
        //         createEmployee: {
        //             create: data
        //         }
        //     }
        // });
        
        const emloyee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        });
        
        return res.status(201).json(emloyee);
    }catch(error){
        console.log(error);
        return res.status(500).json('Something was wrong');
    }
}

/**
 * @route POST /api/emloyees/remove/:id 
 * @desc remove emloyee
 * @access Private
 */
const remove = async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.employee.delete({
            where:{
                id
            }
        });

        return res.status(204).json({ message: 'emloyee removed successful'})
    } catch{
        return res.status(500).json({ message: 'Failed to remove emloyee'})
    }
}

/**
 * @route PUT /api/emloyees/edit/:id 
 * @descr edit emloyee
 * @access Private
 */
const edit = async (req, res) =>{
    const data = req.body;
    const id = data.id;

    try{
        await prisma.employee.update({
            where: {
                id
            },
            data
        });

        res.status(204).json({ message: 'Emloyee was edited'})
    }catch{
        return res.status(500).json({ message: 'Failed to edit emloyee'})        
    }
}

/**
 * @route GET /api/emloyees/:id 
 * @desc get one emloyee
 * @access Private
 */
const employee = async (req, res) => {
    const { id } = req.params;

    try{
        const employee = await prisma.employee.findFirst({
            where: {
                id
            }
        });

        return res.status(200).json(employee);
    }catch{
        return res.status(500).json({message: 'Employee not found'})
    }
}

module.exports = {
    all,
    employee,
    add,
    remove,
    edit
}