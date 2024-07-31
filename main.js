document.getElementById('user-input').addEventListener('keyup', function(event){
    if(event.key==='Enter'){
        searchRecipe()
    }
});
function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('show');
}
// Function to add recipe
// Function to add recipe
function addRecipe(event) {
    event.preventDefault(); // Prevent form submission

    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('ingredients-input').value;
    const instructions = document.getElementId('instructions-input').value;
    const imageInput = document.getElementById('image-upload');
    const imageFile = imageInput.files[0];

    // Read the image file and convert it to a base64 string
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;

        // Create a recipe object
        const recipe = {
            title,
            ingredients,
            instructions,
            imageData
        };

        // Get the existing recipes from local storage or initialize an empty array
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        // Add the new recipe to the array
        recipes.push(recipe);

        // Save the updated recipes array back to local storage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Show the confirmation message
        document.querySelector('.form').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
    };

    reader.readAsDataURL(imageFile);
}

// Function to add another recipe
function addAnotherRecipe() {
    // Hide the confirmation message and show the form again
    document.querySelector('.form').style.display = 'block';
    document.getElementById('confirmation').style.display = 'none';

    // Clear the form fields
    document.getElementById('recipe-title').value = '';
    document.getElementById('ingredients-input').value = '';
    document.getElementById('instructions-input').value = '';
    document.getElementById('image-upload').value = '';
}

// Function to load recipes from local storage and display them
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const list = document.querySelector('.list');
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = recipe.title;
        card.innerHTML = `
            <img src="${recipe.imageData}" alt="${recipe.title} image">
            <h3>${recipe.title}</h3>
            <h4>Description:</h4>
            <p>${recipe.instructions}</p>
            <button class="delete-button" onclick="deleteRecipe(event, '${recipe.title}')">Delete</button>
        `;
        list.appendChild(card);
    });
}

// Function to delete a recipe
function deleteRecipe(event, title) {
    event.preventDefault();

    // Remove the card from the DOM
    const card = event.target.closest('.card');
    card.remove();

    // Remove the recipe from local storage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes = recipes.filter(recipe => recipe.title !== title);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Call loadRecipes function when the page loads
document.addEventListener('DOMContentLoaded', loadRecipes);
