import { useState, FC, useEffect } from "react";
import "../header.scss";
import GeFlag from "../../../Images/Flags/ge.png";
import UsFlag from "../../../Images/Flags/us.png";
import i18n from "../../../Translation/translatorScript";

    const Geo = () =>{
        return(
            <>
            <img src={GeFlag} alt="Georgian" />
          <span>GEO</span>
          <span> ^ </span>
          </>
        )
    }
    const Eng = () =>{
        return(
            <>
            <img src={UsFlag} alt="English" />
          <span>ENG</span>
          <span> ^ </span>
          </>
        )
    }

const Lanuage = () => {


  return (
    <>
      <div className="language__dropdown_inside">
        <div className="selected__language">
        {i18n.language === "en" ? <Eng/> : <Geo/>}
        </div>
        <div className="language__option">
          <div onClick={()=> i18n.changeLanguage("ge")} className="language__option_inner">
            <img className="language__image" src={GeFlag} alt="Georgian" />
            <span>ge</span>
          </div>
          <div onClick={()=> i18n.changeLanguage("en")} className="language__option_inner">
            <img className="language__image" src={UsFlag} alt="Georgian" />
            <span>en</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lanuage;
