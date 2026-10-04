// =========================
// SHOPPING CART
// =========================

let cart = [];

const cartButton = document.querySelector("#cartButton");
const addToCartButtons = document.querySelectorAll(
    ".product-card button:not(.quick-view-btn)"
);
const cartPanel = document.querySelector("#cartPanel");
const closeCart = document.querySelector("#closeCart");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");


// =========================
// ADD PRODUCT TO CART
// =========================

document.addEventListener("click", function (event) {

    const button = event.target.closest(
        ".product-card button:not(.quick-view-btn)"
    );

    if (!button) {
        return;
    }

    const productCard =
        button.closest(".product-card");

    if (!productCard) {
        return;
    }

    const productName =
        productCard
            .querySelector("h3")
            .textContent
            .trim();

    const productPrice =
        parseFloat(
            productCard
                .querySelector("p")
                .textContent
                .replace("$", "")
                .trim()
        );

    const productImage =
        productCard
            .querySelector(".product-image")
            .src;

    const existingProduct =
        cart.find(
            (product) =>
                product.name === productName
        );

    if (existingProduct) {

        existingProduct.quantity += 1;

        if (!existingProduct.image) {
            existingProduct.image =
                productImage;
        }

    } else {

        cart.push({

            name: productName,

            price: productPrice,

            image: productImage,

            quantity: 1

        });

    }

    updateCart();

    cartPanel.classList.add("active");

});


// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total +=
            product.price *
            product.quantity;

        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";

        cartItem.innerHTML = `

            <img
                src="${product.image || ""}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    $${product.price.toFixed(2)}
                </p>

                <div class="cart-quantity">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                ×
            </button>

        `;

        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent =
        `$${total.toFixed(2)}`;

    cartButton.textContent =
        `Cart (${getCartCount()})`;

}


// =========================
// CART COUNT
// =========================

function getCartCount() {

    return cart.reduce(
        (total, product) =>
            total + product.quantity,
        0
    );

}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// =========================
// OPEN CART
// =========================

cartButton.addEventListener(
    "click",
    () => {

        cartPanel.classList.add(
            "active"
        );

    }
);


// =========================
// CLOSE CART
// =========================

closeCart.addEventListener(
    "click",
    () => {

        cartPanel.classList.remove(
            "active"
        );

    }
);


// =========================
// PRODUCT SEARCH
// =========================

const searchInput =
    document.querySelector("#searchInput");

const productSearchButton =
    document.querySelector(
        "#productSearchButton"
    );

const noResults =
    document.querySelector("#noResults");

function searchProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    const products =
        document.querySelectorAll(
            ".product-card"
        );

    let foundProducts = 0;

    products.forEach((product) => {

        const name =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();

        if (
            name.includes(searchTerm)
        ) {

            product.style.display =
                "block";

            foundProducts++;

        } else {

            product.style.display =
                "none";

        }

    });

    if (
        foundProducts === 0 &&
        searchTerm !== ""
    ) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}

productSearchButton.addEventListener(
    "click",
    searchProducts
);

searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


// =========================
// NAVBAR SEARCH
// =========================

const searchButton =
    document.querySelector(
        "#searchButton"
    );

searchButton.addEventListener(
    "click",
    () => {

        const shopSection =
            document.querySelector(
                "#shop"
            );

        shopSection.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {

            searchInput.focus();

        }, 500);

    }
);


// =========================
// CHECKOUT
// =========================

const checkoutButton =
    document.querySelector(
        ".checkout-btn"
    );

const checkoutModal =
    document.querySelector(
        "#checkoutModal"
    );

const closeCheckout =
    document.querySelector(
        "#closeCheckout"
    );

const checkoutForm =
    document.querySelector(
        "#checkoutForm"
    );

const checkoutTotal =
    document.querySelector(
        "#checkoutTotal"
    );

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }

        checkoutTotal.textContent =
            cartTotal.textContent;

        checkoutModal.classList.add(
            "active"
        );

    }
);


// =========================
// CLOSE CHECKOUT
// =========================

closeCheckout.addEventListener(
    "click",
    () => {

        checkoutModal.classList.remove(
            "active"
        );

    }
);


// =========================
// COMPLETE ORDER
// =========================

checkoutForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        cart = [];

        updateCart();

        checkoutModal.classList.remove(
            "active"
        );

        document
            .querySelector("#successModal")
            .classList.add("active");

        checkoutForm.reset();

    }
);


// =========================
// SUCCESS MODAL
// =========================

const continueShopping =
    document.querySelector(
        "#continueShopping"
    );

continueShopping.addEventListener(
    "click",
    () => {

        document
            .querySelector("#successModal")
            .classList.remove("active");

        document
            .querySelector("#shop")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// =========================
// NEWSLETTER
// =========================

const newsletterForm =
    document.querySelector(
        "#newsletterForm"
    );

newsletterForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const email =
            document.querySelector(
                "#newsletterEmail"
            ).value;

        if (email) {

            alert(
                "Thanks for subscribing to Shopora!"
            );

            newsletterForm.reset();

        }

    }
);


// =========================
// QUICK VIEW
// =========================

const quickViewModal =
    document.querySelector(
        "#quickViewModal"
    );

const quickViewClose =
    document.querySelector(
        "#quickViewClose"
    );

const quickViewName =
    document.querySelector(
        "#quickViewName"
    );

const quickViewPrice =
    document.querySelector(
        "#quickViewPrice"
    );

const quickViewDescription =
    document.querySelector(
        "#quickViewDescription"
    );

const quickViewMinus =
    document.querySelector(
        "#quickViewMinus"
    );

const quickViewPlus =
    document.querySelector(
        "#quickViewPlus"
    );

const quickViewQuantity =
    document.querySelector(
        "#quickViewQuantity"
    );

const quickViewAdd =
    document.querySelector(
        "#quickViewAdd"
    );

let quickViewSelectedQuantity = 1;

let selectedQuickViewProduct = null;


// =========================
// QUICK VIEW FUNCTION
// =========================

function quickView(
    name,
    price,
    description
) {

    quickViewName.textContent =
        name;

    quickViewPrice.textContent =
        price;

    quickViewDescription.textContent =
        description;

    quickViewSelectedQuantity = 1;

    quickViewQuantity.textContent =
        quickViewSelectedQuantity;


    // Find the correct product card
    const productCards =
        document.querySelectorAll(
            ".product-card"
        );

    let productImage = "";


    productCards.forEach((card) => {

        const cardName =
            card
                .querySelector("h3")
                .textContent
                .trim();


        if (cardName === name) {

            const image =
                card.querySelector(
                    ".product-image"
                );

            if (image) {

                productImage =
                    image.src;

            }

        }

    });


    // Save selected product
    selectedQuickViewProduct = {

        name: name,

        price: parseFloat(
            price.replace("$", "")
        ),

        image: productImage

    };


    quickViewModal.classList.add(
        "active"
    );

}


// =========================
// CLOSE QUICK VIEW
// =========================

quickViewClose.addEventListener(
    "click",
    () => {

        quickViewModal.classList.remove(
            "active"
        );

    }
);


// =========================
// QUICK VIEW MINUS
// =========================

quickViewMinus.addEventListener(
    "click",
    () => {

        if (
            quickViewSelectedQuantity >
            1
        ) {

            quickViewSelectedQuantity--;

            quickViewQuantity.textContent =
                quickViewSelectedQuantity;

        }

    }
);


// =========================
// QUICK VIEW PLUS
// =========================

quickViewPlus.addEventListener(
    "click",
    () => {

        quickViewSelectedQuantity++;

        quickViewQuantity.textContent =
            quickViewSelectedQuantity;

    }
);


// =========================
// QUICK VIEW ADD TO CART
// =========================

quickViewAdd.addEventListener(
    "click",
    () => {

        if (!selectedQuickViewProduct) {

            return;

        }


        const existingProduct =
            cart.find(
                (product) =>
                    product.name ===
                    selectedQuickViewProduct.name
            );


        if (existingProduct) {

            existingProduct.quantity +=
                quickViewSelectedQuantity;


            // FIX:
            // Add image if the existing
            // product did not have one.

            if (
                !existingProduct.image &&
                selectedQuickViewProduct.image
            ) {

                existingProduct.image =
                    selectedQuickViewProduct.image;

            }

        } else {

            cart.push({

                name:
                    selectedQuickViewProduct.name,

                price:
                    selectedQuickViewProduct.price,

                image:
                    selectedQuickViewProduct.image,

                quantity:
                    quickViewSelectedQuantity

            });

        }


        updateCart();

        quickViewModal.classList.remove(
            "active"
        );


        alert(
            `${selectedQuickViewProduct.name} added to cart!`
        );


        quickViewSelectedQuantity = 1;

        quickViewQuantity.textContent =
            quickViewSelectedQuantity;

    }
);


// =========================
// BACK TO TOP
// =========================

const backToTop =
    document.querySelector(
        "#backToTop"
    );

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 400) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


// =========================
// DARK MODE
// =========================

const themeToggle =
    document.querySelector(
        "#themeToggle"
    );

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            themeToggle.textContent =
                "☀️";

        } else {

            themeToggle.textContent =
                "🌙";

        }

    }
);


// =========================
// MOBILE MENU
// =========================

const menuToggle =
    document.querySelector(
        "#menuToggle"
    );

const navLinks =
    document.querySelector(
        ".nav-links"
    );

menuToggle.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "active"
        );

    }
);


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );

navItems.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            navLinks.classList.remove(
                "active"
            );

        }
    );

});


// =========================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// =========================

window.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            checkoutModal
        ) {

            checkoutModal.classList.remove(
                "active"
            );

        }


        if (
            event.target ===
            quickViewModal
        ) {

            quickViewModal.classList.remove(
                "active"
            );

        }


        const successModal =
            document.querySelector(
                "#successModal"
            );

        if (
            event.target ===
            successModal
        ) {

            successModal.classList.remove(
                "active"
            );

        }

    }
);