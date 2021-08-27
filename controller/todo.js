// let todoList = [
//     {
//         id:"1",
//         taskName:"learn node.js",
//         description:"pay attention in th class",
//         status:false,
//         deadline:'30/08/2021',
//         priority:'1'
//     }
// ];

// const todoController = {
//     create:(req, res) => {
//         console.log('hello from todo controller');
//         res.send({
//             name:'rishika',
//             class:'test',
//         });
//     },
//     fetchList:(req, res) =>{
//         res.send(todoList);
//     }
// }
// module.export = todoController;

let todoList = [
    {
    id:"1",
    taskName:"learn node.js",
    description:"pay attention in th class",
    completedstatus:false,
    deadline:'30/08/2021',
    priority:'1'
    },
    {
        id:"2",
        taskName:"learn node.js",
        description:"pay attention in th class",
        completedstatus:false,
        deadline:'30/08/2021',
        priority:'2'
        },
  ];
  const todoController = {
    create: (req, res) => {
      console.log('Hello from todo controller');
      const { body } = req;
      todoList.push(body);
      res.send({
        message: 'Added successfully',
        status: true,
      });
    },
    update: (req, res) => {
      console.log('Hello from todo update controller');
      const { body } = req;
      const { id } = req.params;
      // for(let i=0; i<todoList.length; i++)
      // {
      //   if(todoList[i].id === id){
      //     todoList[i]={...todoList[i], ...body};
      //   }
      // }
      todoList.forEach((element,index) => {
        if(element.id===id)
        todoList[index] = {...element, ...body};
      }),
      res.send({
        message: 'update  successfully',
        status: true, 
        todoList,
      });
    },
    delete:(req, res)=>{
      console.log('Hello from todo delete controller');
      const { body } = req;
      const { id } = req.params;
      // for(let i=0; i<todoList.length; i++){
      //   if(todoList[i].id === id){
      //     todoList.splice(i, 1);
      //    console.log ('todolist',todoList[i]);
      //   }
      // }
      todoList.forEach((element,index) => {
        if(element.id===id){
          todoList.splice(index, 1);
          console.log ('todolist',todoList[index]);
        }
      }),
      res.send({
        message: 'detete  successfully',
        status: true, 
        todoList,
      });   

    },
    fetchTask:(req, res)=>{
      console.log('todo fetchtask controller');
      const { id } = req.params;
      let matchedElement ={};
      todoList.forEach((element)=>{
        if(element.id==id){
          matchedElement=element;
        }
      });
          res.send({
            status:true,
            data:matchedElement,
      });
    },
 
    changeStatus:(req, res) => {
      const { body } = req;
      const { id } = req.params;
      for(let i=0; i<todoList.length;i++)
      {
        if(todoList[i].id == id){
          todoList[i].completedstatus=body.completedstatus;
        }
      }
      res.send({
        message:'Marked the status successfully',
        status:true,
        todoList,
      });
    },
    
   fetchList: (req, res) => {
      res.send(todoList);
    } 
  }
  module.exports = todoController;
