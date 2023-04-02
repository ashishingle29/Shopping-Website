const a=[1,2,3,4,5,6,7,8,9,10,11,12,13];
for(let i=0;i<100;i++){
    console.log(a.sort(() => 0.5 - Math.random()).slice(0, 10));
}


console.log("done");
