const express = require('express');
const app = express();
const path=require('path');
console.log(path.dirname('/Users/Refsnes/demo_path.js'));

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  console.log(req.requestTime)
  next()
}

app.use(requestTime)
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

function Testing(req, res, after)
{
  console.log('Testing....');
  after()
}
app.use(myLogger);
app.use(Testing);

app.get('/',(req,res)=>res.send('Hello World!'));
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
app.listen(3700,()=>{console.log('Server listen at port 3700')});
