'use strict';

const store = {
  number: 0,
  breed:'',
  breeds: '',
};

function generateImage(url){
  return `<img class="dog-image" src="${url}" />`;
}

function generateHTML(arr){
  let html = '';
  for (let i = 0; i<store.number;i++){
    html += generateImage(arr[i]);
  }
  return html;
}

function getResponse(){
  if (store.number < 0 || store.number > 50){
    alert('Please Enter a Valid Number');
  }else if (!store.breeds.includes(store.breed)){
    alert('Please Enter a Valid Breed');
  }else{
    fetch(`https://dog.ceo/api/breed/${store.breed}/images/random/${store.number}`)
      .then(res => res.json())
      .then(function(json){
        const html = generateHTML(json.message);
        render(html);
      });
  }
  
}

function render(html){
  $('.dog-images').html(html);
}

function handleSubmit(){
  $('.dog-form').on('submit',function(e){
    e.preventDefault();
    store.number = $('.js-num-dogs').val();
    store.breed = $('#breed').val();
    console.log(store);
    getResponse();
  });
}

function getAvailableBreeds(){
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(json => store.breeds = Object.keys(json.message));
}

function main(){
  getAvailableBreeds();
  handleSubmit();
}

$(main);