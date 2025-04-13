function solution(n, edge) {
    let answer = 0;
    let graph = Array.from({length: n+1}, () => []);
    
    for(let item of edge) {
        let u = item[0];
        let v = item[1];
        
        graph[u].push(v);
        graph[v].push(u);
    }
    
    let visited = new Array(n+1).fill(0);
    let queue = [];
    let newQueue = [1];
    let cnt = 0;
    
    while(newQueue.length) {
        queue = [...newQueue];
        newQueue = [];
        cnt++;

        for(let item of queue) {
            for(let cur of graph[item]) {
                if(visited[cur] !== 0) continue;
                else {
                    visited[cur] = cnt;
                    newQueue.push(cur);
                }
            }
        }
    }

    for(let i=2;i<=n;i++) {
        if(visited[i] === cnt-1)  answer++;
    }
    
    return answer;
}