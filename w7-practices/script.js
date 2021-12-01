/*
sima függvény: function functionName(paraméter) {
    paraméter === "string argument"
}
    - meghívása: functionName("string argument")
    - felhasználása: deklarálás előtt is elérjük


    const argument = "argument saved in a variable"
anonim függvény változóban: const functionName = function (paraméter) {
    paraméter === "argument saved in a variable"
}
    - meghívása: functionName(argument)
    - felhasználása: nem férünk hozzá az előző sorokban (hoysting)


arrow function változóban: const functionName = (paraméter1, paraméter2) => {
    paraméter1 === 1
    paraméter2 === 2
}
    - meghívása: functionName(1, 2)
    - felhasználása: nem férünk hozzá az előző sorokban (hoysting)
*/

//component létrehozása
const inputElement = (type, name, title) => {
    return `
        <div>
            <label>${title}</label>
            <input type='${type}' name='${name}'>
        </div>
    `
};

const selectElement = (type, name, title, options) => {
    let optionsToSelect = "";
    for (const option of options) {
        optionsToSelect += `
            <option>
                ${option}
            </option>`;
    }

    return `
        <div>
            <label>${title}</label>
            <${type} name='${name}'>
                ${optionsToSelect}
            </${type}>
        </div>
    `
};
/*
const formElement = "<form> </form>" + inputElement("text", "firstName")+inputElement("file", "profilePicture")+inputElement("e-mail", "personalEmail")+...
*/
const formElement = `
    <form id="form">
        ${inputElement("text", "firstName", "Keresztneved")}
        ${inputElement("file", "profilePicture", "Profilképed")}
        ${inputElement("e-mail", "personalEmail", "E-mail címed")}
        ${inputElement("checkbox", "newsLetter", "Feliratkozás a hírlevélre")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket")}
        ${selectElement("select", "where", "Hol hallottál rólunk?", ["interneten", "ismerőstől", "egyéb"])}
        <button>OK</button>
    </form>
`;
//formnál automatikus esemény submit, a böngésző egy requestet küld az url-ben a beírt adatokkal (query parameters) + újra is tölti az oldalt --- biztonsági kockázat, mert a böngésző historyban ez eltárolódik

const formSubmit = (event) => {
    event.preventDefault();
    const eT = event.target
    console.log(eT);
    eT.classList.add("submitted");
    let selectValue = eT.querySelector(`select[name="where"]`).value;
    console.log(selectValue);
}

const inputUpdate = (event) => {
    document.getElementById("inputValue").innerHTML = event.target.value;
    //esemény esetén a .targettel kapjuk meg magát az eseményt, ez mindig egy objektumosított html elemmel tér vissza
    //csak akkor fusson le ha az aktuális input mezőnek van egy olyan name attribútuma h firstName: getAttribute
    //eseménykezelés rákfenéje amikor vmi más az esemény, pl. az esemény máshol hvódik meg, pl. optionoök esetében magán a selectboxon (select elemen) hívódik meg az input esemény
    console.log(event.target.closest("#form"));
    //closest() -- eb egy queryselectorhoz hasoinlo szelektort irhatunk és elkezd a parenteken felfelé futni, amíg el nem éri az adott tulajdonságút  --- .parentElement helyett egy jobb megoldás
}

function loadEvent () {
    const root = document.getElementById("root");
    root.insertAdjacentHTML('afterbegin', formElement);
    root.insertAdjacentHTML('afterbegin', `
        <div id="inputValue"></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);
    
    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputUpdate);
        //focus <--> blur
        //change
        //input -- üzembiztos, ez biztos mindig minden esetben, eszközön meghívódik
    
    }
}

window.addEventListener("load", loadEvent);