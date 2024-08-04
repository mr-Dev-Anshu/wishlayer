const getCurrentTime = () => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString(); 
    
    return formattedDateTime ; 
    
};
