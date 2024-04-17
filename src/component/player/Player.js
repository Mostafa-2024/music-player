import "./player.css"
import { ImPrevious } from "react-icons/im"
import {FaRegCirclePlay} from "react-icons/fa6"
import { FaRegPauseCircle } from "react-icons/fa"
import { ImNext } from "react-icons/im"
import img from "../../assets/IMG_20240201_140435_740.jpg"
import { useEffect, useState } from "react"
import { songs } from "../data/data"

function Player() {
  
  const[duration, setDuration] = useState(60);

  const[constDuration, setConstDuration] = useState(0);

  const[countIn, setCountIn] = useState(0)

  const[song, setSong] = useState(0);

  const [zero, setZero] = useState(0)

  const [hero, setHero] = useState(5)

  let previousButton;

  let playButton;

  let pauseButton;

  let nextButton;

  let myAudio;

  let progress;

  let upAnimate = 0;

  let animate = 500;

  function counters() {

    countingUp();

    countingDown();

  }

  function countingUp() {
    
    const countUp = setInterval(() => {
    
      setCountIn((prevCount) => {
        
        if (prevCount === constDuration || localStorage.counter === "pause") {
          
          clearInterval(countUp);
          
          return prevCount;

        }

        return prevCount + 1; 

      });

    }, 1000);
    
    return () => clearInterval(countUp);
  }

  function countingDown() {
    
    const countDown = setInterval(() => {
    
      setDuration((prevCount) => {
        
        if (prevCount === 0 || localStorage.counter === "pause") {
          
          clearInterval(countDown);
          
          return prevCount;

        }

        return prevCount - 1; 

      });

    }, 1000);
    
    return () => clearInterval(countDown);
  }

  

  useEffect(() => {

    previousButton = document.querySelectorAll(".icons svg")[0];

    playButton = document.querySelectorAll(".icons svg")[1];

    pauseButton = document.querySelectorAll(".icons svg")[2];

    nextButton = document.querySelectorAll(".icons svg")[3];

    myAudio = document.querySelector("audio");

    progress = document.querySelector(".progress .child")

    myAudio.src = songs[song];

    previousButton.addEventListener("click", () => {

      updateDuration();

      setCountIn(0);

      pauseSong();

      setTimeout(() => {

        playSong()

      }, 1000)

    })
  
    playButton.addEventListener("click", () => {

      updateDuration();

      playSong();

    })

    pauseButton.addEventListener("click", () => {

      pauseSong();

    })

    nextButton.addEventListener("click", () => {

      setCountIn(0);

      updateDuration();

      pauseSong();

      setTimeout(() => {

        playSong()

      }, 1000)
    })

  function playSong() {

    setZero(0)
    
    localStorage.setItem("counter", "play")

    myAudio.play();

    playButton.style.display = "none";

    pauseButton.style.display = "block";

  }

  function pauseSong() {

    localStorage.setItem("counter", "pause")

    myAudio.pause();

    playButton.style.display = "block";

    pauseButton.style.display = "none";  

  }

  function updateDuration() { 

    // setDuration(Math.round(myAudio.duration));

    setConstDuration(Math.round(myAudio.duration));

  }

  const animation = setInterval(() => {

    if(upAnimate == animate || localStorage.counter == "pause") {

      clearInterval(animation);

    }else {

      upAnimate++

      progress.style.width = ((upAnimate / animate) * 100) + "%"
    }


  }, 1000)


  },[song])

  function timer1() {

    if(countIn > 0) {

      if(countIn >= 10  && countIn < 60) {

        return "0" + zero + ":" + countIn

      }else if(countIn == 60) {

        setZero(prev => prev + 1)

        setCountIn(prev => prev - 60);

        return "0" + zero + ":" + countIn

      } else {

        return "0" + zero + ":0" + countIn

      } 

    } else {

      return "0" + zero + ":" + "00"

    }
  }

function timer2() {

  if(countIn == 0) {

    return "00:00"

  }else if (duration == 1) {
  
    setDuration(59);

    setHero(prev => prev - 1)

    return "0" + hero+ ":" + duration

  }
  else {

    if(duration < 10) {

      return "0" + hero+ ":" + "0"+ duration

    }else {

      return "0" + hero+ ":" + duration

    }

    
  }
}

  return(

    <div className="player">

      <audio style={{display: "none"}}></audio>

      <h2>song title</h2>

      <p>singer</p>

      <img src={img} alt=""/>

      <div className="time">

        <span className="one">

          {timer1()}

        </span>

        <span className="two">
          
          {timer2()}
          
        </span>

      </div>

      <div className="progress"><div className="child"></div></div>

      <div className="icons">

      <ImPrevious onClick={() =>{ song == 0 ? setSong(songs.length - 1) : setSong((prev) => prev - 1); counters()}}/>

      <FaRegCirclePlay onClick={counters}/>

      <FaRegPauseCircle />

      <ImNext onClick={() =>{ song < songs.length - 1 ? setSong(prev => prev + 1) : setSong(0); counters();}}/>

      </div>

    </div>

  )
}

export default Player;