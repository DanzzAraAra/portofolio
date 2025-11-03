document.addEventListener("DOMContentLoaded", function() {

    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const heroElements = document.querySelectorAll('.initial-hidden'); 
    const musicControl = document.getElementById('music-control');

    let currentProgress = 0;
    const totalLoadingTime = 5000; 
    const updateInterval = 50; 
    const increment = (100 / (totalLoadingTime / updateInterval)); 

    function updateProgressBar() {
        if (currentProgress < 95) { 
            currentProgress += increment;
            progressBar.style.width = currentProgress + '%';
        }
    }

    const progressInterval = setInterval(updateProgressBar, updateInterval);

    function finishLoading() {
        clearInterval(progressInterval);

        progressBar.style.width = '100%';
        loadingText.textContent = "Complete!"; 

        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            heroElements.forEach(el => {
                el.classList.add('initial-visible');
            });

            setTimeout(() => {
                preloader.style.display = 'none';
                musicControl.classList.add('music-visible');
            }, 700); 

        }, 500); 
    }

    window.addEventListener('load', finishLoading);

    setTimeout(() => {
        if(preloader.style.opacity !== '0') {
             finishLoading();
        }
    }, totalLoadingTime + 1000); 


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const scrollTargetId = this.getAttribute('data-target') || this.getAttribute('href');
            
            let urlHash = this.getAttribute('href');
            if (urlHash === '#about' || urlHash === '#skills') {
                 
            } else {
                urlHash = '#menu';
            }

            const targetElement = document.querySelector(scrollTargetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                if (history.pushState) {
                    history.pushState(null, null, urlHash);
                } else {
                    window.location.hash = urlHash;
                }
            }
        });
    });
    
    const hiddenElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    hiddenElements.forEach((el) => observer.observe(el));

    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const musicBarContainer = document.getElementById('music-bar-container');

    toggleButton.addEventListener('click', function() {
        if (music.paused) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    toggleButton.innerHTML = '<i class="fas fa-pause"></i>';
                    musicBarContainer.classList.add('bar-animated');
                }).catch(error => {
                    toggleButton.innerHTML = '<i class="fas fa-play"></i>';
                    musicBarContainer.classList.remove('bar-animated');
                });
            }
        } else {
            music.pause();
            toggleButton.innerHTML = '<i class="fas fa-play"></i>';
            musicBarContainer.classList.remove('bar-animated');
        }
    });

});
