// Homework 
// ### Maybelline Online Make up Store ###

// 1. Declaring/Initializing Global Variables and Constants
const apiUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"; // Fetching Maybelline products
let products = [];
let currentPage = 1;
const productsPerPage = 8;
let cart = [];
let wishlist = [];

// 2. Selecting Elements
const elements = {
    grid: document.getElementById("product-grid"),
    categoryMenu: document.getElementById("category-menu"),
    cartItems: document.getElementById("cart-items"),
    totalPrice: document.getElementById("total-price"),
    wishlistItems: document.getElementById("wishlist-items"),
    reviewForm: document.getElementById("review-form"),
    searchBox: document.getElementById("search-box"),
    prevPageButton: document.getElementById("prev"),
    nextPageButton: document.getElementById("next"),
    loadingSpinner: document.getElementById("loading")
};

// 3. Function Definitions, Constructor Functions
// Function to show the loader spinner
const showLoading = () => {
    elements.loadingSpinner.style.display = "block"; // Show the loader
};

// Function to hide the loader spinner
const hideLoading = () => {
    elements.loadingSpinner.style.display = "none"; // Hide the loader
};

// ==> Fetching products

// Fetch products with loader functionality
const fetchProducts = async () => {
    showLoading(); // Show the loading spinner
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        products = data.map((product) => {
            return {
                id: product.id,
                name: product.name,
                description: product.description || "No description available.",
                price: product.price || "N/A",
                category: product.product_type || "Uncategorized",
                image: product.image_link || "https://via.placeholder.com/200"
            };
        });
        generateCategoryMenu(products);
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert("Failed to load products.");
    } finally {
        hideLoading(); 
    }
};

// ==> Display Functions

// Generate category filter buttons dynamically 
const generateCategoryMenu = (products) => {
    const categories = [];
    products.forEach((product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    const customOrder = ['Lipstick', 'Foundation', 'Mascara', 'Uncategorized'];
    const orderedCategories = customOrder.filter((category) => categories.includes(category))
                                         .concat(categories.filter((category) => !customOrder.includes(category)));

    orderedCategories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.onclick = () => filterByCategory(category);
        elements.categoryMenu.appendChild(button);
    });
};

// ==> Display products in the grid
const displayProducts = (productsToDisplay) => {
    elements.grid.innerHTML = "";
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = productsToDisplay.slice(start, end);

    productsToShow.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <p>Category: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
        `;
        elements.grid.appendChild(card);
    });

    // Disable/Enable pagination buttons
    elements.prevPageButton.disabled = currentPage === 1;
    elements.nextPageButton.disabled = currentPage * productsPerPage >= products.length;
};

// Filter products by category
const filterByCategory = (category) => {
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    displayProducts(filteredProducts);
};


// ==> Cart and Wishlist Functions

// Adding product to the cart
const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    updateCart();
};

// Updating the cart and calculate the total price
const updateCart = () => {
    elements.cartItems.innerHTML = "";
    let totalPrice = 0;  
    cart.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        elements.cartItems.appendChild(li);
        totalPrice += parseFloat(product.price) || 0;
    });

    if (!elements.totalPrice) {
        const newTotal = document.createElement("p");
        newTotal.id = "total-price";
        newTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
        elements.cartItems.appendChild(newTotal);
    } else {
        elements.totalPrice.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
};

// Make a purchase (clear cart and show total price)
const makePurchase = () => {
    if (cart.length > 0) {
        const totalPrice = cart.reduce((total, product) => total + (parseFloat(product.price) || 0), 0);
        alert(`Purchase successful! Total: $${totalPrice.toFixed(2)}`);
        cart = [];
        updateCart();
        displayProducts(products);
    } else {
        alert("Your cart is empty.");
    }
};

// Clear the cart
const clearCart = () => {
    cart = [];
    updateCart();
};

// Adding product to the wishlist
const addToWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!wishlist.some((item) => item.id === productId)) {
        wishlist.push(product);
        updateWishlist();
    }
};

// Update the wishlist 
const updateWishlist = () => {
    elements.wishlistItems.innerHTML = "";
    wishlist.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button onclick="removeFromWishlist(${product.id})">Remove</button>`;
        elements.wishlistItems.appendChild(li);
    });
};

// Remove product from the wishlist
const removeFromWishlist = (productId) => {
    wishlist = wishlist.filter((item) => item.id !== productId);
    updateWishlist();
};

// Clear the wishlist
const clearWishlist = () => {
    wishlist = [];
    updateWishlist();
};


// ==>Review functions
// Handle form submission
elements.reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("review-text").value;

    const review = {
        rating: parseInt(rating),
        text: reviewText
    };

    displayReview(review);

    // Clear the form
    document.getElementById("rating").value = "5";
    document.getElementById("review-text").value = "";
});

// Display a review
function displayReview(review) {
    const reviewContainer = document.getElementById("reviews-list");

    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    reviewElement.innerHTML = `
        <div class="stars">${stars}</div>
        <div class="review-text">${review.text}</div>
    `;

    reviewContainer.appendChild(reviewElement);

    updateAverageRating();
}

// Update the average rating
function updateAverageRating() {
    const reviews = document.querySelectorAll(".review");
    let totalRating = 0;
    reviews.forEach(review => {
        const stars = review.querySelector(".stars").textContent;
        const rating = stars.indexOf("★") + 1; // Count the filled stars
        totalRating += rating;
    });

    const averageRating = (totalRating / reviews.length).toFixed(1);
    document.getElementById("product-rating").textContent = "★".repeat(Math.round(averageRating)) + "☆".repeat(5 - Math.round(averageRating));
    document.getElementById("review-count").textContent = `(${reviews.length} Reviews)`;
}

//4. Handling events

// Add event listener for search
elements.searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchProducts();
    }
});

// Search products by name, description, or category
const searchProducts = () => {
    const query = elements.searchBox.value.toLowerCase();
    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    });
    displayProducts(filteredProducts);
};

// Pagination
const changePage = (direction) => {
    if (direction === "next") {
        currentPage++;
    } else {
        currentPage--;
    }
    displayProducts(products);
};
// Add event listeners to the buttons
document.getElementById('prev').addEventListener('click', () => {
    changePage('previous');
});

document.getElementById('next').addEventListener('click', () => {
    changePage('next');
});
// Fetch products when the page loads
fetchProducts();



