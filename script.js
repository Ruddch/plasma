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
        
        // Плавное следование курсора
        targetX = (mouseX - window.innerWidth / 2) * 0.1;
        targetY = (mouseY - window.innerHeight / 2) * 0.1;
        
        // Применяем эффект к волнам
        waves.forEach((wave, index) => {
            const intensity = (index + 1) * 0.2;
            const waveX = targetX * intensity;
            const waveY = targetY * intensity * 0.5;
            
            wave.style.transform = `translateX(calc(-50% + ${waveX}px)) translateY(${waveY}px) scaleY(${1 + intensity * 0.1})`;
        });
        
        // Создаем новые частицы при движении мыши
        if (Math.random() > 0.7) {
            createParticle(mouseX, mouseY);
        }
    });
    
    // Создание новых частиц
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'radial-gradient(circle, rgba(78, 205, 196, 0.9) 0%, transparent 70%)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        
        // Анимация частицы
        particle.style.animation = 'particleFloat 2s ease-out forwards';
        
        document.body.appendChild(particle);
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
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
    
    // Эффект при клике
    document.addEventListener('click', function(e) {
        // Создаем волновой эффект от клика
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.border = '2px solid rgba(78, 205, 196, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '15';
        ripple.style.animation = 'ripple 1s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        // Удаляем эффект после анимации
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    });
    
    // Добавляем CSS для эффекта ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                width: 0px;
                height: 0px;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Эффект при наведении на волны
    waves.forEach(wave => {
        wave.addEventListener('mouseenter', function() {
            this.style.filter = 'blur(0px) brightness(1.5) saturate(1.5)';
            this.style.boxShadow = '0 0 150px rgba(78, 205, 196, 0.8)';
            this.style.transform = 'translateX(-50%) translateY(-20px) scaleY(1.3)';
            this.style.transition = 'all 0.3s ease';
        });
        
        wave.addEventListener('mouseleave', function() {
            this.style.filter = 'blur(1px) brightness(1) saturate(1)';
            this.style.boxShadow = '0 0 50px rgba(78, 205, 196, 0.3)';
            this.style.transform = 'translateX(-50%) translateY(0) scaleY(1)';
        });
    });
    
    // Плавная анимация частиц
    function animateParticles() {
        particles.forEach((particle, index) => {
            const time = Date.now() * 0.001;
            const x = Math.sin(time + index) * 20;
            const y = Math.cos(time + index * 0.5) * 15;
            const scale = 1 + Math.sin(time * 2 + index) * 0.3;
            
            particle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Запускаем анимацию частиц
    animateParticles();
    
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
