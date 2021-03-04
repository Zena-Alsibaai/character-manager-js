(() => {
  document
    .getElementById("createSubmit")
    .addEventListener("click", async () => {
      const name = document.querySelector("#newName").value;
      const shortDescription = document.querySelector("#shortDescription")
        .value;
      const description = document.querySelector("#newDescription").value;

      let entrees = [];
      let cles = ["name", "shortDescription", "description"];
      let values = [];
      values.push(name, shortDescription, description);

      for (let i = 0; i < cles.length; i++) {
        entrees.push([cles[i], values[i]]);
      }
      const newCard = object.fromEntries(entrees);
      console.log(newCard);

      const response = await fetch(
        `https://character-database.becode.xyz/characters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            shortDescription,
          }),
        }
      );
      const freshHero = await response.json();
      console.log(freshHero);
    });

  const createWindow = document.getElementById("id01"); // on passe le modal en variable

  document
    .getElementById("createNewPerso")
    .addEventListener("click", function () {
      resetForm(); //appelle le modal
      affichageWindow(createWindow); //ouvre le modal sur la page
    });

  document.getElementById("cancel").addEventListener("click", function () {
    hiddenWindow(createWindow);
  });

  // form vide
  function resetForm() {
    document.getElementById("newName").value = "";
    document.getElementById("shortDescription").value = "";
    document.getElementById("newDescription").value = "";
    // document.getElementById("imgPreview").src = "";
    document.getElementById("newImg").value = "";
  }

  function affichageWindow(window) {
    window.style.display = "block";
  }

  function hiddenWindow(window) {
    window.style.display = "none";
  }

  // afficher chaque hero dans sa carte
  const template = document.querySelector("#template");
  const target = document.querySelector("#target");

  async function getData() {
    const response = await fetch(
      "https://character-database.becode.xyz/characters"
    );
    const heroes = await response.json(); //transforme le format de l'url en format json pour pouvoir le lire

    console.log(heroes);

    heroes.forEach(({ name, shortDescription, image }) => {
      const clone = template.cloneNode(true).content;
      const img = "data:image/jpeg;base64," + image;

      clone.querySelector(".card-img-top").src = img;
      clone.querySelector(".card-title").textContent = name;
      clone.querySelector(".card-text").textContent = shortDescription;

      target.appendChild(clone);
    });
  }
  getData();
})();
