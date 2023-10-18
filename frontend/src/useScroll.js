const useScroll = (params)=>{
    
    const scrollLeft =()=>{
        const container = document.querySelector(params);

        const scrollAmount = 165;
      container.scrollLeft -= scrollAmount;
     };

    const scrollRight =()=>{
        const container = document.querySelector(params);

        const scrollAmount = 165;
      container.scrollLeft += scrollAmount;
     };

    return {scrollLeft,scrollRight}
}

export default useScroll;