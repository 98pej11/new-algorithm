function solution(numbers) {
    let answer = '';
    let nums = numbers.map((v) => v.toString()).sort((a,b) => (b+a) - (a+b));
    
    for(let num of nums) {
        answer += num;
    }
    
    return parseInt(answer) === 0 ? "0" : answer;
}