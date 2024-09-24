function solution(n, lost, reserve) {
    let realLost = lost.filter(v => !reserve.includes(v)).sort((a,b) => a-b);
    let realReserve = reserve.filter(v => !lost.includes(v)).sort((a,b) => a-b);
    let answer = n - realLost.length;
    let idx = 0;
    
    for(let i=0;i<realReserve.length;i++){
        if(realLost.indexOf(realReserve[i] - 1) > -1) {
            idx = realLost.indexOf(realReserve[i] - 1);
            realLost.splice(idx,1);
            answer++;
                 continue;
        }
        if(realLost.indexOf(realReserve[i] + 1) > -1) {
            idx = realLost.indexOf(realReserve[i] + 1);
            realLost.splice(idx,1);
            
            console.log("prev ", realLost);
            answer++;
        }
    }
    
    return answer;
}