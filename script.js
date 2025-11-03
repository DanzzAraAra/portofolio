document.addEventListener("DOMContentLoaded", function() {

    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const heroElements = document.querySelectorAll('.initial-hidden'); 

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
            }, 700); 

        }, 500); 
    }

    window.addEventListener('load', finishLoading);

    setTimeout(() => {
        if(preloader.style.opacity !== '0') {
             finishLoading();
        }
    }, totalLoadingTime + 1000); 


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

});
