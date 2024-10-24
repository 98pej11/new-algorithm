function solution(clothes) {
    let result = clothes.length;
    const map = new Map();
    
    for(let i=0;i<clothes.length;i++) {
        if(map.has(clothes[i][1])) {
            map.get(clothes[i][1]).push(clothes[i][0]);
        }
        else {
            map.set(clothes[i][1], [clothes[i][0]]);
        }
    }

    let val = 1;
    
    for(const key of map.keys()) {
        const values = map.get(key);
        val *= (values.length + 1);
    }
    
    return val-1;
}