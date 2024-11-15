function solution(n) {
    let answer = 0;
    let dp = new Array(n).fill(0);
    
    let start = 0;
    
    for(let i=1;i<=n;i++) {
        for(let j=start;j<i;j++) {
            dp[j] += i;
            
            if(dp[j] >= n) start++;
            if(dp[j] === n) answer++;
        }
    }
    
    return answer;
}