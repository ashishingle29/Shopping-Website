
export  const generateRandomIndexes=(size,n)=>{
    const nums=Array.from({length: size}, (_, i) => i % 10).sort(()=>(0.6-Math.random()));
    console.log(nums);
    return nums.slice(0,n);
}
export const nthSuffix=(n)=>{
    n=n%10;
    return n===1?"st":n===2?"nd":n===3?"rd":"th";
}

export const modalHandler=(state)=>{
    if(state){
        document.body.style.overflow="hidden";
    }else{
        document.body.style.overflow="visible";
    }
}

