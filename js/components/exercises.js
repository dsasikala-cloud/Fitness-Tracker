
//carousel
const carousel = document.getElementById("carousel");

document.getElementById("nextBtn").onclick = () => {
  carousel.scrollBy({ left: 250, behavior: "smooth" });
};

document.getElementById("prevBtn").onclick = () => {
  carousel.scrollBy({ left: -250, behavior: "smooth" });
};






const allCards = document.querySelectorAll('.exercises__card');
const filters = document.querySelectorAll('.carousel__card');
const paginationContainer = document.querySelector('.pagination');

const cardsPerPage = 20;
let currentPage = 1;

function showPage(page, cardsArray) {
    currentPage = page;

    allCards.forEach(card => card.style.display = 'none');

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cardsArray.slice(start, end).forEach(card => {
        card.style.display = '';
    });
}

function setupPagination(cardsArray) {
    paginationContainer.innerHTML = '';

    const pageCount = Math.ceil(cardsArray.length / cardsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        if (i === 1) button.classList.add('active');

        button.addEventListener('click', () => {
            showPage(i, cardsArray);

            paginationContainer
                .querySelectorAll('button')
                .forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');
        });

        paginationContainer.appendChild(button);
    }
}

function applyFilter(category) {

    if (category === "all") {
        const allArray = [...allCards];

        paginationContainer.style.display = 'flex';
        setupPagination(allArray);
        showPage(1, allArray);

    } else {

        const filtered = [...allCards].filter(card =>
            card.dataset.category.toLowerCase() === category
        );

        paginationContainer.style.display = 'none';

        allCards.forEach(card => card.style.display = 'none');
        filtered.forEach(card => card.style.display = '');
    }
}

filters.forEach(filter => {
    filter.addEventListener('click', () => {

        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        let category = filter.dataset.category;

        if (!category || category === "") {
            category = "all";
        }

        applyFilter(category.toLowerCase());
    });
});

window.addEventListener('DOMContentLoaded', () => {
    applyFilter("all");
});




//Search
const searchInput = document.querySelector(".search-wrapper input");
const searchIcon = document.querySelector(".search-wrapper i");

searchInput.addEventListener("input", performSearch);

searchIcon.addEventListener("click", performSearch);

function performSearch() {

    const query = searchInput.value.toLowerCase();

    const filtered = [...allCards].filter(card => {
        const name = card.querySelector("h5").textContent.toLowerCase();
        return name.includes(query);
    });

    paginationContainer.style.display = "flex";
    setupPagination(filtered);
    showPage(1, filtered);
}


//Wishlist
const cards = document.querySelectorAll(".exercises__card");

cards.forEach(card => {

    const heart = document.createElement("i");
    heart.classList.add("fa-solid", "fa-heart", "heart");

    heart.addEventListener("click", () => {
        heart.classList.toggle("active");
    });

    card.appendChild(heart);

});