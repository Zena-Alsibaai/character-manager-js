//const axios = require('axios');
const inputs = Array.from(document.querySelectorAll(".input"));

(() => {
  document
    .querySelector("#createSubmit")
    .addEventListener("click", async () => {
      const values = inputs.map(({ value }) => value.trim());
      console.log(values);

      if (values.some((value) => value === "")) {
        console.error("There's an empty input!");
        return;
      }

      const [name, description, shortDescription] = values;

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
            shortDescription, //: powers.split(",").map((str) => str.trim()),
          }),
        }
      );

      const freshHero = await response.json();
      console.log(freshHero);
    });
})();

(() => {
  const createWindow = document.getElementById("id01"); // on passe le modal en variable

  document
    .getElementById("createNewPerso")
    .addEventListener("click", function () {
      resetForm(); //appelle le modal
      affichageWindow(createWindow); //ouvre le modal sur la page
    });

  // document
  //   .querySelector("#createSubmit")
  //   .addEventListener("click", async () => {
  //     const nameInput = document.querySelector("#newName").value;
  //     const shortDescriptionInput = document.querySelector("#shortDescription")
  //       .value;
  //     const descriptionInput = document.querySelector("#newDescription").value;

  //     // const imgPreview = document.querySelector("#imgPreview");
  //     // let base64String = "";

  //     // if (imgPreview.src != window.location.href) {
  //     //   base64String = imgPreview.src.replace("data:", "").replace(/^.+,/, "");
  //     // } else {
  //     //   base64String = "";
  //     // }

  //     const newCharacter = new Array(
  //       nameInput,
  //       shortDescriptionInput,
  //       descriptionInput
  //       // base64String
  //     );
  //     console.log(newCharacter);
  //     // const inputs = newPerso();

  //     // console.log(inputs);
  //     const values = newCharacter.map(({ value }) => value.trim());

  //     if (values.some((value) => value === "")) {
  //       console.error("There's an empty input!");
  //       return;
  //     }

  //     const [name, description, shortDescription] = values;
  //     const response = await fetch(
  //       "https://character-database.becode.xyz/characters",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           description,
  //           shortDescription,
  //           image, //powers.split(",").map((str) => str.trim()),
  //         }),
  //       }
  //     );
  //     hiddenWindow(createWindow);
  //     // window.location.reload(false);

  //     const freshHero = await response.json();

  //     console.log(freshHero);
  //   });

  // form vide
  function resetForm() {
    document.getElementById("newName").value = "";
    document.getElementById("shortDescription").value = "";
    document.getElementById("newDescription").value = "";
    // document.getElementById("imgPreview").src = "";
    document.getElementById("newImg").value = "";
  }

  // function newPerso() {

  //   return newCharacter;
  // }

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
      console.log(img);

      clone.querySelector(".card-img-top").src = img;
      clone.querySelector(".card-title").textContent = name;
      clone.querySelector(".card-text").textContent = shortDescription;

      target.appendChild(clone);
    });
  }
  getData();
})();
