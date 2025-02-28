// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем на весь экран

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;
document.getElementById('username').textContent = user?.username || 'Гость';

// Запрос к вашему Flask-серверу
fetch('http://localhost:5001/save_user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        chat_id: user?.id,
        username: user?.username
    })
})
.then(response => response.json())
.then(data => {
    if(data.status === 'success') {
        document.getElementById('step').textContent = data.step;
        document.getElementById('next_step').textContent = data.next_step;
        document.getElementById('manager').textContent = data.manager;
    }
});

// Обработчики кнопок
document.getElementById('downloadFile').addEventListener('click', () => {
    tg.sendData(JSON.stringify({action: 'download'}));
});

document.getElementById('goToBot').addEventListener('click', () => {
    window.open('https://t.me/your_bot_username', '_blank');
});

document.getElementById('rateManager').addEventListener('click', () => {
    window.open('https://2gis.ru/feedback', '_blank');
});
