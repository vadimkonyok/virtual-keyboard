import { keysRu, codes, keysEn } from "./key.js";

// создание элементов для html документов
let wrapper = document.createElement("div");
wrapper.className = "wrapper";
document.body.append(wrapper);

let textarea = document.createElement("textarea");
textarea.className = "textarea";
wrapper.append(textarea);
textarea.focus();

let keyboard = document.createElement("div");
keyboard.className = "keyboard";
wrapper.append(keyboard);

let langText = document.createElement("div");
langText.className = "lang-text";
wrapper.append(langText);
langText.innerHTML =
  "Клавиатура создана в операционной системе MacOS.<br>Для переключения языка комбинация: левыe Shift + Alt";

// создание ключей для клавиатуры
for (let i = 0; i < 5; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  keyboard.append(row);

  for (let j = 0; j < keysRu[i].length; j++) {
    let key = document.createElement("div");
    key.classList.add("key");
    key.classList.add(codes[i][j]);
    row.append(key);

    let span = document.createElement("span");
    span.classList.add("ru");
    span.classList.add("ru");
    key.append(span);
    span.innerHTML = keysRu[i][j];

    span = document.createElement("span");
    span.classList.add("en");
    span.classList.add("off");
    key.append(span);
    span.innerHTML = keysEn[i][j];
  }
}

// слушатель при нажатии клавиши клавиатуры
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  let pressedKey = document.querySelector("." + event.code);

  if (pressedKey.classList.contains("CapsLock")) {
    pressedKey.classList.toggle("pressed");
  } else {
    pressedKey.classList.add("pressed");
  }

  let pressedAll = document.querySelectorAll(".pressed");

  if (pressedAll.length > 1) {
    for (let i = 0; i < pressedAll.length; i++) {
      if (
        pressedAll[i].classList.contains("CapsLock") ||
        pressedAll[i].classList.contains("ShiftLeft") ||
        pressedAll[i].classList.contains("ShiftRight")
      ) {
        if (
          !(
            pressedKey.classList.contains("ControlLeft") ||
            pressedKey.classList.contains("AltLeft") ||
            pressedKey.classList.contains("MetaLeft") ||
            pressedKey.classList.contains("Space") ||
            pressedKey.classList.contains("ShiftLeft") ||
            pressedKey.classList.contains("CapsLock") ||
            pressedKey.classList.contains("Tab") ||
            pressedKey.classList.contains("Backspace") ||
            pressedKey.classList.contains("Delete") ||
            pressedKey.classList.contains("Enter") ||
            pressedKey.classList.contains("ControlRight") ||
            pressedKey.classList.contains("AltRight") ||
            pressedKey.classList.contains("ShiftRight")
          )
        ) {
          textarea.value += pressedKey.querySelector(".ru").innerHTML;
          return;
        }
      }
    }
  } else if (
    !(
      pressedKey.classList.contains("ControlLeft") ||
      pressedKey.classList.contains("AltLeft") ||
      pressedKey.classList.contains("MetaLeft") ||
      pressedKey.classList.contains("ShiftLeft") ||
      pressedKey.classList.contains("CapsLock") ||
      pressedKey.classList.contains("Tab") ||
      pressedKey.classList.contains("Backspace") ||
      pressedKey.classList.contains("Delete") ||
      pressedKey.classList.contains("Enter") ||
      pressedKey.classList.contains("ControlRight") ||
      pressedKey.classList.contains("AltRight") ||
      pressedKey.classList.contains("ShiftRight")
    )
  ) {
    textarea.value += pressedKey.querySelector(".ru").innerHTML.toLowerCase();
  }

  if (pressedKey.classList.contains("Backspace")) {
    let data = textarea.value;
    textarea.value = "";
    for (let i = 0; i < data.length - 1; i++) {
      textarea.value += data[i];
    }
  }

  // Смена языка
  let changeLang = 0;
  for (let i = 0; i < pressedAll.length; i++) {
    if (pressedAll[i].classList.contains("ShiftLeft")) {
      changeLang++;
    }
    if (pressedAll[i].classList.contains("AltLeft")) {
      changeLang++;
    }

    if (changeLang === 2) {
      let ru = document.querySelectorAll(".ru");
      let off = document.querySelectorAll(".off");

      ru.forEach((element) => {
        element.classList.remove("ru");
        element.classList.add("off");
      });

      off.forEach((element) => {
        element.classList.remove("off");
        element.classList.add("ru");
      });
    }
  }
});


    


// слушатель события при нажатии клавиши на клавиатуре
document.addEventListener("keyup", function (event) {
  let unpressedKey = document.querySelector("." + event.code);
  if (!unpressedKey.classList.contains("CapsLock")) {
    unpressedKey.classList.remove("pressed");
  }
});
// слушатель при нажатии клавиши при помощи мыши
document.addEventListener("mousedown", function (event) {
  let addClass = event.target.classList;

  if (addClass.contains("textarea")) {
    return;
  }
  if (addClass.contains("CapsLock")) {
    addClass.toggle("pressed-mouse");
  }

  if (addClass.contains("key")) {
    addClass.add("pressed-mouse");

    if ( addClass.contains("Backspace")) {
        let data = textarea.value;
        textarea.value = "";
        for (let i = 0; i < data.length - 1; i++) {
          textarea.value += data[i];
        }
      }

    if (
      !(
        addClass.contains("ControlLeft") ||
        addClass.contains("AltLeft") ||
        addClass.contains("MetaLeft") ||
        addClass.contains("ShiftLeft") ||
        addClass.contains("CapsLock") ||
        addClass.contains("Tab") ||
        addClass.contains("Backspace") ||
        addClass.contains("Delete") ||
        addClass.contains("Enter") ||
        addClass.contains("ControlRight") ||
        addClass.contains("AltRight") ||
        addClass.contains("ShiftRight")
      )
    ) {
      textarea.value += event.target.firstChild.innerHTML.toLowerCase();
    }
  } else {
    if (addClass.contains("ru")) {
      if (event.target.closest("div").classList.contains("CapsLock")) {
        event.target.closest("div").classList.toggle("pressed-mouse");
      } else {
        event.target.closest("div").classList.add("pressed-mouse");

        if (
          !(
            event.target.closest("div").classList.contains("ControlLeft") ||
            event.target.closest("div").classList.contains("AltLeft") ||
            event.target.closest("div").classList.contains("MetaLeft") ||
            event.target.closest("div").classList.contains("ShiftLeft") ||
            event.target.closest("div").classList.contains("CapsLock") ||
            event.target.closest("div").classList.contains("Tab") ||
            event.target.closest("div").classList.contains("Backspace") ||
            event.target.closest("div").classList.contains("Delete") ||
            event.target.closest("div").classList.contains("Enter") ||
            event.target.closest("div").classList.contains("ControlRight") ||
            event.target.closest("div").classList.contains("AltRight") ||
            event.target.closest("div").classList.contains("ShiftRight")
          )
        ) {
          textarea.value += event.target.innerHTML.toLowerCase();
        }
        
        
      }
    }
  }
});

document.addEventListener("mouseup", function (event) {
  if (!event.target.classList.contains("CapsLock")) {
    if (event.target.classList.contains("ru")) {
      event.target.closest("div").classList.remove("pressed-mouse");
    } else {
      event.target.classList.remove("pressed-mouse");
    }
  }
});
