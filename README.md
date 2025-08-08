
# 📘 StudyFlow

> _An AI-powered roadmap navigator built with Next.js and Firebase Studio._

StudyFlow is your intelligent study companion that helps you craft personalized learning journeys. Whether you're learning web development, AI, or design, StudyFlow creates, tracks, and enhances your roadmap with smart AI suggestions and a sleek dashboard experience.


---

## 🚀 Features

- ✨ **AI-Generated Roadmaps** — Learn smarter with personalized AI-based study paths using Google Gemini.
- 📚 **Topic Breakdown & Summarization** — Understand complex topics faster with summarized resources.
- 📈 **Progress Tracking** — Stay on top of your learning with dynamic milestones.
- 🔐 **Secure Authentication** — Your data stays yours, secured with JWT.
- 🎯 **Milestone Dashboard** — Visual overview of goals, achievements, and your next steps.
- 🧩 **Reusable Components** — Built with `shadcn/ui` for modern and consistent UI.

---

## 🛠️ Tech Stack

| Category         | Stack                                                                 |
|------------------|-----------------------------------------------------------------------|
| **Frontend**     | Next.js, TypeScript, Tailwind CSS, shadcn/ui                         |
| **AI Integration**| Google Gemini AI with Genkit                         |
| **State & Auth** | JWT (JSON Web Tokens), Local Storage                                 |
| **Hosting**      | Firebase Studio/Vercel                                                      |

---

## 📂 Project Structure

```
📦 studyflow
 ┣ 📂 src
 ┃ ┣ 📂 components     # Reusable UI components
 ┃ ┣ 📂 lib            # Utility libraries (helpers, API)
 ┃ ┗ 📂 app            # Next.js App Router (pages, layouts)
 ┣ 📂 public            # Static files
 ┣ 📂 docs              # Documentation and banners
 ┣ 📜 .env.example      # Environment variable example
 ┣ 📜 apphosting.yaml   # Firebase deployment config
 ┣ 📜 README.md
```

---

## 🧪 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/sujaljadhav14/StudyFlow.git
cd StudyFlow
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Then update `.env.local`:

```env
GOOGLE_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

### 3. Run the development server

```bash
npm run dev
```

---

## 🌐 Live Preview

> Coming Soon on [sujaljadhav.vercel.app](https://sujaljadhav.vercel.app)

---

## 🤝 Contributing

We welcome contributions to improve and scale StudyFlow.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Made with ❤️ by [**Sujal Jadhav**](https://sujaljadhav.vercel.app)  
📧 sujaljadhav2627@gmail.com

---

> “Study smarter, not harder — with StudyFlow.”