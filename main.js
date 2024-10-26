function initMap() {
	const map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 55.751244, lng: 37.618423 },
		zoom: 8,
	})
}

window.onload = initMap

// =======================//
// Dark & Light toggle

document.querySelector('.day-night input').addEventListener('change', () => {
	document.querySelector('body').classList.add('toggle')
	setTimeout(() => {
		document.querySelector('body').classList.toggle('light')

		setTimeout(
			() => document.querySelector('body').classList.remove('toggle'),
			10
		)
	}, 5)
})
// ====================================

// Инициализируем первый элемент как активный при загрузке
switchTab(0)

// ===================
function toggleAnswer(questionElement) {
	const answer = questionElement.nextElementSibling // Получаем ответ
	const icon = questionElement.querySelector('[data-icon]')
	const border = questionElement.closest('.border1') // Находим родительский элемент border1
	const heading = questionElement.querySelector('h2') // Находим h2 внутри элемента вопроса

	// Проверяем, есть ли ответ и иконка
	if (!answer || !icon) return

	// Переключаем класс 'show' для видимости ответа
	answer.classList.toggle('show')

	// Проверяем, есть ли класс 'show' у ответа
	if (answer.classList.contains('show')) {
		icon.querySelector('img').src = './img/close.svg' // Изменяем изображение на 'x'
		questionElement.classList.add('active') // Добавляем класс для изменения стилей
		answer.classList.add('active-answer') // Добавляем класс к ответу
		border.classList.add('active-background') // Добавляем класс для изменения фона
		heading.classList.add('highlight') // Добавляем класс для изменения цвета h2
	} else {
		icon.querySelector('img').src = './img/plus (1).svg' // Возвращаем изображение на '+'
		questionElement.classList.remove('active') // Удаляем класс для изменения стилей
		answer.classList.remove('active-answer') // Удаляем класс у ответа
		border.classList.remove('active-background') // Удаляем класс для возвращения к исходному фону
		heading.classList.remove('highlight') // Удаляем класс для возвращения к исходному цвету h2
	}
}
// ====================store===============================
document.querySelector('#header')
