document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const popUpMessage = document.getElementById('popUpMessage'); // Get the new pop-up element
    const complimentContent = document.getElementById('complimentContent');
    const complimentCardsContainer = document.getElementById('complimentCards');
    const closeContentBtn = document.getElementById('closeContentBtn');

    // Array of your compliments/sweet messages
    const compliments = [
        {
            title: "Your Smile is My Sunshine",
            message: "Setiap kali kamu tersenyum, rasanya dunia ini jadi lebih cerah. Itu sihir, ya?"
        },
        {
            title: "Lost in Your Eyes",
            message: "Ada apa ya di matamu? Kok bisa bikin aku lupa tujuan awal pas lagi ngobrol sama kamu."
        },
        {
            title: "Melody of Your Voice",
            message: "Suaramu itu kayak lagu favorit yang nggak pernah bosen didengerin, candu!"
        },
        {
            title: "Your Laugh, My Favorite Sound",
            message: "Tawamu itu lho, bikin aku ikut senyum lebar. Beneran, itu suara paling manis."
        },
        {
            title: "The Comfort of Your Presence",
            message: "Deket kamu, rasanya nyaman banget. Kayak nemu tempat pulang padahal belum pergi ke mana-mana."
        },
        {
            title: "Simply Irresistible",
            message: "Gimana caranya kamu bisa se-menarik ini? Aku jadi penasaran terus sama kamu."
        },
        {
            title: "You're a True Gem",
            message: "Jujur, kamu itu langka. Baiknya, ramahnya, semuanya deh. Bikin pengen kenal lebih jauh."
        },
        {
            title: "My Day's Highlight",
            message: "Rasanya hariku tuh belum lengkap kalau belum ada interaksi sama kamu."
        },
        {
            title: "A Little Thought For You",
            message: "Barusan kepikiran kamu. Semoga apa pun yang lagi kamu kerjain lancar ya, semangat!"
        },
        {
            title: "Curiosity About You",
            message: "Setiap hari ada aja hal baru dari kamu yang bikin aku makin pengen tahu lebih banyak."
        }
    ];

    // Function to create and append compliment cards
    function createComplimentCards() {
        compliments.forEach(compliment => {
            const card = document.createElement('div');
            card.classList.add('compliment-card');

            const title = document.createElement('h3');
            title.textContent = compliment.title;
            card.appendChild(title);

            const message = document.createElement('p');
            message.textContent = compliment.message;
            card.appendChild(message);

            complimentCardsContainer.appendChild(card);
        });
    }

    // Event listener for opening the gift box
    giftBox.addEventListener('click', () => {
        // Step 1: Start box opening animation and message pop-up
        giftBox.classList.add('opening');
        // No need to set popUpMessage.classList.remove('hidden') here directly
        // The CSS animation will handle its appearance with a delay

        // Step 2: After box fades out and message pops up, hide box, and prepare for main content
        setTimeout(() => {
            giftBox.classList.add('hidden'); // Completely hide the box
            // popUpMessage will fade out in the next step
        }, 1200); // Wait for initial box opening + some buffer

        // Step 3: After pop-up message shows, hide it and display main content
        setTimeout(() => {
            popUpMessage.style.opacity = '0'; // Start fading out the pop-up message
            popUpMessage.style.transform = 'scale(0.8)'; // Shrink it slightly as it fades

            // Now display the main compliment content
            complimentContent.classList.remove('hidden');
            complimentContent.classList.add('visible'); // Trigger transition for main content
        }, 3000); // Adjust this delay (e.g., 1.2s box open + 0.8s pop-up + 1s for viewing)

    });

    // Event listener for closing the content
    closeContentBtn.addEventListener('click', () => {
        complimentContent.classList.remove('visible'); // Start fading out main content
        
        // Hide pop-up message if it somehow lingered (unlikely but good for reset)
        popUpMessage.style.opacity = '0'; 
        popUpMessage.style.transform = 'scale(0.5)';
        popUpMessage.style.top = '80%'; // Reset position

        setTimeout(() => {
            complimentContent.classList.add('hidden'); // Hide main content
            giftBox.classList.remove('hidden'); // Make box visible again
            giftBox.classList.remove('opening'); // Reset box animation state
            // Ensure pop-up message is hidden until next open
            popUpMessage.style.display = 'flex'; // Reset display for next interaction (hidden by opacity & scale)
        }, 1200); // Match this timeout to CSS transition duration for closing main content
    });

    // Initial load of compliment cards
    createComplimentCards();
});