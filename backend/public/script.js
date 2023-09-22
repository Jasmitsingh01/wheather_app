let index=0;
function searchWeather() {
    const apiKey = "a49757af6c49f10fecc442dc2f2f7bfe";
    const cityName = document.getElementById('search').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const Imagesicon=document.getElementById("Images");
    const List=document.getElementById('listdata');
    const UL=document.getElementById("Main-list");
    fetch(apiUrl).then(response => response.json())
        .then(data => {
            const location = data.name + ', ' + data.sys.country;
            const temperature = data.main.temp + '°C';
            const condition = data.weather[0].description;
            
            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = 'Temperature: ' + temperature;
            document.getElementById('condition').textContent = 'Condition: ' + condition;
            document.querySelector('.weather-info').style.display = 'block';
            if(condition=="haze"){
                Imagesicon.setAttribute("src","Images/Screenshot 2023-09-22 170505.jpg")
            }
            else if(condition==="broken clouds"){
                Imagesicon.setAttribute("src","Images/Screenshot 2023-09-22 170426.jpg")
            }
            else if(condition.includes('clouds'))
            {
                Imagesicon.setAttribute("src","Images/Screenshot 2023-09-22 170541.jpg")

            }
            else if( condition=="mist"){
                Imagesicon.setAttribute("src","Images/Screenshot 2023-09-22 170449.jpg")

            }
            else if(condition.includes('clear ')){
                Imagesicon.setAttribute("src","Images/Screenshot 2023-09-22 170324.jpg")

            }
           List.style.display="none";
           const NewLi=document.createElement("li");
           const Newspan=document.createElement("span");
           Newspan.className="text-recent";
           Newspan.textContent=cityName;

           const NewButton=document.createElement("button");
           NewButton.textContent="Delete";
           NewButton.className="Delete"
           NewButton.setAttribute("id",index)
           NewButton.addEventListener("click",function (){
                   UL.removeChild(NewLi)
           })
           NewLi.appendChild(Newspan);
          NewLi.appendChild(NewButton);
          NewLi.setAttribute("id",`li${index}`)

          UL.appendChild(NewLi);
           index++;
        }
        )
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}

const Singup= async()=>{
    const error=document.getElementById('error');
const userName=document.getElementById('username').value;
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;
if(userName!=="" && email!=="" && password!=="" && password.length>=8){
let datas={
    Name:userName,
    email:email,
    password:password,
}
error.textContent=' ';

 fetch('/singUp',{
method:"post",
headers:{
    "Content-type":"application/json"
},
body:JSON.stringify(datas)
}) .then((res) => { 
    return res.json() 
  })
  .then((jsonResponse) => {
    if(jsonResponse.operation==="Success"){
        error.textContent=' ';
        error.textContent=jsonResponse.message;
        localStorage.setItem("USER",jsonResponse.Token);
        window.location.replace("http://localhost:8000/mainapp")
    }
    else{
        error.textContent=jsonResponse.message;
    }
  }).catch(err=>{
    console.log(err)
})


}
else if(password.length<8){

    error.textContent="Password Should be Greater than 8 Character";
}
else{
    
    error.textContent="All Values Are Requied";
}
}

function CheckUser(){
   const Token= localStorage.getItem('USER');
   
if (!Token) {
    window.location.replace("http://localhost:8000")
}
}

function Login(){
    const email =document.getElementById('email').value;
    const password=document.getElementById('password').value;
    if(email!==""&&password!=="" && password.length>=8){
         const DATAS={
            email,
          password
         };
         fetch("/login",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(DATAS)
         }).then((res) => { 
            return res.json() 
          })
          .then((jsonResponse) => {
           if(jsonResponse.operation==="Success"){
           }
           else{
            
           }
        }).catch((err)=>console.log(err))
    }
    else{
        
        console.log("ERROR");

    }
}