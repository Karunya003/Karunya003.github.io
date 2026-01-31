// Typing Effect
const roles = [
                'Data Analyst',
                'Data Scientist',
                'AI/ML Engineer',
                'Full-Stack Developer'
            ];
            
            let roleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typingText = document.getElementById('typingText');
            const typingSpeed = 100;
            const deletingSpeed = 50;
            const pauseTime = 2000;

            function typeEffect() {
                const currentRole = roles[roleIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentRole.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentRole.substring(0, charIndex + 1);
                    charIndex++;
                }

                let speed = isDeleting ? deletingSpeed : typingSpeed;

                if (!isDeleting && charIndex === currentRole.length) {
                    speed = pauseTime;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    speed = 500;
                }

                setTimeout(typeEffect, speed);
            }

            setTimeout(typeEffect, 1000);

            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');
            const html = document.documentElement;
            let currentTheme = 'light';

            function setTheme(theme) {
                if (theme === 'dark') {
                    html.setAttribute('data-theme', 'dark');
                    themeIcon.textContent = '☀️';
                    currentTheme = 'dark';
                } else {
                    html.removeAttribute('data-theme');
                    themeIcon.textContent = '🌙';
                    currentTheme = 'light';
                }
            }

            themeToggle.addEventListener('click', () => {
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                setTheme(newTheme);
            });

            // Resume Dropdown
            const resumeDropdown = document.getElementById('resumeDropdown');
            const resumeMenu = document.getElementById('resumeMenu');

            resumeDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                resumeMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                resumeMenu.classList.remove('show');
            });

            // Project Filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.dataset.category;
                        if (category === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar shadow on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px var(--card-shadow)';
            } else {
                navbar.style.boxShadow = '0 2px 10px var(--card-shadow)';
            }
        });

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.getAttribute('data-width');
                    entry.target.style.width = targetWidth;
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });