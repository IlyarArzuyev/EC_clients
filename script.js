document.addEventListener("DOMContentLoaded", async function () {
    const chatIdElement = document.getElementById("chatId");
    const statusElement = document.getElementById("status");
    const nextStepElement = document.getElementById("nextStep");
    const managerElement = document.getElementById("manager");

    // Получаем chat_id из Telegram Web Apps
    const tg = window.Telegram.WebApp;
    tg.expand();
    const chat_id = tg.initDataUnsafe?.user?.id || "Не определено";

    chatIdElement.textContent = chat_id; // Выводим chat_id

    try {
        let response = await fetch(`http://127.0.0.1:5000/user?chat_id=${chat_id}`);
        let userData = await response.json();

        if (userData.error) {
            statusElement.textContent = "Не найдено";
            nextStepElement.textContent = "Не найдено";
            managerElement.textContent = "Не найдено";
        } else {
            statusElement.textContent = userData["статус клиента"];
            nextStepElement.textContent = userData["следующий шаг"];
            managerElement.textContent = userData["менеджер"];
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
});
