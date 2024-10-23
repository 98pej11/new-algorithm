function solution(n, times) {
    var answer = 0;
    
    let left = Math.min(...times); // 7
    let right = Math.max(...times)*n; // 60
    // 2 3 4 5 6 7
    // 같을때는 어떻게?
    
    let mid = 0;
    let tmp = 0;
    // 7 60 / mid: 67/2 = 34 / 4 + 3  = 7 / 
    // 7 33 / mid: 20 / 2+1 = 3
    // 21 33 / mid: 27 / 3+2 = 5
    // 28 33 / mid: 31 / 4+3 = 7
    // 28 30 / mid: 29 / 4+2 = 6
    // 28 28 / mid: 28
    while(left <= right) {
        mid = Math.round((left + right) / 2);
        
        let sum = 0;
        for(let i=0;i<times.length;i++) {
            sum += Math.floor(mid / times[i]);
        }
        if(sum < n) {
            left = mid + 1;
        }
        else{
            right = mid - 1;
            tmp = mid;
        }
    }
    
    return tmp;
}