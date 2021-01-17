"use strict";

let container = document.getElementById('container');

let replaceAll = /\'/g;
let replaceQuotes = /(?!\b\'\b)\'/g;

let textToRead = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`


function clickOnButton(event) {
    let id = event.target.id;
    if (id == 'clean') {
        container.innerHTML = textToRead;
    }
    else if (id == 'replace_all') {
        container.innerHTML = textToRead.replace(replaceAll, '"');
    }
    else if (id == 'replace_quotes') {
        container.innerHTML = textToRead.replace(replaceQuotes, '"');
    }
}


window.addEventListener('load', () => {

    let buttons = document.querySelectorAll('button');
    
    container.innerHTML = textToRead;
    
    buttons.forEach(el => el.addEventListener('click', clickOnButton));
    
});
