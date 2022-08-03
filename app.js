const cardArray = [
    // adding an object to our array
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
];

cardArray.sort(() => 0.5 - Math.random());

//1. get the empty element in the html which will become 
//the place where the grid is layed out.
const gridDisplay = document.querySelector('#grid');
//12. pick out result id of HTML
const resultDisplay = document.querySelector('#result');
//6. Create an empty array that will house the choices of
//the player, wrt the hidden card array cardArray.
//let cardsChosen = [];
// 9. also add the id of the chosen card
//let cardsChosenIds = [];
//11. see how many matches we get
const cardsWon = [];

//optional: try to make key-value pair array for cardsChosen and cardsChosenId
let cardsChosenKV = [];

//2. for each element in the array, want to create an element
//and set it's attributes and its data id.
function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        //5. add event listener to card when it's clicked 
        //before appending it!
        card.addEventListener('click', flipCard);
        //3. put it in grid (could have used appendChild too)
        gridDisplay.append(card);
    }
}

createBoard();

function checkMatch(){

    let cards = document.querySelectorAll('#grid img');
    const optionOneId = cardsChosenKV[0].id;
    const optionTwoId = cardsChosenKV[1].id;

    //personal function, will take in the new card img to set it as,
    //set as inner function since it will only be used in checkMatch
    function setCardsAttribute(cardImg){
        const s = 'images/'+cardImg+'.png';

        cards[optionOneId].setAttribute('src', s);
        cards[optionTwoId].setAttribute('src', s);
    }

    //going through error case 
    if(optionOneId === optionTwoId){
        setCardsAttribute('blank');
        alert("You clicked the same card!");
    }

    // if you found a match, make both cards become white
    if (cardsChosenKV[0].name === cardsChosenKV[1].name) {
        setCardsAttribute('white');
        //10. important to stop listening for clicks since the card is 
        //supposed to have disappeared.
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosenKV);
    }
    else {
        //go back to blank
        setCardsAttribute('blank');
        alert('Sorry, try again.');
    }

    resultDisplay.textContent = cardsWon.length;
    cardsChosenKV = [];

    if(cardsWon.length === (cards.length/2)){
        //show in result
        resultDisplay.innerHTML = 'Congratulations, you found them all!';

    }
}

//4. function to flip card when clicked

function flipCard() {

    //of the element that is clicked
    const cardId = this.getAttribute('data-id');
    //6. after creating the array, add the card's name that 
    //has been chosen into it so that we can compare it to the next
    //card. Use the name to change the src! That's the logic
    //behind retrieving the name.

    const cardsChosenKVs = {
        name: cardArray[cardId].name, 
        id: cardId, 
        img: cardArray[cardId].img
    };

    //also push to card id array
    cardsChosenKV.push(cardsChosenKVs);

    this.setAttribute('src', cardsChosenKVs.img);

    if(cardsChosenKV.length === 2){
        //7. once we have 2 cards, we need to check if we have a match
        setTimeout(checkMatch, 500);
    }
}