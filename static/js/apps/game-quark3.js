/**
 * APP_METADATA
 * @name Placeholder
 * @icon fas fa-square
 * @description Simple test app that opens a “Placeholder” window
 * @category Utilities
 * @version 1.0.0
 * @author ChatGPT
 * @enabled true
 */
class Placeholder {
  static createWindow() {
    return {
      title: '🔲 Placeholder App',
      width: '400px',
      height: '300px',
      content: `
        <div style="
          width:100%;
          height:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#f0f0f0;
          font-family:Arial, sans-serif;
          color:#333;
          font-size:18px;
        ">
          Placeholder App Working!
        </div>
      `,
      onInit: (windowElement) => {
        // nothing extra needed
      },
      onDestroy: () => {
        // nothing extra needed
      }
    };
  }
}

// Expose globally so WindowManager can find it
window.Placeholder = Placeholder;
