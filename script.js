// ============================================
// ILLIYEEN E-commerce Website JavaScript
// ============================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    initSearch();
    initCart();
    initSmoothScroll();
    initScrollToTop();
    initMobileMenu();
    initProductHover();
    initNavbarScroll();
    initLazyLoading();
    updateCartCounter();
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchSelect = document.querySelector('.search-select');

    // Search on icon click
    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }

    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchSelect = document.querySelector('.search-select');
    const query = searchInput.value.trim();
    const category = searchSelect.value;

    if (query) {
        // Scroll to products section
        const shopSection = document.querySelector('.shop-section');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Highlight search term in product names (simple implementation)
        highlightSearchResults(query);
        
        // Show search notification
        showNotification(`Searching for "${query}" in ${category}...`);
    } else {
        showNotification('Please enter a search term', 'error');
    }
}

function highlightSearchResults(query) {
    const productLinks = document.querySelectorAll('.shop-section a, .shop-section2 a, .shop-sectionstra a');
    const searchTerm = query.toLowerCase();
    
    productLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            link.style.backgroundColor = '#ffeb3b';
            link.style.padding = '5px';
            link.style.borderRadius = '3px';
            
            // Scroll to first match
            setTimeout(() => {
                link.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });
}

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================
let cart = JSON.parse(localStorage.getItem('illiyeenCart')) || [];

function initCart() {
    const cartIcon = document.querySelector('.nav-card');
    
    // Make cart clickable
    if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.addEventListener('click', showCart);
    }

    // Add to cart functionality for designated product buttons/links
    // Skip elements using the .collection-link class because those are meant for navigation (e.g., Abaya & Waistcoat)
    const productButtons = document.querySelectorAll('.shop-sectionplus a:not(.collection-link), .new-shop a:not(.collection-link)');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.textContent.trim().replace('>>', '').trim();
            addToCart(productName);
        });
    });

    // Ensure Abaya collection tiles navigate to the Abaya page
    const abayaLinks = document.querySelectorAll('.shop-sectionplus a.collection-link');
    abayaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal navigation; fallback if href missing
            if (!this.getAttribute('href')) {
                e.preventDefault();
                window.location.href = 'Abaya.html';
            }
        });
    });

    // Make waistcoat collection tiles and buttons navigate to Waistcoat page
    const waistcoatLinks = document.querySelectorAll('.new-shop a.collection-link, .new-shop2 .collection-link');
    waistcoatLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                window.location.href = 'Waistcoat.html';
            }
        });
    });

    const waistcoatButtons = document.querySelectorAll('.new-shop2 button');
    waistcoatButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'Waistcoat.html';
        });
    });
    
    // Ensure panjabi links navigate to panjabi.html (don't prevent default)
    const panjabiLinks = document.querySelectorAll('.shop-section a.panjabi-link, .shop-section2 a.panjabi-link');
    panjabiLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow navigation - don't prevent default
            if (!this.href || this.href === '#') {
                e.preventDefault();
                window.location.href = 'panjabi.html';
            }
        });
    });
    
    // Ensure polo links navigate to polo.html (don't prevent default)
    const poloLinks = document.querySelectorAll('.shirt-section a.polo-link');
    poloLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow navigation - don't prevent default
            if (!this.href || this.href === '#') {
                e.preventDefault();
                window.location.href = 'polo.html';
            }
        });
    });
    
    // Make dress images clickable to navigate to dress page (like perfumes)
    const dressImages = document.querySelectorAll('.shop-sectionstra .box1-imge, .shop-sectionstra .box2-imge, .shop-sectionstra .box3-imge, .shop-sectionstra .box4-imge');
    dressImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            window.location.href = 'dress.html';
        });
    });
    
    // Ensure dress links navigate to dress.html (don't prevent default)
    const dressLinks = document.querySelectorAll('.shop-sectionstra a');
    dressLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow navigation - don't prevent default
            if (!this.href || this.href === '#') {
                e.preventDefault();
                window.location.href = 'dress.html';
            }
        });
    });
    
    // Make watch image clickable to navigate to watches page
    const watchImage = document.querySelector('.box1-imw');
    if (watchImage) {
        watchImage.style.cursor = 'pointer';
        watchImage.addEventListener('click', function() {
            window.location.href = 'watches_details.html';
        });
    }
    
    // Ensure watches link works properly (don't prevent default)
    const watchesLink = document.querySelector('.watch a');
    if (watchesLink) {
        watchesLink.addEventListener('click', function(e) {
            // Allow navigation - don't prevent default
            // Just ensure it navigates
            if (!this.href || this.href === '#') {
                e.preventDefault();
                window.location.href = 'watches_details.html';
            }
        });
    }
    
    // Make perfumes image clickable to navigate to perfumes page
    const perfumesImage = document.querySelector('.box1-ig');
    if (perfumesImage) {
        perfumesImage.style.cursor = 'pointer';
        perfumesImage.addEventListener('click', function() {
            window.location.href = 'perfumes.html';
        });
    }
    
    // Ensure perfumes link works properly (don't prevent default)
    const perfumesLink = document.querySelector('.new-shop3 a');
    if (perfumesLink) {
        perfumesLink.addEventListener('click', function(e) {
            // Allow navigation - don't prevent default
            // Just ensure it navigates
            if (!this.href || this.href === '#') {
                e.preventDefault();
                window.location.href = 'perfumes.html';
            }
        });
    }

    // Make jeans buttons and images navigate to jeans page
    const jeansButtons = document.querySelectorAll('.jeans button');
    jeansButtons.forEach(button => {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function() {
            window.location.href = 'jeans.html';
        });
    });

    const jeansImages = document.querySelectorAll('.box1-imj, .box2-imj, .box3-imj, .box4-imj');
    jeansImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            window.location.href = 'jeans.html';
        });
    });

    // Make luxury business shirt links and images navigate to shirt page
    const businessShirtLinks = document.querySelectorAll('.new-shop4 a');
    businessShirtLinks.forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', function(e) {
            if (!this.href || this.getAttribute('href') === '#') {
                e.preventDefault();
                window.location.href = 'shirt.html';
            }
        });
    });

    const businessShirtImages = document.querySelectorAll('.box1-imag, .box2-imag');
    businessShirtImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            window.location.href = 'shirt.html';
        });
    });

    // Make sandals buttons and images navigate to sandals page
    const sandalsButtons = document.querySelectorAll('.shows button');
    sandalsButtons.forEach(button => {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function() {
            window.location.href = 'sandals.html';
        });
    });

    const sandalsImages = document.querySelectorAll('.box1-ims, .box2-ims');
    sandalsImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            window.location.href = 'sandals.html';
        });
    });
}

function addToCart(productName) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            quantity: 1,
            price: generatePrice(productName)
        });
    }
    
    saveCart();
    updateCartCounter();
    showNotification(`${productName} added to cart!`, 'success');
}

function generatePrice(productName) {
    // Generate a realistic price based on product type
    const basePrices = {
        'panjabi': 3500,
        'luxury': 4500,
        'platinum': 5500,
        'sahara': 3000,
        'abaya': 4000,
        'shirt': 2500,
        'watch': 15000,
        'jeans': 2000,
        'sandals': 3000,
        'perfume': 2500
    };
    
    const name = productName.toLowerCase();
    for (const [key, price] of Object.entries(basePrices)) {
        if (name.includes(key)) {
            return price + Math.floor(Math.random() * 1000);
        }
    }
    
    return 3000 + Math.floor(Math.random() * 2000);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCounter();
    showCart();
}

function saveCart() {
    localStorage.setItem('illiyeenCart', JSON.stringify(cart));
}

function updateCartCounter() {
    const cartIcon = document.querySelector('.nav-card');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Remove existing counter if any
    const existingCounter = document.querySelector('.cart-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    if (totalItems > 0 && cartIcon) {
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = totalItems;
        counter.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff4444;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        `;
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(counter);
    }
}

function showCart() {
    const cartHTML = `
        <div class="cart-modal" id="cartModal">
            <div class="cart-content">
                <div class="cart-header">
                    <h2>Shopping Cart</h2>
                    <button class="close-cart" onclick="closeCart()">&times;</button>
                </div>
                <div class="cart-items">
                    ${cart.length === 0 ? '<p style="text-align: center; padding: 20px;">Your cart is empty</p>' : ''}
                    ${cart.map((item, index) => `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>৳${item.price.toLocaleString()} x ${item.quantity}</p>
                            </div>
                            <div class="cart-item-actions">
                                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ${cart.length > 0 ? `
                    <div class="cart-footer">
                        <div class="cart-total">
                            <strong>Total: ৳${calculateTotal().toLocaleString()}</strong>
                        </div>
                        <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('cartModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', cartHTML);
    
    // Add styles if not already added
    if (!document.getElementById('cartModalStyles')) {
        addCartModalStyles();
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.remove();
    }
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    showNotification('Redirecting to checkout...', 'success');
    // In a real application, this would redirect to checkout page
    setTimeout(() => {
        alert(`Total Amount: ৳${calculateTotal().toLocaleString()}\n\nThank you for shopping with ILLIYEEN!`);
    }, 500);
}

function addCartModalStyles() {
    const style = document.createElement('style');
    style.id = 'cartModalStyles';
    style.textContent = `
        .cart-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .cart-content {
            background: white;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: slideUp 0.3s;
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: rgb(67, 130, 185);
            color: white;
        }
        .cart-header h2 {
            margin: 0;
        }
        .close-cart {
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
        }
        .cart-items {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        .cart-item-info h4 {
            margin: 0 0 5px 0;
        }
        .cart-item-info p {
            margin: 0;
            color: #666;
        }
        .remove-btn {
            background-color: #ff4444;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        .remove-btn:hover {
            background-color: #cc0000;
        }
        .cart-footer {
            padding: 20px;
            border-top: 2px solid #eee;
        }
        .cart-total {
            margin-bottom: 15px;
            font-size: 20px;
        }
        .checkout-btn {
            width: 100%;
            padding: 15px;
            background-color: rgb(67, 130, 185);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            font-weight: bold;
        }
        .checkout-btn:hover {
            background-color: rgb(45, 109, 165);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: rgb(67, 130, 185);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        transition: all 0.3s;
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = 'rgb(45, 109, 165)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = 'rgb(67, 130, 185)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const panelAll = document.querySelector('.panel_all');
    const panelOps = document.querySelector('.panel-ops');
    
    if (panelAll && panelOps) {
        panelAll.style.cursor = 'pointer';
        panelAll.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                panelOps.style.display = panelOps.style.display === 'none' ? 'flex' : 'none';
                panelOps.style.flexDirection = 'column';
                panelOps.style.position = 'absolute';
                panelOps.style.backgroundColor = 'rgb(45, 109, 165)';
                panelOps.style.width = '100%';
                panelOps.style.padding = '20px';
                panelOps.style.zIndex = '100';
            }
        });
    }
}

// ============================================
// PRODUCT HOVER EFFECTS
// ============================================
function initProductHover() {
    const productBoxes = document.querySelectorAll('.box');
    
    productBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const panel = document.querySelector('.panel');
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (navbar) navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            if (panel) panel.style.position = 'sticky';
            if (panel) panel.style.top = '120px';
            if (panel) panel.style.zIndex = '100';
        } else {
            if (navbar) navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            if (navbar) navbar.style.transform = 'translateY(-100%)';
            if (navbar) navbar.style.transition = 'transform 0.3s';
        } else {
            if (navbar) navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('div[class*="box"][class*="image"], div[class*="box"][class*="im"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        imageObserver.observe(img);
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : 'rgb(67, 130, 185)'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s;
        font-weight: bold;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    if (!document.getElementById('notificationStyles')) {
        style.id = 'notificationStyles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// CATEGORY FILTERING
// ============================================
function filterByCategory(category) {
    const sections = document.querySelectorAll('.shop-section, .shop-section2, .shop-sectionstra, .shop-sectionplus, .new-shop, .new-shop2, .new-shop3, .new-shop4, .shirt-section, .watch, .jeans, .shows');
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (category === 'all' || text.includes(category.toLowerCase())) {
            section.style.display = '';
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            section.style.display = 'none';
        }
    });
    
    showNotification(`Showing ${category} products`);
}

// Make category links functional
document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.panel-ops p');
    categoryLinks.forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', function() {
            const category = this.textContent.trim();
            filterByCategory(category);
        });
    });
});

// ============================================
// FORM VALIDATION (for future contact forms)
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// HERO SECTION BUTTONS
// ============================================
function scrollToSection(sectionClass) {
    const section = document.querySelector('.' + sectionClass);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Browsing products...', 'success');
    }
}

// Make hero buttons available globally
window.scrollToSection = scrollToSection;

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', function() {
    // Reset mobile menu on resize
    const panelOps = document.querySelector('.panel-ops');
    if (window.innerWidth > 768 && panelOps) {
        panelOps.style.display = '';
        panelOps.style.flexDirection = '';
        panelOps.style.position = '';
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cartModal');
    if (cartModal && e.target === cartModal) {
        closeCart();
    }
});

