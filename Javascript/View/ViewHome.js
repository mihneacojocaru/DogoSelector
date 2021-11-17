import ControllerDogApi from "../Controller/objectController.js";

export default class ViewHome {
  constructor() {
    this.root = document.getElementById("root");
    this.root.innerHTML += this.printHeader();
    this.root.innerHTML += this.printMain();
    this.controller = new ControllerDogApi();

    
    //this.addSelectItems();
    this.allBreeds();
    //this.setNewDog();
    this.select = document.querySelector("select");
    this.select.addEventListener("change",this.handleChange);
    this.anotherOne();

  }

  printHeader = () => {
    return `<header>
                    <h1>Dogo Selector</h1>
                </header>`;
  };

  printMain = () => {
    return `
        <main>
        <div class="container">
            <h3>Select a breed</h3>
            <select></select>
            <div class="pic-container">
                <img src="https://images.dog.ceo/breeds/affenpinscher/n02110627_1559.jpg" alt="dog chilling on the porch">
            </div>  
            <button id="btn">Another one!</button>            
        </div>
    </main>
        `;
  };

  addSelectItems = lista => {
    let select = document.querySelector("select");
    
    for(const e in lista){
      select.innerHTML += `<option value="${e}">${e}</option>`;
    }
  }

  allBreeds = async () => {
    try {
        const link = "https://dog.ceo/api/breeds/list/all";

    let data = await fetch(link);

    let d = await data.json();

    d = await d.message;

    this.addSelectItems(d);

    } catch (error) {
        console.log(error)
    }
  }

  setNewDog = async () => {
    try {
      const select = document.querySelector("select");

      select.addEventListener("change", () => {
        this.getNewDog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange=(e)=>{


    e.preventDefault();

    let obj=e.target;


    let url=`https://dog.ceo/api/breed/${obj.value}/images/random`;


    fetch(url)
    .then(data=>data.json())
    .then(data=>data.message)
    .then(this.setFirstDog);


  }

  getNewDog = async () => {
        const select = document.querySelector("select");
        const link = await fetch(`https://dog.ceo/api/breed/${select.value}/images/random`);
        let data = await link.json();
        let d = await data.message;

        let picContainer = document.querySelector(".pic-container");
        picContainer.innerHTML = `<img src="${d}" alt="dog chilling">`;
  }

  setFirstDog = (url) => {
    const picContainer = document.querySelector(".pic-container");

    picContainer.innerHTML = `<img src="${url}" alt="dog chilling">`;
  }

  anotherOne = () => {
    let btn = document.querySelector("#btn");
    btn.addEventListener("click",this.getNewDog);
  }

}
