document.addEventListener('DOMContentLoaded', function() {
    const waves = document.querySelectorAll('.wave');
    const particles = document.querySelectorAll('.particle');
    const container = document.querySelector('.container');
    
    // Создаем эффект следования курсора
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Отслеживаем движение мыши
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Плавное следование курсора (усиленное)
        targetX = (mouseX - window.innerWidth / 2) * 0.3;
        targetY = (mouseY - window.innerHeight / 2) * 0.3;
        
        // Применяем эффект к волнам (усиленный)
        waves.forEach((wave, index) => {
            const intensity = (index + 1) * 0.4;
            const waveX = targetX * intensity;
            const waveY = targetY * intensity * 0.7;
            const scale = 1 + intensity * 0.3;
            
            wave.style.transform = `translateX(calc(-50% + ${waveX}px)) translateY(${waveY}px) scaleY(${scale})`;
            wave.style.filter = `blur(0px) brightness(${1 + intensity * 0.5}) saturate(${1 + intensity * 0.3})`;
        });
        
        // Создаем новые частицы при движении мыши (реже и меньше)
        if (Math.random() > 0.7) {
            createParticle(mouseX, mouseY);
        }
    });
    
    // Оптимизированное создание частиц лавовой лампы
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        
        // Уменьшенный размер для частиц при движении мыши
        const size = Math.random() * 8 + 6; // 6-14px вместо 15-30px
        const height = size * (0.8 + Math.random() * 0.4);
        particle.style.width = size + 'px';
        particle.style.height = height + 'px';
        
        // Оптимизированный градиент
        const colors = ['#ff6b6b', '#feca57', '#4ecdc4', '#45b7d1', '#96ceb4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.background = `radial-gradient(ellipse at center, 
            ${randomColor}aa 0%, 
            #feca5799 30%, 
            #4ecdc466 60%, 
            transparent 100%)`;
        
        // Базовые стили
        particle.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '15';
        particle.style.willChange = 'transform, opacity';
        particle.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
        
        // Уменьшенное свечение для частиц при движении мыши
        particle.style.boxShadow = `0 0 8px ${randomColor}44, 0 0 16px #feca5722`;
        particle.style.filter = 'blur(0.3px)';
        
        // CSS анимация (короче для частиц при движении мыши)
        particle.style.animation = 'lavaFloat 4s ease-out forwards';
        
        document.body.appendChild(particle);
        
        // Удаляем через 4 секунды (быстрее)
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
    
    // Добавляем CSS для анимации частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Эффект при клике (только частицы лавовой лампы)
    document.addEventListener('click', function(e) {
        // Создаем эффект слияния частиц при клике
        createMergingEffect(e.clientX, e.clientY);
        
        // Создаем меньше дополнительных частиц при клике
        // for (let i = 0; i < 2; i++) {
        //     setTimeout(() => {
        //         createLavaParticle(e.clientX + (Math.random() - 0.5) * 100, e.clientY + (Math.random() - 0.5) * 100);
        //     }, i * 300);
        // }
    });
    
    
    // Эффект при наведении на волны (усиленный)
    waves.forEach(wave => {
        wave.addEventListener('mouseenter', function() {
            this.style.filter = 'blur(0px) brightness(3) saturate(2.5)';
            this.style.boxShadow = '0 0 300px rgba(78, 205, 196, 1), 0 0 500px rgba(69, 183, 209, 0.8), 0 0 700px rgba(150, 206, 180, 0.6)';
            this.style.transform = 'translateX(-50%) translateY(-30px) scaleY(1.8)';
            this.style.transition = 'all 0.2s ease';
            this.style.zIndex = '20';
            
            // Создаем меньше дополнительных частиц при наведении
            for (let i = 0; i < 1; i++) {
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    createParticle(rect.left + rect.width/2 + (Math.random() - 0.5) * 100, rect.top + (Math.random() - 0.5) * 50);
                }, i * 500);
            }
        });
        
        wave.addEventListener('mouseleave', function() {
            this.style.filter = 'blur(1px) brightness(1) saturate(1)';
            this.style.boxShadow = '0 0 50px rgba(78, 205, 196, 0.3)';
            this.style.transform = 'translateX(-50%) translateY(0) scaleY(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Оптимизированная анимация частиц через CSS transitions
    function animateParticles() {
        particles.forEach((particle, index) => {
            // Случайные параметры для каждой частицы
            const randomX = (Math.random() - 0.5) * 40;
            const randomY = (Math.random() - 0.5) * 60;
            const randomScale = 0.8 + Math.random() * 0.4;
            const randomRotation = Math.random() * 360;
            const randomOpacity = 0.4 + Math.random() * 0.4;
            
            // Применяем изменения через CSS transitions
            particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotation}deg)`;
            particle.style.opacity = randomOpacity;
        });
        
        // Обновляем анимацию каждые 3-5 секунд вместо каждого кадра
        setTimeout(animateParticles, 3000 + Math.random() * 2000);
    }
    
    // Запускаем оптимизированную анимацию частиц
    animateParticles();
    
    // Функция для создания эффекта слияния частиц
    function createMergingEffect(x, y) {
        const particleCount = 6 + Math.floor(Math.random() * 5); // Случайное число от 6 до 10
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const particle = createLavaParticle(x, y);
            particle.style.transition = 'transform 2s ease-out, opacity 1s ease-out';
            particles.push(particle);
        }
        
        // Анимация слияния
        requestAnimationFrame(() => {
            particles.forEach((particle, index) => {
                particle.style.transform = 'translate(0, 0) scale(1.5)';
                particle.style.opacity = '1';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                
                const deltaX = Math.cos(angle) * distance;
                const deltaY = Math.sin(angle) * distance;
                
                particle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${0.6 + Math.random() * 0.8})`;
                particle.style.opacity = '1';
                
                // Добавляем эффект потухания под конец разлета
                setTimeout(() => {
                    //particle.style.transition = 'opacity 0.8s ease-out';
                    particle.style.opacity = '0';
                }, 1000);
            });
        });
    }
    
    // Оптимизированное создание частицы лавовой лампы
    function createLavaParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'lava-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        particle.style.width = '20px';
        particle.style.height = '30px';
        particle.style.background = 'radial-gradient(ellipse at center, #ff6b6baa 0%, #feca5799 30%, #4ecdc466 60%, transparent 100%)';
        particle.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '15';
        particle.style.willChange = 'transform, opacity';
        particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        particle.style.boxShadow = '0 0 20px #ff6b6b66, 0 0 40px #feca5744';
        particle.style.filter = 'blur(0.5px)';
        particle.style.opacity = '0.3';
        //particle.style.animation = 'lavaFloat 8s ease-in-out forwards';
        particle.style.transform = 'scale(0.5)';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
        
        return particle;
    }
    
    // Эффект параллакса при скролле (если будет контент)
    let scrollY = 0;
    window.addEventListener('scroll', function() {
        scrollY = window.scrollY;
        
        waves.forEach((wave, index) => {
            const speed = (index + 1) * 0.1;
            wave.style.transform = `translateX(-50%) translateY(${scrollY * speed}px)`;
        });
    });
    
    // Добавляем звуковые эффекты (опционально)
    function playClickSound() {
        // Создаем простой звуковой эффект
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Привязываем звук к клику (раскомментируйте если нужен звук)
    // document.addEventListener('click', playClickSound);
    
    console.log('POV - Proof of Vibes загружен! 🌊✨');
});
