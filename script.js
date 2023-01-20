const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const list = document.querySelector(".list");
const elSelect = document.querySelector(".select");



function getUrl(inputvalue, selectvalue) {
    list.innerHTML = "";
    fetch(`http://www.omdbapi.com/?s=${inputvalue}&type=${selectvalue}&apikey=${OMDB_KEY}`) 
        .then(response => response.json())
        .then(data => {
            renderMovies(data.Search)
        })
}

function renderMovies(arr) {
    arr.forEach((element => {
        const item = document.createElement("li");
        const text = document.createElement("h3");
        const img = document.createElement("img");
        const year = document.createElement("p");
        const plot = document.createElement("p");
        const readMoreBtn = document.createElement("button");
        item.classList.add("item", "mb-3", "text-center", "text-bg-dark");
        img.classList.add("img", "mb-3");
        plot.classList.add("hidden")
        
        img.src = element.Poster;
        text.textContent = element.Title;
        year.textContent = element.Year
        plot.textContent = element.Plot
        
        readMoreBtn.textContent = "Read More"
        readMoreBtn.addEventListener("click", () => {
            plot.classList.remove("hidden")
        });
        item.append(img, text, year, readMoreBtn, plot);
        list.appendChild(item);
    }))
}

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    let elInputValue = elInput.value;
    let elSelectValue = elSelect.value;
    getUrl(elInputValue, elSelectValue )
})