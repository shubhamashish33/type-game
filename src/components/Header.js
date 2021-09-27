import { useState } from "react";
import ReactIsCapsLockActive from "./ReactIsCapsLockActive";
function Header() {
  //Necessary hooks
  const [visible, setVisible] = useState(false);
  const [ishow, setShow] = useState(true);
  const [isscore, setScore] = useState(false);

  //Fetch API
  const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
  const quoteDisplayElement = document.getElementById("quoteDisplay");
  const quoteInputElement = document.getElementById("quoteInput");
  const timerElement = document.getElementById("timer");

  //intitalize hooks
  function start() {
    setVisible(true);
    setShow(false);
  }

  //intialize the main function
  function ready() {
    //event listener for input
    quoteInputElement.addEventListener("input", () => {
      const arrayQuote = quoteDisplayElement.querySelectorAll("span");
      const arrayValue = quoteInputElement.value.split("");
      let correct = true;
      var score;
      //diving every character in new span
      arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
          characterSpan.classList.remove("correct");
          characterSpan.classList.remove("incorrect");
          correct = false;
        } else if (character === characterSpan.innerText) {
          characterSpan.classList.add("correct");
          characterSpan.classList.remove("incorrect");
        } else {
          characterSpan.classList.remove("correct");
          characterSpan.classList.add("incorrect");
          correct = false;
        }
      });
      //on correct input render new quote
      if (correct) renderNewQuote();
      score = getTimerTime();
      // calculate score
      if (correct) {
        setScore(true);
        document.getElementById("getscore").innerHTML = "Score: " + score;
      }
      score = 0;
    });
    //fetch random quote
    function getRandomQuote() {
      return fetch(RANDOM_QUOTE_API_URL)
        .then((response) => response.json())
        .then((data) => data.content);
    }

    async function renderNewQuote() {
      const quote = await getRandomQuote();
      quoteDisplayElement.innerHTML = "";
      quote.split("").forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
      });
      quoteInputElement.value = null;
      startTimer();
    }

    //start timer
    let startTime;
    function startTimer() {
      timerElement.innerText = 0;
      startTime = new Date();

      setInterval(() => {
        timerElement.innerText = getTimerTime();
      }, 1000);
    }

    function getTimerTime() {
      return Math.floor((new Date() - startTime) / 1000);
    }
    renderNewQuote();
    setShow(true);
  }
  //explicit call for start function
  function stoptr() {
    setVisible(false);
    start();
    setShow(true);
  }
  //on stop realod the window
  function stopfnc() {
    window.location.reload();
  }

  return (
    <div>
      <h1 className="text">Welcome to Test Typing 🚀</h1>
      <p>
        This website can assist you in typing more quickly and precisely, as
        well as allowing you to review your performance. <br />
        Click on Ready to start.
      </p>
      <button onClick={start} className={visible ? "btn1" : "btn"}>
        View
      </button>
      <div className={visible ? "timer" : "timer1"} id="timer"></div>
      <div className={visible ? "container1" : "container"} id="ctn">
        <div className="quote-display" id="quoteDisplay"></div>
        <textarea
          id="quoteInput"
          className="quote-input"
          autoFocus
          autoComplete="off"
        ></textarea>

        {/* For giving warning when CapsLock is onn */}
        <ReactIsCapsLockActive>
          {(active) => (
            <span
              className="warning"
              style={{ display: active ? "block" : "none" }}
            >
              Caps lock is {active ? "active" : "inactive"}
            </span>
          )}
        </ReactIsCapsLockActive>
      </div>

      {/* store score */}
      <div
        id="getscore"
        className={isscore ? "getscoreshow" : "getscorehid"}
      ></div>

      {/* Ready Button */}
      <button onClick={(stoptr, ready)} className={ishow ? "btn3" : "cls1"}>
        Ready
      </button>

      {/* Close Button */}
      <button onClick={stopfnc} className={visible ? "btn2" : "cls"}>
        Close
      </button>

      {/* Footer */}
      <footer className={visible ? "ftr1" : "ftr"}>
        © 2021 All Rights Reserved <br />
        Made with ♥ by Shubham Ashish |
        <a
          href="https://shubhamashish33.github.io/Profile-card/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Follow Me
        </a>
      </footer>
    </div>
  );
}

export default Header;
