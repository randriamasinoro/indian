const brunch = document.querySelector('div.brunch');
const navs = document.querySelectorAll('ul.nav-bar li');
const childs = brunch.childNodes
let i = 0   
let animate = function(){
    if(i >= childs.length){
        clearInterval(interval);
    }
    childs[i].style.display='inline';
    i++;
}

// Mémoire du chat (contexte)
let chefContext = [
    { role: "system", content: "Tu es le Chef du restaurant Brunch. Tu es accueillant et expert en cuisine indienne." }
];

function toggleChefChat() {
    const container = document.getElementById('chef-chat-container');
    // Bascule la classe. Le CSS s'occupe de cacher le bouton automatiquement.
    container.classList.toggle('chef-chat-closed');
    console.log("Permutation du chat !");
}

async function askTheChef() {
    const input = document.getElementById('chef-user-input');
    const area = document.getElementById('chef-chat-messages');
    const text = input.value.trim();

    if (!text) return;

    area.innerHTML += `<div class="message user-msg">${text}</div>`;
    input.value = '';
    area.scrollTop = area.scrollHeight;

    try {
        const response = await fetch('http://158.178.192.145:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "qwen2.5:1.5b",
                messages: [{ role: "user", content: text }],
                stream: false
            })
        });
        const data = await response.json();
        area.innerHTML += `<div class="message chef-msg">${data.message.content}</div>`;
        area.scrollTop = area.scrollHeight;
    } catch (e) {
        area.innerHTML += `<div class="message chef-msg" style="color:red">Le Chef est indisponible.</div>`;
    }
}