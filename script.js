  const display = document.getElementById("display");
    const historyList = document.getElementById("historyList");
    const themeToggle = document.getElementById("themeToggle");
    let value = "";
    let memory = 0;

    document.querySelectorAll("button").forEach((btn) => {
      const val = btn.dataset.value;
      const fn = btn.dataset.fn;

      if (val) {
        btn.addEventListener("click", () => handleInput(val));
      } else if (fn) {
        btn.addEventListener("click", () => handleFunction(fn));
      }
    });

    function handleInput(val) {
      if (val === "C") {
        value = "";
        display.innerText = "0";
      } else if (val === "=") {
        try {
          const result = roundOff(eval(value));
          addToHistory(`${value} = ${result}`);
          value = result.toString();
          display.innerText = value;
        } catch {
          display.innerText = "Error";
          value = "";
        }
      } else {
        value += val;
        display.innerText = value;
      }
    }

    function handleFunction(fn) {
      let num = parseFloat(value || display.innerText);
      let result;

      switch (fn) {
        case "M+":
          memory = num;
          break;
        case "MR":
          value = memory.toString();
          display.innerText = value;
          return;
        case "sqrt":
          result = Math.sqrt(num);
          break;
        case "pow":
          value += "**";
          display.innerText = value;
          return;
        case "pi":
          value += Math.PI.toFixed(5);
          display.innerText = value;
          return;
        case "e":
          value += Math.E.toFixed(5);
          display.innerText = value;
          return;
        case "sin":
          result = Math.sin(num * Math.PI / 180);
          break;
        case "cos":
          result = Math.cos(num * Math.PI / 180);
          break;
        case "tan":
          result = Math.tan(num * Math.PI / 180);
          break;
        case "log":
          result = Math.log10(num);
          break;
      }

      if (result !== undefined) {
        result = roundOff(result);
        addToHistory(`${fn}(${num}) = ${result}`);
        display.innerText = result;
        value = result.toString();
      }
    }

    function roundOff(num) {
      return Math.round((num + Number.EPSILON) * 100000) / 100000;
    }

    function addToHistory(entry) {
      const li = document.createElement("li");
      li.innerText = entry;
      historyList.prepend(li);
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });

    // Scroll to Top
    const scrollBtn = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
