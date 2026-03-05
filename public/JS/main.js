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













