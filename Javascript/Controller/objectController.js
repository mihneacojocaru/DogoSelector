class ControllerDogApi{

    constructor(){
        this.allBreeds();
        this.list = [];
    }

    allBreeds = async () => {
        const link = "https://dog.ceo/api/breeds/list/all";

        let data = await fetch(link);

        let d = await data.json();

        d = await d.message;

        for(const e in d){
            this.list.push(e);
        }
    } 



}

export default ControllerDogApi;