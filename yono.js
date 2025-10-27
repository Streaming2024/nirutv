 // Load video from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const src = urlParams.get('src');
    const videoFrame = document.getElementById('video-frame');
    videoFrame.src = src ? src : "about:blank";
    
    // YouTube Chat URL
    const youtubeChatUrl = "https://www.youtube.com/live_chat?v=CcpYwQ1QiDY&embed_domain=yonotv.pages.dev";
    
    // Function to load YouTube chat
    function loadYouTubeChat() {
        const chatFrame = document.getElementById('chat-frame');
        chatFrame.src = youtubeChatUrl;
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Always start with light mode
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    localStorage.removeItem('theme');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Refresh button functionality
    document.getElementById('refresh-btn').addEventListener('click', function() {
        location.reload();
    });
    
    // Fullscreen functionality
    const fullscreenButton = document.getElementById('fullscreen-button');
    const videoContainer = document.querySelector('.video-container');
    
    function toggleFullscreen() {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
            
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => {});
            }
            
            fullscreenButton.style.display = 'none';
        } else {
            if (videoFrame.requestFullscreen) {
                videoFrame.requestFullscreen();
            } else if (videoFrame.webkitRequestFullscreen) {
                videoFrame.webkitRequestFullscreen();
            } else if (videoFrame.msRequestFullscreen) {
                videoFrame.msRequestFullscreen();
            }
        }
    }
    
    fullscreenButton.addEventListener('click', toggleFullscreen);
    
    // Handle orientation changes
    function handleOrientationChange() {
        if (window.matchMedia("(orientation: landscape)").matches) {
            videoContainer.style.maxHeight = '80vh';
        } else {
            videoContainer.style.maxHeight = 'none';
        }
    }
    
    handleOrientationChange();
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Exit fullscreen when orientation changes
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
            fullscreenButton.style.display = 'block';
        }
    });
    
    // Chat toggle functionality
    let chatVisible = true;
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    
    chatToggleBtn.addEventListener('click', function() {
        const chatFrame = document.getElementById('chat-frame');
        
        if (chatVisible) {
            chatFrame.style.display = "none";
            chatToggleBtn.innerHTML = '<i class="fas fa-comment"></i> Show Chat';
            chatVisible = false;
        } else {
            chatFrame.style.display = "block";
            chatToggleBtn.innerHTML = '<i class="fas fa-comment-slash"></i> Hide Chat';
            chatVisible = true;
            loadYouTubeChat();
        }
    });
    
    // Anti-Adblock Detection
    async function detectAdBlock() {
        let adBlockEnabled = false;
        const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            await fetch(new Request(googleAdUrl), { 
                signal: controller.signal,
                cache: 'no-store'
            })
                .then(() => clearTimeout(timeoutId))
                .catch(error => {
                    if (error.name === 'AbortError') return;
                    adBlockEnabled = true;
                });

        } catch (e) {
            adBlockEnabled = true;
        }

        if (adBlockEnabled) {
            document.getElementById("adb").style.display = "block";
            if (videoFrame.src && videoFrame.src !== "about:blank") {
                videoFrame.src = "about:blank";
            }
        }
    }
    
    // Run after page loads
    window.addEventListener('load', function() {
        loadYouTubeChat();
        setTimeout(detectAdBlock, 2000);
    });
