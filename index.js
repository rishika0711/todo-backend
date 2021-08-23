// const express = require('express');
// const app = express();
// const todoRoute = require('./routes/todo');
// const bodyParser = require('body-parser');
// // app.get('/name',(req , res) => {
// //     res.send({
// //         name:'rihika',
// //         class:'tets',
// //     });
// // });

// // app.put('/',(req , res) => {
// //     res.send(" put hello");
// // });
// app.use(bodyParser.json());
// //parsing the application json request type
// //app.use(express.json());

// const middleware = (req,res,next)=>{
//     console.log('Logging the value');
//     next(); 
// }
// app.use(middleware);//one to declare or call middleware
// //app.use('/api/',middleware,route);//second to declare or call middleware


// app.use('/api/todo/',todoRoute);
// app.use('/static/',express.static('public'));
// app.use('/images/',express.static('public/images'));


// //app.use('/',route);

// // this *  is use to print the msg when user try to call api which not deine in sytem
// // app.get('*',(req,res)=>
// // {
// //     console.log('Sorry this url doessnt exit');
// //     res.send('Sorry this url this not exit');
// // })
// app.listen(9000, () => {
//     console.log("sever is listening to port 9000")
// });

const express = require('express');
const app = express();
const todoRoute = require('./routes/todo');
const bodyParser = require('body-parser');
// parsing the application/json
app.use(bodyParser.json());
//middleware 
const logger = (req, res, next) => {
  console.log('Logging the values');
  req.name = 'Navneet';
  next();
}
app.use(logger);
app.use('/api/todo/', todoRoute);
app.use('/static/', express.static('public'));
app.use('/images/', express.static('public/images'));
app.get('*', (req, res) => {
  res.status(400);
  console.log(`Sorry this url does not exist`);
  res.send('Sorry this url does not exist');
})
app.listen(9000, () => {
  console.log('Server is listening to port 9000')
});
