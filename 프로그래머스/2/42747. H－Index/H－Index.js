function solution(citations) {
    var answer = 0;
    
    citations.sort((a,b) => b-a);
    // [6,5,3,1,0]
    // [11,10,1]
    // [4,3]
    // [0,0,0,0]
    // index: 6 , 순서: 7번째
    // index: 4, 순서: 5번째, 9-5 = 4
    
    for(let i=0;i<citations.length;i++) {
        if(i+1 <= citations[i]) {
            if(i+1 === citations.length) {
                answer = i+1;
                break;
            }
            else if(i+1 >= citations[i+1]) {
                answer = i+1;
                break;
            }
        }
    }
    
    return answer;
}