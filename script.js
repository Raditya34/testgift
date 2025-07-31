document.addEventListener('DOMContentLoaded', () => {
    const whisperBox = document.getElementById('whisperBox'); // Renamed from giftBox
    const popUpMessage = document.getElementById('popUpMessage');
    const encouragementContent = document.getElementById('encouragementContent'); // Renamed from complimentContent
    const encouragementCardsContainer = document.getElementById('encouragementCards'); // Renamed from complimentCards
    const closeContentBtn = document.getElementById('closeContentBtn');

    // Array of empowering and healing messages
    // UBAH INI dengan pesan yang paling tulus dan relevan untuknya!
    const messages = [
        {
            title: "Untuk Hati yang Hebat",
            message: "Mungkin ada rasa sakit yang pernah datang, tapi ingat, itu tidak pernah bisa mengurangi betapa berharganya dirimu."
        },
        {
            title: "Kekuatanmu Mengagumkan",
            message: "Aku tahu kamu kuat, mungkin lebih dari yang kamu kira. Setiap luka membuatmu semakin tangguh."
        },
        {
            title: "Perasaanmu Valid",
            message: "Tidak apa-apa untuk merasa apa yang kamu rasakan. Semua emosi itu valid, dan kamu berhak merasakannya."
        },
        {
            title: "Cahaya Dalam Dirimu",
            message: "Ada cahaya istimewa dalam dirimu yang tidak bisa dipadamkan oleh apapun. Biarkan itu bersinar lagi."
        },
        {
            title: "Kamu Tidak Sendiri",
            message: "Di setiap langkahmu, di setiap proses pemulihan, ingatlah bahwa kamu tidak sendirian. Ada yang peduli."
        },
        {
            title: "Waktu Akan Menyembuhkan",
            message: "Percayalah, waktu punya caranya sendiri untuk menyembuhkan. Pelan-pelan saja, tidak perlu terburu-buru."
        },
        {
            title: "Pelajaran Berharga",
            message: "Setiap pengalaman, bahkan yang menyakitkan, membentukmu menjadi pribadi yang lebih bijaksana dan luar biasa."
        },
        {
            title: "Dirimu Berharga",
            message: "Nilaimu tidak ditentukan oleh apa yang terjadi padamu. Kamu istimewa, utuh, dan sangat berharga."
        },
        {
            title: "Fokus pada Dirimu",
            message: "Ini saatnya kamu fokus pada kebahagiaanmu sendiri. Kamu berhak mendapatkan semua hal baik di dunia ini."
        },
        {
            title: "Masa Depan Menanti",
            message: "Mungkin sulit melihatnya sekarang, tapi ada banyak kebahagiaan dan petualangan baru yang menanti di depan."
        },
        {
            title: "Aku Percaya Padamu",
            message: "Aku percaya kamu akan melewati ini. Kamu punya kekuatan untuk bangkit lebih tinggi."
        },
        {
            title: "Sedikit Tentangmu...",
            message: "Aku melihat ketulusanmu, caramu peduli, dan itu adalah hal yang sangat langka dan indah."
        },
        {
            title: "Senyummu Itu...",
            message: "Melihat senyummu kembali, meskipun hanya sedikit, sudah cukup untuk mencerahkan hari-hariku."
        }
    ];

    // Function to create and append message cards
    function createMessageCards() {
        messages.forEach(msg => {
            const card = document.createElement('div');
            card.classList.add('encouragement-card');

            const title = document.createElement('h3');
            title.textContent = msg.title;
            card.appendChild(title);

            const message = document.createElement('p');
            message.textContent = msg.message;
            card.appendChild(message);

            encouragementCardsContainer.appendChild(card);
        });
    }

    // Event listener for opening the box
    whisperBox.addEventListener('click', () => {
        // Step 1: Start box opening animation and message pop-up
        whisperBox.classList.add('opening');
       
        // Step 2: After box fades out and message pops up, hide box, and prepare for main content
        setTimeout(() => {
            whisperBox.classList.add('hidden'); // Completely hide the box
        }, 1200); // Wait for initial box opening + some buffer

        // Step 3: After pop-up message shows, hide it and display main content
        setTimeout(() => {
            popUpMessage.style.opacity = '0'; // Start fading out the pop-up message
            popUpMessage.style.transform = 'scale(0.8)'; // Shrink it slightly as it fades

            // Now display the main encouragement content
            encouragementContent.classList.remove('hidden');
            encouragementContent.classList.add('visible'); // Trigger transition for main content
        }, 3000); // Adjust this delay (e.g., 1.2s box open + 0.8s pop-up + 1s for viewing)

    });

    // Event listener for closing the content
    closeContentBtn.addEventListener('click', () => {
        encouragementContent.classList.remove('visible'); // Start fading out main content
        
        // Hide pop-up message if it somehow lingered (unlikely but good for reset)
        popUpMessage.style.opacity = '0'; 
        popUpMessage.style.transform = 'scale(0.5)';
        popUpMessage.style.top = '85%'; // Reset position to deeper inside box

        setTimeout(() => {
            encouragementContent.classList.add('hidden'); // Hide main content
            whisperBox.classList.remove('hidden'); // Make box visible again
            whisperBox.classList.remove('opening'); // Reset box animation state
            // Ensure pop-up message is hidden until next open
            popUpMessage.style.display = 'flex'; // Reset display for next interaction (hidden by opacity & scale)
        }, 1200); // Match this timeout to CSS transition duration for closing main content
    });

    // Initial load of messages
    createMessageCards();
});