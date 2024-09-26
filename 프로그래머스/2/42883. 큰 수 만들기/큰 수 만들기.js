function solution(number, k) {
    let answer = '';
    const len = number.length - k;
    
    for(let cur of number) {
        while(k > 0 && answer.length > 0 && cur > answer[answer.length - 1]) {
            k--;
            answer = answer.slice(0, -1);
        }
        answer += cur;
    }
    
    if(answer.length > len) {
        answer = answer.slice(0, len);
    }
    
    return answer;
}