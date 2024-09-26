function solution(number, k) {
    let answer = '';
    const len = number.length - k;
console.log(len);
    for(let cur of number) {
        // num = a
        while(k > 0 && answer.length > 0 && cur > answer[answer.length - 1]) {
            k--;
            answer = answer.slice(0, -1);
        }
        // 9 8 7 6 
        answer += cur;
    }
    
    // 7 10-4 - 6
     console.log(answer.length);
     console.log(number.length - k);
    if(answer.length > len) {
        answer = answer.slice(0, len);
        console.log(answer.length);
    }
    return answer;
}