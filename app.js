const cardContainer = document.querySelector('.tjänster > .card-container');
const articlesUrl = 'articles.json';
const servicesUrl = 'services.json';
let y = 1;
let serviceCards;
const serviceObjects = [];
var sliderTimer,
    timeout = false, // holder for timeout id
    delay = 1000; // delay after event is "complete" to run callback
const sliderTimerDelay = 5075;


window.addEventListener('DOMContentLoaded', ()=>{
    loadJSON(servicesUrl, listServices);
    if(window.innerWidth > 900){
      sliderTimer = setInterval(cardSlider, sliderTimerDelay);
    }

    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(onWindowResize, delay);
    });
})

function onWindowResize(){
  console.log('window resized');
  if(window.innerWidth > 900){
    sliderTimer = setInterval(cardSlider, sliderTimerDelay);
  } else {
    window.clearInterval(sliderTimer);
    serviceCards.forEach((el)=>{
      el.firstChild.classList.remove('card-overlay-hover');
    });
  }
}

function cardSlider(){

  serviceObjects.forEach((el) =>{
    if(el.id === y){
      serviceCards[y].firstChild.classList.add('card-overlay-hover');
    } else {
      serviceCards[el.id].firstChild.classList.remove('card-overlay-hover');
    }
  });

  /*for(i = 0; i < serviceCards.length; i++){
    if(i !== y){
      serviceCards[i].firstChild.classList.remove('card-overlay-hover');
    }
  }*/
  //serviceCards[y].firstChild.classList.add('card-overlay-hover');

  if( y >= serviceCards.length-1){
    y = 0;
  } else {
    y++;
  }
}

function loadJSON(fileLocation, callback){
  fetch(fileLocation).then(rep => rep.json())
  .then((data)=>{
    callback(data);
  })
}

function listServices(arr){
  arr.forEach((el) =>{
    serviceObjects.push(el);
  })

  //Ladda in valt antal object från listan
  for(i = 0; i < 4; i++){
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute("style", `background-image:url(/images/${arr[i].image});`);
    cardContainer.append(card)
    
    const overlay = document.createElement('div');
    overlay.classList.add('card-overlay');

    if(i == 0 && window.innerWidth > 900){
      overlay.classList.add('card-overlay-hover');
    }

    card.append(overlay);

    const text = document.createElement('div');
    overlay.append(text);

    const h2 = document.createElement('h2');
    h2.innerText = arr[i].name;
    text.append(h2);

    const p = document.createElement('p');
    p.innerText = arr[i].description;
    text.append(p);

    createCardBtn(overlay, "LÄS MER", arr[i].link);
  }
  serviceCards = document.querySelectorAll('.tjänster > .card-container > .card');

  serviceCards.forEach((el)=>{
    el.addEventListener('mouseover', (target) => {
      const activeOverlay = document.querySelector('.card-overlay-hover');
      if(activeOverlay !== null){
        activeOverlay.classList.remove('card-overlay-hover');
        window.clearInterval(sliderTimer);
      }
      target.currentTarget.firstChild.classList.add('card-overlay-hover');

    });
    el.addEventListener('mouseout', (target) => {
      target.currentTarget.firstChild.classList.remove('card-overlay-hover');
      if(window.innerWidth > 900){
        serviceCards[y].firstChild.classList.add('card-overlay-hover');
        sliderTimer = setInterval(cardSlider, sliderTimerDelay);
      }
    });
  })

  //Ladda in alla element med forEach
  /* arr.forEach((el)=>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute("style", `background-image:url(/images/${el.image});`);
    cardContainer.append(card)
    
    const overlay = document.createElement('div');
    overlay.classList.add('card-overlay');
    card.append(overlay);

    const h2 = document.createElement('h2');
    h2.textContent = el.description;
    overlay.append(h2);

    createCardBtn(overlay, "LÄS MER", el.link);
  })*/
}

function createCardBtn(parent, text, link){
  const div = document.createElement('div');
  div.classList.add('card-button');
  parent.append(div);

  const a = document.createElement('a');
  a.textContent = text;
  a.setAttribute("href", link);
  div.append(a);
  
  const img = document.createElement('img');
  img.setAttribute("src", "images/arrow_right_w.png");
  div.append(img);
}

function addtoPage(arr){
  arr.forEach((el)=>{
    const li = document.createElement('li');
    ul.append(li);
    const a = document.createElement('a');
    a.textContent = el.title;
    a.setAttribute("href", el.id);
    li.append(a);
  })
}