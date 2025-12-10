// API Base URL - automatically detect based on current host
const API_BASE_URL = window.location.origin + '/api';

// Load Platinum Polo Shirts from API
async function loadPlatinumPoloShirts() {
    const section = document.getElementById('platinumPoloSection');
    
    try {
        const apiUrl = `${API_BASE_URL}/products/platinum-polo`;
        console.log('Fetching products from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        const products = await response.json();
        console.log('Products loaded:', products.length);
        
        if (!section) {
            console.error('Section element not found');
            return;
        }
        
        section.innerHTML = '';
        
        if (!products || products.length === 0) {
            section.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No products found. Please seed the database first.</div>';
            return;
        }
        
        products.forEach((product, index) => {
            const productCard = createProductCard(product);
            section.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        if (section) {
            section.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #f44336;">
                    <i class="fa-solid fa-exclamation-triangle" style="font-size: 32px; margin-bottom: 15px;"></i>
                    <p style="margin-bottom: 10px;">Error loading products: ${error.message}</p>
                    <p style="font-size: 14px; color: #666;">Please make sure:</p>
                    <ul style="text-align: left; display: inline-block; font-size: 14px; color: #666;">
                        <li>Server is running on port 3000</li>
                        <li>MongoDB is connected</li>
                        <li>Database is seeded with products</li>
                    </ul>
                </div>
            `;
        }
    }
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'po';
    card.style.cursor = 'pointer';
    card.setAttribute('data-code', product.code);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-card-image">
        <div class="polos1">${product.name}</div>
        <div class="product-code">Code: ${product.code}</div>
        <div class="product-price">BDT ${product.price.toLocaleString()}</div>
    `;
    
    // Add click event to navigate to product details
    card.addEventListener('click', () => {
        window.location.href = `/product/${product.code}`;
    });
    
    return card;
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPlatinumPoloShirts();
});
