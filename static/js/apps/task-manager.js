// static/js/apps/task-manager.js

class TaskManager {
  // When the user launches “Task Manager” this is called by WindowManager:
  static createWindow() {
    return {
      title: 'Task Manager',
      width: '600px',
      height: '400px',
      // EmberFrame will set this as the innerHTML of the content area,
      // then pass that element to our onInit callback.
      content: '<div id="task-manager" style="padding:10px; font-family:sans-serif;"></div>',
      onInit: (container) => {
        TaskManager._container = container;
        TaskManager.render();
      }
    };
  }

  // Fetch the list of running windows, build the UI, hook up the Kill buttons
  static render() {
    const container = TaskManager._container;
    if (!container) return;

    // Clear out old content
    container.innerHTML = '';

    // Header
    const header = document.createElement('h2');
    header.textContent = 'Running Applications';
    header.style.marginTop = '0';
    container.appendChild(header);

    // Get the list of open windows from the global WindowManager
    // (Replace these method names if yours differ)
    const windows = window.WindowManager.getWindows();

    if (!windows.length) {
      const none = document.createElement('div');
      none.textContent = 'No running applications.';
      container.appendChild(none);
      return;
    }

    // Build a simple list
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    windows.forEach(win => {
      const item = document.createElement('li');
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.padding = '4px 0';

      // App title
      const title = document.createElement('span');
      title.textContent = win.title || win.appName || `Window ${win.id}`;
      item.appendChild(title);

      // Kill button
      const btn = document.createElement('button');
      btn.textContent = 'Kill';
      btn.style.marginLeft = '10px';
      btn.addEventListener('click', () => {
        // Close the window via WindowManager API
        window.WindowManager.closeWindow(win.id);
        // Re-render the list
        TaskManager.render();
      });
      item.appendChild(btn);

      list.appendChild(item);
    });
    container.appendChild(list);
  }
}

// Expose it so WindowManager can find it:
window.TaskManager = TaskManager;
