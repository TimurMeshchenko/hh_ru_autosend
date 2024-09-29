function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handlerCoverLetter(vacancyName) {
    const coveringLetter = getCoveringLetter(vacancyName);
    
    await delay(500);

    const button_respond_vacancy = document.querySelector('.letter-content--jH13UN3zA6OgmktwCsgt > button')
    button_respond_vacancy.click();
    
    await delay(500);
    
    var messageArea = document.querySelector('.bloko-textarea.bloko-textarea_sized-rows');

    messageArea.value = coveringLetter;

    document.querySelector(".letter-content--jH13UN3zA6OgmktwCsgt button").click();
}

function getCoveringLetter(vacancyName) {
  const coveringLetter = `Здравствуйте!

Меня зовут Тимур, я Python Backend Developer, ищу удаленную работу. Меня заинтересовала вакансия: ${vacancyName}.

Обладаю 5-летним опытом работы в сфере Python Backend, специализируясь на проектировании, разработке, поддержке и оптимизации высоконагруженных веб-приложений на фреймворках Django, FastAPI, Flask. С использованием микросервисной архитектуры и различных баз данных PostgreSQL, MongoDB, MySQL, ClickHouse.

Также имею коммерческий опыт с Docker, Git, Redis, REST API, CI/CD, Linux, RabbitMQ, Celery, SQLALchemy, Kubernetes, Kafka, JavaScript, asyncio, HTML, CSS3, Nginx, ООП, Pytest, Airflow.

С удовольствием отвечу на ваши вопросы.
Телефон: +79964630650
Telegram: @Meshchenko https://t.me/Meshchenko
`;

    return coveringLetter;
}

function confirm_different_country() {
    document.querySelector(`
        .bloko-modal-footer > 
        .bloko-button.bloko-button_kind-success.bloko-button_scale-small
    `)?.click();
}

const vacancies = document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]');

for (let vacancy_index = 0; vacancy_index < vacancies.length; vacancy_index++) {
    const vacancy = vacancies[vacancy_index];
    const vacancyName = document.querySelectorAll(".serp-item__title")
        [vacancy_index].textContent;

    vacancy.scrollIntoView({ behavior: "smooth", block: "center" });
    vacancy.click();

    await delay(1000);

    await confirm_different_country();
    await handlerCoverLetter(vacancyName);

    await delay(100);
}
