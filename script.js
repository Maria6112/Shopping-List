const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

//Create addItem function 
function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate input
    if (newItem === '') {
        alert('Please add an Item');
        return;
    }

    //check for edit-mode
    if (isEditMode) {
        //grab the item we want to edit and let him 'edit-mode'
        const itemToEdit = itemList.querySelector('.edit-mode'); 
        //remove the item from storage (just the text and not all 'li' item)
        removeItemFromStorage(itemToEdit.textContent);
        //remove the class of edit-mode
        itemToEdit.classList.remove('edit-mode');
        //remove from storage
        itemToEdit.remove();
        //set the edit mode to false
        isEditMode = false;
    } else { //adding else for check if the item already exist
        if (checkIfItemExists(newItem)) {
            alert('That Item Exsist!');
            return;
        }
    }

    //create item DOM element
    addItemToDOM(newItem);

    //add item to local storage
    addItemtoStorage(newItem);
    
    checkUI();

    itemInput.value = ''; //cleare the input after adding the item 
}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);//add the list to the DOM
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

//add item to local storage
function addItemtoStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    //take the new item and add it to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//create function that will get out items from storage
function getItemsFromStorage() {
    //cut from addItemToStorage. create variable . represent the array in local storage

    let itemsFromStorage;
    //check if there is something in there
    if (localStorage.getItem('items')===null) {
        itemsFromStorage = [];
    } else { //if there is something, add it to storage. we need to make it array with JSON
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    //return the items from storage
    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) { 
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

//create function that will no aloud to add item with same name that exists

function checkIfItemExists (item) {
    const itemsFromStorage = getItemsFromStorage();

    //checking if already exist. but there is a short version since 'itemsFromStorage.includes(item)' returning true
    // if (itemsFromStorage.includes(item)) {
    //     return true;
    // } else {
    //     return false;
    // }
    //short version:
    return itemsFromStorage.includes(item);
}


//create function that can edit items (it will add the new item after we pree update so we need do make another function)
function setItemToEdit(item) {
    isEditMode = true;

    //make all items go back to normal mode
    itemList
        .querySelectorAll('li')
        .forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');//add class 
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update item'; //change the button to update
    formBtn.style.backgroundColor = '#228B22';//change the color of button
    itemInput.value = item.textContent;//input the item we need to change back to 'Enter Item'
}

//Create removeItem function 
function removeItem(item) {
    if (confirm('Are you sure?')) {
        //remove item from DOM
        item.remove();

        //remove item from storage
        removeItemFromStorage(item.textContent);
        checkUI();
    }

}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    
    //re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//Create clearItems
function clearItems() {
    // itemList.innerHTML = ''; //shirt version
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from local storage
    localStorage.removeItem('items');

    checkUI();
}

//Create a function for filter items
function filterItems(e) {
    const items = itemList.querySelectorAll('li'); 
    const text = e.target.value.toLowerCase(); //need to set text and lowercase all input
    
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) !=-1) { //if text matching to itemName then is goind to be true, if not index going to be -1
            item.style.display = 'flex'; //in css style this item is flex
        } else {
            item.style.display = 'none';
        }
    });
}

// Create function for checking if there an items 
//Need to comment the list in html
function checkUI() {

    itemInput.value = '';

    const items = itemList.querySelectorAll('li'); //need to be defined inside the function and not outside

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';

    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    //after we added the update button, and updated the item, we need to get back the Add Item button back. and set the edit mode back to false.
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}


//Initialize app (make one initilize in global Scope)
function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI(); //run the function here and in other places, so after every function he will run again

}

init();


