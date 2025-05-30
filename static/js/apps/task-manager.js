// static/js/apps/task-manager.js
/**
 * APP_METADATA
 * @name Task Manager
 * @icon fas fa-tasks
 * @description Monitor and manage running applications
 * @category System
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class TaskManager {
  // internal state
  static _container = null;
  static _intervalId = null;
  static _autoRefresh = true;
  static _filterText = '';
  static _sortKey = 'name';
  static _sortAsc = true;
  static _startTimes = {}; // record when each window first appeared

  static createWindow() {
    return {
      title: 'Task Manager',
      width: '700px',
      height: '450px',
      content: `
        <div id="task-manager" style="padding:12px; font-family:sans-serif; display:flex; flex-direction:column; height:100%;">
          <div id="tm-controls" style="margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            <input id="tm-search" placeholder="Search tasks…" style="flex:1; padding:4px;" />
            <button id="tm-kill-all">Kill All</button>
            <label style="margin-left:auto; font-size:0.9em;">
              <input type="checkbox" id="tm-auto-refresh" checked /> Auto-refresh
            </label>
          </div>
          <div id="tm-summary" style="margin-bottom:6px; font-size:0.9em;"></div>
          <div id="tm-list" style="flex:1; overflow:auto;"></div>
        </div>
      `,
      onInit: (container) => {
        TaskManager._container = container;
        // wire up controls
        container.querySelector('#tm-search')
          .addEventListener('input', e => {
            TaskManager._filterText = e.target.value.toLowerCase();
            TaskManager.render();
          });
        container.querySelector('#tm-kill-all')
          .addEventListener('click', () => {
            TaskManager.killAll();
          });
        const autoCb = container.querySelector('#tm-auto-refresh');
        autoCb.addEventListener('change', e => {
          TaskManager._autoRefresh = e.target.checked;
          if (e.target.checked) TaskManager._startAutoRefresh();
          else TaskManager._stopAutoRefresh();
        });

        TaskManager.render();
        TaskManager._startAutoRefresh();
      },
      onDestroy: () => {
        TaskManager._stopAutoRefresh();
      }
    };
  }

  static _startAutoRefresh() {
    if (TaskManager._intervalId) return;
    TaskManager._intervalId = setInterval(() => {
      if (TaskManager._autoRefresh) TaskManager.render();
    }, 5000);
  }

  static _stopAutoRefresh() {
    if (TaskManager._intervalId) {
      clearInterval(TaskManager._intervalId);
      TaskManager._intervalId = null;
    }
  }

  static render() {
    const container = TaskManager._container;
    if (!container) return;
    const listEl = container.querySelector('#tm-list');
    const summaryEl = container.querySelector('#tm-summary');
    listEl.innerHTML = '';

    // fetch windows
    const wins = window.WindowManager.getWindows() || [];

    // record start times
    wins.forEach(w => {
      if (!TaskManager._startTimes[w.id]) {
        TaskManager._startTimes[w.id] = Date.now();
      }
    });

    // filter
    let filtered = wins.filter(w => {
      const name = (w.title || w.appName || `PID ${w.id}`).toLowerCase();
      return name.includes(TaskManager._filterText);
    });

    // sort
    filtered.sort((a, b) => {
      let va, vb;
      switch (TaskManager._sortKey) {
        case 'pid': va = a.id; vb = b.id; break;
        case 'uptime':
          va = Date.now() - TaskManager._startTimes[a.id];
          vb = Date.now() - TaskManager._startTimes[b.id];
          break;
        default: // name
          va = (a.title||a.appName||'').toLowerCase();
          vb = (b.title||b.appName||'').toLowerCase();
      }
      if (va < vb) return TaskManager._sortAsc ? -1 : 1;
      if (va > vb) return TaskManager._sortAsc ? 1 : -1;
      return 0;
    });

    // build table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    const hdr = table.insertRow();
    ['PID','Name','Uptime','CPU%','Mem (MB)','Actions'].forEach((txt,keyIdx) => {
      const th = document.createElement('th');
      th.textContent = txt;
      th.style.cursor = ['Name','PID','Uptime'].includes(txt) ? 'pointer' : 'default';
      th.style.textAlign = 'left';
      th.style.padding = '4px';
      th.style.borderBottom = '1px solid #aaa';
      if (['Name','PID','Uptime'].includes(txt)) {
        th.addEventListener('click', () => {
          const map = { 'PID':'pid','Name':'name','Uptime':'uptime' };
          const k = map[txt];
          if (TaskManager._sortKey === k) TaskManager._sortAsc = !TaskManager._sortAsc;
          else { TaskManager._sortKey = k; TaskManager._sortAsc = true; }
          TaskManager.render();
        });
      }
      hdr.appendChild(th);
    });

    let totalCPU = 0, totalMem = 0;
    filtered.forEach(w => {
      const row = table.insertRow();
      row.style.borderBottom = '1px solid #ddd';

      // PID
      row.insertCell().textContent = w.id;

      // Name
      row.insertCell().textContent = w.title || w.appName || `PID ${w.id}`;

      // Uptime
      const ms = Date.now() - TaskManager._startTimes[w.id];
      row.insertCell().textContent = TaskManager._formatUptime(ms);

      // Metrics (if available)
      let cpu='–', mem='–';
      if (window.WindowManager.getWindowMetrics) {
        const m = window.WindowManager.getWindowMetrics(w.id);
        cpu = m.cpu?.toFixed(1) ?? '–';
        mem = m.memory ? (m.memory/1024/1024).toFixed(1) : '–';
        totalCPU += parseFloat(cpu) || 0;
        totalMem += parseFloat(mem) || 0;
      }
      row.insertCell().textContent = cpu;
      row.insertCell().textContent = mem;

      // Actions
      const actions = row.insertCell();
      actions.style.display = 'flex';
      actions.style.gap = '4px';
      // Focus
      const f = document.createElement('button');
      f.textContent = 'Focus';
      f.addEventListener('click', ()=> window.WindowManager.focusWindow(w.id));
      actions.appendChild(f);
      // Refresh
      if (window.WindowManager.reloadWindow) {
        const r = document.createElement('button');
        r.textContent = 'Refresh';
        r.addEventListener('click', ()=> window.WindowManager.reloadWindow(w.id));
        actions.appendChild(r);
      }
      // Kill
      const k = document.createElement('button');
      k.textContent = 'Kill';
      k.addEventListener('click', ()=> {
        window.WindowManager.closeWindow(w.id);
        TaskManager.render();
      });
      actions.appendChild(k);
    });

    listEl.appendChild(table);

    // summary
    const count = filtered.length;
    let summary = `Showing ${count} task${count!==1?'s':''}`;
    if (window.WindowManager.getWindowMetrics) {
      summary += ` — Total CPU: ${totalCPU.toFixed(1)}%`;
      summary += `, Total Mem: ${totalMem.toFixed(1)} MB`;
    }
    summaryEl.textContent = summary;
  }

  static killAll() {
    const wins = window.WindowManager.getWindows()||[];
    wins.forEach(w => window.WindowManager.closeWindow(w.id));
    TaskManager.render();
  }

  static _formatUptime(ms) {
    const s = Math.floor(ms/1000);
    const hh = Math.floor(s/3600).toString().padStart(2,'0');
    const mm = Math.floor((s%3600)/60).toString().padStart(2,'0');
    const ss = (s%60).toString().padStart(2,'0');
    return `${hh}:${mm}:${ss}`;
  }
}

// expose globally
window.TaskManager = TaskManager;
