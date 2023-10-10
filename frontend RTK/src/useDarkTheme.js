import { useState } from "react";

const useDarkTheme = ()=>{
    const [isThemeDark, setIsThemeDark] = useState(false);


 const setDarkMode = ()=>{
  document.querySelector('body').setAttribute('data-theme', 'dark')
 }

 const setLightMode = ()=>{
  document.querySelector('body').setAttribute('data-theme', 'light')
 }

 const toggleTheme = (e)=>{
 const theme = document.querySelector('body').getAttribute('data-theme');
 if(theme == 'light'){
 setDarkMode();
 setIsThemeDark(true)
  }else{
    setLightMode();
    setIsThemeDark(false)
 } 
 }
 
 return {isThemeDark, toggleTheme}
}

export default useDarkTheme;