const express = require('express');
const todoRouter = express.Router();
const {validateRequest,ValidatePathVariable}=require('../commonMethods')
const {createValidationSchema,putValidationSchema}=require('../validations/validationSchemas')
const Todo=require('../models/todo');
const authenticateToken=require('../middleware/authMiddleware')


todoRouter.get('/',authenticateToken,async(req, res) => {
    const todos=await Todo.findAll();
    if(todos)
    {
        res.status(200).json({message:'Todos Found',data:todos});
    }
    else{
        res.status(404).json({message:'Todos not found'});
    }
});

todoRouter.post('/',authenticateToken,validateRequest(createValidationSchema), async (req, res) => {
    const { task ,userId} = req.body;
    try {
      const newTodo = await Todo.create({ task,userId });
  
      res.status(200).json(newTodo);
    } catch (error) {
      console.error('Error creating Todo:', error);
      res.status(500).json({ error: 'An error occurred while creating the Todo.' });
    }
  });
  

todoRouter.put('/:id',authenticateToken,ValidatePathVariable(putValidationSchema),async(req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const updated=await Todo.update({task:task},{where : {id:id}});
    if(updated==0)
    {
        res.status(404).send("Task Not Found");

    }else{
        res.status(200).send("Task Updated Successfully");
    }
});

todoRouter.delete('/:id',authenticateToken,ValidatePathVariable(putValidationSchema) ,async(req, res) => {
    const { id } = req.params;
    const destroyed=await Todo.destroy({where : {id:id}});

    if(destroyed==1)
    {
        res.status(200).send('Task deleted');
    }
    else{
        res.status(404).send("Task Not Found");
    }
});

todoRouter.patch('/:id/complete',authenticateToken ,ValidatePathVariable(putValidationSchema),async(req, res) => {
    const { id } = req.params;
    const updated=await Todo.update({completed:true},{where:{id:id}});
    if(updated==0)
    {
        res.status(404).send("Task Not Found");

    }
    else {
        res.status(200).send("Task Completed");
    }
});


module.exports = todoRouter;

