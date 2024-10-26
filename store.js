document.addEventListener('DOMContentLoaded', () => {
	const addToCartButton = document.getElementById('add-to-cart')
	const cartCount = document.getElementById('cart-count')
	const quantityInput = document.getElementById('quantity')

	let totalItems = 0 // Переменная для хранения общего количества товаров

	// Проверка, существуют ли элементы
	if (addToCartButton && cartCount && quantityInput) {
		addToCartButton.addEventListener('click', () => {
			const quantity = parseInt(quantityInput.value) || 0 // Получаем количество из инпута
			totalItems += quantity // Обновляем общее количество

			cartCount.textContent = totalItems // Обновляем текст счетчика
			cartCount.style.display = totalItems > 0 ? 'block' : 'none' // Показываем или скрываем счетчик
		})
	} else {
		console.error('Один или несколько элементов не найдены в документе')
	}
})

// .......
let cart = JSON.parse(localStorage.getItem('cart')) || []

function updateCartUI() {
	const cartItemsContainer = document.getElementById('cart-items')
	const totalPriceElement = document.getElementById('total-price')

	cartItemsContainer.innerHTML = ''
	let totalPrice = 0

	cart.forEach(item => {
		totalPrice += item.price * item.quantity
		const div = document.createElement('div')
		div.className = 'cart-item'
		div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; margin-right: 10px;" />
            ${item.name} - $${item.price} x 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" style="width: 70px; margin-left: 960px;"/>
            <button onclick="removeFromCart('${item.name}')">Delete</button>
        `
		cartItemsContainer.appendChild(div)
	})

	totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`
}

function updateQuantity(name, newQuantity) {
	const item = cart.find(item => item.name === name)
	if (item) {
		item.quantity = parseInt(newQuantity)
		updateCartUI()
		localStorage.setItem('cart', JSON.stringify(cart))
	}
}

function removeFromCart(name) {
	cart = cart.filter(item => item.name !== name)
	updateCartUI()
	localStorage.setItem('cart', JSON.stringify(cart))
}

document.addEventListener('DOMContentLoaded', () => {
	updateCartUI()
	console.log('Cart UI updated') // Для отладки
})

document.addEventListener('DOMContentLoaded', function () {
	const addToCartButton = document.getElementById('add-to-cart')
	if (addToCartButton) {
		addToCartButton.addEventListener('click', function () {
			const quantity = parseInt(document.getElementById('quantity').value)
			const productName = document.querySelector('.prTextOp h1').innerText
			const productPrice = parseFloat(
				document.querySelector('.prTextOp h3').innerText.replace('$', '')
			)
			const productImage = document.querySelector('.prCimg img').src

			let cart = JSON.parse(localStorage.getItem('cart')) || []

			const existingItem = cart.find(item => item.name === productName)
			if (existingItem) {
				existingItem.quantity += quantity
			} else {
				cart.push({
					name: productName,
					price: productPrice,
					quantity: quantity,
					image: productImage,
				})
			}

			localStorage.setItem('cart', JSON.stringify(cart))
			console.log(localStorage.getItem('cart')) // Проверка содержимого localStorage
			updateCartCount() // Обновляем количество товаров в иконке корзины
		})
	}
})
