import { useTranslation } from "react-i18next"


const Translation = ()=>{
  const {t} = useTranslation()
  return(
    <h1>{t(`global.product`)}</h1>
  )
}


export default Translation