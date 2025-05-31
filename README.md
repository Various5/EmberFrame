# 🔥 EmberFrame

A **Web-Based Desktop Environment**  
EmberFrame is a full-featured, futuristic desktop environment that runs entirely in your web browser. With a cyberpunk aesthetic, real file management, multi-user support, and a suite of productivity apps, it delivers a complete operating system experience—no installation required[1].

---

## ✨ Features

- **Desktop Experience**:  
  - Draggable, resizable windows with minimize, maximize, and close controls  
  - Taskbar with real-time app management  
  - Start menu with app search  
  - Desktop icons for quick launch  
  - Detachable windows (pop out to new tabs, desktop only)[1]

- **File System Integration**:  
  - File manager with upload, download, and organization  
  - Personal user directories (Documents, Downloads, etc.)  
  - Public folders for collaboration  
  - Native drag-and-drop  
  - Support for text files, images, and more[1]

- **Built-in Apps**:  
  - Terminal (Unix-like commands)  
  - Text editor (syntax highlighting, themes, find/replace)  
  - Settings panel  
  - Integrated file dialogs[1]

- **Multi-User System**:  
  - Secure authentication and registration  
  - Personal workspaces and preferences  
  - Persistent sessions[1]

- **Customization**:  
  - Multiple themes (Ember Red, Cyber Blue, Matrix Green, etc.)  
  - Custom wallpapers (gradients, images)  
  - Configurable layouts and fonts[1]

- **Mobile Responsive**:  
  - Touch gestures  
  - Adaptive layout for all screen sizes  
  - Mobile-specific window management[1]

---

## 🚀 Quick Start

**Prerequisites**  
- Python 3.8+  
- Modern browser (Chrome, Firefox, Safari, Edge)[1]

**Installation**
```bash
git clone https://github.com/Various5/EmberFrame.git
cd emberframe
pip install -r requirements.txt
python run.py
```
Open your browser and go to:  
`http://localhost:5000`[1]

**First Login**  
- Create an account (username: 3+ chars, password: 6+ chars)  
- Demo mode: Any valid credentials work  
- Default admin:  
  - Username: `admin`  
  - Password: `admin123`[1]

---

## 🏗️ Architecture

**Backend**  
- Flask (API server)  
- Flask-SocketIO (real-time)  
- SQLAlchemy (DB/ORM, SQLite default)  
- Flask-Login (sessions)  
- Flask-WTF (CSRF protection)[1]

**Frontend**  
- HTML5/CSS3  
- JavaScript ES6+  
- WebSocket  
- CSS Grid/Flexbox  
- Font Awesome[1]

**File Structure**
```
emberframe/
├── app/
│   ├── __init__.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── static/
│   ├── css/
│   ├── js/
│   │   ├── apps/
│   │   ├── core/
│   │   └── utils/
│   └── wallpapers/
├── templates/
├── user_data/
├── public_data/
├── requirements.txt
└── run.py
```


---

## 🔧 Configuration

**Environment Variables**
```bash
export FLASK_ENV=development
export SECRET_KEY=your-secret-key-here
export DATABASE_URL=sqlite:///emberframe.db
export UPLOAD_FOLDER=user_data
export PORT=5000
```

**Settings File (`config.py`)**
```python
class Config:
    SECRET_KEY = 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///emberframe.db'
    UPLOAD_FOLDER = 'user_data'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
```


---

## 🎮 Usage Guide

**Window Management**
- Open apps: Double-click desktop icons or use Start menu
- Move/resize: Drag window headers/edges (desktop)
- Minimize: Yellow button or swipe down (mobile)
- Maximize: Green button
- Detach: Blue arrow (desktop only)
- Close: Red X button[1]

**File Operations**
- Upload: Drag into File Manager or use upload button
- Download: Right-click and select download
- Create folders: "New Folder" button
- Navigate: Double-click folders, use back button[1]

**Terminal Commands**
```
ls                # List files
cd     # Change directory
cat         # Show contents
mkdir       # Make directory
rm          # Remove file
pwd               # Current directory
help              # List commands
```


**Keyboard Shortcuts**
- Ctrl+N: New file (Text Editor)
- Ctrl+O: Open file
- Ctrl+S: Save file
- Ctrl+F: Find/Replace
- Ctrl+L: Clear terminal
- F5: Refresh File Manager[1]

---

## 🛠️ Development

**Adding Your Own App or Game**

1. **Create App Module**  
   Add a new JS file in `static/js/apps/`, e.g. `myapp.js`:
   ```js
   class MyApp {
     static createWindow() {
       return {
         title: 'My Application',
         width: '600px',
         height: '400px',
         content: 'App content here',
         onInit: (windowElement) => { MyApp.init(windowElement); }
       };
     }
     static init(windowElement) {
       // Initialize your app
     }
   }
   window.MyApp = MyApp;
   ```


2. **Add to Desktop**  
   Edit `templates/desktop.html` to add your app icon:
   ```html
   
     
     My App
   
   ```


3. **Register in Window Manager**  
   In `static/js/window-manager.js`, add your app:
   ```js
   case 'myapp':
     windowData = window.MyApp ? window.MyApp.createWindow() : null;
     break;
   ```


**API Endpoints**  
- File operations: `GET/POST/PUT/DELETE /api/files/`
- User management: `POST /login`, `POST /register`, `GET /logout`
- User preferences: `GET/POST /api/user/preferences`[1]

**Theming**  
Add custom themes in `app/services/theme_service.py`:
```python
'my_theme': {
  'name': 'My Theme',
  'primary_color': '#ff0000',
  'secondary_color': '#00ff00',
  'background': 'linear-gradient(135deg, #000 0%, #333 100%)',
  'description': 'My custom theme'
}
```


---

## 🧪 Testing

- Install test dependencies:  
  `pip install pytest pytest-flask`
- Run tests:  
  `pytest tests/`
- Manual testing:  
  - Create user accounts  
  - Upload files  
  - Test window operations  
  - Check mobile responsiveness  
  - Try detached windows[1]

---

## 📱 Mobile Support

- Responsive design adapts to all screens  
- Touch gestures for window management  
- Mobile-optimized UI with larger targets and simplified controls[1]

---

## 🐛 Troubleshooting

**Common Issues**
- Login/register: Check browser console, Flask-WTF, CSRF token
- File upload: Check folder permissions, `MAX_CONTENT_LENGTH`, disk space
- Windows not opening: Check JS console, module loading, WindowManager
- Mobile: Clear cache, check viewport meta, touch handlers[1]

**Debug Mode**
```bash
export FLASK_ENV=development
export FLASK_DEBUG=1
python run.py
```


---

## 🤝 Contributing

- Fork, branch, and submit pull requests  
- Add tests for new features  
- Python: PEP 8, JS: ES6+, CSS: BEM, HTML: semantic markup[1]

---

## 📄 License

MIT License—see LICENSE file for details[1].

---

## 🙏 Acknowledgments

- Font Awesome for icons  
- Google Fonts for typography  
- Flask Community  
- Socket.IO for real-time features[1]

---

**EmberFrame** — *Bringing the future to your browser, one window at a time.*

Citations:
[1] https://github.com/Various5/EmberFrame

---
Antwort von Perplexity: pplx.ai/share