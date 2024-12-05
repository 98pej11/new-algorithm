function solution(k, tangerine) {
    var answer = 0;
    // [1,4] [2,3] [3,1]
    // [1,1] [2,2] [3,2] [4,1] [5,2]
    const map = new Map();
    
    for(let item of tangerine) {
        if(!map.has(item)) {
            map.set(item,1);
        }
        else map.set(item, map.get(item)+1);
    }
 
    const list = [...map].sort((a,b) => b[1]-a[1]);

    let cnt = 0;
    for(let item of list) {
        k = k-item[1];
        cnt++;
        
        if(k <= 0) break;
    }
    return cnt;
}