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

Меня зовут Тимур, я Python Backend Developer. Меня заинтересовала вакансия: ${vacancyName}.

Ваша компания заинтересовала меня своим современным стеком и следованию лучшим практикам разработки. Я хочу стать частью команды профессионалов, где смогу обмениваться опытом и внести свой вклад в общий успех проектов. Я уверен, что участие в ваших крупных проектах предоставит мне возможность применить мои навыки и опыт, а также достичь новых вершин.

Обладаю 2-летним опытом работы в сфере Python Backend, специализируясь на разработке, поддержке и оптимизации высоконагруженных веб-приложений (Django и FastAPI) с использованием микросервисной архитектуры.

На предыдущем месте работы успешно применял паттерны проектирования, внедрял системы асинхронной обработки задач (RabbitMQ, Celery), кэширования (Redis), оптимизировал взаимодействие с базами данных (PostgreSQL), а также временами занимался разработкой фронтенд-части.

С удовольствием отвечу на ваши вопросы в Telegram https://t.me/Meshchenko, а также по телефону +7 996 463-06-50 и в WhatsApp.
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