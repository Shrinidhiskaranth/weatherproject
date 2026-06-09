const express=require('express');
const axios=require('axios');
const path=require('path')
const app=express();
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"../views"));

app.use(express.urlencoded({encoded:true}));

app.use(express.static(path.join(__dirname,"../public")));

app.get('/',(request,response)=>{
    response.render("index",{weather:null})
})
app.post('/weather',async(request,response)=>{
    try{
  const city=request.body.city;
  const apikey="be2b9ea25c828fa729e3ac66387060da";
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${(city)}&appid=${apikey}&units=metric`
  const result=await axios.get(url);
  response.render("index",{weather:result.data})
    }
    catch(error){
//   response.send('Cityy not found,${error}')
response.render("index",{weather:null,error:error})
    }
}

)
app.listen(5000)