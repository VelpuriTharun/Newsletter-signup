const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
   

});
app.post("/",function(req,res)
{
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }


            }
        ]
    };
    const jsonData=JSON.stringify(data);

    const url="https://us18.api.mailchimp.com/3.0/lists/a9d44cd990";
    const options={
        method:"POST",
        auth:"Tharun:3ff8ce491860dbb0237f10281b6b0627-us18"
    }


     const request= https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();

}
);

//1487a079297a663518f7f64948cd111c-us12
//3ff8ce491860dbb0237f10281b6b0627-us18
//1d53ee7706

app.listen(3000,function()
{
    console.log("server listening at port 3000");
});
