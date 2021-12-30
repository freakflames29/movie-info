
const Moviename=document.getElementById("moviename")
const MovieDate=document.getElementById("moviedate")
const card=document.getElementById("realdiv")
const button=document.getElementById("btn").addEventListener("click",trig)
const notfound= document.getElementById("notfound");


Moviename.addEventListener("keyup",function(e){

    if(e.keyCode===13)
    {
        document.getElementById("btn").click();
    }
});

MovieDate.addEventListener("keyup",function(e){

    if(e.keyCode===13)
    {
        document.getElementById("btn").click();
    }
});



async function trig()
{
    let mname=Moviename.value;
    let dat=MovieDate.value;
    let url="";
    if(dat!="")
    {
         url=`http://www.omdbapi.com/?apikey=bd50e652&t=${mname}&y=${dat}`;
        
    }
    else
    {
        url=`http://www.omdbapi.com/?apikey=bd50e652&t=${mname}`;

    }

    const res=await fetch(url);
    const data=await res.json();
    const isTrue=data.Response;
    let html="";
    let rat="";
  
    
    if (isTrue=="True")
    {
        let ratings=data.Ratings;
        console.log(ratings);
     
        for (let i=0;i<ratings.length;i++)
        {
            rat+=`<div id="ratings">
            <div class="imdb">
                <h4>${ratings[i].Source}</h4>
                <p>${ratings[i].Value}</p>
            </div>`;
        };

        html+=`<div id="card">
        <div id="imgdiv">
            <img src="${data.Poster}" alt="poster">
        </div> 
        <div id="infodiv">
            <div id="type">
                ${data.Type}
            </div>
            <div class="title">
                <h2>${data.Title}</h2>
                <p id="year">${data.Year}</p>
            </div>
            <p class="papa">${data.Country},</p>
            <p class="papa">${data.Genre},</p>
            <p class="papa">${data.Runtime},    </p>
            <p class="papa">${data.Language}</p>
            <h3>Production</h3>
            <p>${data.Production}</p>
            <h3>Awards and nominations</h3>
            <p>${data.Awards}</p>
            <h3>Plot</h3>
            <p>
                ${data.Plot}
            </p>
            <h3>Director</h3>
            <p>${data.Director}</p>
            <h3>Actor names</h3>
            <p>${data.Actors}</p>
            ${rat}
            
        </div>
    </div>`;
    notfound.innerHTML="";
    card.innerHTML=html;
    
    }
    else
    {
        card.innerHTML="";
        notfound.innerHTML="Movie not found 😓";
    }
    
}