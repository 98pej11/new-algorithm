function solution(sizes) {
    let w = 0, h = 0;
    
    for(let size of sizes) {
        size.sort((a,b) => a-b);
    }
    
    for(let size of sizes) {
        if(size[0] > w) w = size[0];
        if(size[1] > h) h = size[1];
    }
    
    return w*h;
}