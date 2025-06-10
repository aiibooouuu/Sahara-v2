# 🌟 Sahara Job Portal

Welcome to **Sahara**, a modern, minimalistic, and professional job portal web application!  
This project is designed for seamless job listing, application management, and company profile presentation.

---

## 🚀 Features

- **Employer Dashboard:**

  - Company info board with modern stats and visuals
  - Employee strength, average salary, department breakdown, and more

- **Job Listing & Applications:**

  - Employers can list jobs with live preview
  - Applicants can view and apply for jobs

- **Application Management:**

  - View all job applications in a clean, card-based UI
  - Dummy preview if no applications are present

- **Responsive & Modern UI:**
  - Sidebar navigation, sticky navbar, dotted/circle backgrounds
  - Minimalist cards, gradients, and subtle animations

---

## 🛠️ Tech Stack

- **Frontend:**

  - [React.js](https://react.dev/) (with functional components & hooks)
  - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (custom, modular, responsive)
  - [React Router](https://reactrouter.com/) (for navigation)
  - [Vite](https://vitejs.dev/) (for fast development & build)

- **Backend (optional):**

  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (for API endpoints)
  - [MongoDB](https://www.mongodb.com/) (for persistent data storage)
  - [Mongoose](https://mongoosejs.com/) (for MongoDB object modeling)

- **Data (Demo):**
  - JSON files for employees and applications (can be swapped for API/database)

---

## 📁 Project Structure

```bash
sahara-new/
└── sahara-2/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Sidebar.css
    │   │   └── ...
    │   ├── data/
    │   │   ├── employees.json
    │   │   └── ...
    │   ├── pages/
    │   │   ├── Applications.jsx
    │   │   ├── Applications.css
    │   │   ├── EmployerPage.jsx
    │   │   ├── EmployerPage.css
    │   │   ├── JobApplicationsPage.jsx
    │   │   ├── JobApplicationsPage.css
    │   │   ├── ViewApplications.jsx
    │   │   ├── ViewApplications.css
    │   │   └── ...
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── README.md
```

- All React components are in `src/components/`
- All page views and their CSS are in `src/pages/`
- Demo/static data is in `src/data/`
- Main entry points and global styles are in `src/`
- Project is ready for both static JSON and backend API integration

---

## 🖥️ How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/sahara-job-portal.git
   cd sahara-job-portal/sahara-2

   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Start the development server**

   ```bash
   npm run dev

   ```

4. **Open in your own browser**

   ```bash
   Visit http://localhost:5173

   ```
