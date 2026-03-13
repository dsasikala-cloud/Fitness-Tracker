const slides = document.querySelectorAll(".carousel__slide");
const dots = document.querySelectorAll(".carousel__dot");
const slidesContainer = document.querySelector(".carousel__slides");

let currentIndex = 0;

function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const navMenu = document.querySelector(".header-right");

menuBtn.addEventListener("click", () => {
    navMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("active");
});



// Optional auto-slide
//   setInterval(() => {
//     currentIndex++;
//     if (currentIndex >= slides.length) currentIndex = 0;
//     showSlide(currentIndex);
//   }, 4000);



// SignIn
const openBtn = document.getElementById("openSignin");
const modal = document.getElementById("signinModal");

openBtn.addEventListener("click", function(e){
    e.preventDefault();   // prevents page refresh
    modal.classList.add("active");
});

modal.addEventListener("click", function(e){
    if(e.target === modal){
        modal.classList.remove("active");
    }
});


// Feedback
const feedbackModal = document.getElementById("feedbackModal");
const openFeedback = document.getElementById("openFeedback");
const closeFeedback = document.getElementById("closeFeedback");

// Open modal
openFeedback.addEventListener("click", function (e) {
    e.preventDefault();
    feedbackModal.classList.add("active");
});

// Close modal
closeFeedback.addEventListener("click", function () {
    feedbackModal.classList.remove("active");
});


const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("successMessage");

// Regex patterns
const nameRegex = /^[A-Za-z\s]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const rating = document.getElementById("rating").value;
    const description = document.getElementById("description").value;
    const improvement = document.getElementById("improvement").value;

    let valid = true;

    // Clear errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("ratingError").textContent = "";

    // Name validation
    if (!nameRegex.test(name)) {
        document.getElementById("nameError").textContent =
            "Name must contain only letters (3-30 chars)";
        valid = false;
    }

    // Email validation
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent =
            "Enter valid email address";
        valid = false;
    }

    // Rating validation
    if (rating < 1 || rating > 10) {
        document.getElementById("ratingError").textContent =
            "Rating must be between 1 and 10";
        valid = false;
    }

    if (valid) {

        const feedbackData = {
            name,
            email,
            date,
            rating,
            description,
            improvement
        };

        // Save to localStorage
        sessionStorage.setItem("fitnessFeedback", JSON.stringify(feedbackData));

        // Show success message
        successMessage.style.display = "block";

        // Reset form
        form.reset();

        // Hide banner after 3 sec
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    }
});