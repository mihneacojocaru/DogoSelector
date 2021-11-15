import ControllerDogApi from "../Controller/objectController.js";

export default class ViewHome{

    constructor(){
        this.root = document.getElementById("root");
        this.root.innerHTML += this.printHeader();
        this.root.innerHTML += this.printMain();
        this.controller = new ControllerDogApi();
        this.addSelectItem();
        this.getSelectValue();

    }

    printHeader = () => {
        return `<header>
                    <h1>Dogo Selector</h1>
                </header>`;
    }

    printMain = () => {
        return `
        <main>
        <div class="container">
            <h3>Select a breed</h3>
            <select></select>
            <div class="pic-container">
                <img src="https://images.dog.ceo/breeds/affenpinscher/n02110627_1559.jpg" alt="dog chilling on the porch">
            </div>              
        </div>
    </main>
        `;
    } 

    addSelectItem = () => {
        let select = document.querySelector("select");

        setTimeout(()=>{
            this.controller.list.forEach( e=> {
                select.innerHTML += `<option value="${e}">${e}</option>`;
            })
        },100)

    }

    getSelectValue = async () => {
        const select = document.querySelector("select");
        const picContainer = document.querySelector(".pic-container");
        
        const link = await fetch(`https://dog.ceo/api/breed/affenpinscher/images/random`);
        let data = await link.json();
        let d = await data.message;
        picContainer.innerHTML = `<img src="${d}" alt="dog chilling">`;
        
        select.addEventListener("change", async () => {
            const link = await fetch(`https://dog.ceo/api/breed/${select.value}/images/random`);
            let data = await link.json();
            let d = await data.message;

            let picContainer = document.querySelector(".pic-container");
            picContainer.innerHTML = `<img src="${d}" alt="dog chilling">`;
        })
        
    }

}