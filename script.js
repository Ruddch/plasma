document.addEventListener('DOMContentLoaded', function() {
    const waves = document.querySelectorAll('.wave');
    const particles = document.querySelectorAll('.particle');
    const container = document.querySelector('.container');
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        targetX = (mouseX - window.innerWidth / 2) * 0.3;
        targetY = (mouseY - window.innerHeight / 2) * 0.3;
        
        waves.forEach((wave, index) => {
            const intensity = (index + 1) * 0.4;
            const waveX = targetX * intensity;
            const waveY = targetY * intensity * 0.7;
            const scale = 1 + intensity * 0.3;
            
            wave.style.transform = `translateX(calc(-50% + ${waveX}px)) translateY(${waveY}px) scaleY(${scale})`;
            wave.style.filter = `blur(0px) brightness(${1 + intensity * 0.5}) saturate(${1 + intensity * 0.3})`;
        });
        
        if (Math.random() > 0.7) {
            createParticle(mouseX, mouseY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        
        const size = Math.random() * 8 + 6; // 6-14px вместо 15-30px
        const height = size * (0.8 + Math.random() * 0.4);
        particle.style.width = size + 'px';
        particle.style.height = height + 'px';
        
        const colors = ['#ff6b6b', '#feca57', '#4ecdc4', '#45b7d1', '#96ceb4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.background = `radial-gradient(ellipse at center, 
            ${randomColor}aa 0%, 
            #feca5799 30%, 
            #4ecdc466 60%, 
            transparent 100%)`;
        
        particle.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '15';
        particle.style.willChange = 'transform, opacity';
        particle.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
        
        particle.style.boxShadow = `0 0 8px ${randomColor}44, 0 0 16px #feca5722`;
        particle.style.filter = 'blur(0.3px)';
        
        particle.style.animation = 'lavaFloat 4s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
    
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
   
    const audio = new Audio('frog.wav');
    audio.volume = 0.5;

    document.addEventListener('click', function(e) {
        createMergingEffect(e.clientX, e.clientY);
        
        audio.play().catch(error => {
            console.log('Sound error:', error);
        });
        
        // for (let i = 0; i < 2; i++) {
        //     setTimeout(() => {
        //         createLavaParticle(e.clientX + (Math.random() - 0.5) * 100, e.clientY + (Math.random() - 0.5) * 100);
        //     }, i * 300);
        // }
    });

    function copyContractAddress() {
        const contractAddress = document.getElementById('contract-address');
        const address = contractAddress.textContent;
        
        navigator.clipboard.writeText(address).then(() => {
            showCopyNotification();
        }).catch(err => {
            console.error('Error copying address:', err);
            const textArea = document.createElement('textarea');
            textArea.value = address;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyNotification();
        });
    }

    function showCopyNotification() {
        const notification = document.createElement('div');
        notification.textContent = 'Address copied!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4ecdc4, #45b7d1);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
            z-index: 1000;
            font-weight: bold;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    document.getElementById('contract-address').addEventListener('click', function(e) {
        e.stopPropagation(); 
        copyContractAddress();
    });

    
    
    waves.forEach(wave => {
        wave.addEventListener('mouseenter', function() {
            this.style.filter = 'blur(0px) brightness(3) saturate(2.5)';
            this.style.boxShadow = '0 0 300px rgba(78, 205, 196, 1), 0 0 500px rgba(69, 183, 209, 0.8), 0 0 700px rgba(150, 206, 180, 0.6)';
            this.style.transform = 'translateX(-50%) translateY(-30px) scaleY(1.8)';
            this.style.transition = 'all 0.2s ease';
            this.style.zIndex = '20';
            
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
    
    function animateParticles() {
        particles.forEach((particle, index) => {
            const randomX = (Math.random() - 0.5) * 40;
            const randomY = (Math.random() - 0.5) * 60;
            const randomScale = 0.8 + Math.random() * 0.4;
            const randomRotation = Math.random() * 360;
            const randomOpacity = 0.4 + Math.random() * 0.4;
            
            particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotation}deg)`;
            particle.style.opacity = randomOpacity;
        });
        
        setTimeout(animateParticles, 3000 + Math.random() * 2000);
    }
    
    animateParticles();
    
    function createMergingEffect(x, y) {
        const particleCount = 6 + Math.floor(Math.random() * 5); // Случайное число от 6 до 10
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const particle = createLavaParticle(x, y);
            particle.style.transition = 'transform 2s ease-out, opacity 1s ease-out';
            particles.push(particle);
        }
        
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
                
                setTimeout(() => {
                    //particle.style.transition = 'opacity 0.8s ease-out';
                    particle.style.opacity = '0';
                }, 1000);
            });
        });
    }
    
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
    
    let scrollY = 0;
    window.addEventListener('scroll', function() {
        scrollY = window.scrollY;
        
        waves.forEach((wave, index) => {
            const speed = (index + 1) * 0.1;
            wave.style.transform = `translateX(-50%) translateY(${scrollY * speed}px)`;
        });
    });
    
    function playClickSound() {
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
    
    // document.addEventListener('click', playClickSound);
    
});
