function solution(sizes) {
    let answer = 0;
    let resMax = 0, resMin = 0;
    
    for(let i=0;i<sizes.length;i++){
        let cur = sizes[i];
        let max, min;
        
        if(sizes[i][0] >= sizes[i][1]) {
            max = sizes[i][0];
            min = sizes[i][1];
        }
        else {
            max = sizes[i][1];
            min = sizes[i][0];
        }
        if(resMax == 0 || max > resMax) resMax = max;
        if(resMin == 0 || min > resMin) resMin = min;
    }
    
    answer = resMax * resMin;
    
    return answer;
}