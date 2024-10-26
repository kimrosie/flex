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
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;" />
            ${item.name} - $${item.price} x 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" style="width: 40px; margin-left: 5px;"/>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `
		cartItemsContainer.appendChild(div)
	})

	totalPriceElement.textContent = `Итого: $${totalPrice.toFixed(2)}`
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

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCartUI)
