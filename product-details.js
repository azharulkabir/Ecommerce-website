document.addEventListener('DOMContentLoaded', () => {
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productImg = document.getElementById('product-img');
    const productDetailsList = document.getElementById('product-details-list');
    const productDescription = document.getElementById('product-description');
    const addToBagButton = document.getElementById('add-to-bag');

    const getProductCodeFromLocalStorage = () => {
        return localStorage.getItem('selectedProductId');
    };

    const fetchProductDetails = async (code) => {
        try {
            const response = await fetch(`/api/products/${code}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            const product = await response.json();
            displayProductDetails(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Handle error display on the page
            const container = document.querySelector('.container');
            container.innerHTML = `<h1>Product not found</h1><p>${error.message}</p>`;
        }
    };

    const displayProductDetails = (product) => {
        productName.textContent = product.name;
        productPrice.textContent = `BDT ${product.price.toLocaleString()}`;
        productImg.src = product.image;
        productImg.alt = product.name;

        // Clear and populate details list
        productDetailsList.innerHTML = '';
        if (product.details && product.details.length > 0) {
            product.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                productDetailsList.appendChild(li);
            });
        }

        productDescription.textContent = product.description || 'No description available.';

        addToBagButton.addEventListener('click', () => {
            addToBag(product);
        });
    };

    const addToBag = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.code === product.code);

        if (existingProductIndex > -1) {
            // If product exists, you might want to increase quantity
            // For now, we'll just notify the user
            alert('Product is already in your bag!');
        } else {
            // Add new product with a quantity of 1
            const cartProduct = {
                code: product.code,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            };
            cart.push(cartProduct);
            alert('Product added to your bag!');
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };


    const productCode = getProductCodeFromLocalStorage();
    if (productCode) {
        fetchProductDetails(productCode);
    } else {
        console.error('No product code found in URL.');
        const container = document.querySelector('.container');
        container.innerHTML = '<h1>No product code specified.</h1>';
    }
});