function solution(n, lost, reserve) {
    var answer = n;
    
    const realReserve = reserve.filter(v => !lost.includes(v)).sort((a,b) => a-b);
    const realLost = lost.filter(v => !reserve.includes(v)).sort((a,b) => a-b);
    const visited = Array.from({length: n+1}, () => false);
    
    visited[0] = true;

    for(let i=1;i<=n;i++) {
        if(!realLost.includes(i) && !realReserve.includes(i)) visited[i] = true;
    }
    
    for(let i=0;i<realReserve.length;i++) {
        visited[realReserve[i]] = true;
        if(!visited[realReserve[i]-1] && realLost.includes(realReserve[i]-1)) visited[realReserve[i]-1] = true;
        else if(!visited[realReserve[i]+1] && realLost.includes(realReserve[i]+1)) visited[realReserve[i]+1] = true;
    }
    
    for(let i=1;i<=n;i++) {
        if(!visited[i]) answer--;
    }
    
    return answer;
}