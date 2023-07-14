import { style } from "./rescueTbilisi.css"
import geoIcon from "./images/georgianlanguage.jpg"
import engIcon from "./images/englishllanguage.jpg"
import { GamePlayScene } from "./GamePlayScene";
import { useRef, useState } from "react";
function languageChosen(id){
    if (id == "georgianLanguageIcon") {
        
        document.getElementById(id).style.border = "thick solid #0000FF"; 
        document.getElementById("englishLanguageIcon").style.border = "none"; 
        document.getElementById("englishLanguageIcon").style.border = "none"; 
        document.getElementById("txtlanguagechoose").innerText="აირჩიეთ ენა"; 
        document.getElementById("continueBtn").innerText="გაგრძელება";

    }
    else{
        document.getElementById(id).style.border = "thick solid #0000FF"; 
        document.getElementById("georgianLanguageIcon").style.border = "none"; 
        document.getElementById("txtlanguagechoose").innerText="Choose Language";
        document.getElementById("continueBtn").innerText="Continue";
    }
    
}
export const RescueTbilisi =()=>{
    const asd = useRef(null)
    const [dsa,setDsa] = useState(false)
    return <div>
        {dsa && <GamePlayScene /> }
        <h1 >Choose Language</h1>
        <img src={geoIcon} ref={asd} onClick={()=>{languageChosen("georgianLanguageIcon")}}/>
        <img src={engIcon}  onClick={()=>{languageChosen("englishLanguageIcon")}}/>
         
        <button id ="continueBtn" onClick={()=>{setDsa(true);}}>Continue</button>
</div>}

