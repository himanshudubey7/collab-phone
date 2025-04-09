
# 📟 Collaborative Phone Directory (CLI)

A CLI-based phone directory app where:

- 👀 **Everyone** can view and add contact numbers.
- 🔐 **Only the admin** can view, edit, or delete any contact.
- 🧑‍🤝‍🧑 Built for collaboration with Socket.IO for real-time updates.
- ⚙️ Backend: Express.js + MongoDB
- 💻 Frontend: Node CLI (using `inquirer`)

---

## 🛠 Features

- 🧾 View all contacts (CLI)
- 📤 Add new contacts (public access)
- 🔒 Admin-only: Edit/Delete/View All
- ⚡ Real-time updates using Socket.IO
- 🧑‍💻 Easy-to-use command line interface
- 🛡 Secure admin commands using passwords

---

## 📂 Project Structure

```
📁 collab-phone-directory/
├── 📁 backend/
│   ├── server.js
│   ├── db.js
│   └── models/
│       └── Contact.js
├── 📁 client/
│   └── client.js
└── README.md
```

---

## 💾 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/collab-phone-directory.git
cd collab-phone-directory
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

🧪 Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/phone-directory
ADMIN_PASSWORD=yourAdminPassword
```

Start the server:
```bash
npm start
```

---

### 3. Run CLI Frontend

In another terminal:

```bash
cd client
npm install
node client.js
```

---

## 🧪 Sample CLI Commands

- ✅ View all contacts
- ➕ Add a new contact
- 🔒 Admin Login
  - View all entries
  - Edit a contact
  - Delete a contact
- 🚪 Logout

📷 *All through interactive prompts powered by `inquirer`*

---

## ✨ Future Enhancements

- Add authentication via tokens (JWT)
- Encrypt admin password in DB (bcrypt)
- Export contacts as PDF or CSV
- Create a web dashboard version
- Dockerize for deployment

---

## 👨‍💻 Contributing

Pull requests are welcome!

- 🍴 Fork the project
- 🌱 Create your feature branch
- ✅ Commit your changes
- 🚀 Push and open a PR

---
## 💡 Author

Built with 💙 by **Himanshu Dubey**

If you found this useful, give it a ⭐ and share it!
