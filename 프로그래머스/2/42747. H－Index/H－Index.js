function solution(citations) {
    var answer = 0;
    
    citations.sort((a,b) => b-a);

    for(let i=0;i<citations.length;i++) {
        if(i+1 > citations[i]) continue;
        if(i+1 === citations.length) {
            answer = i+1;
            break;
        }
        else if(i+1 >= citations[i+1]) {
            answer = i+1;
            break;
        }
    }
    
    return answer;
}