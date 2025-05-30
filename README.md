# 🔥 EmberFrame

**A Cyberpunk Web-Based Desktop Environment**

EmberFrame is a modern, full-featured desktop environment that runs entirely in your web browser. Built with a futuristic cyberpunk aesthetic, it provides a complete operating system experience with real file management, multi-user support, and a suite of productivity applications.

## ✨ Features

### 🖥️ **Complete Desktop Experience**
- **Window Management**: Draggable, resizable windows with minimize/maximize/close controls
- **Taskbar**: Real-time application management with running app indicators
- **Start Menu**: Quick access to all applications with search functionality
- **Desktop Icons**: Double-click to launch applications
- **Detachable Windows**: Pop windows out to separate browser tabs (desktop only)

### 📁 **Real File System Integration**
- **File Manager**: Browse, upload, download, and organize files
- **User Directories**: Personal file spaces with standard folders (Documents, Downloads, etc.)
- **Public Folders**: Shared file spaces for collaboration
- **Drag & Drop**: Native drag-and-drop file operations
- **File Type Support**: Open text files, images, and more

### 💻 **Built-in Applications**
- **Terminal**: Full-featured command-line interface with Unix-like commands
- **Text Editor**: Syntax highlighting, find/replace, multiple themes
- **Settings**: Comprehensive system customization options
- **File Browser**: Integrated file selection dialogs

### 👥 **Multi-User System**
- **User Authentication**: Secure login/registration system
- **Personal Workspaces**: Isolated user environments
- **Session Management**: Persistent user sessions
- **User Preferences**: Customizable themes and settings

### 🎨 **Customization**
- **Themes**: Multiple color schemes (Ember Red, Cyber Blue, Matrix Green, etc.)
- **Wallpapers**: Custom background support with gradients and images
- **Layout Options**: Configurable desktop and window arrangements
- **Font Options**: Multiple font families and sizes

### 📱 **Mobile Responsive**
- **Touch Optimized**: Native touch gestures and mobile-friendly interface
- **Responsive Design**: Adapts to screens from phone to desktop
- **Mobile Gestures**: Swipe to minimize, tap to launch
- **Optimized Layout**: Mobile-specific window management

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/emberframe.git
   cd emberframe
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python run.py
   ```

4. **Access EmberFrame**
   Open your browser and navigate to `http://localhost:5000`

### First Login
- **Create Account**: Use any username (3+ characters) and password (6+ characters)
- **Demo Mode**: For testing, any valid credentials will work
- **Default Admin**: Username: `admin`, Password: `admin123`

## 🏗️ Architecture

### Backend Stack
- **Flask**: Web framework and API server
- **Flask-SocketIO**: Real-time communication
- **SQLAlchemy**: Database ORM (SQLite default)
- **Flask-Login**: User session management
- **Flask-WTF**: CSRF protection

### Frontend Stack
- **HTML5/CSS3**: Modern web standards
- **JavaScript ES6+**: Application logic and UI
- **WebSocket**: Real-time features
- **CSS Grid/Flexbox**: Responsive layouts
- **Font Awesome**: Icon library

### File Structure
```
emberframe/
├── app/
│   ├── __init__.py           # Flask app initialization
│   ├── models/               # Database models
│   ├── routes/               # API endpoints
│   ├── services/             # Business logic
│   └── utils/                # Utility functions
├── static/
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript modules
│   │   ├── apps/             # Application modules
│   │   ├── core/             # Core system modules
│   │   └── utils/            # Utility functions
│   └── wallpapers/           # Background images
├── templates/                # HTML templates
├── user_data/                # User file storage
├── public_data/              # Public file storage
├── requirements.txt          # Python dependencies
└── run.py                    # Application launcher
```

## 🔧 Configuration

### Environment Variables
```bash
export FLASK_ENV=development
export SECRET_KEY=your-secret-key-here
export DATABASE_URL=sqlite:///emberframe.db
export UPLOAD_FOLDER=user_data
export PORT=5000
```

### Settings File (config.py)
```python
class Config:
    SECRET_KEY = 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///emberframe.db'
    UPLOAD_FOLDER = 'user_data'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
```

## 🎮 Usage Guide

### Window Management
- **Open Apps**: Double-click desktop icons or use Start menu
- **Move Windows**: Drag window headers (desktop only)
- **Resize Windows**: Drag window edges (desktop only)
- **Minimize**: Click yellow button or swipe down on mobile
- **Maximize**: Click green button
- **Detach**: Click blue arrow to open in new browser window (desktop only)
- **Close**: Click red X button

### File Operations
- **Upload Files**: Drag files into File Manager or use upload button
- **Download Files**: Right-click files and select download
- **Create Folders**: Use "New Folder" button in File Manager
- **Navigate**: Double-click folders to enter, use back button to go up

### Terminal Commands
```bash
ls              # List files
cd <directory>  # Change directory
cat <file>      # Display file contents
mkdir <name>    # Create directory
rm <file>       # Remove file
pwd             # Show current directory
help            # Show all commands
```

### Keyboard Shortcuts
- **Ctrl+N**: New file (Text Editor)
- **Ctrl+O**: Open file
- **Ctrl+S**: Save file
- **Ctrl+F**: Find/Replace
- **Ctrl+L**: Clear terminal
- **F5**: Refresh File Manager

## 🛠️ Development

### Adding New Applications

1. **Create App Module** (`static/js/apps/myapp.js`)
   ```javascript
   class MyApp {
       static createWindow() {
           return {
               title: 'My Application',
               width: '600px',
               height: '400px',
               content: '<div>App content here</div>',
               onInit: (windowElement) => {
                   MyApp.init(windowElement);
               }
           };
       }
       
       static init(windowElement) {
           // Initialize your app
       }
   }
   window.MyApp = MyApp;
   ```

2. **Add to Desktop** (update `templates/desktop.html`)
   ```html
   <div class="desktop-icon" data-app="myapp">
       <div class="icon-image"><i class="fas fa-star"></i></div>
       <div class="icon-label">My App</div>
   </div>
   ```

3. **Register in Window Manager** (`static/js/window-manager.js`)
   ```javascript
   case 'myapp':
       windowData = window.MyApp ? window.MyApp.createWindow() : null;
       break;
   ```

### API Endpoints

#### File Operations
- `GET /api/files/<path>` - List directory contents
- `POST /api/files/<path>` - Create file/folder
- `PUT /api/files/<path>` - Update file content
- `DELETE /api/files/<path>` - Delete file/folder

#### User Management
- `POST /login` - User authentication
- `POST /register` - User registration
- `GET /logout` - End user session
- `GET /api/user/preferences` - Get user settings
- `POST /api/user/preferences` - Save user settings

### Theming

Create custom themes in `app/services/theme_service.py`:
```python
'my_theme': {
    'name': 'My Theme',
    'primary_color': '#ff0000',
    'secondary_color': '#00ff00',
    'background': 'linear-gradient(135deg, #000 0%, #333 100%)',
    'description': 'My custom theme'
}
```

## 🧪 Testing

### Run Tests
```bash
# Install test dependencies
pip install pytest pytest-flask

# Run tests
pytest tests/
```

### Manual Testing
1. Create test user accounts
2. Upload various file types
3. Test window operations
4. Verify mobile responsiveness
5. Test detached windows

## 📱 Mobile Support

EmberFrame includes comprehensive mobile support:

- **Responsive Design**: Automatically adapts to screen size
- **Touch Gestures**: Native touch interactions
- **Mobile-Optimized UI**: Larger touch targets, simplified controls
- **Gesture Navigation**: Swipe gestures for window management
- **Mobile-First CSS**: Progressive enhancement from mobile to desktop

## 🐛 Troubleshooting

### Common Issues

**Can't login/register**
- Check browser console for errors
- Verify Flask-WTF is installed: `pip install Flask-WTF`
- Check CSRF token is properly configured

**Files not uploading**
- Check upload folder permissions
- Verify MAX_CONTENT_LENGTH setting
- Check available disk space

**Windows not opening**
- Check browser console for JavaScript errors
- Verify all app modules are loaded
- Check WindowManager initialization

**Mobile issues**
- Clear browser cache
- Check viewport meta tag
- Verify touch event handlers

### Debug Mode
```bash
export FLASK_ENV=development
export FLASK_DEBUG=1
python run.py
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Code Style
- **Python**: Follow PEP 8
- **JavaScript**: Use ES6+ features, camelCase
- **CSS**: Use BEM methodology
- **HTML**: Semantic markup

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for icons
- **Google Fonts** for typography
- **Flask Community** for the excellent framework
- **Socket.IO** for real-time communication

## 🔗 Links


---

**EmberFrame** - *Bringing the future to your browser, one window at a time.*

Made with 🔥 by the EmberFrame Team
