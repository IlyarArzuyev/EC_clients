document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("userTable");

    try {
        let response = await fetch("http://127.0.0.1:5000/users");
        let users = await response.json();

        users.forEach(user => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.chat_id}</td>
                <td>${user["статус клиента"]}</td>
                <td>${user["следующий шаг"]}</td>
                <td>${user["менеджер"]}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
});
