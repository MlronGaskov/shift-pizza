import { useState } from 'react';
import { PizzaData } from '../schemes/pizza-data-interface';
import { SelectedPizzaDetails } from '../schemes/selected-pizza-details-interface';


export interface usePopUpInterface {
    isPopUpOpen: boolean,
    openPopUp: () => void,
    closePopUp: () => void,

    selectedPizzaData: PizzaData | null,
    selectPizza: (e: PizzaData, d?: SelectedPizzaDetails) => void,

    pizzaDetails: SelectedPizzaDetails | null,
    setPizzaDetails: (e: SelectedPizzaDetails) => void,

    patchPizzaDetails: {
        setSize: (name: string) => void,
        setDough: (name: string) => void,
        addTopping: (name: string) => void,
        deleteTopping: (name: string) => void,
    }
}


const usePopUp = (pizzaData: PizzaData | null = null, selectedPizzaDetails: SelectedPizzaDetails | null = null): usePopUpInterface => {		
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);					 												
    const [selectedPizza, selectPizza] = useState<PizzaData | null>(pizzaData);
    const [pizzaDetails, setPizzaDetails] = useState<SelectedPizzaDetails | null>(selectedPizzaDetails);

    const initPizzaDetails = (pizza: PizzaData) => {
        let toppings: Array<{name: string; cost: number; img: string;}> = [];

        const initialPizzaDetails: SelectedPizzaDetails = {
            "id": pizza!.id,
            "name": pizza!.name,
            "description": pizza!.description,
            "doughs": pizza!.doughs[0]!,
            "size": pizza!.sizes[0]!,
            "toppings": toppings
        }
        setPizzaDetails(initialPizzaDetails);
    }

    const addTopping = (name: string) => { 
        if (!selectedPizza || !pizzaDetails) return; 
     
        const updatedDetails = { ...pizzaDetails }; 
        const topping = selectedPizza.toppings.find(t => t.name === name); 
        if (topping) { 
          updatedDetails.toppings.push(topping); 
          setPizzaDetails(updatedDetails); 
        } 
    }; 
     
    const deleteTopping = (name: string) => { 
        if (!pizzaDetails) return; 
     
        const updatedDetails = { ...pizzaDetails }; 
        updatedDetails.toppings = updatedDetails.toppings.filter(t => t.name !== name); 
        setPizzaDetails(updatedDetails); 
    }; 
     
    const setDough = (name: string) => { 
        if (!selectedPizza || !pizzaDetails) return; 
     
        const updatedDetails = { ...pizzaDetails }; 
        const dough = selectedPizza.doughs.find(d => d.name === name); 
        if (dough) { 
          updatedDetails.doughs = dough; 
          setPizzaDetails(updatedDetails); 
        } 
    }; 
     
    const setSize = (name: string) => { 
        if (!selectedPizza || !pizzaDetails) return; 
     
        const updatedDetails = { ...pizzaDetails }; 
        const size = selectedPizza.sizes.find(s => s.name === name); 
        if (size) { 
          updatedDetails.size = size; 
          setPizzaDetails(updatedDetails); 
        } 
    };


    return {
        "isPopUpOpen": isPopUpOpen,
        "openPopUp": () => setIsPopUpOpen(true),
        "closePopUp": () => setIsPopUpOpen(false),

        "selectedPizzaData": selectedPizza,
        "selectPizza": (e: PizzaData, d?: SelectedPizzaDetails) => {selectPizza(e); setIsPopUpOpen(true); d == null ? initPizzaDetails(e): setPizzaDetails(d)},

        "pizzaDetails": pizzaDetails,
        "setPizzaDetails": setPizzaDetails,

        "patchPizzaDetails": {
            "setSize": setSize,
            "setDough": setDough,
            "addTopping": addTopping,
            "deleteTopping": deleteTopping,
        },
    };								 
}

export default usePopUp; 			