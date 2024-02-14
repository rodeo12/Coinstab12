document.addEventListener('DOMContentLoaded', function () {
    const allUsersBtn = document.getElementById('allUsersBtn');
    const userList = document.getElementById('userList');

    allUsersBtn.addEventListener('click', fetchUsers);

    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('userCard');
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
                <p>City: ${user.address.city}</p>
                <p>Company: ${user.company.name}</p>
                <button class="addBtn">Add</button>
                <button class="openBtn">Open</button>
            `;
            userList.appendChild(userCard);
            const addBtn = userCard.querySelector('.addBtn');
            const openBtn = userCard.querySelector('.openBtn');
            addBtn.addEventListener('click', () => addUser(user));
            openBtn.style.display = 'none'; // Initially hide the "Open" button
        });
    }

    function addUser(user) {
        // Implement adding user to the database
        // Show/hide "Add" and "Open" buttons based on database entry
    }
});
