



(() => {
    // your code here
    const template = document.querySelector('#template')
    const target = document.querySelector("#target")

    async function getData() {


        const response = await fetch("https://character-database.becode.xyz/characters")
        const heroes = await response.json() //transforme le format de l'url en format json pour pouvoir le lire

        console.log(heroes)
        //console.log(heroes[0].image)

        heroes.forEach(({ name, shortDescription, image }) => {
            const clone = template.cloneNode(true).content;
           const img = "data:image/jpeg;base64,"+image
           console.log(img)
            

            clone.querySelector(".card-img-top").src = img
            clone.querySelector(".card-title").textContent = name
            clone.querySelector(".card-text").textContent = shortDescription


            target.appendChild(clone)
        })
    }
    getData()

    document.getElementById("newPerso").addEventListener("click", async() => {

    })

})()
