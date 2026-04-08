function setupPuzzle(config) {
  const input = document.getElementById(config.inputEl);
  const submit = document.getElementById(config.submitEl);
  const feedback = document.getElementById(config.feedbackEl);

  if (!input || !submit || !feedback) {
    console.error("Puzzle setup failed: missing element(s).");
    return;
  }

  function defaultNormalize(value) {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");
  }

  const normalize =
    typeof config.normalize === "function"
      ? config.normalize
      : defaultNormalize;

  const acceptedAnswers = (config.acceptedAnswers || []).map(normalize);

  function saveKeyword(keyword) {
    if (!keyword) return;

    let keywords = [];
    try {
      keywords = JSON.parse(localStorage.getItem("accc_keywords") || "[]");
    } catch (e) {
      keywords = [];
    }

    if (!keywords.includes(keyword)) {
      keywords.push(keyword);
      localStorage.setItem("accc_keywords", JSON.stringify(keywords));
    }
  }

  function checkAnswer() {
    const userAnswer = normalize(input.value);

    if (acceptedAnswers.includes(userAnswer)) {
      saveKeyword(config.keyword);
      feedback.textContent = "Access granted.";
      feedback.classList.add("success");
      feedback.classList.remove("error");

      setTimeout(function () {
        window.location.href = config.nextPage;
      }, 800);
    } else {
      feedback.textContent = "Incorrect. Check the transformation and try again.";
      feedback.classList.add("error");
      feedback.classList.remove("success");
    }
  }

  submit.addEventListener("click", checkAnswer);

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });
}
