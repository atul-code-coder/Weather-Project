const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=94f8353f74c65b2c53cb06558d626c5e";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;

      res.write("<p>Weather fpor the city "+query+"</p>");
      res.write("<h1>The temperature is "+temp+" in kalvin </h1>");
      res.send()
    });


  });
});


app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
