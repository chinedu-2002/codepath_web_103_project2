const foodContainer = document.getElementById('food-container');
const searchInput = document.getElementById('search-input');

async function fetchFoods(searchTerm = '') {
    let url = '/api/foods';
    if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function createFoodCard(food) {
    return `
        <article class="food-card">
            <img src="${food.image}" alt="${food.name}">
            <div class="food-card-content">
                <h2>${food.name}</h2>
                <span class="country-tag">${food.country}</span>
                <p>${food.description}</p>
                <p class="ingredients"><strong>Ingredients:</strong> ${food.ingredients}</p>
            </div>
        </article>
    `;
}

async function renderFoods(searchTerm = '') {
    const foods = await fetchFoods(searchTerm);

    if (foods.length === 0) {
        foodContainer.innerHTML = '<p class="no-results">No dishes found. Try a different search!</p>';
        return;
    }

    foodContainer.innerHTML = foods.map(createFoodCard).join('');
}

let debounceTimer;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        renderFoods(e.target.value.trim());
    }, 300);
});

renderFoods();
