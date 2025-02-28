const tg = window.Telegram.WebApp;
tg.expand(); // Фиксированный размер

const chat_id = tg.initDataUnsafe?.user?.id ?? null;
const username = tg.initDataUnsafe?.user?.username ?? "Гость";

// Показываем никнейм
document.getElementById("username").textContent = username;

// Отправляем данные на сервер
fetch("/save_user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, username })
})
.then(response => response.json())
.then(data => {
    console.log("Ответ от сервера:", data);

    if (data.status === "success" || data.status === "new_user") {
        document.getElementById("step").textContent = data.step;
        document.getElementById("next_step").textContent = data.next_step;
        document.getElementById("manager").textContent = data.manager;
    } else {
        document.getElementById("step").textContent = "Ошибка загрузки";
    }
})
.catch(error => console.error("Ошибка:", error));

// Кнопка скачивания файла
document.getElementById("downloadFile").addEventListener("click", () => {
    window.open("https://example.com/file.pdf", "_blank");
});

// Кнопка перехода в бот
document.getElementById("goToBot").addEventListener("click", () => {
    window.location.href = "https://t.me/your_bot";
});

// Кнопка оценки в 2ГИС
document.getElementById("rateManager").addEventListener("click", () => {
    window.open("https://2gis.ru/feedback", "_blank");
});
