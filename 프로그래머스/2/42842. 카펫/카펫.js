function solution(brown, yellow) {
    let answer = [3,3];
    
    for(let i=1;i<=yellow/2;i++){
        if(yellow % i === 0){
            let w = Math.max(i, yellow/i);
            let h = yellow/w;
            
            if((w+2)*2+h*2 === brown) {
                answer = [w+2,h+2];
                break;
            }
        }
    }
    return answer;
}