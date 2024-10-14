function solution(arr){
    let answer = [];
    answer.push(arr[0]);

    for(const item of arr) {
        if(answer[answer.length-1] !== item) answer.push(item);
    }
    
    return answer;
}