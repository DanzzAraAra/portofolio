document.addEventListener("DOMContentLoaded", function() {

    // ======== Preloader (Progress Bar) Logic ========
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const heroElements = document.querySelectorAll('.initial-hidden'); // Ambil elemen Hero

    let currentProgress = 0;
    const totalLoadingTime = 5000; // 5 seconds total simulated loading time (Lama)
    const updateInterval = 50; // Update every 50ms
    const increment = (100 / (totalLoadingTime / updateInterval)); 

    // Function to update the progress bar
    function updateProgressBar() {
        if (currentProgress < 95) { 
            currentProgress += increment;
            progressBar.style.width = currentProgress + '%';
        }
    }

    // Start filling the progress bar
    const progressInterval = setInterval(updateProgressBar, updateInterval);

    // Logic to handle the end of loading
    function finishLoading() {
        // Stop the progress bar interval
        clearInterval(progressInterval);

        // Ensure the progress bar reaches 100%
        progressBar.style.width = '100%';
        loadingText.textContent = "Complete!"; 

        // 1. Tunggu sebentar setelah 100%
        setTimeout(() => {
            // 2. Mulai transisi fade out preloader
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // 3. Setelah preloader hilang, tampilkan animasi Hero
            heroElements.forEach(el => {
                el.classList.add('initial-visible');
            });

            // 4. Hapus preloader dari DOM sepenuhnya
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700); 

        }, 500); 
    }

    // Trigger finishLoading when all assets are loaded
    window.addEventListener('load', finishLoading);

    // Fallback: Jika event 'load' tidak ter-trigger (misalnya, semua aset di-cache),
    // kita tetap panggil finishLoading setelah waktu maksimum loading selesai.
    // Ini penting agar preloader tidak stuck.
    setTimeout(() => {
        if(preloader.style.opacity !== '0') {
             finishLoading();
        }
    }, totalLoadingTime + 1000); // 1 detik setelah waktu loading selesai


    // ======== Scroll Animation Logic (Intersection Observer) ========
    
    // Select all elements for scroll animation (excl. Hero elements with initial-hidden)
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

    // Observe scroll animations
    hiddenElements.forEach((el) => observer.observe(el));

});