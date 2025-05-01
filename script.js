// اسکرول به بخش محصولات
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// فیلتر محصولات
function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const brandFilter = document.getElementById('brandFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput);
        const matchesBrand = brandFilter ? product.brand === brandFilter : true;
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });

    renderProducts(filteredProducts);
}

// رندر کردن محصولات
function renderProducts(productsArray) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category} | ${product.brand}</p>
            <div class="price">${product.price.toLocaleString()} تومان</div>
        `;
        productList.appendChild(productCard);
    });
}

// حالت دارک مود
let isDarkMode = false;

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
}

// اطلاعات نمونه محصولات
const products = [
    {
        name: "اسپیکر بلوتوثی قابل حمل",
        category: "اسپیکر",
        brand: "شیائومی",
        price: 850000,
        image: "assets/speaker.jpg"
    },
    {
        name: "کاور ژله‌ای گوشی آیفون",
        category: "لوازم جانبی",
        brand: "اپل",
        price: 150000,
        image: "assets/cover.jpg"
    },
    {
        name: "شارژر فست سامسونگ",
        category: "لوازم جانبی",
        brand: "سامسونگ",
        price: 320000,
        image: "assets/charger.jpg"
    }
];

// اجرای اولیه
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});
