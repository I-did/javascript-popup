# javascript-popup
Очень простой скрипт для создания множества всплывающих окон. Подходит для многостраничных сайтов.
```html
<script src="./SimplePopup.min.js"></script>
```
```javascript
let popup = new SimplePopup({
  popup: '.popup',              // css-селектор окна
  openBtn: '.open-popup-btn',   // css-селектор открывающей кнопки
  closeBtn: '.popup-close-btn', // css-селектор закрывающей кнопки
  overlay: '.overlay'           // css-селектор блока-затемнения контента
});
```
При нажатии на открывающую кнопку, всплывающему окну и оверлею (если он указан) добавляется класс `active`.
При нажатии на закрывающую кнопку, оверлей, клавишу esc, а так же прокрутке страницы на 100px, класс `active` удаляется. Для эффекта закрытия и открытия окна нужно добавить css:
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
Имена анимаций могут быть любые.
Значения `display` в классе `active` могут быть любые.

Всплывающее окно можно вызвать в любой момент из любого места при помощи функций `.open()` и `.close()`.
```javascript
setTimeout(function() {
  popup.open();
}, 1000);
```

Есть несколько событий, к которым можно привязаться через `.addEventListener()` для совершения каких-то посторонних действий. Например, очистить поля ввода по закрытию окна:
```javascript
popup.addEventListener('beforeclose', function() {
  let fields = popup.querySelectorAll('input, textarea');

  fields.forEach(function(el) {
    el.value = '';
  });
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

Можно указать закрывающую кнопку:
```javascript
let popup = new SimplePopup({
  popup: '.popup',
  openBtn: '.open-popup-btn, .open-popup-btn-two',
  closeBtn: '.popup-close-btn',
  overlay: '.overlay'
});
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

#### События:
```javascript
popup.addEventListener('beforeopen', func);
popup.addEventListener('open', func);
popup.addEventListener('beforeclose', func);
popup.addEventListener('close', func);
```

#### Функции:
```javascript
popup.open();
popup.close();
```

#### Все настройки:
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