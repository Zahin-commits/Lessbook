const useHamburger = (params)=>{
    
    const toggleActive =()=>{
        const content = document.querySelector(params);

        content.classList.toggle("active");
     };

    return {toggleActive}
}

export default useHamburger;