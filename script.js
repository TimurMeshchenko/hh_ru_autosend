function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handlermessageArea(vacancyName) {
  const coveringLetter = getCoveringLetter(vacancyName);

  await delay(2000);

  const button_respond_vacancy = document.querySelector(
    '[data-qa="vacancy-response-letter-toggle"]'
  );
  button_respond_vacancy?.click();

  await delay(5000);

  const inputTypes = [
    window.HTMLInputElement,
    window.HTMLSelectElement,
    window.HTMLTextAreaElement,
  ];
  var messageArea = document.querySelector(
    '[data-qa="vacancy-response-popup-form-letter-input"]'
  );

  // only process the change on elements we know have a value setter in their constructor
  if (inputTypes.indexOf(messageArea.__proto__.constructor) > -1) {
    const setValue = Object.getOwnPropertyDescriptor(
      messageArea.__proto__,
      "value"
    ).set;
    const event = new Event("input", { bubbles: true });

    setValue.call(messageArea, coveringLetter);
    messageArea.dispatchEvent(event);
  }

  document.querySelector('[data-qa="vacancy-response-submit-popup"]').click();
}

function getCoveringLetter(vacancyName) {
  const coveringLetter = `Здравствуйте!

Меня зовут Тимур, я Python Developer. Меня заинтересовала ваша вакансия.

Имею 2,5 года опыта работы в сфере Python, специализируясь на проектировании, разработке, поддержке и оптимизации высоконагруженных веб-приложений на фреймворках Django, FastAPI, Flask. С использованием микросервисной архитектуры и различных баз данных PostgreSQL, MongoDB, MySQL, ClickHouse.

Также имею коммерческий опыт с Docker, Git, Redis, REST API, CI/CD, Linux, RabbitMQ, Celery, SQLALchemy, Kubernetes, Kafka, JavaScript, asyncio, HTML, CSS3, Nginx, ООП, Pytest, Airflow.

С удовольствием отвечу на ваши вопросы.
Telegram: @Meshchenko https://t.me/Meshchenko`;

  return coveringLetter;
}

function confirm_different_country() {
  document
    .querySelector(
      `
        .bloko-modal-footer > 
        .bloko-button.bloko-button_kind-success.bloko-button_scale-small
    `
    )
    ?.click();
}

const vacancies = document.querySelectorAll(
  '[data-qa="vacancy-serp__vacancy_response"]'
);

for (let vacancy_index = 0; vacancy_index < vacancies.length; vacancy_index++) {
  if (vacancy_index % 2 == 0) {
    continue; // Пропустить текущую итерацию, если индекс нечётный
  }

  const vacancy = vacancies[vacancy_index];
  const vacancyName = document.querySelectorAll('[data-qa="serp-item__title"]')[
    vacancy_index - 1
  ].textContent;

  vacancy.scrollIntoView({ behavior: "smooth", block: "center" });
  vacancy.click();

  await delay(1000);

  await confirm_different_country();
  await handlermessageArea(vacancyName);

  await delay(100);
}
