function solution(brown, yellow) {
    var answer = [];

    for(let i=1;i<=yellow/2;i++) {
        let ii = yellow / i;
        if(yellow % i === 0 && (i+2+ii)*2 === brown) {
            answer.push(i+2);
            answer.push(ii+2);
            break;
        }
    }
    
    if(yellow === 1) answer = [3,3];
    
    return answer.sort((a,b) => b-a);
}