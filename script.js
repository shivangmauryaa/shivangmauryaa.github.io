/*
 * Portfolio Interactions
 * Author: Shivang Maurya
 */

document.addEventListener('DOMContentLoaded', () => {
    // Advanced Terminal Boot Sequence
    const typeWriterElement = document.getElementById('typewriter-text');
    const terminalOutput = document.getElementById('terminal-output');

    // ASCII Art Banner
    const asciiArt = `
<span class="text-green">   _____ __    _                          </span>
<span class="text-green">  / ___// /_  (_)___________ _____  ____ _</span>
<span class="text-green">  \\__ \\/ __ \\/ / ___/ __  / __ \\/ __ \`/</span>
<span class="text-green"> ___/ / / / / (__  ) /_/ / / / / /_/ / </span>
<span class="text-green">/____/_/ /_/_/____/\\__,_/_/ /_/\\__, /  </span>
<span class="text-green">                              /____/   </span>
`;

    const bootSequence = [
        { text: "INITIALIZING KERNEL...", delay: 50 },
        { text: "LOADING MODULES...", delay: 50 },
        { text: "  [+] NET_ADMIN... OK", delay: 100 },
        { text: "  [+] CRYPTO_LAYER... OK", delay: 100 },
        { text: "  [+] EXPLOIT_DB... OK", delay: 100 },
        { text: "BYPASSING FIREWALL...", delay: 300 },
        { text: "ESTABLISHING SECURE CONNECTION...", delay: 200 },
        { text: "ACCESS GRANTED.", delay: 400, color: "var(--accent-green)" },
        { html: asciiArt, delay: 100 }
    ];

    const welcomeMessages = [
        "./init_portfolio.sh",
        "Identity Confirmed: Shivang Maurya",
        "Target: Red Team Operations",
        "Status: Ready to Breach."
    ];

    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;

    async function runBootSequence() {
        typeWriterElement.textContent = "";

        for (let line of bootSequence) {
            const p = document.createElement('div');
            p.style.marginBottom = "2px";
            p.style.fontFamily = "var(--font-mono)"; // Ensure mono font

            if (line.html) {
                p.innerHTML = line.html;
                p.style.whiteSpace = "pre"; // Keep ASCII spacing
                p.style.lineHeight = "1.2";
            } else {
                p.style.color = line.color || "var(--text-secondary)";
                p.textContent = "> " + line.text;
            }

            terminalOutput.appendChild(p);

            const body = document.getElementById('terminal-body');
            body.scrollTop = body.scrollHeight;

            await new Promise(r => setTimeout(r, line.delay));
        }

        await new Promise(r => setTimeout(r, 600));
        typeWriter();
    }

    function typeWriter() {
        const currentText = welcomeMessages[msgIndex];
        const isCmd = msgIndex === 0;

        // If it's a command, type it in the input area
        if (isCmd) {
            if (charIndex < currentText.length) {
                typeWriterElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                // Command typed, simulate 'Enter'
                setTimeout(() => {
                    // Move command to output
                    const p = document.createElement('div');
                    p.innerHTML = `<span style="color:var(--accent-green)">root@redteam:~#</span> ${currentText}`;
                    terminalOutput.appendChild(p);
                    typeWriterElement.textContent = "";
                    msgIndex++;
                    charIndex = 0;
                    typeWriter();
                }, 400);
            }
            return;
        }

        // For subsequent lines, type them one by one into the OUTPUT area, not the input
        if (charIndex === 0) {
            // Create new line for this message
            const p = document.createElement('div');
            p.id = `msg-${msgIndex}`;
            p.style.color = "var(--text-primary)";
            p.style.fontWeight = "bold";
            terminalOutput.appendChild(p);
        }

        if (charIndex < currentText.length) {
            const el = document.getElementById(`msg-${msgIndex}`);
            if (el) el.textContent += currentText.charAt(charIndex);

            // Auto scroll
            const body = document.getElementById('terminal-body');
            body.scrollTop = body.scrollHeight;

            charIndex++;
            setTimeout(typeWriter, 40);
        } else {
            // Line finished
            charIndex = 0;
            msgIndex++;
            if (msgIndex < welcomeMessages.length) {
                setTimeout(typeWriter, 300); // Pause between lines
            }
        }
    }

    // Start
    setTimeout(runBootSequence, 500);

    // Navbar Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.padding = '16px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Observer
    const sections = document.querySelectorAll('.section');
    const observerOptions = { threshold: 0.2, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, observerOptions);

    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(20px)";
        sec.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(sec);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.section.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);

    /* --- Particle Network Animation --- */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration
        const particleCount = 60; // Adjust density
        const connectionDistance = 150;
        const moveSpeed = 0.5;

        function resize() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * moveSpeed;
                this.vy = (Math.random() - 0.5) * moveSpeed;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? '#00ff41' : '#bd00ff'; // Green or Purple
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw connections first
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = 1 - (dist / connectionDistance);
                        ctx.strokeStyle = `rgba(160, 160, 160, ${opacity * 0.2})`; // Subtle connection
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw/Update particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        }

        // Initialize
        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });
        resize();
        initParticles();
        animate();
    }
});
