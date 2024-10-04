function solution(brown, yellow) {
    var answer = [];
    
    for(let i=1;i<=yellow;i++) {
        if(yellow % i === 0) {
            let ii = yellow / i;
            if(i*2 + (ii-2)*2 === brown || (i-2)*2 + ii*2 === brown) {
                answer.push(i+2);
                answer.push(ii+2);
            }
            break;
        }
    }
    
    return answer.sort((a,b) => b-a);
}