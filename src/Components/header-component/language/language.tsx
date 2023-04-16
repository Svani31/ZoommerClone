import { useState,FC } from "react"
import "../header.scss"
import GeFlag from "../../../Images/Flags/ge.png"
import UsFlag from "../../../Images/Flags/us.png"

type lanuageProps = {
    id:number,
    title:string,
    url:string
}

const Lanuage = () =>{

    
    const languageArray = [
        {id:0,title:"GEO",url:GeFlag},
        {id:1,title:"ENG",url:UsFlag},
    ]
    const [language,setLanguage] = useState<lanuageProps[]>([])
    const changeLang = (e:lanuageProps) =>{
        setLanguage(null)
        const newLanguage = e
        setLanguage(newLanguage)
    }
    console.log(language)

    return(
                        <>
                            <div className="language__dropdown_inside">
                                <div className="selected__language">
                                    <img src={GeFlag} alt="Georgian" />
                                    <span>GEO</span>
                                    <span> ^ </span>
                                </div>
                                <div className="language__option">
                                    
                                    <div className="language__option_inner">
                                    <img className="language__image" src={GeFlag} alt="Georgian" />
                                    <span>GEO</span>
                                    </div>

                                    <div className="language__option_inner">
                                    <img className="language__image" src={UsFlag} alt="Georgian" />
                                    <span>GEO</span>
                                    </div>
                                </div>
                            </div>
                        </>
    )
}


export default Lanuage