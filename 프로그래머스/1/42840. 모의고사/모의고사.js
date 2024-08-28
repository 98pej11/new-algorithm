function solution(input) {
    var answer = [];
    
    let arr=[[1,2,3,4,5], [2,1,2,3,2,4,2,5], [3,3,1,1,2,2,4,4,5,5]];
    let cnt = [0,0,0];
    let max = 0;
    
    for(let k=0;k<3;k++){
        for(let i=0;i<input.length;i++){
            if(input[i] === arr[k][i % arr[k].length]) cnt[k]++;
        }
        if(max <= cnt[k]) max = cnt[k];
    }
  
     for(let k=0;k<3;k++){
        if(cnt[k] === max) answer.push(k+1);
    }
    
    return answer;
}