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
    status:false,
    deadline:'30/08/2021',
    priority:'1'
    },
    {
        id:"1",
        taskName:"learn node.js",
        description:"pay attention in th class",
        status:false,
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
    fetchList: (req, res) => {
      res.send(todoList);
    }
  }
  module.exports = todoController;