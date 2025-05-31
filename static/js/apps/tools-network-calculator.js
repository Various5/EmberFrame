/**
 * APP_METADATA
 * @name Network Tools
 * @icon fas fa-network-wired
 * @description Subnet Calculator, Mask/Prefix Converter, and IP Utilities
 * @category Utilities
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class ToolsNetworkCalculator {
  static _container = null;
  static _toolSelector = null;
  static _subnetSection = null;
  static _converterSection = null;

  static createWindow() {
    return {
      title: 'Network Tools',
      width: '520px',
      height: '600px',
      content: `
        <div id="network-tools" style="display: flex; flex-direction: column; height: 100%; background: #f5f5f5; font-family: 'Arial', sans-serif; color: #333; box-sizing: border-box; padding: 10px;">
          
          <!-- Tool Selector -->
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button id="select-subnet" class="ntab" data-tool="subnet" style="flex: 1; padding: 10px; background: #007acc; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Subnet Calculator</button>
            <button id="select-converter" class="ntab" data-tool="converter" style="flex: 1; padding: 10px; background: #555; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Mask/Prefix Converter</button>
          </div>

          <!-- Subnet Calculator Section -->
          <div id="subnet-section" style="flex: 1; overflow-y: auto; display: none; padding: 10px; background: #fff; border: 1px solid #ccc; border-radius: 4px;">
            <h2 style="margin-top: 0; font-size: 20px; color: #007acc;">Subnet Calculator</h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">

              <!-- IP Address Input -->
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <label for="subnet-ip" style="font-weight: bold;">IP Address (e.g., 192.168.1.10):</label>
                <input id="subnet-ip" type="text" placeholder="192.168.1.10" 
                       style="padding: 8px; font-size: 16px; border: 1px solid #aaa; border-radius: 4px;" />
              </div>

              <!-- Prefix Length Input -->
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <label for="subnet-prefix" style="font-weight: bold;">Prefix Length (e.g., 24):</label>
                <input id="subnet-prefix" type="number" min="1" max="32" placeholder="24" 
                       style="padding: 8px; font-size: 16px; border: 1px solid #aaa; border-radius: 4px;" />
              </div>

              <!-- Calculate Button -->
              <button id="subnet-calc-btn" style="padding: 10px; background: #007acc; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
                Calculate
              </button>

              <!-- Results Display -->
              <div id="subnet-results" style="margin-top: 10px; background: #eef; padding: 10px; border: 1px solid #99c; border-radius: 4px; display: none;">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #007acc;">Results:</h3>
                <div id="result-network" style="margin-bottom: 6px;"></div>
                <div id="result-broadcast" style="margin-bottom: 6px;"></div>
                <div id="result-hostrange" style="margin-bottom: 6px;"></div>
                <div id="result-totalhosts" style="margin-bottom: 6px;"></div>
                <div id="result-subnetmask"></div>
              </div>
            </div>
          </div>

          <!-- Mask/Prefix Converter Section -->
          <div id="converter-section" style="flex: 1; overflow-y: auto; display: none; padding: 10px; background: #fff; border: 1px solid #ccc; border-radius: 4px;">
            <h2 style="margin-top: 0; font-size: 20px; color: #007acc;">Mask & Prefix Converter</h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">

              <!-- Converter Mode Selector -->
              <div style="display: flex; gap: 10px;">
                <button id="mode-mask2prefix" class="cmode" data-mode="m2p" style="flex: 1; padding: 8px; background: #007acc; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
                  Mask → Prefix
                </button>
                <button id="mode-prefix2mask" class="cmode" data-mode="p2m" style="flex: 1; padding: 8px; background: #555; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
                  Prefix → Mask
                </button>
              </div>

              <!-- Input Field -->
              <div id="mask2prefix-input-group" style="display: flex; flex-direction: column; gap: 4px;">
                <label for="mask-input" style="font-weight: bold;">Subnet Mask (e.g., 255.255.255.0):</label>
                <input id="mask-input" type="text" placeholder="255.255.255.0" 
                       style="padding: 8px; font-size: 16px; border: 1px solid #aaa; border-radius: 4px;" />
              </div>
              <div id="prefix2mask-input-group" style="display: none; flex-direction: column; gap: 4px;">
                <label for="prefix-input" style="font-weight: bold;">Prefix Length (e.g., 24):</label>
                <input id="prefix-input" type="number" min="1" max="32" placeholder="24" 
                       style="padding: 8px; font-size: 16px; border: 1px solid #aaa; border-radius: 4px;" />
              </div>

              <!-- Convert Button -->
              <button id="converter-btn" style="padding: 10px; background: #007acc; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
                Convert
              </button>

              <!-- Converter Results -->
              <div id="converter-results" style="margin-top: 10px; background: #eef; padding: 10px; border: 1px solid #99c; border-radius: 4px; display: none;">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #007acc;">Conversion Result:</h3>
                <div id="converter-output"></div>
              </div>
            </div>
          </div>

        </div>
      `,
      onInit: (container) => {
        try {
          ToolsNetworkCalculator._container = container;
          ToolsNetworkCalculator._toolSelector = Array.from(container.querySelectorAll('.ntab'));
          ToolsNetworkCalculator._subnetSection = container.querySelector('#subnet-section');
          ToolsNetworkCalculator._converterSection = container.querySelector('#converter-section');

          ToolsNetworkCalculator._setupEventListeners();
          // Default to Subnet Calculator
          ToolsNetworkCalculator._activateTool('subnet');

          console.log('Network Tools initialized successfully');
        } catch (error) {
          console.error('Network Tools initialization error:', error);
        }
      },
      onDestroy: () => {
        try {
          ToolsNetworkCalculator._removeEventListeners();
          ToolsNetworkCalculator._container = null;
          ToolsNetworkCalculator._toolSelector = null;
          ToolsNetworkCalculator._subnetSection = null;
          ToolsNetworkCalculator._converterSection = null;
        } catch (error) {
          console.error('Network Tools cleanup error:', error);
        }
      }
    };
  }

  static _setupEventListeners() {
    try {
      // Tool selection buttons
      if (ToolsNetworkCalculator._toolSelector) {
        ToolsNetworkCalculator._toolSelector.forEach(btn => {
          if (btn) {
            btn.addEventListener('click', ToolsNetworkCalculator._onToolSelect);
          }
        });
      }

      // Subnet calculator
      const subnetCalcBtn = ToolsNetworkCalculator._container?.querySelector('#subnet-calc-btn');
      if (subnetCalcBtn) {
        subnetCalcBtn.addEventListener('click', ToolsNetworkCalculator._calculateSubnet);
      }

      // Converter mode buttons
      const converterModeBtns = Array.from(ToolsNetworkCalculator._container?.querySelectorAll('.cmode') || []);
      converterModeBtns.forEach(btn => {
        if (btn) {
          btn.addEventListener('click', ToolsNetworkCalculator._onConverterModeSelect);
        }
      });

      // Convert button
      const converterBtn = ToolsNetworkCalculator._container?.querySelector('#converter-btn');
      if (converterBtn) {
        converterBtn.addEventListener('click', ToolsNetworkCalculator._performConversion);
      }
    } catch (error) {
      console.error('Error setting up event listeners:', error);
    }
  }

  static _removeEventListeners() {
    try {
      if (ToolsNetworkCalculator._toolSelector) {
        ToolsNetworkCalculator._toolSelector.forEach(btn => {
          if (btn) {
            btn.removeEventListener('click', ToolsNetworkCalculator._onToolSelect);
          }
        });
      }

      const subnetCalcBtn = ToolsNetworkCalculator._container?.querySelector('#subnet-calc-btn');
      if (subnetCalcBtn) {
        subnetCalcBtn.removeEventListener('click', ToolsNetworkCalculator._calculateSubnet);
      }

      const converterModeBtns = Array.from(ToolsNetworkCalculator._container?.querySelectorAll('.cmode') || []);
      converterModeBtns.forEach(btn => {
        if (btn) {
          btn.removeEventListener('click', ToolsNetworkCalculator._onConverterModeSelect);
        }
      });

      const converterBtn = ToolsNetworkCalculator._container?.querySelector('#converter-btn');
      if (converterBtn) {
        converterBtn.removeEventListener('click', ToolsNetworkCalculator._performConversion);
      }
    } catch (error) {
      console.error('Error removing event listeners:', error);
    }
  }

  static _onToolSelect(e) {
    try {
      const tool = e.currentTarget?.getAttribute('data-tool');
      if (tool) {
        ToolsNetworkCalculator._activateTool(tool);
      }
    } catch (error) {
      console.error('Tool selection error:', error);
    }
  }

  static _activateTool(tool) {
    try {
      // Highlight selected tab
      if (ToolsNetworkCalculator._toolSelector) {
        ToolsNetworkCalculator._toolSelector.forEach(btn => {
          if (btn) {
            if (btn.getAttribute('data-tool') === tool) {
              btn.style.background = '#007acc';
            } else {
              btn.style.background = '#555';
            }
          }
        });
      }

      // Show/hide sections
      if (tool === 'subnet') {
        if (ToolsNetworkCalculator._subnetSection) ToolsNetworkCalculator._subnetSection.style.display = 'block';
        if (ToolsNetworkCalculator._converterSection) ToolsNetworkCalculator._converterSection.style.display = 'none';
      } else {
        if (ToolsNetworkCalculator._subnetSection) ToolsNetworkCalculator._subnetSection.style.display = 'none';
        if (ToolsNetworkCalculator._converterSection) ToolsNetworkCalculator._converterSection.style.display = 'block';
      }
    } catch (error) {
      console.error('Tool activation error:', error);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //               SUBNET CALCULATOR LOGIC
  // ═══════════════════════════════════════════════════════════════
  static _calculateSubnet() {
    try {
      const ipInput = ToolsNetworkCalculator._container?.querySelector('#subnet-ip')?.value?.trim() || '';
      const prefixInput = ToolsNetworkCalculator._container?.querySelector('#subnet-prefix')?.value?.trim() || '';
      const resultsDiv = ToolsNetworkCalculator._container?.querySelector('#subnet-results');

      if (!ipInput || !prefixInput) {
        alert('Please enter both IP address and prefix length.');
        return;
      }

      // Validate IP
      const ipOctets = ipInput.split('.');
      if (ipOctets.length !== 4 || ipOctets.some(o => isNaN(o) || parseInt(o) < 0 || parseInt(o) > 255)) {
        alert('Enter a valid IPv4 address.');
        return;
      }
      const ip = ipOctets.map(o => parseInt(o, 10));

      // Validate prefix
      const prefix = parseInt(prefixInput, 10);
      if (isNaN(prefix) || prefix < 1 || prefix > 32) {
        alert('Enter a valid prefix between 1 and 32.');
        return;
      }

      // Convert IP to 32-bit integer
      const ipInt = ((ip[0] << 24) >>> 0) + ((ip[1] << 16) >>> 0) + ((ip[2] << 8) >>> 0) + (ip[3] >>> 0);

      // Compute subnet mask integer
      const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      // Network address
      const netInt = ipInt & maskInt;
      // Broadcast address
      const broadcastInt = netInt | (~maskInt >>> 0);

      // Convert back to dotted format
      const intToDotted = (n) => {
        const o1 = (n >>> 24) & 0xff;
        const o2 = (n >>> 16) & 0xff;
        const o3 = (n >>> 8) & 0xff;
        const o4 = n & 0xff;
        return [o1, o2, o3, o4].join('.');
      };

      const networkAddr = intToDotted(netInt);
      const broadcastAddr = intToDotted(broadcastInt);

      // First and last usable hosts
      let firstHost = 'N/A';
      let lastHost = 'N/A';
      let totalHosts = 0;
      if (prefix < 31) {
        const firstInt = netInt + 1;
        const lastInt = broadcastInt - 1;
        firstHost = intToDotted(firstInt);
        lastHost = intToDotted(lastInt);
        totalHosts = (broadcastInt - netInt - 1);
      }

      // Subnet mask dotted
      const maskDotted = intToDotted(maskInt);

      // Populate results
      if (resultsDiv) {
        const resultNetwork = resultsDiv.querySelector('#result-network');
        const resultBroadcast = resultsDiv.querySelector('#result-broadcast');
        const resultHostrange = resultsDiv.querySelector('#result-hostrange');
        const resultTotalhosts = resultsDiv.querySelector('#result-totalhosts');
        const resultSubnetmask = resultsDiv.querySelector('#result-subnetmask');

        if (resultNetwork) resultNetwork.textContent = `Network Address: ${networkAddr}`;
        if (resultBroadcast) resultBroadcast.textContent = `Broadcast Address: ${broadcastAddr}`;
        if (resultHostrange) resultHostrange.textContent = `Usable Host Range: ${firstHost} – ${lastHost}`;
        if (resultTotalhosts) resultTotalhosts.textContent = `Total Usable Hosts: ${totalHosts}`;
        if (resultSubnetmask) resultSubnetmask.textContent = `Subnet Mask: ${maskDotted}`;

        resultsDiv.style.display = 'block';
      }
    } catch (error) {
      console.error('Subnet calculation error:', error);
      alert('Error calculating subnet. Please check your inputs.');
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //             MASK & PREFIX CONVERTER LOGIC
  // ═══════════════════════════════════════════════════════════════
  static _onConverterModeSelect(e) {
    try {
      const mode = e.currentTarget?.getAttribute('data-mode');
      const m2pBtn = ToolsNetworkCalculator._container?.querySelector('#mode-mask2prefix');
      const p2mBtn = ToolsNetworkCalculator._container?.querySelector('#mode-prefix2mask');
      const maskGroup = ToolsNetworkCalculator._container?.querySelector('#mask2prefix-input-group');
      const prefixGroup = ToolsNetworkCalculator._container?.querySelector('#prefix2mask-input-group');
      const outputDiv = ToolsNetworkCalculator._container?.querySelector('#converter-results');
      const outText = ToolsNetworkCalculator._container?.querySelector('#converter-output');

      if (mode === 'm2p') {
        if (m2pBtn) m2pBtn.style.background = '#007acc';
        if (p2mBtn) p2mBtn.style.background = '#555';
        if (maskGroup) maskGroup.style.display = 'flex';
        if (prefixGroup) prefixGroup.style.display = 'none';
      } else {
        if (m2pBtn) m2pBtn.style.background = '#555';
        if (p2mBtn) p2mBtn.style.background = '#007acc';
        if (maskGroup) maskGroup.style.display = 'none';
        if (prefixGroup) prefixGroup.style.display = 'flex';
      }

      if (outputDiv) outputDiv.style.display = 'none';
      if (outText) outText.textContent = '';
    } catch (error) {
      console.error('Converter mode selection error:', error);
    }
  }

  static _performConversion() {
    try {
      const maskGroup = ToolsNetworkCalculator._container?.querySelector('#mask2prefix-input-group');
      const prefixGroup = ToolsNetworkCalculator._container?.querySelector('#prefix2mask-input-group');
      const outputDiv = ToolsNetworkCalculator._container?.querySelector('#converter-results');
      const outText = ToolsNetworkCalculator._container?.querySelector('#converter-output');

      if (!maskGroup || !prefixGroup || !outputDiv || !outText) {
        console.error('Required elements not found for conversion');
        return;
      }

      if (maskGroup.style.display === 'flex') {
        // Mask to Prefix
        const maskInput = ToolsNetworkCalculator._container?.querySelector('#mask-input')?.value?.trim() || '';
        if (!maskInput) {
          alert('Please enter a subnet mask.');
          return;
        }

        const octets = maskInput.split('.');
        if (octets.length !== 4 || octets.some(o => isNaN(o) || parseInt(o) < 0 || parseInt(o) > 255)) {
          alert('Enter a valid IPv4 subnet mask.');
          return;
        }
        const maskNums = octets.map(o => parseInt(o, 10));
        const maskInt = ((maskNums[0] << 24) >>> 0) + ((maskNums[1] << 16) >>> 0) + ((maskNums[2] << 8) >>> 0) + (maskNums[3] >>> 0);

        // Count bits
        let prefix = 0;
        for (let i = 31; i >= 0; i--) {
          if ((maskInt & (1 << i)) !== 0) prefix++;
          else break;
        }
        // Validate contiguous ones
        const reconstructed = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
        if (reconstructed !== maskInt) {
          alert('Enter a valid contiguous subnet mask.');
          return;
        }
        outText.textContent = `Prefix Length: /${prefix}`;
      } else {
        // Prefix to Mask
        const prefixInput = ToolsNetworkCalculator._container?.querySelector('#prefix-input')?.value?.trim() || '';
        if (!prefixInput) {
          alert('Please enter a prefix length.');
          return;
        }

        const prefix = parseInt(prefixInput, 10);
        if (isNaN(prefix) || prefix < 0 || prefix > 32) {
          alert('Enter a valid prefix between 0 and 32.');
          return;
        }
        const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
        const o1 = (maskInt >>> 24) & 0xff;
        const o2 = (maskInt >>> 16) & 0xff;
        const o3 = (maskInt >>> 8) & 0xff;
        const o4 = maskInt & 0xff;
        outText.textContent = `Subnet Mask: ${o1}.${o2}.${o3}.${o4}`;
      }

      outputDiv.style.display = 'block';
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Error performing conversion. Please check your inputs.');
    }
  }
}

// Export for WindowManager
window.ToolsNetworkCalculator = ToolsNetworkCalculator;