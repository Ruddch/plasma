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
        
        // Создаем новые частицы при движении мыши (чаще и ярче)
        if (Math.random() > 0.4) {
            createParticle(mouseX, mouseY);
        }
    });
    
    // Создание новых частиц в стиле лавовой лампы
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        
        // Случайный размер как в лавовой лампе
        const size = Math.random() * 15 + 15; // 15-30px
        const height = size * (0.8 + Math.random() * 0.4); // 0.8-1.2 от ширины
        particle.style.width = size + 'px';
        particle.style.height = height + 'px';
        
        // Градиент лавовой лампы
        const colors = [
            'rgba(255, 107, 107, 0.9)',
            'rgba(254, 202, 87, 0.8)',
            'rgba(78, 205, 196, 0.7)',
            'rgba(69, 183, 209, 0.6)',
            'rgba(150, 206, 180, 0.5)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.background = `radial-gradient(ellipse at center, 
            ${randomColor} 0%, 
            rgba(254, 202, 87, 0.6) 30%, 
            rgba(78, 205, 196, 0.4) 60%, 
            transparent 100%)`;
        
        // Форма пузырька лавовой лампы
        particle.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '15';
        particle.style.boxShadow = `
            0 0 20px ${randomColor.replace('0.9', '0.6')},
            0 0 40px rgba(254, 202, 87, 0.4),
            inset 0 0 15px rgba(78, 205, 196, 0.3)
        `;
        particle.style.filter = 'blur(0.5px)';
        
        // Анимация лавовой лампы
        particle.style.animation = 'lavaFloat 8s ease-in-out forwards';
        
        document.body.appendChild(particle);
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
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
    
    // Эффект при клике (усиленный)
    document.addEventListener('click', function(e) {
        // Создаем волновой эффект от клика (усиленный)
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.border = '4px solid rgba(78, 205, 196, 1)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '20';
        ripple.style.boxShadow = '0 0 50px rgba(78, 205, 196, 0.8), inset 0 0 50px rgba(69, 183, 209, 0.6)';
        ripple.style.animation = 'ripple 1.5s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        // Создаем эффект слияния частиц при клике
        createMergingEffect(e.clientX, e.clientY);
        
        // Создаем дополнительные частицы лавовой лампы
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createLavaParticle(e.clientX + (Math.random() - 0.5) * 150, e.clientY + (Math.random() - 0.5) * 150);
            }, i * 200);
        }
        
        // Удаляем эффект после анимации
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1500);
    });
    
    // Добавляем CSS для эффекта ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                width: 0px;
                height: 0px;
                opacity: 1;
                border-width: 4px;
            }
            50% {
                width: 200px;
                height: 200px;
                opacity: 0.8;
                border-width: 6px;
            }
            100% {
                width: 500px;
                height: 500px;
                opacity: 0;
                border-width: 2px;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Эффект при наведении на волны (усиленный)
    waves.forEach(wave => {
        wave.addEventListener('mouseenter', function() {
            this.style.filter = 'blur(0px) brightness(3) saturate(2.5)';
            this.style.boxShadow = '0 0 300px rgba(78, 205, 196, 1), 0 0 500px rgba(69, 183, 209, 0.8), 0 0 700px rgba(150, 206, 180, 0.6)';
            this.style.transform = 'translateX(-50%) translateY(-30px) scaleY(1.8)';
            this.style.transition = 'all 0.2s ease';
            this.style.zIndex = '20';
            
            // Создаем дополнительные частицы при наведении
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    createParticle(rect.left + rect.width/2 + (Math.random() - 0.5) * 200, rect.top + (Math.random() - 0.5) * 100);
                }, i * 200);
            }
        });
        
        wave.addEventListener('mouseleave', function() {
            this.style.filter = 'blur(1px) brightness(1) saturate(1)';
            this.style.boxShadow = '0 0 50px rgba(78, 205, 196, 0.3)';
            this.style.transform = 'translateX(-50%) translateY(0) scaleY(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Плавная анимация частиц в стиле лавовой лампы
    function animateParticles() {
        particles.forEach((particle, index) => {
            const time = Date.now() * 0.001;
            const slowTime = time * 0.3; // Медленное движение как в лавовой лампе
            
            // Плавное движение вверх-вниз
            const y = Math.sin(slowTime + index * 0.5) * 30;
            const x = Math.cos(slowTime * 0.7 + index * 0.3) * 15;
            
            // Изменение формы (как пузырьки в лавовой лампе)
            const scale = 1 + Math.sin(slowTime * 1.5 + index) * 0.2;
            const rotation = (slowTime * 20 + index * 45) % 360;
            
            // Изменение прозрачности
            const opacity = 0.6 + Math.sin(slowTime * 2 + index) * 0.3;
            
            particle.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
            particle.style.opacity = opacity;
            
            // Изменение формы border-radius для эффекта "пузырька"
            const borderRadiusVariation = Math.sin(slowTime * 3 + index) * 0.1;
            const baseRadius = 0.6;
            const newRadius = baseRadius + borderRadiusVariation;
            particle.style.borderRadius = `50% 50% 50% 50% / ${(newRadius * 100).toFixed(0)}% ${(newRadius * 100).toFixed(0)}% ${((1-newRadius) * 100).toFixed(0)}% ${((1-newRadius) * 100).toFixed(0)}%`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Запускаем анимацию частиц
    animateParticles();
    
    // Функция для создания эффекта слияния частиц
    function createMergingEffect(x, y) {
        const particle1 = createLavaParticle(x - 20, y);
        const particle2 = createLavaParticle(x + 20, y);
        
        // Анимация слияния
        setTimeout(() => {
            particle1.style.transition = 'all 1s ease-in-out';
            particle2.style.transition = 'all 1s ease-in-out';
            
            particle1.style.transform = 'translate(20px, 0) scale(1.5)';
            particle2.style.transform = 'translate(-20px, 0) scale(1.5)';
            
            // Создаем большую частицу в центре
            setTimeout(() => {
                const mergedParticle = createLavaParticle(x, y);
                mergedParticle.style.width = '40px';
                mergedParticle.style.height = '50px';
                mergedParticle.style.background = `radial-gradient(ellipse at center, 
                    rgba(255, 107, 107, 1) 0%, 
                    rgba(254, 202, 87, 0.9) 20%, 
                    rgba(78, 205, 196, 0.8) 40%, 
                    rgba(69, 183, 209, 0.6) 60%, 
                    transparent 100%)`;
                
                // Удаляем исходные частицы
                if (particle1.parentNode) particle1.parentNode.removeChild(particle1);
                if (particle2.parentNode) particle2.parentNode.removeChild(particle2);
            }, 1000);
        }, 100);
    }
    
    // Создание частицы лавовой лампы (отдельная функция)
    function createLavaParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        particle.style.width = '20px';
        particle.style.height = '30px';
        particle.style.background = 'radial-gradient(ellipse at center, rgba(255, 107, 107, 0.9) 0%, rgba(254, 202, 87, 0.8) 30%, rgba(78, 205, 196, 0.6) 60%, transparent 100%)';
        particle.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '15';
        particle.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.6), 0 0 40px rgba(254, 202, 87, 0.4)';
        particle.style.filter = 'blur(0.5px)';
        particle.style.animation = 'lavaFloat 8s ease-in-out forwards';
        
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
