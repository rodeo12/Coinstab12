document.addEventListener('DOMContentLoaded', () => {
    const allUsersBtn = document.getElementById('allUsersBtn');
    const userListDiv = document.getElementById('userList');

    // Function to fetch all users from the backend API
    const fetchAllUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            displayUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to display users in the UI
    const displayUsers = (users) => {
        userListDiv.innerHTML = '';
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
                <p>City: ${user.address.city}</p>
                <p>Company: ${user.company.name}</p>
                <button class="addBtn" data-user='${JSON.stringify(user)}'>Add</button>
                <button class="openBtn" style="display: none;" data-user='${JSON.stringify(user)}'>Open</button>
            `;
            userListDiv.appendChild(userDiv);
        });
    };

    // Function to handle click on Add button
    const handleAddUser = async (event) => {
        const user = JSON.parse(event.target.getAttribute('data-user'));
        try {
            const response = await fetch("/api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (data.message === 'User added successfully') {
                event.target.style.display = 'none';
                event.target.nextElementSibling.style.display = 'block';
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Function to check if user already exists in the UI
    const isUserExists = (user) => {
        const existingUsers = document.querySelectorAll('.openBtn');
        for (const btn of existingUsers) {
            const existingUser = JSON.parse(btn.getAttribute('data-user'));
            if (existingUser.email === user.email) {
                return true;
            }
        }
        return false;
    };

    // Event listener for All Users button click
    allUsersBtn.addEventListener('click', fetchAllUsers);

    // Event listener for Add button click
    userListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('addBtn')) {
            const user = JSON.parse(event.target.getAttribute('data-user'));
            if (!isUserExists(user)) {
                handleAddUser(event);
            } else {
                event.target.style.display = 'none';
                event.target.nextElementSibling.style.display = 'block';
            }
        }
    });

    // Event listener for Open button click
    userListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('openBtn')) {
            const user = JSON.parse(event.target.getAttribute('data-user'));
            window.open(`/posts/${user.id}`, '_blank');
        }
    });
});
