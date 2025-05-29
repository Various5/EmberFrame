// File Manager Application
class FileManager {
    static createWindow() {
        return {
            title: 'File Manager',
            width: '600px',
            height: '450px',
            content: `
                <div class="file-manager">
                    <div class="file-manager-toolbar">
                        <button onclick="FileManager.goBack()" id="back-btn" disabled>← Back</button>
                        <button onclick="FileManager.goHome()">🏠 Home</button>
                        <span class="file-path" id="current-path">/home</span>
                        <button onclick="FileManager.createFolder()" style="margin-left: auto;">📁 New Folder</button>
                    </div>
                    <div class="file-manager-content">
                        <div class="file-list" id="file-list">
                            <!-- Files will be loaded here -->
                        </div>
                    </div>
                    <div class="file-manager-status">
                        <span id="file-count">0 items</span>
                    </div>
                </div>
                <style>
                    .file-manager {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .file-manager-toolbar {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px 0;
                        border-bottom: 1px solid #ddd;
                        margin-bottom: 10px;
                    }
                    .file-path {
                        flex: 1;
                        padding: 5px 10px;
                        background: #f5f5f5;
                        border-radius: 4px;
                        font-family: monospace;
                    }
                    .file-manager-content {
                        flex: 1;
                        overflow-y: auto;
                    }
                    .file-list {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                        gap: 10px;
                        padding: 10px 0;
                    }
                    .file-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 10px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .file-item:hover {
                        background-color: #f0f0f0;
                    }
                    .file-item.selected {
                        background-color: #e3f2fd;
                    }
                    .file-icon {
                        font-size: 32px;
                        margin-bottom: 5px;
                    }
                    .file-name {
                        font-size: 12px;
                        text-align: center;
                        word-break: break-word;
                    }
                    .file-manager-status {
                        border-top: 1px solid #ddd;
                        padding: 8px 0;
                        font-size: 12px;
                        color: #666;
                    }
                </style>
            `,
            onInit: (windowElement) => {
                FileManager.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentPath = '/home';
        this.pathHistory = ['/home'];
        this.currentWindow = windowElement;
        this.loadDirectory('/home');
    }

    static loadDirectory(path) {
        this.currentPath = path;
        document.getElementById('current-path').textContent = path;

        // Simulate file system
        const files = this.getDirectoryContents(path);
        this.renderFiles(files);

        // Update back button
        const backBtn = document.getElementById('back-btn');
        backBtn.disabled = this.pathHistory.length <= 1;

        // Update file count
        document.getElementById('file-count').textContent = `${files.length} items`;
    }

    static getDirectoryContents(path) {
        // Simulated file system
        const fileSystem = {
            '/home': [
                { name: 'Documents', type: 'folder', icon: '📁' },
                { name: 'Downloads', type: 'folder', icon: '📁' },
                { name: 'Pictures', type: 'folder', icon: '📁' },
                { name: 'Desktop', type: 'folder', icon: '📁' },
                { name: 'readme.txt', type: 'file', icon: '📄', size: '1.2 KB' },
                { name: 'notes.md', type: 'file', icon: '📝', size: '856 B' }
            ],
            '/home/Documents': [
                { name: 'Projects', type: 'folder', icon: '📁' },
                { name: 'Work', type: 'folder', icon: '📁' },
                { name: 'report.pdf', type: 'file', icon: '📄', size: '2.5 MB' },
                { name: 'presentation.pptx', type: 'file', icon: '📊', size: '5.1 MB' }
            ],
            '/home/Downloads': [
                { name: 'software.zip', type: 'file', icon: '🗜️', size: '15.2 MB' },
                { name: 'image.jpg', type: 'file', icon: '🖼️', size: '3.4 MB' }
            ],
            '/home/Pictures': [
                { name: 'vacation.jpg', type: 'file', icon: '🖼️', size: '2.1 MB' },
                { name: 'family.png', type: 'file', icon: '🖼️', size: '1.8 MB' },
                { name: 'screenshot.png', type: 'file', icon: '🖼️', size: '456 KB' }
            ]
        };

        return fileSystem[path] || [];
    }

    static renderFiles(files) {
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-icon">${file.icon}</div>
                <div class="file-name">${file.name}</div>
                ${file.size ? `<div style="font-size: 10px; color: #888;">${file.size}</div>` : ''}
            `;

            fileItem.addEventListener('click', () => {
                this.selectFile(fileItem, file);
            });

            fileItem.addEventListener('dblclick', () => {
                this.openFile(file);
            });

            fileList.appendChild(fileItem);
        });
    }

    static selectFile(element, file) {
        // Clear other selections
        document.querySelectorAll('.file-item').forEach(item =>
            item.classList.remove('selected')
        );
        // Select this file
        element.classList.add('selected');
    }

    static openFile(file) {
        if (file.type === 'folder') {
            const newPath = `${this.currentPath}/${file.name}`;
            this.pathHistory.push(this.currentPath);
            this.loadDirectory(newPath);
        } else {
            // Open file in appropriate app
            if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
                if (window.WindowManager) {
                    window.WindowManager.openApp('text-editor');
                }
            }
        }
    }

    static goBack() {
        if (this.pathHistory.length > 1) {
            this.pathHistory.pop();
            const previousPath = this.pathHistory[this.pathHistory.length - 1];
            this.loadDirectory(previousPath);
        }
    }

    static goHome() {
        this.pathHistory = ['/home'];
        this.loadDirectory('/home');
    }

    static createFolder() {
        const folderName = prompt('Enter folder name:');
        if (folderName && folderName.trim()) {
            // Simulate folder creation
            alert(`Folder "${folderName}" created successfully!`);
            // In a real implementation, you would update the file system
        }
    }

    static onClose(windowElement) {
        // Cleanup when window is closed
        this.currentWindow = null;
    }
}

window.FileManager = FileManager;