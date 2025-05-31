/**
 * APP_METADATA
 * @name AppMaker
 * @icon fas fa-toolbox
 * @description Interactive App Creator & Tutorial
 * @category Tutorials
 * @version 1.1.1
 * @author EmberFrame Team
 * @enabled true
 */

class AppMaker {
  static _container = null;
  static _fields = {
    name: null,
    icon: null,
    description: null,
    category: null,
    version: null,
    author: null,
    enabled: null
  };
  static _codeEditor = null;

  static createWindow() {
    return {
      title: 'AppMaker',
      width: '650px',
      height: '750px',
      content: `
        <div id="appmaker" style="display: flex; flex-direction: column; height: 100%; font-family: 'Arial', sans-serif; color: #333; box-sizing: border-box; padding: 12px; background: #fafafa;">

          <!-- Header -->
          <h2 style="margin: 0 0 10px 0; color: #007acc;">AppMaker: Create Your Own JS Apps</h2>

          <!-- Main Layout -->
          <div style="display: flex; flex: 1; gap: 12px; overflow: hidden;">

            <!-- Left Panel: Tutorial / Info -->
            <div id="appmaker-tutorial" style="flex: 1; background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 10px; overflow-y: auto;">
              <h3 style="margin-top: 0; color: #007acc;">Quick Start Guide</h3>
              <p>Welcome to <strong>AppMaker</strong>. This tool helps you scaffold and save new JavaScript‐based applications for the WindowManager environment.</p>
              <ol style="padding-left: 18px;">
                <li><strong>Fill Metadata:</strong> Enter your app’s <em>Name</em>, <em>Icon</em> (FontAwesome class), <em>Description</em>, <em>Category</em>, <em>Version</em>, and <em>Author</em>.</li>
                <li><strong>Write Your Code:</strong> In the code editor below, implement your app class. It should follow the pattern:
                  <pre style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 13px; display: inline-block;">
class MyApp {
  static createWindow() {
    return {
      title: 'MyApp',
      width: '400px',
      height: '300px',
      content: \`&lt;div style="padding: 10px; font-family: 'Arial', sans-serif;"&gt;
  &lt;h3&gt;Hello from MyApp!&lt;/h3&gt;
  &lt;p&gt;Customize this template.&lt;/p&gt;
&lt;/div&gt;\`,
      onInit: (container) => { /* initialize events */ },
      onDestroy: () => { /* cleanup */ }
    };
  }
}
window.MyApp = MyApp;
                  </pre>
                </li>
                <li><strong>Use Templates:</strong> Click “Insert Template” to paste a basic app skeleton as a starting point.</li>
                <li><strong>Save as .js:</strong> When ready, click “Save App.” This will download your app as a <code>.js</code> file containing metadata and your code.</li>
              </ol>
              <h3 style="margin-top: 16px; color: #007acc;">App Skeleton Example</h3>
              <pre style="background: #f0f0f0; padding: 8px; border-radius: 4px; font-size: 13px; overflow-x: auto;">
/**
 * APP_METADATA
 * @name MyApp
 * @icon fas fa-rocket
 * @description Description of MyApp
 * @category Utilities
 * @version 0.1.0
 * @author You
 * @enabled true
 */

class MyApp {
  static createWindow() {
    return {
      title: 'MyApp',
      width: '400px',
      height: '300px',
      content: \`&lt;div style="padding: 10px; font-family: 'Arial', sans-serif;"&gt;
  &lt;h3&gt;Hello from MyApp!&lt;/h3&gt;
  &lt;p&gt;Customize this template.&lt;/p&gt;
&lt;/div&gt;\`,
      onInit: (container) => { /* initialize events */ },
      onDestroy: () => { /* cleanup */ }
    };
  }
}

window.MyApp = MyApp;
              </pre>
            </div>

            <!-- Right Panel: Input Fields & Code Editor -->
            <div style="flex: 1.5; display: flex; flex-direction: column; gap: 8px; overflow: hidden;">

              <!-- Metadata Form -->
              <div style="background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 10px; overflow-y: auto;">
                <h3 style="margin-top: 0; color: #007acc;">App Metadata</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">

                  <div style="display: flex; gap: 8px;">
                    <div style="flex: 1; display: flex; flex-direction: column;">
                      <label for="meta-name" style="font-weight: bold;">Name</label>
                      <input id="meta-name" type="text" placeholder="MyNewApp" style="padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px;" />
                    </div>
                    <div style="flex: 1; display: flex; flex-direction: column;">
                      <label for="meta-icon" style="font-weight: bold;">Icon (FontAwesome)</label>
                      <input id="meta-icon" type="text" placeholder="fas fa-rocket" style="padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px;" />
                    </div>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <div style="flex: 1; display: flex; flex-direction: column;">
                      <label for="meta-description" style="font-weight: bold;">Description</label>
                      <input id="meta-description" type="text" placeholder="A brief app description" style="padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px;" />
                    </div>
                    <div style="flex: 1; display: flex; flex-direction: column;">
                      <label for="meta-category" style="font-weight: bold;">Category</label>
                      <input id="meta-category" type="text" placeholder="Utilities" style="padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px;" />
                    </div>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <div style="flex: 1; display: flex; flex-direction: column;">
                      <label for="meta-version" style="font-weight: bold;">Version</label>
                      <input id="meta-version" type="text" placeholder="0.1.0" style="padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px;" />
                    </div>
                    <div style="flex: 1; display: flex; flex-direction: column;">
                      <label for="meta-author" style="font-weight: bold;">Author</label>
                      <input id="meta-author" type="text" placeholder="Your Name" style="padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px;" />
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <input id="meta-enabled" type="checkbox" checked style="width: 16px; height: 16px;" />
                    <label for="meta-enabled" style="font-weight: bold;">Enabled by Default</label>
                  </div>
                </div>
              </div>

              <!-- Code Editor -->
              <div style="flex: 1; display: flex; flex-direction: column; background: #fff; border: 1px solid #ccc; border-radius: 4px; overflow: hidden;">
                <div style="display: flex; align-items: center; justify-content: space-between; background: #eee; padding: 6px 10px; border-bottom: 1px solid #ccc;">
                  <span style="font-weight: bold; color: #007acc;">Code Editor</span>
                  <button id="insert-template-btn" style="padding: 4px 8px; background: #007acc; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;">
                    Insert Template
                  </button>
                </div>
                <textarea id="code-editor" style="flex: 1; width: 100%; resize: none; border: none; font-family: monospace; font-size: 14px; padding: 8px; box-sizing: border-box; background: #fafafa;"></textarea>
              </div>

              <!-- Action Buttons -->
              <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
                <button id="save-app-btn" style="padding: 10px 16px; background: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
                  Save App as .js
                </button>
              </div>

            </div>
          </div>
        </div>
      `,
      onInit: (container) => {
        AppMaker._container = container;

        // Cache metadata fields
        AppMaker._fields.name = container.querySelector('#meta-name');
        AppMaker._fields.icon = container.querySelector('#meta-icon');
        AppMaker._fields.description = container.querySelector('#meta-description');
        AppMaker._fields.category = container.querySelector('#meta-category');
        AppMaker._fields.version = container.querySelector('#meta-version');
        AppMaker._fields.author = container.querySelector('#meta-author');
        AppMaker._fields.enabled = container.querySelector('#meta-enabled');

        // Code editor
        AppMaker._codeEditor = container.querySelector('#code-editor');

        // Buttons
        container.querySelector('#insert-template-btn').addEventListener('click', AppMaker._insertTemplate);
        container.querySelector('#save-app-btn').addEventListener('click', AppMaker._saveApp);
      },
      onDestroy: () => {
        // Cleanup listeners
        const container = AppMaker._container;
        if (!container) return;
        container.querySelector('#insert-template-btn').removeEventListener('click', AppMaker._insertTemplate);
        container.querySelector('#save-app-btn').removeEventListener('click', AppMaker._saveApp);
      }
    };
  }

  // Insert a basic app skeleton into the code editor
  static _insertTemplate() {
    // Determine a safe class name (fallback to “NewApp” if invalid)
    let rawName = AppMaker._fields.name.value.trim();
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(rawName)) {
      rawName = 'NewApp';
    }
    const className = rawName;

    // Fill template with current metadata or placeholders
    const template = `
/**
 * APP_METADATA
 * @name ${className}
 * @icon ${AppMaker._fields.icon.value.trim() || 'fas fa-rocket'}
 * @description ${AppMaker._fields.description.value.trim() || 'An awesome new app'}
 * @category ${AppMaker._fields.category.value.trim() || 'Utilities'}
 * @version ${AppMaker._fields.version.value.trim() || '0.1.0'}
 * @author ${AppMaker._fields.author.value.trim() || 'You'}
 * @enabled ${AppMaker._fields.enabled.checked}
 */

class ${className} {
  static createWindow() {
    return {
      title: '${className}',
      width: '400px',
      height: '300px',
      content: \`<div style="padding: 10px; font-family: 'Arial', sans-serif;">
  <h3>Welcome to ${className}!</h3>
  <p>Customize your content here.</p>
</div>\`,
      onInit: (container) => {
        // Initialization code here
      },
      onDestroy: () => {
        // Cleanup code here
      }
    };
  }
}

window.${className} = ${className};
`.trim();

    AppMaker._codeEditor.value = template;
    AppMaker._codeEditor.focus();
  }

  // Gather metadata and code, then trigger a download of a .js file
  static _saveApp() {
    const nameField = AppMaker._fields.name.value.trim();
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(nameField)) {
      alert('Please enter a valid JavaScript class name (no spaces or invalid characters).');
      return;
    }
    const className = nameField;

    // Build metadata comment block
    const metaLines = [
      '/**',
      ' * APP_METADATA',
      ` * @name ${className}`,
      ` * @icon ${AppMaker._fields.icon.value.trim() || 'fas fa-rocket'}`,
      ` * @description ${AppMaker._fields.description.value.trim() || ''}`,
      ` * @category ${AppMaker._fields.category.value.trim() || ''}`,
      ` * @version ${AppMaker._fields.version.value.trim() || '0.1.0'}`,
      ` * @author ${AppMaker._fields.author.value.trim() || ''}`,
      ` * @enabled ${AppMaker._fields.enabled.checked}`,
      ' */',
      ''
    ];
    const metadataBlock = metaLines.join('\n');

    // Get user code
    const userCode = AppMaker._codeEditor.value.trim();
    if (!userCode) {
      alert('Code editor is empty. Please write your app code or insert a template.');
      return;
    }

    // Check that code contains a window assignment (best practice)
    if (!userCode.includes(`window.${className}`)) {
      const proceed = confirm(`Your code does not assign the class to window.${className}. Proceed anyway?`);
      if (!proceed) return;
    }

    // Combine into full file content
    const fileContent = metadataBlock + '\n' + userCode;

    // Create a Blob and trigger download
    const blob = new Blob([fileContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = className + '.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Export for WindowManager
window.AppMaker = AppMaker;
