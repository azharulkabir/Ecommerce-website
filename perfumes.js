document.addEventListener('DOMContentLoaded', () => {
    const perfumesGrid = document.querySelector('.perfumes-grid');

    if (!perfumesGrid) {
        console.error('Perfumes grid container not found!');
        return;
    }

    // Clear any hardcoded content
    perfumesGrid.innerHTML = '';

    fetch('http://localhost:3000/api/perfumes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            // Display the raw JSON for debugging
            products.forEach(product => {
                const productCard = createProductCard(product);
                perfumesGrid.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching perfumes:', error);
            perfumesGrid.innerHTML = '<p>There was an error loading the perfumes. Please try again later.</p>';
        });
});

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.dataset.productId = product.code; // Use data attribute for the product ID

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">BDT ${product.price}</p>
    `;

    productCard.addEventListener('click', () => {
        // Save the product ID to localStorage
        localStorage.setItem('selectedProductId', product.code);
        // Redirect to the product details page
        window.location.href = 'product-details.html';
    });

    return productCard;
}
