document.addEventListener('DOMContentLoaded', function() {

    // Sakura Petals Functionality
    const container = document.getElementById('sakura-container');
    const petalCount = 35;

    if (container) {
        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            const size = Math.random() * 15 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;

            const leftPosition = Math.random() * 100;
            petal.style.left = `${leftPosition}%`;

            const opacity = Math.random() * 0.5 + 0.3;
            petal.style.opacity = opacity;

            const sway = (Math.random() - 0.5) * 15;
            petal.style.setProperty('--sway', sway);

            const duration = Math.random() * 10 + 10;
            petal.style.animationDuration = `${duration}s`;
            const delay = Math.random() * 5;
            petal.style.animationDelay = `${delay}s`;
            petal.style.animationName = 'fall';

            container.appendChild(petal);

            setTimeout(() => {
                petal.remove();
                createPetal();
            }, duration * 1000 + 500);
        }

        for (let i = 0; i < petalCount; i++) createPetal();

        window.addEventListener('resize', function() {
            container.querySelectorAll('.petal').forEach(petal => {
                petal.style.left = Math.random() * 100 + '%';
            });
        });
    }

    // Mobile Menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav'); 

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); 
            navToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active'); 
                navToggle.classList.remove('active'); 
            });
        });
    }

    // Education Cards Functionality
    const eduCards = document.querySelectorAll('.edu-card');

    function generateCardPetals(card, count = 6) {
        // Remove existing card petals
        card.querySelectorAll('.card-petal').forEach(p => p.remove());

        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            petal.classList.add('card-petal');

            petal.style.left = Math.random() * 90 + '%';
            petal.style.top = Math.random() * 20 + '%';
            petal.style.width = 8 + Math.random() * 8 + 'px';
            petal.style.height = 8 + Math.random() * 8 + 'px';
            petal.style.opacity = 0.4 + Math.random() * 0.4;
            petal.style.animationDuration = 4 + Math.random() * 3 + 's';
            petal.style.animationDelay = Math.random() * 0.5 + 's';

            card.appendChild(petal);
        }
    }

    eduCards.forEach(card => {
        const body = card.querySelector('.card-body');
        const closeBtn = card.querySelector('.close-card');
        const seeMoreBtn = card.querySelector('.see-more');

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            body.style.maxHeight = null;
            card.classList.remove('active');
            card.querySelectorAll('.card-petal').forEach(p => p.remove());
            if (seeMoreBtn) {
                seeMoreBtn.textContent = 'See More';
                seeMoreBtn.setAttribute('aria-expanded', 'false');
            }
        });

        seeMoreBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const isActive = card.classList.contains('active');

            // Close other cards
            eduCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    c.querySelector('.card-body').style.maxHeight = null;
                    c.querySelectorAll('.card-petal').forEach(p => p.remove());
                    const otherBtn = c.querySelector('.see-more');
                    if (otherBtn) {
                        otherBtn.textContent = 'See More';
                        otherBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            if (isActive) {
                body.style.maxHeight = null;
                card.classList.remove('active');
                card.querySelectorAll('.card-petal').forEach(p => p.remove());
                this.textContent = 'See More';
                this.setAttribute('aria-expanded', 'false');
            } else {
                body.style.maxHeight = body.scrollHeight + "px";
                card.classList.add('active');
                generateCardPetals(card, 6);
                this.textContent = 'Show Less';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Skills Wheel
    const wheel = document.querySelector('.wheel');
    const skills = ["Python", "Java", "JavaScript", "C++", "C#", "SQL"];

    if (wheel) {
        const angleIncrement = (2 * Math.PI) / skills.length;
        const radius = 120;

        skills.forEach((skill, index) => {
            const angle = angleIncrement * index;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            skillElement.style.position = 'absolute'; 
            skillElement.style.left = '50%';
            skillElement.style.top = '50%';
            skillElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

            wheel.appendChild(skillElement);
        });
    }

    // Custom Cursor 
    const customCursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => { customCursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { customCursor.style.opacity = '1'; });

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
        document.addEventListener('touchstart', (e) => {
            customCursor.style.display = 'block';
            customCursor.style.left = e.touches[0].clientX + 'px';
            customCursor.style.top = e.touches[0].clientY + 'px';
            setTimeout(() => { customCursor.style.display = 'none'; }, 2000);
        });
    }

    //Stat-Box For Random Facts about me 
    const interests = [
        { title: "Learning", desc: "Exploring Operating Systems 🖥️", icon: "bx bx-code-alt" },
        { title: "Reading", desc: "Currently Reading: Fundamentals Of Aerospace Engineering 📚", icon: "bx bx-book" },
        { title: "Music", desc: "Been listening to alot of English Rock Bands and Alt-Indielately 🎧", icon: "bx bx-headphone" },
        { title: "Art", desc: "I unwind by sketching and writing 🎨", icon: "bx bx-brush" },
        { title: "Gaming", desc: "Strategy, RPG and Open-World games 🎮", icon: "bx bx-game" }
    ];

    let index = 0;
    const titleEl = document.getElementById('interest-title');
    const descEl = document.getElementById('interest-desc');
    const iconEl = document.querySelector('#recent-interests i');

    function updateInterest() {
        const interest = interests[index];
        titleEl.textContent = interest.title;
        descEl.textContent = interest.desc;
        iconEl.className = interest.icon;

        index = (index + 1) % interests.length;
    }

    setInterval(updateInterest, 4000); 

    // Spotify Addition (Next Update)
});