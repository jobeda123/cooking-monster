
document.getElementById('searchBtn').addEventListener("click",function(){
    const searchInput = document.getElementById("searchInput").value;
    //console.log(searchInput);
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+searchInput)
    .then(response => response.json())
    .then(data => displayItems(data))
    .catch(error => showError())
})


const showError = () =>{
    alert("Sorry, Wrong Input");
    window.location.reload();
}

const displayItems = items =>{
    //console.log(Object.keys(items.meals).length);
    const itemsDiv = document.getElementById('items');

    for (let i = 0; i < Object.keys(items.meals).length; i++) {
        const itemName = items.meals[i].strMeal;
        const itemPic  = items.meals[i].strMealThumb;
        const itemId = items.meals[i].idMeal
        //console.log(itemName);
        //console.log(itemPic);
        //console.log(items.meals[i]);

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        const itemInfo = `
            <img src="${itemPic}" onclick="displayItemDetail('${itemId}')">
            <h3 class="item-name">${itemName}</h3>
        `;
        itemDiv.innerHTML = itemInfo;
        itemsDiv.appendChild(itemDiv);
    }

    const searchInput = document.getElementById("searchInput");
    searchInput.value = " ";

}

function displayItemDetail(id){
    console.log(id);
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id)
    .then(response => response.json())
    .then(data => displayIngredient(data))
}

const displayIngredient = mealIngredient =>{
    const ingredient = mealIngredient.meals[0];
    console.log(ingredient);

    const foodDiv = document.getElementById('foodDetail');
    foodDiv.innerHTML = `
        <div class="container ingredientDetail">
            <img src="${ingredient.strMealThumb}">
            <h3 class="listItem">${ingredient.strMeal}</h3>
            <h5 class="listItem">Ingredients:</h5>
            <ul class="listItem">
                <li>${ingredient.strIngredient1}</li>
                <li>${ingredient.strIngredient2}</li>
                <li>${ingredient.strIngredient3}</li>
                <li>${ingredient.strIngredient4}</li>
                <li>${ingredient.strIngredient5}</li>
                <li>${ingredient.strIngredient6}</li>
                <li>${ingredient.strIngredient7}</li>
                <li>${ingredient.strIngredient8}</li>
                <li>${ingredient.strIngredient9}</li>
                <li>${ingredient.strIngredient10}</li>
            </ul>
        </div>
    `
}
