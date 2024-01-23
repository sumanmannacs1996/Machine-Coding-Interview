(function () {
  const HOUR = document.querySelector(".hour");
  const MINUTE = document.querySelector(".minute");
  const SECOND = document.querySelector(".second");

  const START = document.querySelector(".start");
  const PAUSE = document.querySelector(".pause");
  const RESET = document.querySelector(".reset");

  let interval = null;
  let isPaused = false;

  function closeTimer() {
    HOUR.value = "";
    MINUTE.value = "";
    SECOND.value = "";
    clearInterval(interval);
    START.style.display = "initial";
    PAUSE.style.display = "none";
  }

  function startTimer() {
    if (SECOND.value > 60) {
      ++MINUTE.value;
      SECOND.value = +SECOND.value - 59;
    } else if (MINUTE.value > 60) {
      ++HOUR.value;
      MINUTE.value = +MINUTE.value - 59;
    }
    if (HOUR.value == 0 && MINUTE.value == 0 && SECOND.value == 0) {
      closeTimer();
    } else if (SECOND.value != 0) {
      SECOND.value = `${SECOND.value <= 10 ? "0" : ""}${--SECOND.value}`;
    } else if (SECOND.value == 0 && MINUTE.value != 0) {
      SECOND.value = 59;
      MINUTE.value = `${MINUTE.value <= 10 ? "0" : ""}${--MINUTE.value}`;
    } else if (MINUTE.value == 0 && HOUR.value != 0) {
      MINUTE.value = 60;
      HOUR.value = `${HOUR.value <= 10 ? "0" : ""}${--HOUR.value}`;
    }
  }

  START.addEventListener("click", () => {
    START.style.display = "none";
    PAUSE.style.display = "initial";
    interval = setInterval(() => {
      startTimer();
    }, 1000);
  });

  RESET.addEventListener("click", () => {
    closeTimer();
  });

  PAUSE.addEventListener("click", () => {
    if (!isPaused) {
      isPaused = true;
      clearInterval(interval);
      PAUSE.innerHTML = "RESUME";
    } else {
      PAUSE.innerHTML = "PAUSE";
      interval = setInterval(() => {
        startTimer();
      }, 1000);
      isPaused = false;
    }
  });
})();
