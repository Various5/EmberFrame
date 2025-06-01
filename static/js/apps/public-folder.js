/**
 * APP_METADATA
 * @name Public Files
 * @icon fas fa-globe
 * @description Browse shared files and folders
 * @category System
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

// Public Folder Manager - wrapper for File Manager with public path
class PublicFolder {
    static createWindow() {
        // Use the File Manager but with public path
        const windowData = window.FileManager.createWindow('public/');
        windowData.title = 'Public Files';
        return windowData;
    }

    static onClose(windowElement) {
        return true;
    }
}

window.EmberFrame.registerApp('public-folder', PublicFolder);