const STORAGE_KEY = 'accc-arg-keywords';

function normaliseAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function getStoredKeywords() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function storeKeyword(keyword) {
  if (!keyword) return;
  const keywords = getStoredKeywords();
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  }
}

function setupPuzzle({ acceptedAnswers, nextPage, keyword, feedbackEl, inputEl, submitEl, onSuccess }) {
  const feedback = document.getElementById(feedbackEl);
  const input = document.getElementById(inputEl);
  const submit = document.getElementById(submitEl);

  function handleSubmit() {
    const value = normaliseAnswer(input.value);
    const isCorrect = acceptedAnswers.map(normaliseAnswer).includes(value);

    if (!value) {
      feedback.textContent = 'Enter an answer to continue.';
      feedback.className = 'feedback error';
      return;
    }

    if (isCorrect) {
      storeKeyword(keyword);
      feedback.innerHTML = keyword
        ? `Correct. Keyword recovered: <span class="mono">${keyword}</span>`
        : 'Correct. Final layer unlocked.';
      feedback.className = 'feedback success';

      if (typeof onSuccess === 'function') {
        onSuccess();
      }

      if (nextPage) {
        setTimeout(() => {
          window.location.href = nextPage;
        }, 1200);
      }
      return;
    }

    feedback.textContent = 'Incorrect. Review the evidence and try again.';
    feedback.className = 'feedback error';
  }

  submit.addEventListener('click', handleSubmit);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  });
}
