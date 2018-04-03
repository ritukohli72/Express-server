const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
const port = process.env.PORT || 3600;
var app = express();
hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine','hbs')
app.use(express.static(`${__dirname}/public`));
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
//   });
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `Welcome ..LOGGED  ${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(error)=>{
    console.log('Unable to append to server.log')
  });
  next();
})


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=> {
  //res.send('<h1>hello Express</h1>');
// res.send(
//     {name: 'Ritu',
//     likes:['reading','coding'] }
//   )
// });

res.render('home.hbs',{pageTitle: 'Home Page',
 welcomeNote: 'Welcome to Home page'})

});

app.get('/about',(req,res) => {
 res.render('about.hbs',{pageTitle: 'About Page'
});
});
app.get('/bad',(req,res) => {
console.log(req.socket);
 res.send({
   errorMessage:"unable to connect"
 });
});

app.listen(port,()=>{console.log(`Server up at port ${port}`)});
