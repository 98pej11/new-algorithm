function solution(prices) {
    var answer = [];
    
    // prices의 idx가 시간
    for(let i=0;i<prices.length;i++) {
        let cnt = 0;
        for(let j=i+1;j<prices.length;j++) {
            cnt++;
            if(prices[i] > prices[j]) break;
        }
        answer.push(cnt);
    }
    
  
    // 
    
    
    return answer;
}