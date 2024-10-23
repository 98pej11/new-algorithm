function solution(n, times) {
    let left = Math.min(...times);
    let right = Math.max(...times)*n;

    let mid = 0;
    let tmp = 0;

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