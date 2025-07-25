document.addEventListener('DOMContentLoaded', function() {

    // --- Sakura Petals Functionality ---
    const container = document.getElementById('sakura-container');
    const petalCount = 35;

    // Check if sakura-container exists before trying to create petals
    if (container) {
        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            // Random size between 10px and 25px
            const size = Math.random() * 15 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;

            // Random position across the width of the screen
            const leftPosition = Math.random() * 100;
            petal.style.left = `${leftPosition}%`;

            const opacity = Math.random() * 0.5 + 0.3;
            petal.style.opacity = opacity;

            const sway = (Math.random() - 0.5) * 15;
            petal.style.setProperty('--sway', sway);

            // Random animation duration (10-20 seconds)
            const duration = Math.random() * 10 + 10;
            petal.style.animationDuration = `${duration}s`;

            // Random delay (0-5 seconds)
            const delay = Math.random() * 5;
            petal.style.animationDelay = `${delay}s`;

            // Always use the fall animation
            petal.style.animationName = 'fall';

            container.appendChild(petal);

            // Remove petal after animation completes to prevent DOM overloadand create a new one to maintain the continuous effect
            setTimeout(() => {
                petal.remove();
                createPetal(); // create a new petal
            }, duration * 1000 + 500); // duration is in seconds, convert to ms
        }

        // Create initial petals
        for (let i = 0; i < petalCount; i++) {
            createPetal();
        }

        // Handle window resize to maintain petals 
        window.addEventListener('resize', function() {
            const petals = container.querySelectorAll('.petal');
            petals.forEach(petal => {
                const leftPosition = Math.random() * 100;
                petal.style.left = `${leftPosition}%`;
            });
        });
    } else {
        console.warn("Sakura container with ID 'sakura-container' not found. Sakura animation will not run.");
    }


    // --- Mobile menu toggle (Consolidated and Corrected) ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav'); 

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active'); 
            navToggle.classList.toggle('active');
        });

        // Close nav when a link inside the nav is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active'); 
                navToggle.classList.remove('active'); 
            });
        });
    } else {
        console.warn("Mobile menu elements ('.nav-toggle' or 'nav#nav') not found. Mobile menu toggle will not function.");
    }


    // --- Education slider functionality ---
    const sliderContainer = document.getElementById('sliderContainer');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (sliderContainer && slides.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slideCount = slides.length;

        function goToSlide(index) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
        }

        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(currentSlide);
        });

        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
        });

        // Initialize slider to the first slide
        goToSlide(0);

    } else {
        console.warn("Slider elements not found. Check your HTML IDs and classes for sliderContainer, slides, prevBtn, nextBtn.");
    }


    // --- Skills wheel positioning ---
    const wheel = document.querySelector('.wheel');
    const skills = [
        "Python", "Java", "JavaScript", "C++", "C#", "SQL", "HTML/CSS",
    ];

    if (wheel) {
        const angleIncrement = (2 * Math.PI) / skills.length;
        const radius = 120; // Distance from center

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
            skillElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`; // Center then position

            wheel.appendChild(skillElement);
        });
    } else {
        console.warn("Skills wheel element with class 'wheel' not found. Skills wheel will not be populated.");
    }

    const customCursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', (e) => {

            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '1';
        });
});