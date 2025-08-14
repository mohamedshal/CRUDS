let productName = document.getElementById("product-name");
let productPrice = document.getElementById("price");
let productCategory = document.getElementById("category");
let productDesc = document.getElementById("description");
let searchInput = document.getElementById("search");
let submitBtn = document.getElementById("submit-btn");
let productList = document.getElementById("products-list");
let alerts = Array.from(document.querySelectorAll(".alert"));
let proName = false;
let proCount = false;
let proCat = false;
let iterator = 0;
let products = [];
if (localStorage.getItem("products") != null) {
	products = JSON.parse(localStorage.getItem("products"));
	showProducts();
}
function addProduct() {
	alerts.map(alert => {
		alert.classList.add("d-none");
	});
	if (validateProduct() == true) {
		if (submitBtn.innerHTML == "Add Product") {
			let Product = {
				name: productName.value,
				price: productPrice.value,
				category: productCategory.value,
				description: productDesc.value,
			};
			products.push(Product);
			localStorage.setItem("products", JSON.stringify(products));
			clearForm();
			showProducts();
		} else {
			let Product = {
				name: productName.value,
				price: productPrice.value,
				category: productCategory.value,
				description: productDesc.value,
			};
			products[iterator] = Product;
			localStorage.setItem("products", JSON.stringify(products));
			clearForm();
			showProducts();
			submitBtn.innerHTML = "Add Product";
		}
	} else {
		if (proName == false) {
			alerts.map(alert => {
				alert.classList.add("d-none");
			});
			alerts[0].classList.remove("d-none");
		} else if (proCount == false) {
			alerts.map(alert => {
				alert.classList.add("d-none");
			});
			alerts[1].classList.remove("d-none");
		} else if (proCat == false) {
			alerts.map(alert => {
				alert.classList.add("d-none");
			});
			alerts[2].classList.remove("d-none");
		}
	}
}
function clearForm() {
	productName.value = "";
	productPrice.value = null;
	productCategory.value = "";
	productDesc.value = "";
}
function showProducts() {
	productList.innerHTML = "";
	// should make it empty first
	let content = ``;
	products.map((product, index) => {
		content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                    <td><button onclick="updateProduct(${index})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button></td>
                </tr>
        `;
	});
	productList.innerHTML = content;
}
function deleteProduct(id) {
	products.splice(id, 1);
	localStorage.setItem("products", JSON.stringify(products));
	showProducts();
}
function search() {
	const searchValue = searchInput.value.toLowerCase();
	let newProducts = [];
	products.map(product => {
		if (product.name.toLowerCase().includes(searchValue)) {
			newProducts.push(product);
		}
	});
	productList.innerHTML = "";
	// should make it empty first
	let content = ``;
	newProducts.map((product, index) => {
		content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                    <td><button onclick="updateProduct(${index})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button></td>
                </tr>
        `;
	});
	productList.innerHTML = content;
}
function updateProduct(id) {
	products.map((product, index) => {
		if (index == id) {
			productName.value = product.name;
			productPrice.value = product.price;
			productCategory.value = product.category;
			productDesc.value = product.description;
			submitBtn.innerHTML = "Update";
			iterator = index;
		}
	});
}

submitBtn.addEventListener("click", addProduct);
searchInput.addEventListener("keyup", search);

function validateProduct() {
	let nameValue = productName.value.trim();
	let priceValue = productPrice.value.trim();
	let categoryValue = productCategory.value.trim();

	let regex = /^[A-Z][A-Za-z0-9 ]{2,}$/;
	let regexCat = /^[A-Za-z ]{3,20}$/;

	if (regex.test(nameValue)) {
		proName = true;
		if (priceValue > 0 && priceValue < 10000) {
			proCount = true;
			if (regexCat.test(categoryValue)) {
				proCat = true;
				return true;
			} else {
				proCat = false;
			}
		} else {
			proCount = false;
		}
	} else {
		proName = false;
		return false;
	}
}
