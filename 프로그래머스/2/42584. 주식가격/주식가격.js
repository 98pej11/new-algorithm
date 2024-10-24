function solution(prices) {
    var answer = [];
    
    for(let i=0;i<prices.length;i++) {
        let cnt = 0;
        for(let j=i+1;j<prices.length;j++) {
            cnt++;
            if(prices[i] > prices[j]) break;
        }
        answer.push(cnt);
    }
    
    return answer;
}