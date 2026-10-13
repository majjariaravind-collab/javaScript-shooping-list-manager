const input = document.querySelector('.input');
const result = document.querySelector('.result');
const addButton = document.querySelector(".add");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let editIndex = null;

function displayList(){
  let htmlText = '';
  cart.forEach((text,index)=>{
    htmlText +=`
    <div>
    ${text}
    <button onclick="editItem(${index})">Edit</button>
    <button onclick="indexNumber(${index})">Delete</button>
    </div>
    `;
  });
  result.innerHTML = htmlText;
  saveStorage();
}
function saveStorage(){
  localStorage.setItem("cart",JSON.stringify(cart));
}
function editItem(index){
  input.value=cart[index];
  editIndex=index;
  addButton.textContent='update';
}
function indexNumber(index){
  cart.splice(index,1);
  if(editIndex === index){
    editIndex = null;
    input.value='';
    addButton.textContent='Add';
  }else if(editIndex !== null && index < editIndex){
    editIndex--;
  }
  displayList();
}

addButton.addEventListener('click',()=>{
  if(input.value.trim()===''){
    return;
  }

  if(editIndex === null){
    cart.push(input.value);
  }else{
    cart[editIndex]=input.value;
    editIndex=null;
    addButton.textContent='Add';
  }
  input.value='';
  displayList();

});
displayList();