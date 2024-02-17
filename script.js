let hours=document.getElementById("hh");
let minuts=document.getElementById("mm");
let sec=document.getElementById("ss");
let form=document.querySelector(".form");
let timerlist=document.querySelector(".timerlist");
let p=document.querySelector(".text");
let audio=document.querySelector("audio");
let numberOfActiveTimers = 0;


let total_time= 0;
function updatetime(h,m,s){
     total_time= h * 3600 + m * 60 + s;
    if(total_time>0){
        create_Element(h,m,s);
        
    }
}






function create_Element(hh,mm,ss){

    p.style.display="none";
    let display=document.createElement("div");
    display.classList.add("output-container");


    // <div class="output-container">
    //         <div class="lable">Time Left :</div>
    //         <div class="op-time">
    //             <div class="op-hh">hh</div>
    //             <span>:</span>
    //             <div class="op-mm">mm</div>
    //             <span>:</span>
    //            <div class="op-ss">ss</div>
    //         </div>
    //         <div class="delet"><button>Delete</button></div>
    //     </div>
    

    display.innerHTML=`<div class="lable">Time Left :</div>
                         <div class="op-time">
                            <div class="op-hh">${hh}</div>
                            <span>:</span>
                            <div class="op-mm">${mm}</div>
                            <span>:</span>
                            <div class="op-ss">${ss}</div>
                        </div>
                        <button onclick="deleteTimer(this)">Delete</button>`

    timerlist.appendChild(display); 
    numberOfActiveTimers++; 
    runtimer(total_time,display)
    
}


function runtimer(total_time,display){

    let timerContainer = display.querySelector(".op-time");
    let hour = timerContainer.querySelector(".op-hh");
    let minute = timerContainer.querySelector(".op-mm");
    let seconds = timerContainer.querySelector(".op-ss");

    let myTimerupdate=setInterval(()=>{


        if(total_time==0){
            display.classList.toggle("time-up");
            display.innerHTML=` <span></span>
                                <span>Timer is Up!</span>
                                <button class="btn delete-btn" onclick="deleteTimer(this)">Stop</button>`
        audio.play();
        clearInterval(myTimerupdate);                        
        }else{


            --total_time;
            hour.innerText=Math.floor(total_time/3600);
            minute.innerText=Math.floor((total_time%3600)/60);
            seconds.innerText=Math.floor(total_time%60);
            console.log(hour,minute,seconds);
        }
    },1000)
    
}

function deleteTimer(button){
    total_time=0;
    audio.pause();
    let current_display=button.parentNode;
    current_display.remove();
    --numberOfActiveTimers;
    if(numberOfActiveTimers==0){
        p.style.display="block";
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let h=parseInt(hours.value)
    let m=parseInt(minuts.value)
    let s=parseInt(sec.value)
    form.reset();
    updatetime(h,m,s);
    
})