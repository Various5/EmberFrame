/**
 * APP_METADATA
 * @name Password Generator
 * @icon fas fa-key
 * @description Generate secure passwords with customizable options
 * @category Utilities
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class PasswordGenerator {
    static createWindow() {
        return {
            title: '🔐 Password Generator',
            width: '500px',
            height: '650px',
            autoSize: false,
            content: `
                <div class="password-generator-container">
                    <div class="generator-header">
                        <h2>🔐 Secure Password Generator</h2>
                        <p>Generate strong, cryptographically secure passwords</p>
                    </div>

                    <div class="password-output">
                        <div class="generated-password" id="generated-password">
                            Click "Generate" to create a password
                        </div>
                        <div class="password-actions">
                            <button class="copy-btn" id="copy-password" disabled>
                                <i class="fas fa-copy"></i> Copy
                            </button>
                            <button class="generate-btn" id="generate-password">
                                <i class="fas fa-sync-alt"></i> Generate
                            </button>
                        </div>
                        <div class="strength-meter">
                            <div class="strength-label">Password Strength:</div>
                            <div class="strength-bar">
                                <div class="strength-fill" id="strength-fill"></div>
                            </div>
                            <div class="strength-text" id="strength-text">-</div>
                        </div>
                    </div>

                    <div class="generator-options">
                        <div class="option-group">
                            <label class="option-label">
                                <span>Password Length: <span id="length-value">12</span></span>
                                <input type="range" id="password-length" min="4" max="128" value="12">
                            </label>
                        </div>

                        <div class="option-group">
                            <label class="checkbox-option">
                                <input type="checkbox" id="include-uppercase" checked>
                                <span class="checkmark"></span>
                                Include Uppercase Letters (A-Z)
                            </label>
                        </div>

                        <div class="option-group">
                            <label class="checkbox-option">
                                <input type="checkbox" id="include-lowercase" checked>
                                <span class="checkmark"></span>
                                Include Lowercase Letters (a-z)
                            </label>
                        </div>

                        <div class="option-group">
                            <label class="checkbox-option">
                                <input type="checkbox" id="include-numbers" checked>
                                <span class="checkmark"></span>
                                Include Numbers (0-9)
                            </label>
                        </div>

                        <div class="option-group">
                            <label class="checkbox-option">
                                <input type="checkbox" id="include-symbols" checked>
                                <span class="checkmark"></span>
                                Include Symbols (!@#$%^&*)
                            </label>
                        </div>

                        <div class="option-group">
                            <label class="checkbox-option">
                                <input type="checkbox" id="exclude-ambiguous">
                                <span class="checkmark"></span>
                                Exclude Ambiguous Characters (0, O, l, I)
                            </label>
                        </div>

                        <div class="option-group">
                            <label class="option-label">
                                <span>Custom Characters (optional):</span>
                                <input type="text" id="custom-chars" placeholder="Add custom characters">
                            </label>
                        </div>
                    </div>

                    <div class="batch-generation">
                        <div class="batch-header">
                            <h3>Batch Generation</h3>
                            <div class="batch-controls">
                                <label>
                                    Count: 
                                    <input type="number" id="batch-count" min="1" max="20" value="5">
                                </label>
                                <button class="batch-btn" id="generate-batch">
                                    <i class="fas fa-list"></i> Generate Multiple
                                </button>
                            </div>
                        </div>
                        <div class="batch-results" id="batch-results"></div>
                    </div>

                    <div class="password-history">
                        <div class="history-header">
                            <h3>Password History</h3>
                            <button class="clear-btn" id="clear-history">
                                <i class="fas fa-trash"></i> Clear
                            </button>
                        </div>
                        <div class="history-list" id="history-list">
                            <div class="history-empty">No passwords generated yet</div>
                        </div>
                    </div>
                </div>

                ${PasswordGenerator.getStyles()}
            `,
            onInit: (windowElement) => {
                PasswordGenerator.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.windowElement = windowElement;
        this.passwordHistory = [];
        this.maxHistorySize = 10;

        this.setupEventListeners();
        this.updateLengthDisplay();

        // Generate initial password
        this.generatePassword();

        console.log('🔐 Password Generator initialized');
    }

    static setupEventListeners() {
        // Length slider
        this.windowElement.querySelector('#password-length').addEventListener('input', (e) => {
            this.updateLengthDisplay();
        });

        // Generate button
        this.windowElement.querySelector('#generate-password').addEventListener('click', () => {
            this.generatePassword();
        });

        // Copy button
        this.windowElement.querySelector('#copy-password').addEventListener('click', () => {
            this.copyPassword();
        });

        // Batch generation
        this.windowElement.querySelector('#generate-batch').addEventListener('click', () => {
            this.generateBatch();
        });

        // Clear history
        this.windowElement.querySelector('#clear-history').addEventListener('click', () => {
            this.clearHistory();
        });

        // Auto-generate on option change
        const checkboxes = this.windowElement.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.generatePassword();
            });
        });

        // Custom characters input
        this.windowElement.querySelector('#custom-chars').addEventListener('input', () => {
            this.generatePassword();
        });

        // Enter key in inputs
        this.windowElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.generatePassword();
            }
        });
    }

    static updateLengthDisplay() {
        const lengthSlider = this.windowElement.querySelector('#password-length');
        const lengthValue = this.windowElement.querySelector('#length-value');
        lengthValue.textContent = lengthSlider.value;
    }

    static generatePassword() {
        const options = this.getPasswordOptions();

        if (!this.validateOptions(options)) {
            return;
        }

        const password = this.createSecurePassword(options);
        this.displayPassword(password);
        this.updateStrengthMeter(password);
        this.addToHistory(password);
    }

    static getPasswordOptions() {
        return {
            length: parseInt(this.windowElement.querySelector('#password-length').value),
            includeUppercase: this.windowElement.querySelector('#include-uppercase').checked,
            includeLowercase: this.windowElement.querySelector('#include-lowercase').checked,
            includeNumbers: this.windowElement.querySelector('#include-numbers').checked,
            includeSymbols: this.windowElement.querySelector('#include-symbols').checked,
            excludeAmbiguous: this.windowElement.querySelector('#exclude-ambiguous').checked,
            customChars: this.windowElement.querySelector('#custom-chars').value
        };
    }

    static validateOptions(options) {
        if (!options.includeUppercase && !options.includeLowercase &&
            !options.includeNumbers && !options.includeSymbols && !options.customChars) {
            this.showError('Please select at least one character type or add custom characters');
            return false;
        }
        return true;
    }

    static createSecurePassword(options) {
        let charset = '';

        // Build character set
        if (options.includeUppercase) {
            charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (options.includeLowercase) {
            charset += 'abcdefghijklmnopqrstuvwxyz';
        }
        if (options.includeNumbers) {
            charset += '0123456789';
        }
        if (options.includeSymbols) {
            charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }
        if (options.customChars) {
            charset += options.customChars;
        }

        // Remove ambiguous characters if requested
        if (options.excludeAmbiguous) {
            charset = charset.replace(/[0O1lI]/g, '');
        }

        // Generate password using crypto.getRandomValues for security
        let password = '';
        const array = new Uint8Array(options.length);
        crypto.getRandomValues(array);

        for (let i = 0; i < options.length; i++) {
            password += charset[array[i] % charset.length];
        }

        // Ensure at least one character from each selected type
        password = this.ensureCharacterTypes(password, options, charset);

        return password;
    }

    static ensureCharacterTypes(password, options, charset) {
        const types = [];
        if (options.includeUppercase) types.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (options.includeLowercase) types.push('abcdefghijklmnopqrstuvwxyz');
        if (options.includeNumbers) types.push('0123456789');
        if (options.includeSymbols) types.push('!@#$%^&*()_+-=[]{}|;:,.<>?');

        // Check if password contains at least one character from each type
        const passwordArray = password.split('');

        types.forEach((typeChars, index) => {
            if (options.excludeAmbiguous) {
                typeChars = typeChars.replace(/[0O1lI]/g, '');
            }

            const hasType = passwordArray.some(char => typeChars.includes(char));
            if (!hasType && typeChars.length > 0) {
                // Replace a random character with one from this type
                const randomIndex = Math.floor(Math.random() * passwordArray.length);
                const randomChar = typeChars[Math.floor(Math.random() * typeChars.length)];
                passwordArray[randomIndex] = randomChar;
            }
        });

        return passwordArray.join('');
    }

    static displayPassword(password) {
        const passwordElement = this.windowElement.querySelector('#generated-password');
        const copyButton = this.windowElement.querySelector('#copy-password');

        passwordElement.textContent = password;
        passwordElement.classList.add('has-password');
        copyButton.disabled = false;
    }

    static updateStrengthMeter(password) {
        const strength = this.calculatePasswordStrength(password);
        const strengthFill = this.windowElement.querySelector('#strength-fill');
        const strengthText = this.windowElement.querySelector('#strength-text');

        // Update strength bar
        strengthFill.style.width = `${strength.score}%`;
        strengthFill.className = `strength-fill ${strength.level}`;

        // Update strength text
        strengthText.textContent = `${strength.level.toUpperCase()} (${strength.score}/100)`;
    }

    static calculatePasswordStrength(password) {
        let score = 0;
        let level = 'weak';

        // Length scoring
        score += Math.min(password.length * 4, 25);

        // Character variety scoring
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;':\",./<>?]/.test(password);

        const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
        score += varietyCount * 10;

        // Complexity bonus
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;
        if (varietyCount >= 3) score += 15;
        if (varietyCount === 4) score += 10;

        // Penalty for patterns
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/012|123|234|345|456|567|678|789|890/.test(password)) score -= 10; // Sequential numbers
        if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) score -= 10; // Sequential letters

        // Determine level
        score = Math.max(0, Math.min(100, score));

        if (score < 30) level = 'weak';
        else if (score < 60) level = 'medium';
        else if (score < 80) level = 'strong';
        else level = 'very-strong';

        return { score, level };
    }

    static async copyPassword() {
        const password = this.windowElement.querySelector('#generated-password').textContent;

        try {
            await navigator.clipboard.writeText(password);
            this.showSuccess('Password copied to clipboard!');

            // Animate copy button
            const copyBtn = this.windowElement.querySelector('#copy-password');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('success');

            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.classList.remove('success');
            }, 2000);

        } catch (error) {
            // Fallback for older browsers
            this.fallbackCopy(password);
        }
    }

    static fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showSuccess('Password copied to clipboard!');
        } catch (error) {
            this.showError('Unable to copy password');
        }

        document.body.removeChild(textArea);
    }

    static generateBatch() {
        const count = parseInt(this.windowElement.querySelector('#batch-count').value);
        const batchResults = this.windowElement.querySelector('#batch-results');

        if (count < 1 || count > 20) {
            this.showError('Batch count must be between 1 and 20');
            return;
        }

        const options = this.getPasswordOptions();
        if (!this.validateOptions(options)) {
            return;
        }

        const passwords = [];
        for (let i = 0; i < count; i++) {
            passwords.push(this.createSecurePassword(options));
        }

        // Display batch results
        batchResults.innerHTML = passwords.map((password, index) => `
            <div class="batch-item">
                <span class="batch-number">${index + 1}.</span>
                <span class="batch-password">${password}</span>
                <button class="batch-copy" onclick="PasswordGenerator.copyBatchPassword('${password}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');

        // Add all to history
        passwords.forEach(password => this.addToHistory(password));
    }

    static copyBatchPassword(password) {
        navigator.clipboard.writeText(password).then(() => {
            this.showSuccess('Password copied!');
        }).catch(() => {
            this.fallbackCopy(password);
        });
    }

    static addToHistory(password) {
        const timestamp = new Date().toLocaleTimeString();
        const historyItem = {
            password,
            timestamp,
            strength: this.calculatePasswordStrength(password)
        };

        this.passwordHistory.unshift(historyItem);

        // Limit history size
        if (this.passwordHistory.length > this.maxHistorySize) {
            this.passwordHistory = this.passwordHistory.slice(0, this.maxHistorySize);
        }

        this.updateHistoryDisplay();
    }

    static updateHistoryDisplay() {
        const historyList = this.windowElement.querySelector('#history-list');

        if (this.passwordHistory.length === 0) {
            historyList.innerHTML = '<div class="history-empty">No passwords generated yet</div>';
            return;
        }

        historyList.innerHTML = this.passwordHistory.map((item, index) => `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-password">${item.password}</div>
                    <div class="history-meta">
                        ${item.timestamp} • 
                        <span class="strength-${item.strength.level}">${item.strength.level.toUpperCase()}</span>
                    </div>
                </div>
                <button class="history-copy" onclick="PasswordGenerator.copyHistoryPassword(${index})">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');
    }

    static copyHistoryPassword(index) {
        const password = this.passwordHistory[index].password;
        navigator.clipboard.writeText(password).then(() => {
            this.showSuccess('Password copied from history!');
        }).catch(() => {
            this.fallbackCopy(password);
        });
    }

    static clearHistory() {
        if (this.passwordHistory.length === 0) return;

        if (confirm('Clear all password history?')) {
            this.passwordHistory = [];
            this.updateHistoryDisplay();
            this.showSuccess('History cleared');
        }
    }

    static showSuccess(message) {
        if (window.Notification) {
            window.Notification.success(message);
        } else {
            console.log(`✅ ${message}`);
        }
    }

    static showError(message) {
        if (window.Notification) {
            window.Notification.error(message);
        } else {
            console.error(`❌ ${message}`);
        }
    }

    static getStyles() {
        return `
            <style>
                .password-generator-container {
                    padding: 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100%;
                    color: white;
                }

                .generator-header {
                    text-align: center;
                    margin-bottom: 25px;
                }

                .generator-header h2 {
                    margin: 0 0 10px 0;
                    font-size: 24px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .generator-header p {
                    margin: 0;
                    opacity: 0.9;
                    font-size: 14px;
                }

                .password-output {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 25px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .generated-password {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    padding: 15px;
                    font-family: 'Courier New', monospace;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 15px;
                    word-break: break-all;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    min-height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .generated-password.has-password {
                    border-color: rgba(255, 255, 255, 0.3);
                    background: rgba(0, 0, 0, 0.5);
                }

                .password-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    margin-bottom: 15px;
                }

                .copy-btn, .generate-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                }

                .copy-btn {
                    background: rgba(0, 255, 136, 0.8);
                    color: #000;
                }

                .copy-btn:hover:not(:disabled) {
                    background: rgba(0, 255, 136, 1);
                    transform: translateY(-2px);
                }

                .copy-btn:disabled {
                    background: rgba(255, 255, 255, 0.2);
                    color: rgba(255, 255, 255, 0.5);
                    cursor: not-allowed;
                }

                .copy-btn.success {
                    background: rgba(0, 255, 0, 0.9);
                }

                .generate-btn {
                    background: rgba(255, 68, 102, 0.8);
                    color: white;
                }

                .generate-btn:hover {
                    background: rgba(255, 68, 102, 1);
                    transform: translateY(-2px);
                }

                .strength-meter {
                    text-align: center;
                }

                .strength-label {
                    font-size: 12px;
                    margin-bottom: 8px;
                    opacity: 0.9;
                }

                .strength-bar {
                    background: rgba(0, 0, 0, 0.3);
                    height: 8px;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 8px;
                }

                .strength-fill {
                    height: 100%;
                    transition: width 0.5s ease, background-color 0.5s ease;
                    border-radius: 4px;
                }

                .strength-fill.weak { background: #ff4757; }
                .strength-fill.medium { background: #ffa502; }
                .strength-fill.strong { background: #3742fa; }
                .strength-fill.very-strong { background: #2ed573; }

                .strength-text {
                    font-size: 12px;
                    font-weight: 600;
                }

                .generator-options {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 25px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .option-group {
                    margin-bottom: 15px;
                }

                .option-label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .option-label span {
                    display: block;
                    margin-bottom: 8px;
                }

                input[type="range"] {
                    width: 100%;
                    height: 6px;
                    border-radius: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    outline: none;
                    -webkit-appearance: none;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #ff4466;
                    cursor: pointer;
                }

                input[type="text"], input[type="number"] {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    background: rgba(0, 0, 0, 0.3);
                    color: white;
                    outline: none;
                }

                input[type="text"]:focus, input[type="number"]:focus {
                    border-color: rgba(255, 255, 255, 0.6);
                }

                .checkbox-option {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                    padding: 8px 0;
                }

                .checkbox-option input[type="checkbox"] {
                    display: none;
                }

                .checkmark {
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                    margin-right: 12px;
                    position: relative;
                    transition: all 0.3s ease;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    flex-shrink: 0;
                }

                .checkbox-option input:checked + .checkmark {
                    background: rgba(0, 255, 136, 0.8);
                    border-color: rgba(0, 255, 136, 1);
                }

                .checkbox-option input:checked + .checkmark::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #000;
                    font-weight: bold;
                    font-size: 14px;
                }

                .batch-generation, .password-history {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 25px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .batch-header, .history-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }

                .batch-header h3, .history-header h3 {
                    margin: 0;
                    font-size: 18px;
                }

                .batch-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .batch-controls label {
                    font-size: 14px;
                }

                .batch-controls input {
                    width: 60px;
                    padding: 4px 6px;
                    margin-left: 5px;
                }

                .batch-btn, .clear-btn {
                    padding: 6px 12px;
                    border: none;
                    border-radius: 6px;
                    background: rgba(255, 68, 102, 0.8);
                    color: white;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .batch-btn:hover, .clear-btn:hover {
                    background: rgba(255, 68, 102, 1);
                    transform: translateY(-1px);
                }

                .batch-results {
                    max-height: 200px;
                    overflow-y: auto;
                }

                .batch-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 6px;
                    margin-bottom: 8px;
                }

                .batch-number {
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.7);
                    min-width: 20px;
                }

                .batch-password {
                    flex: 1;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    word-break: break-all;
                }

                .batch-copy, .history-copy {
                    background: rgba(0, 255, 136, 0.7);
                    border: none;
                    border-radius: 4px;
                    padding: 4px 8px;
                    color: #000;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }

                .batch-copy:hover, .history-copy:hover {
                    background: rgba(0, 255, 136, 1);
                }

                .history-list {
                    max-height: 250px;
                    overflow-y: auto;
                }

                .history-empty {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.6);
                    font-style: italic;
                    padding: 20px;
                }

                .history-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 6px;
                    margin-bottom: 8px;
                }

                .history-info {
                    flex: 1;
                }

                .history-password {
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    word-break: break-all;
                    margin-bottom: 4px;
                }

                .history-meta {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.7);
                }

                .strength-weak { color: #ff4757; }
                .strength-medium { color: #ffa502; }
                .strength-strong { color: #3742fa; }
                .strength-very-strong { color: #2ed573; }

                /* Scrollbar styling */
                .batch-results::-webkit-scrollbar,
                .history-list::-webkit-scrollbar {
                    width: 6px;
                }

                .batch-results::-webkit-scrollbar-track,
                .history-list::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                .batch-results::-webkit-scrollbar-thumb,
                .history-list::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 3px;
                }

                .batch-results::-webkit-scrollbar-thumb:hover,
                .history-list::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }

                /* Responsive design */
                @media (max-width: 480px) {
                    .password-generator-container {
                        padding: 15px;
                    }

                    .batch-controls {
                        flex-direction: column;
                        gap: 8px;
                    }

                    .password-actions {
                        flex-direction: column;
                    }

                    .copy-btn, .generate-btn {
                        width: 100%;
                    }
                }
            </style>
        `;
    }
}

// Register the app with EmberFrame
window.EmberFrame = window.EmberFrame || {};
window.EmberFrame.registerApp = window.EmberFrame.registerApp || function(id, appClass) {
    window.EmberFrame.AppRegistry = window.EmberFrame.AppRegistry || {};
    window.EmberFrame.AppRegistry[id] = appClass;
};

window.EmberFrame.registerApp('password-generator', PasswordGenerator);