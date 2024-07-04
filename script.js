const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
const productContainer = document.getElementById('productContainer');
const tabs = document.querySelectorAll('.tab');

function truncateTitle(title, maxLength) {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
}

function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    displayProducts(data, tab.getAttribute('data-category'));
                });
            });
            displayProducts(data, 'Men');
        });
}

function displayProducts(data, category) {
    productContainer.innerHTML = '';
    const categoryData = data.categories.find(cat => cat.category_name === category);
    if (categoryData) {
        categoryData.category_products.forEach(product => {
            const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
            const truncatedTitle = truncateTitle(product.title, 20);
            const badgeHTML = product.badge_text ? `<div class="badge">${product.badge_text}</div>` : '';
            const productCard = `
                <div class="product-card">
                    ${badgeHTML}
                    <img src="${product.image}" id="main-image" >
                    <div class="product-detail">
                       <h3>${truncatedTitle}</h3>
                       <p>${product.vendor}</p>
                    </div>
                    <div class="product-detail">
                        <p class="price"> Rs ${product.price}.00</p> 
                        <p class="compare-price">Rs ${product.compare_at_price}.00</p>
                        <p class="discount">${discount.toFixed(2)}% Off</p>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });
    } else {
        productContainer.innerHTML = '<p>No products found.</p>';
    }
}

fetchProducts();
