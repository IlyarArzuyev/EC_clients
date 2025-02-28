document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;
    tg.expand();

    console.log("Telegram WebApp Data:", tg.initDataUnsafe); // Показывает все данные от Telegram

    const chat_id = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;
    const username = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.username : "Гость";

    console.log("Chat ID:", chat_id);  // Проверяем, получаем ли chat_id
    console.log("Username:", username);  // Проверяем, получаем ли username

    document.getElementById("username").textContent = username || "Неизвестный пользователь";
    document.getElementById("chat_id").textContent = chat_id || "Не найден";

    fetch("/get_user_info", {
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
