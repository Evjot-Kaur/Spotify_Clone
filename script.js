console.log("welcome to Spotify");
//intialize variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs= [
    {songName: "Let me Love You", filePath:"songs/1.mp3", coverPath:"cover1.avif"},
    {songName: "Mera Mann", filePath:"songs/2.mp3", coverPath:"cover1.avif"},
    {songName: "Aaye Haaye", filePath:"songs/3.mp3", coverPath:"cover1.avif"},
    {songName: "Payal", filePath:"songs/4.mp3", coverPath:"cover1.avif"},
    {songName: "Waalian", filePath:"songs/5.mp3", coverPath:"cover1.avif"},
    {songName: "Cheap Thrills", filePath:"songs/6.mp3", coverPath:"cover1.avif"},
   ]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
const updateSongItemPlayIcon = (index, isPlaying) => {
    const songItemPlay = document.getElementById(index);
    if (isPlaying) {
        songItemPlay.classList.remove('fa-play-circle');
        songItemPlay.classList.add('fa-pause-circle');
    } else {
        songItemPlay.classList.remove('fa-pause-circle');
        songItemPlay.classList.add('fa-play-circle');
    }
};

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        updateSongItemPlayIcon(songIndex, true);
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;   
        updateSongItemPlayIcon(songIndex, false);
    }
}) //listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value*audioElement.duration/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
let currentSongIndex = -1;

songItems.forEach((element, i) => {
    element.getElementsByClassName('songItemPlay')[0].addEventListener('click', (e) => {
        if (currentSongIndex === i) {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
                masterSongName.innerText = songs[i].songName;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        } else {
            if (currentSongIndex !== -1) {
                let previousPlayButton = songItems[currentSongIndex].getElementsByClassName('songItemPlay')[0];
                previousPlayButton.classList.remove('fa-pause-circle');
                previousPlayButton.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
            makeAllPlays();
            currentSongIndex = i;
            audioElement.src = songs[i].filePath;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterSongName.innerText = songs[i].songName;
        }
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    updateSongItemPlayIcon(songIndex, true);
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    updateSongItemPlayIcon(songIndex, true);
})