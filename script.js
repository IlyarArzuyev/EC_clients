document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;
    tg.expand();

    // Получаем никнейм и chat_id
    const username = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.username : "Гость";
    const chat_id = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;

    console.log("Chat ID:", chat_id);  // Проверяем, что chat_id есть
    console.log("Username:", username);  // Проверяем никнейм

    // Отображаем никнейм на экране
    document.getElementById("username").textContent = username;

    // Отправляем chat_id и username на сервер
    fetch("/save_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ chat_id, username })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ответ сервера:", data);

        if (data.status === "success") {
            document.getElementById("step").textContent = data.step;
            document.getElementById("next_step").textContent = data.next_step;
            document.getElementById("manager").textContent = data.manager;
        } else {
            alert("Ошибка: " + data.message);
        }
    })
    .catch(error => console.error("Ошибка:", error));
});

function downloadFile() {
    window.open("https://example.com/file.pdf", "_blank");
}

function openBot() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/ВАШ_БОТ");
}

function leaveReview() {
    window.open("https://2gis.ru/spb/firm/70000001000000000/tab/reviews", "_blank");
}
