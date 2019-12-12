# javascript-popup
Очень простой скрипт всплывающих окон, с помощью которого можно легко создавать много всплывающих окон на сайте, независимых друг от друга. Скрипт добавляет и удаляет указанному окну и оверлею (не обязательно) класс `active`, при нажатии на открывающую и закрывающую кнопку соответственно.

Окно также закрывается при клике по оверлею, при нажатии клавиши esc на клавиатуре и прокрутке страницы на `100px` по умолчанию (кол-во px можно регулировать).

Для анимации появления и исчезновения нужен css с указанием анимаций:
```css
.popup {
	display: none;
	animation: fadeOut .5s; /* анимация исчезновения */
}
.popup.active {
	display: block;
	animation: fadeIn .5s; /* анимация появления */
}
.overlay {
	display: none;
	animation: fadeOut .5s; /* анимация исчезновения */
}
.overlay.active {
	display: block;
	animation: fadeIn .5s; /* анимация появления */
}
```
Всплывающее окно можно вызвать в любой момент из любого места при помощи функций `.open()` и `.close()`.

Есть несколько событий, к которым можно привязаться через `.addEventListener()` для совершения каких-то посторонних действий (очистке инпутов по закрытию окна и т.д.).

Для корректной работы в IE нужно добавить полифилл и указать анимации в настройке явно, об этом ниже.

Подключеие скрипта:
```html
<script src="SimplePopup.min.js"></script>
```

Задание минимальных настроек:
```javascript
let popup = new SimplePopup({
  popup: '.popup',
  openBtn: '.open-popup-btn'
});
```

Можно указать оверлей:
```javascript
let popup = new SimplePopup({
  popup: '.popup',
  openBtn: '.open-popup-btn',
  overlay: '.overlay'
});
```

Можно указать несколько открывающих кнопок:
```javascript
let popup = new SimplePopup({
  popup: '.popup',
  openBtn: '.open-popup-btn, .open-popup-btn-two',
  overlay: '.overlay'
});
```
Если сайт многостраничный и на одной странице кнопка '.popup-open-btn', а на другой странице кнопка '.consult-popup-btn' вызывают одно и то же окно, то перечисление этих кнопок `openBtn: '.popup-open-btn, .consult-popup-btn'` не приведет к ошибке скрипта.

Можно указать закрывающую кнопку:
```javascript
let popup = new SimplePopup({
  popup: '.popup',
  openBtn: '.open-popup-btn, .open-popup-btn-two',
  closeBtn: '.popup-close-btn',
  overlay: '.overlay'
});
```

События:
```javascript
popup.addEventListener('beforeopen', func);
popup.addEventListener('open', func);
popup.addEventListener('beforeclose', func);
popup.addEventListener('close', func);
```

Функции:
```javascript
popup.open();
popup.close();
```

Для поддержки IE нужно подключить полифилл кастомных событий и указать анимации в скрипте явно:
```javascript
;(function () {
  if (typeof window.CustomEvent === "function") return false;
  
  function CustomEvent (event, params) {
    params = params || {bubbles: false, cancelable: false, detail: null};
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

let popup = new SimplePopup({
  popup: '.popup',
  openBtn: '.open-popup-btn',
  closeBtn: '.popup-close-btn',
  overlay: '.overlay',
  // for IE support
  popupAnimation: 'fadeOut .5s',    // параметры анимации, аналогично css-свойству animation
  overlayAnimation: 'fadeOut .5s',  // параметры анимации, аналогично css-свойству animation
  popupAnimationName: 'fadeOut',    // имя анимации
  overlayAnimationName: 'fadeOut',  // имя анимации
});
```

Все настройки:
```javascript
let popup = new SimplePopup({
  popup: '',                // css-селектор всплывающего окна
  openBtn: '',              // css-селектор открывающей кнопки (можно несколько кнопок)
  closeBtn: '',             // css-селектор закрывающей кнопки
  overlay: '',              // css-селектор оверлея
  // Для корректной работы а Internet explorer
  popupAnimation: '',       // параметры анимации, аналогично css-свойству animation
  overlayAnimation: '',     // параметры анимации, аналогично css-свойству animation
  popupAnimationName: '',   // имя анимации
  overlayAnimationName: '', // имя анимации
  esc: boolean,             // true или false - закрывание окна нажатием клавиши esc
  scrollThreshold: num      // число - сколько пикселей на странице нужно прокрутить, чтобы закрылось окно
});
```