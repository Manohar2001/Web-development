
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songitems=Array.from(document.getElementsByClassName('songitem'));
let previousindex=0;
let completetime=document.getElementById("completetime")
let runningtime=document.getElementById("runningtime");




let songs=[
  {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
  {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
  {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
  {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
  {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
  {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
  {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
  {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
  {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
  {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]




let songtime=(songIndex)=>{
  songitems.forEach((element,i)=>{
    let audioplayer=new Audio();
    let url=songs[i].filePath;
    audioplayer.src=url;
    //console.log(audioplayer);
    audioplayer.onloadedmetadata=function(){
     //console.log(1);
     let dur=audioplayer.duration;
     let min=Math.floor(dur/60);
     let seconds=dur%60;
     seconds=Math.floor(seconds);
     min=min<10 ? "0"+min :min;
     seconds=seconds<10 ? "0"+seconds : seconds;
     element.getElementsByClassName("td")[0].innerText=min+":"+seconds;
    };
 })

}




songitems.forEach((element,i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  songtime(i);
})


let tdelements=document.getElementsByClassName("td");



const allmasterplay = ()=>{
  songitems[songIndex].childNodes[5].firstElementChild.lastElementChild.classList.remove('fa-circle-play');
  songitems[songIndex].childNodes[5].firstElementChild.lastElementChild.classList.add('fa-circle-pause');
  completetime.innerHTML=tdelements[songIndex].innerText;
}


const allmasterpause = ()=>{
  songitems[songIndex].childNodes[5].firstElementChild.lastElementChild.classList.remove('fa-circle-pause');
  songitems[songIndex].childNodes[5].firstElementChild.lastElementChild.classList.add('fa-circle-play'); 
}


//audioElement.play();
masterPlay.addEventListener('click',()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    allmasterplay();
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity=0;
    allmasterpause();
  }
 
})



let updateclock=()=>{
  let CT=audioElement.currentTime;
  let minutes=Math.floor(CT/60);
  let seconds=Math.floor(CT%60);

  minutes=minutes<10?'0'+minutes:minutes;
  seconds=seconds<10?'0'+seconds:seconds;
  if(completetime.innerHTML== minutes+":"+seconds){
    console.log("sucess");
    songIndex+=1;
    nextsongplay(songIndex);

  }
  runningtime.innerHTML=minutes+":"+seconds;
}



//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
  progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value=progress;
  updateclock();
});

myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})



const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  })
}

const removeplay=(songIndex)=>{
  songitems[songIndex].childNodes[5].firstElementChild.lastElementChild.classList.remove('fa-circle-play');
  songitems[songIndex].childNodes[5].firstElementChild.lastElementChild.classList.add('fa-circle-pause');
}


Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    
    element.addEventListener('click',(e)=>{
    makeAllPlays();
    songIndex=parseInt(e.target.id);
    if(songIndex!=previousindex){
      audioElement.pause();
    }
    if(audioElement.paused){
      previousindex=songIndex
      //console.log(e.target.id);
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src=`songs/${songIndex+1}.mp3`;
      completetime.innerHTML=tdelements[songIndex].innerText
      masterSongName.innerText=songs[songIndex].songName;
      myProgressBar.value=0;
      audioElement.play();
      gif.style.opacity=1;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
    }
    else{
      //console.log(e.target.id);
      e.target.classList.remove('fa-circle-pause');
      e.target.classList.add('fa-circle-play');
      audioElement.src=`songs/${songIndex+1}.mp3`;
      masterSongName.innerText=songs[songIndex].songName;
      myProgressBar.value=0;
      audioElement.pause();
      gif.style.opacity=0;
      masterPlay.classList.remove('fa-circle-pause');
      masterPlay.classList.add('fa-circle-play');
    }
    
  })
})

let setElements=(songIndex)=>{
  makeAllPlays();
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  completetime.innerHTML=tdelements[songIndex].innerText
  audioElement.currentTime=0;
  audioElement.play();
  removeplay(songIndex);
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
}

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=9){
    songIndex=0;
  }
  else{
    songIndex+=1;
  }
  setElements(songIndex);
})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex=9;
  }
  else{
    songIndex-=1;
  }
  setElements(songIndex);
})


let nextsongplay=(songIndex)=>{
  if(songIndex>9){
    songIndex=0
  }
  audioElement.sec=`songs/${songIndex+1}.mp3`
  setElements(songIndex);
}

