# javascript-popup
Очень простой скрипт для создания множества всплывающих окон. Подходит для многостраничных сайтов.
```html
<script src="./SimplePopup.min.js"></script>
```
```javascript
let popup = new SimplePopup({
  popup: '.popup',              // css-селектор окна (обязательно)
  openBtn: '.open-popup-btn',   // css-селектор открывающей кнопки
  closeBtn: '.popup-close-btn', // css-селектор закрывающей кнопки
  overlay: '.overlay'           // css-селектор блока-затемнения контента
});
```
При нажатии на открывающую кнопку, всплывающему окну и оверлею (если он указан) добавляется класс `active`.
При нажатии на закрывающую кнопку, оверлей, клавишу esc, а так же прокрутке страницы на 100px, класс `active` удаляется.
Для плавного эффекта закрытия и открытия окна не нужен дополнительный css. По умолчанию срабатывает плавный переход с  `opacity`. Можно регулировать некоторые параметры перехода (`property`, `from`, `to`, `duration`, `timingFunction` `delay`):
```javascript
transition: {
  popup: {
    property: 'opacity',
    from: 0,
    to: 1,
    timigFunction: 'ease',
    delay: 0,
    duration: 0.5
  },
  overlay: {
    property: 'opacity',
    from: 0,
    to: 1,
    timigFunction: 'ease',
    delay: 0,
    duration: 0.5
  }
}
```

Также можно установить анимации:
```javascript
animation: {
  popup: {
    open: {
      name: 'zoomIn',
      timigFunction: 'ease-in-out',
      duration: 0.5,
      delay: 0
    },
    close: {
      name: 'zoomOut',
      delay: 0,
      timigFunction: 'ease-in-out',
      duration: 0.5
    }
  }
}
```

Можно использовать значения по отдельности:
```javascript
// Установим задежрку плавного перехода в 1 секунду
transition: {
  popup: {
    delay: 1
  }
}
```

Всплывающее окно можно вызвать в любой момент из любого места при помощи функций `.openPopup()` и `.closePopup()`.
```javascript
setTimeout(function() {
  popup.openPopup();
}, 1000);
```

Есть несколько событий, к которым можно привязаться через `.addEventListener()` для совершения каких-то посторонних действий. Например, очистить поля ввода по закрытию окна:
```javascript
popup.addEventListener('popupbeforeclose', function() {
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

Можно узнать какая именно кнопка вызвала окно:
```javascript
popup.addEventListener('popupbeforeopen', function() {
  console.log(this.caller);
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

Для поддержки событий в IE нужно подключить полифилл кастомных событий:
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
  overlay: '.overlay'
});
```

#### События:
```javascript
popup.addEventListener('popupinit', func);
popup.addEventListener('popupbeforeopen', func);
popup.addEventListener('popupopen', func);
popup.addEventListener('popupbeforeclose', func);
popup.addEventListener('popupclose', func);

popup.addEventListener('overlayopen', func);
popup.addEventListener('overlayclose', func);
```

#### Функции:
```javascript
popup.openPopup();               // открывает окно
popup.closePopup();              // закрывает окноа
popup.openBtn.refresh();        // обновляет открывающие кнокпи (например, если на страницу добавились новые)
popup.openBtn.add('selector');  // добавляет кнопки вручную
```

#### Все настройки:
```javascript
let popup = new SimplePopup({
  popup: '',                // css-селектор всплывающего окна (обязательный)
  openBtn: '',              // css-селектор открывающей кнопки (можно несколько кнопок)
  closeBtn: '',             // css-селектор закрывающей кнопки
  overlay: '',              // css-селектор оверлея
  escToClose: true,         // true или false - закрывание окна нажатием клавиши esc
  scrollThreshold: 100,     // число - сколько пикселей на странице нужно прокрутить, чтобы закрылось окно
  animation: {              // по умолчанию пустая строка
    popup: {
      open: {
        name: 'animationName',
        timigFunction: 'timigFunction',
        duration: 0.5,
        delay: 0
      },
      close: {
        name: 'animationName',
        delay: 0,
        timigFunction: 'timigFunction',
        duration: 0.5
      }
    }
  },
  transition: {
    popup: {
      property: 'opacity',
      from: 0,
      to: 1,
      timigFunction: 'ease',
      delay: 0,
      duration: 0.5
    },
    overlay: {
      property: 'opacity',
      from: 0,
      to: 1,
      timigFunction: 'ease',
      delay: 0,
      duration: 0.5
    }
  }
});
```