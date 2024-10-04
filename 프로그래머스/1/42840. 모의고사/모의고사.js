function solution(answers) {
    var answer = [];
    let a = [1,2,3,4,5];
    let b = [2,1,2,3,2,4,2,5];
    let c = [3,3,1,1,2,2,4,4,5,5];
    let at = 0, bt = 0, ct = 0;
    
    for(let i=0;i<answers.length;i++) {
        if(answers[i] === a[i % a.length]) at++;
        if(answers[i] === b[i % b.length]) bt++;
        if(answers[i] === c[i % c.length]) ct++;
    }
    
    let max = Math.max(at,bt,ct);
    
    if(max === at) answer.push(1);
    if(max === bt) answer.push(2);
    if(max === ct) answer.push(3);
    
    return answer;
}