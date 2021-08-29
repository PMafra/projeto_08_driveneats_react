import React from "react";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

export default function ConfirmationPage () {

    const allFoods = JSON.parse(localStorage.getItem(2));
    console.log(allFoods);

    const displayChoices = JSON.parse(localStorage.getItem(1));

    let userChoicesData = {};
    displayChoices.forEach(function(i) { userChoicesData[i] = (userChoicesData[i]||0) + 1;});

    let renderingChoices = Object.entries(userChoicesData);
    console.log(renderingChoices);

    let total = 0;

    const calculateTotal = () => {
        renderingChoices.forEach(choice => allFoods.forEach(food => food.name === choice[0] ? 
            total += (Number(food.price.replace(",",".")) * choice[1]) 
            : false));
        total = total.toFixed(2).replace(".",",");
    }

    calculateTotal();

    return(
        <>
            <div class={`confirmation-box appearbox`}>
                <div class="confirm font-weight-700">
                    <p>Confirme seu pedido</p>
                </div>

                <div class="choices font-weight-400">

                    {renderingChoices.map(choice => (
                        <div class="choice"><p class="food">{choice[0]}</p><p class="foodPrice">{allFoods.map(value => value.name === choice[0] ? `(${choice[1]}x) ${value.price}` : "")}</p></div>
                    ))}
                    
                    <div class="choice font-weight-700"><p>TOTAL</p><p class="totalPrice">{total}</p></div>
                </div>

                <div class="buttons">
                    <Router>
                        <Link class="button-options alright">
                            <a class="font-weight-700 link" href="" target="_blanck" onclick="message()">Tudo certo, pode pedir</a>
                        </Link>
                        <Link to="/" class="button-options cancel" target="_top">
                            <p class="font-weight-700">Cancelar</p>
                        </Link>
                    </Router>
                </div>
            </div>

            <div class={`transparent-background appearback`}></div>
        </>
    );
}