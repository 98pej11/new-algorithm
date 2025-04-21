function solution(gems) {
    let answer = [];
    let min = gems.length;
    const map = new Map();

    let left = 0;
    const N = new Set(gems).size;
    console.log(N);
    for(let right = 0; right < gems.length;right++) {
        map.set(gems[right], (map.get(gems[right]) || 0) + 1);
        
        while(map.size === N) {
            map.set(gems[left], map.get(gems[left]) - 1);
            if(map.get(gems[left]) === 0) map.delete(gems[left]);
            
            if(right - left < min) {
                min = right - left;
                answer = [left+1, right+1];
            }
            left++;
        }
    }
   
   

    return answer;
}