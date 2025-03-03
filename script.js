document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, запущено ли приложение в Telegram Web Apps
    if (window.Telegram && Telegram.WebApp) {
        const tg = Telegram.WebApp;
        tg.expand(); // Разворачиваем приложение на весь экран

        // Получаем информацию о пользователе
        const user = tg.initDataUnsafe.user;
        if (user) {
            document.getElementById("username").innerText = user.username || "Не указан";
            document.getElementById("chat_id").innerText = user.id;

            // Отправляем данные на бэкенд
            fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: user.id, username: user.username })
            })
            .then(response => response.json())
            .then(data => {
                // Выводим данные пользователя из Google Таблицы
                document.getElementById("user_data").innerHTML = `
                    <p><strong>Статус:</strong> ${data.status || "Нет данных"}</p>
                    <p><strong>Следующий шаг:</strong> ${data.next_step || "Нет данных"}</p>
                    <p><strong>Менеджер:</strong> ${data.manager || "Нет данных"}</p>
                `;
            })
            .catch(error => console.error("Ошибка:", error));
        }
    } else {
        alert("Приложение работает только в Telegram Web Apps");
    }
});
