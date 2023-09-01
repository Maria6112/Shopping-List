const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');

//Create addItem function 
function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate input
    if (newItem.value === '') {
        alert('Please add an Item');
        return;
    }

    // Create list item 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');//Let the button class name
    li.appendChild(button); //put the button inside list 
    
    itemList.appendChild(li); //add the list to the DOM
    
    itemInput.value = ''; //cleare the input after adding the item 
}

//Create new seperate functions for button and icon 
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark'); //Let the icon class name
    button.appendChild(icon); //put the icon inside the button 
    return button;
}

//Create Icon X
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//Create removeItem function 
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove(); //e.target(i)->parent is button -> parent is list - >remove list
    }
}

//Create clearItems
function clearItems() {
    // itemList.innerHTML = ''; //shirt version
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

// Create function for checking if there an items 
function checkUI() {
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI(); //run the function
