    // Create blood drips
    function createBloodDrips() {
        const container = document.getElementById('blood-drips');
        const dripCount = 15;

        for (let i = 0; i < dripCount; i++) {
            const drip = document.createElement('div');
            drip.className = 'blood-drip';
            drip.style.left = `${Math.random() * 100}%`;
            drip.style.animationDelay = `${Math.random() * 10}s`;
            drip.style.height = `${30 + Math.random() * 50}px`;
            drip.style.opacity = `${0.1 + Math.random() * 0.3}`;
            container.appendChild(drip);
        }
    }

    // Format response and sanitize it
    function formatResponse(text) {
        // 🔥 Remove Telegram or unwanted invite links
        text = text.replace(/🔗\s*Join our community:.*?(https?:\/\/\S+)/gi, '');

        // 🔥 Format code blocks
        let processed = text.replace(/```([a-z]*)\n([\s\S]*?)```/g,
            '<div class="code-block"><button class="copy-btn">STEAL</button><pre>$2</pre></div>');

        // Highlight DEMONIC tag
        processed = processed.replace(/\[DEMONIC\]:/g,
            '<span class="demonic-signature">[DEMONIC]:</span>');

        // Line breaks
        processed = processed.replace(/\n/g, '<br>');

        return processed;
    }

    // Copy code to clipboard
    function addCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const code = this.nextElementSibling.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    const originalText = this.textContent;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            });
        });
    }

    // Run on page load
    document.addEventListener('DOMContentLoaded', function () {
        createBloodDrips();

        const responseDiv = document.getElementById('response');
        if (responseDiv.textContent.trim() === '[DEMONIC]: System initialized. No query detected.') {
            responseDiv.innerHTML += '<span class="cursor"></span>';
        }
    });

    // Handle submit button click
    document.getElementById('submit-btn').addEventListener('click', function () {
        const prompt = document.getElementById('prompt-input').value.trim();
        if (!prompt) return;

        const loading = document.getElementById('loading');
        const responseDiv = document.getElementById('response');

        loading.style.display = 'block';
        responseDiv.innerHTML = '<span class="pulse"><i class="fas fa-circle-notch fa-spin"></i> [DEMONIC]: Channeling forbidden knowledge...</span>';

        // Blood drip animation
        const tempDrip = document.createElement('div');
        tempDrip.className = 'blood-drip';
        tempDrip.style.left = '50%';
        tempDrip.style.animation = 'dripFall 2s forwards';
        tempDrip.style.opacity = '0.8';
        tempDrip.style.height = '100px';
        document.getElementById('blood-drips').appendChild(tempDrip);
        setTimeout(() => tempDrip.remove(), 2000);

        // 🔮 Call ChatGPT API
        fetch(`https://chatgpt.apinepdev.workers.dev/?question=${encodeURIComponent(prompt)}`)
            .then(response => response.json())
            .then(data => {
                loading.style.display = 'none';
                responseDiv.innerHTML = formatResponse(data.answer) + '<span class="cursor"></span>';
                addCopyButtons();

                // Flash effect
                const container = document.querySelector('.container');
                container.style.boxShadow = '0 0 50px rgba(255, 0, 51, 0.5)';
                setTimeout(() => {
                    container.style.boxShadow = '0 0 30px var(--glow)';
                }, 1000);
            })
            .catch(error => {
                loading.style.display = 'none';
                responseDiv.innerHTML = '<span class="demonic-signature">[DEMONIC]:</span> The veil between worlds is too thick. Try again.<span class="cursor"></span>';
                console.error('Error:', error);
            });
    });

    // Ctrl + Enter to submit
    document.getElementById('prompt-input').addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('submit-btn').click();
        }
    });

    // Focus + blur styling
    const promptInput = document.getElementById('prompt-input');
    promptInput.addEventListener('focus', function () {
        this.style.borderColor = 'var(--rift)';
        this.style.boxShadow = '0 0 15px rgba(157, 0, 255, 0.3)';
    });

    promptInput.addEventListener('blur', function () {
        this.style.borderColor = 'var(--haze)';
        this.style.boxShadow = 'none';
    });

    // Flicker pentagram sometimes
    setInterval(() => {
        if (Math.random() > 0.9) {
            const pentagram = document.querySelector('.pentagram');
            pentagram.style.opacity = '0.2';
            setTimeout(() => {
                pentagram.style.opacity = '0.1';
            }, 1000);
        }
    }, 5000);
