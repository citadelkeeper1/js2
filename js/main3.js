"use strict";

let regExps = {
    // Имя содержит только буквы
    "name": /^[a-zа-яА-ЯёЁ]+$/i,
    
    // Телефон имеет вид +7(000)000-0000
    "phone": /^\+7\(\d{3}\)\d{3}-\d{4}$/,
    
    // E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
    "email": /^([a-zа-яА-ЯеЁ0-9\-_]+\.)*[a-zа-яА-ЯеЁ0-9\-_]+@([a-zа-яА-ЯеЁ0-9\-_]+\.)+[a-zа-яА-ЯеЁ]{2,5}$/,
    
    // Текст произвольный
    "text": /.*/,
};


function submitPressed(e){
    e.preventDefault();  // предотвращение отправки формы
    let inputs = document.querySelectorAll('.to_check');
    let info = document.querySelector('.info');
    
    let errors = 0;  // счётчик ошибок
    
    inputs.forEach(el => {
        if (el.value.match(regExps[el.name])) {
            el.classList.add('right');
            el.classList.remove('wrong');
        }
        else {
            el.classList.remove('right');
            el.classList.add('wrong');
            errors += 1;
        };
    });
    
    if (errors) {
        info.innerHTML = "<hr><h2>Ошибка! Проверьте введённые данные.</h2><hr>";
    } else {
        info.innerHTML = "<hr><h2>Данные приняты.</h2><hr>";
    }
}


window.addEventListener('load', () => {

    document.addEventListener("submit", submitPressed, false);  // Ловим нажате кнопки Отправить
    
});
