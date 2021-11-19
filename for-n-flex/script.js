const generateArray = function (amount){
    
    let returnArray = [];
          
    amount = parseInt(amount);

    if (!Number.isNaN(amount)) { //Number.isNaN(amount) !==true
        for (let i = 0; i < amount; i++) {
            returnArray.push(`${toWriteZerosBefore(amount, i)}`);
        }
    }
    else {
        returnArray.push("error");
    }
    return returnArray;
}

    function toWriteZerosBefore(amount, i) {
        let zerosAdded = i;
        
        while (`${amount}`.length > `${zerosAdded}`.length) {
            zerosAdded = `0${zerosAdded}`;
        };
        return zerosAdded;             
    };
    
window.addEventListener("load", function() {
    const root = document.getElementById("root");
    const list = generateArray(1000);
    if (list[0] !== "error") {
        for (const item of list) {
        root.insertAdjacentHTML("beforeend", `<div>${item}</div>`);       
        }
    }
});