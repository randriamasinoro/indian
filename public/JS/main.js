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
// On attache les fonctions à "window" pour que le HTML puisse les voir 
// même après la compilation/minification.

window.toggleChefChat = function() {
    const container = document.getElementById('chef-chat-messages')?.parentElement;
    // Note : utilise l'ID du container que tu as dans ton HTML
    const chatWin = document.getElementById('chef-chat-container');
    if (chatWin) {
        chatWin.classList.toggle('chef-chat-closed');
        console.log("Chat basculé !");
    }
};

window.askTheChef = async function() {
    const input = document.getElementById('chef-user-input');
    const area = document.getElementById('chef-chat-messages');
    if (!input || !area) return;

    const text = input.value.trim();
    if (!text) return;

    area.innerHTML += `<div class="message user-msg">${text}</div>`;
    input.value = '';
    area.scrollTop = area.scrollHeight;

    try {
        const response = await fetch('https://wp-dev-elisa.duckdns.org/api/chat', {
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
        area.innerHTML += `<div class="message chef-msg" style="color:red">Le Chef est occupé.</div>`;
    }
};