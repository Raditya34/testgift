document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const whisperBox = document.getElementById('whisperBox');
    const popUpMessage = document.getElementById('popUpMessage');
    const messageDisplay = document.getElementById('messageDisplay');
    const mainTitle = document.getElementById('mainTitle');
    const singleMessageCard = document.getElementById('singleMessageCard');
    const cardTitle = document.getElementById('cardTitle');
    const cardMessage = document.getElementById('cardMessage');
    const nextMessageBtn = document.getElementById('nextMessageBtn');
    const prevMessageBtn = document.getElementById('prevMessageBtn');
    const closeDisplayBtn = document.getElementById('closeDisplayBtn');
    const finalAnimationArea = document.getElementById('finalAnimationArea');

    // Audio Elements
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    let isMusicPlaying = false; // Track actual playing state after user interaction

    let currentMessageIndex = 0;

    // Array of empowering and healing messages (DIPARAFRASE & DIUBAH)
    // INI BAGIAN TERPENTING! Sesuaikan pesan-pesan ini agar sangat personal, tulus, dan relevan dengan situasinya.
    const messages = [
        {
            title: "Untuk Hati yang Luar Biasa...",
            text: "Kisah lama memang meninggalkan bekas, tapi ingatlah, setiap bekas luka adalah bukti kamu telah bertahan dan tumbuh. Kamu jauh lebih kuat dari yang kamu bayangkan. Aku melihat itu."
        },
        {
            title: "Perasaanmu Adalah Kekuatan",
            text: "Rasakan saja semua yang ada. Marah, sedih, kecewa… semua itu valid. Jangan ditahan. Justru dari situ, kamu akan menemukan kembali arah kebahagiaanmu. Aku di sini untuk mendengarkan."
        },
        {
            title: "Kamu Tak Pernah Sendiri",
            text: "Meski mungkin terasa berat dan sepi, percayalah, ada hati-hati yang peduli dan siap menemanimu. Kamu tidak harus menghadapi ini sendirian. Aku bersamamu, dari jauh maupun dekat."
        },
        {
            title: "Cahayamu Tak Terpadamkan",
            text: "Ada kilauan istimewa dalam dirimu yang tidak bisa diredupkan oleh apapun. Itu unik, menawan, dan sungguh berharga. Izinkan dirimu bersinar terang lagi, pelan-pelan saja."
        },
        {
            title: "Waktu, Sang Penyembuh Terbaik",
            text: "Biarkan waktu melakukan tugasnya. Pelan-pelan saja, tidak perlu terburu-buru. Perlahan tapi pasti, luka akan memudar dan tempatnya akan diisi oleh kekuatan dan ketenangan baru."
        },
        {
            title: "Setiap Langkah Adalah Pelajaran",
            text: "Setiap pengalaman, bahkan yang menyakitkan, adalah bagian dari perjalananmu. Mereka membentukmu menjadi pribadi yang semakin bijak, tangguh, dan menakjubkan seperti sekarang."
        },
        {
            title: "Nilaimu Tak Tergantikan",
            text: "Ingat ini baik-baik: Nilaimu sebagai individu tidak pernah berkurang karena apa yang pernah terjadi. Kamu istimewa, utuh, dan sangat berharga, melebihi bayanganmu."
        },
        {
            title: "Fokus Pada Bahagiamu",
            text: "Ini adalah saatnya kamu memprioritaskan dirimu. Kejar apa yang membuat hatimu senang, karena kamu pantas mendapatkan semua kebahagiaan itu, seutuhnya."
        },
        {
            title: "Sebuah Harapan Baru...",
            text: "Mungkin masa lalu terasa membebani, tapi di balik awan gelap itu, masa depan menjanjikan lembaran baru yang penuh kejutan indah. Berani untuk melihatnya bersamaku?"
        },
        {
            title: "Aku Percaya Padamu",
            text: "Aku percaya kamu akan melewati ini. Kamu punya kekuatan luar biasa untuk bangkit lebih tinggi. Aku di sini, siap mendukungmu, apa pun yang terjadi."
        },
        {
            title: "Tentang Dirimu yang Menarik",
            text: "Ada pesona unik dan ketulusan dalam dirimu yang bikin orang lain betah dan nyaman di dekatmu. Itu adalah karunia yang sangat langka dan indah."
        },
        {
            title: "Senyummu Adalah Kekuatan",
            text: "Senyummu punya kekuatan untuk mencerahkan hari, tidak hanya untukmu, tapi juga untuk orang di sekitarmu. Jangan sembunyikan itu terlalu lama."
        },
        {
            title: "Bersama untuk Bahagia",
            text: "Aku berharap, di masa depan, kita bisa menciptakan banyak cerita baru yang penuh tawa, kebahagiaan, dan kenangan indah bersama."
        }
    ];

    function showMessageCard(index) {
        if (index < 0 || index >= messages.length) return;

        singleMessageCard.classList.remove('active'); // Hide current card

        // Delay to allow fade out animation before changing content
        setTimeout(() => {
            cardTitle.textContent = messages[index].title;
            cardMessage.textContent = messages[index].text;

            singleMessageCard.classList.add('active'); // Show new card with animation

            // Update navigation buttons visibility
            prevMessageBtn.classList.toggle('hidden', index === 0);
            nextMessageBtn.classList.toggle('hidden', index === messages.length - 1);

            currentMessageIndex = index;
        }, 500); // Small delay for smoother transition between cards
    }

    // Function to generate and animate heart particles
    function generateHearts() {
        finalAnimationArea.classList.remove('hidden');
        for (let i = 0; i < 30; i++) { // Generate 30 hearts
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart', 'heart-particle');
            heart.style.setProperty('--start-x', `${Math.random() * 100}vw`); // Random start X position
            heart.style.animationDelay = `${Math.random() * 2}s`; // Random delay for staggered animation
            finalAnimationArea.appendChild(heart);
        }
        // Remove hearts after animation completes
        setTimeout(() => {
            finalAnimationArea.innerHTML = ''; // Clear all heart elements
            finalAnimationArea.classList.add('hidden');
        }, 5000); // Match animation duration in CSS
    }

    // --- Audio Control Logic ---
    // User interaction (clicking the box) to unmute and play music
    whisperBox.addEventListener('click', () => {
        // Only attempt to play if it's currently paused (and not explicitly muted by user before)
        if (backgroundMusic.paused && !backgroundMusic.muted) {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true; // Confirmed playing
                musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; // Update icon
            }).catch(error => {
                // Autoplay was blocked (e.g., if user refreshed page, it might still be muted by default)
                console.warn("Autoplay was prevented. Keeping music muted.", error);
                backgroundMusic.muted = true; // Ensure it stays muted
                musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                // You might want to show a message to the user here
            });
        }
        // If it was already playing, or if it's muted, we don't change state here.
        // User has to click the music toggle button for explicit control.

        // Existing box opening animation logic
        whisperBox.classList.add('opening');
       
        setTimeout(() => {
            whisperBox.classList.add('hidden'); // Hide the box completely
        }, 1500); // Wait for initial box opening + some buffer

        setTimeout(() => {
            popUpMessage.style.opacity = '0'; // Start fading out the pop-up message
            popUpMessage.style.transform = 'scale(0.8)'; // Shrink it slightly as it fades
            
            // Show main message display (full screen)
            messageDisplay.classList.remove('hidden');
            messageDisplay.classList.add('visible');
            mainTitle.textContent = "Pesan Rahasia Untukmu"; // Set main title
            showMessageCard(0); // Load the first message card

        }, 4000); // Delay long enough for pop-up to be seen and then fade out
    });

    // Music toggle button functionality
    musicToggleBtn.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            // If muted, try to unmute and play
            backgroundMusic.muted = false;
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; // Change icon to volume up
            }).catch(error => {
                console.error("Error playing audio after unmute:", error);
                // If it fails to play even after explicit unmute click, perhaps indicate an issue
                musicToggleBtn.innerHTML = '<i class="fas fa-volume-off"></i>'; // Show error/muted icon
                backgroundMusic.muted = true; // Keep muted if can't play
            });
        } else {
            // If not muted, mute it
            backgroundMusic.muted = true;
            isMusicPlaying = false; // User explicitly muted
            musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Change icon to volume mute
        }
    });

    // Navigation buttons for messages
    nextMessageBtn.addEventListener('click', () => {
        if (currentMessageIndex < messages.length - 1) {
            showMessageCard(currentMessageIndex + 1);
        } else {
            // End of messages, trigger final animation and final message
            mainTitle.textContent = "Untuk Senyummu..."; // Change main title for final view
            singleMessageCard.classList.remove('active'); // Hide current message card

            setTimeout(() => {
                generateHearts(); // Start heart animation
                cardTitle.textContent = "Terima Kasih Sudah Membuka Ini.";
                cardMessage.textContent = "Semoga hari-harimu penuh cahaya dan kekuatan. Ingat, kamu luar biasa, dan selalu ada harapan.";
                singleMessageCard.classList.add('active'); // Show final message
                prevMessageBtn.classList.add('hidden'); // Hide prev button
                nextMessageBtn.classList.add('hidden'); // Hide next button (since it's the end)
            }, 500); // Small delay before showing final message and animation
        }
    });

    prevMessageBtn.addEventListener('click', () => {
        if (currentMessageIndex > 0) {
            showMessageCard(currentMessageIndex - 1);
        }
    });

    // Event listener for closing the main display
    closeDisplayBtn.addEventListener('click', () => {
        messageDisplay.classList.remove('visible'); // Start fading out main content
        finalAnimationArea.classList.add('hidden'); // Hide animation area

        setTimeout(() => {
            messageDisplay.classList.add('hidden'); // Hide main content completely
            whisperBox.classList.remove('hidden'); // Make box visible again
            whisperBox.classList.remove('opening'); // Reset box animation state
            // Reset pop-up message state for next interaction
            popUpMessage.style.opacity = '0'; 
            popUpMessage.style.transform = 'scale(0.6)';
            popUpMessage.style.top = '85%';
            popUpMessage.style.display = 'flex'; // Ensure display is flex for next open

            // Reset to the first message for next time the box is opened
            currentMessageIndex = 0;
            prevMessageBtn.classList.add('hidden');
            nextMessageBtn.classList.remove('hidden'); // Show next button for new open
        }, 1500); // Match messageDisplay transition duration
    });

    // Initial setup: Pre-create message cards (they will be hidden by default CSS)
    // Only one card is shown at a time via JS
    // This function is still good for pre-loading messages data
    // (Actual card element is in HTML, we just update its content)
    // createMessageCards(); // Not needed as we update singleMessageCard directly
});