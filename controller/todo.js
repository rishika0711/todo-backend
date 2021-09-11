
// let todoList = [
//     {
//     id:"1",
//     taskName:"learn node.js",
//     description:"pay attention in th class",
//     completedstatus:false,
//     deadline:'30/08/2021',
//     priority:'1'
//     },
//     {
//         id:"2",
//         taskName:"learn node.js",
//         description:"pay attention in th class",
//         completedstatus:false,
//         deadline:'30/08/2021',
//         priority:'2'
//         },
//   ];
//   const todoController = {
//     create: (req, res) => {
//       console.log('Hello from todo controller');
//       const { body } = req;
//       let isMatched=false;
//       todoList.forEach(element =>{
//         if(element.id==body.id){
//          isMatched = true;
//         }
//       });

//const { Mongoose } = require("mongoose")

//       // const randomUniqueId = Math.floor(Math.random() * 1000000)
//       // const newTask ={
//       //   id:randomUniqueId,
//       //   ...body,
//       // };
//       // todoList.push(newTask);


      
//       if(isMatched){
//       return res.send({
//         message: 'id alredy exist',
//         status: false,
//       });
//     }
//       todoList.push(body);
//       res.send({
//         message: 'Added successfully',
//         status: true,
//       });
//     },
//     update: (req, res) => {
//       console.log('Hello from todo update controller');
//       const { body } = req;
//       const { id } = req.params;
//       // for(let i=0; i<todoList.length; i++)
//       // {
//       //   if(todoList[i].id === id){
//       //     todoList[i]={...todoList[i], ...body};
//       //   }
//       // }
//       todoList.forEach((element,index) => {
//         if(element.id===id)
//         todoList[index] = {...element, ...body};
//       }),
//       res.send({
//         message: 'update  successfully',
//         status: true, 
//         todoList,
//       });
//     },
//     delete:(req, res)=>{
//       console.log('Hello from todo delete controller');
//       const { body } = req;
//       const { id } = req.params;
//       // for(let i=0; i<todoList.length; i++){
//       //   if(todoList[i].id === id){
//       //     todoList.splice(i, 1);
//       //    console.log ('todolist',todoList[i]);
//       //   }  
//       // }
//       todoList.forEach((element,index) => {
//         if(element.id===id){
//           todoList.splice(index, 1);
//           console.log ('todolist',todoList[index]);
//         }
//       }),
//       res.send({
//         message: 'detete  successfully',
//         status: true, 
//         todoList,
//       });   

//     },
//     fetchTask:(req, res)=>{
//       console.log('todo fetchtask controller');
//       const { id } = req.params;
//       let matchedElement ={};
//       todoList.forEach((element)=>{
//         if(element.id==id){
//           matchedElement=element;
//         }
//       });
//           res.send({
//             status:true,
//             data:matchedElement,
//       });
//     },
 
//     changeStatus:(req, res) => {
//       const { body } = req;
//       const { id } = req.params;
//       for(let i=0; i<todoList.length;i++)
//       {
//         if(todoList[i].id == id){
//           todoList[i].completedstatus=body.completedstatus;
//         }
//       }
//       res.send({
//         message:'Marked the status successfully',
//         status:true,
//         todoList,
//       });
//     },
    
//    fetchList: (req, res) => {
//       res.send(todoList);
//     } 
//   }
//   module.exports = todoController;

 
// using Mongoodb getting data of todo task====================================================================
const { Model, model } = require("mongoose");
const Todo = require("../models/Todo");

const todoController = {
  create: async(req, res) =>{
    try{
      const { task, description, completed } = req.body;
      let existingtask = await todo.findOne({ task });
      console.log('exisiting task', existingtask);

      if(existingtask){
        res.status(400).send({
          message: "task in process",
          status: false
        })
      }  
      const todo = new Todo({
        task,
        description,
      })
      const newTask = await todo.save();
      res.status(200).send({
        message: "task created successfully",
        status: true,
        newTask,
      })
    }catch(err){
      console.log("error", err);
      res.status(400).send({
        message: "task not created",
        status: false
      })

  }
},
  delete: async(req, res)=> {
    try{
      const { task, description, completed } = req.body;
      let existingtask =await todo.deleteOne({task});
      console.log('exisiting task', existingtask);

      if(existingtask){
        res.status(400).send({
          message: "task in process",
          status: false
        })
      } 
      const todo = new Todo({
        task,
        description,
      })
      const newTask = await todo.save();
      res.status(200).send({
        message: "task deletd successfully",
        status: true,
        newTask,
      })
    }catch(err){
      console.log("error", err);
      res.status(400).send({
        message: "task not delted",
        status: false
      })

  }
}

module.exports = todoController;