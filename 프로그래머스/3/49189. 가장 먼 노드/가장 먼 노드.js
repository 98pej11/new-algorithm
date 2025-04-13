function solution(n, edge) {
    let answer = 0;
    let graph = Array.from({length: n+1}, () => []);
    
    for(let item of edge) {
        let u = item[0];
        let v = item[1];
        
        graph[u].push(v);
        graph[v].push(u);
    }
    
    console.log(graph);
    
    let visited = new Array(n+1).fill(0);
    
    let max = 0;
    let queue = [];
    let newQueue = [1];
    let cnt = 1;
    
    while(newQueue.length) {
        queue = [...newQueue];
        newQueue = [];

        for(let item of queue) { // 3,2
            for(let cur of graph[item]) { // 
                if(visited[cur] !== 0) continue;
                else {
                    visited[cur] = cnt;
                    newQueue.push(cur);
                }
            }
        }
        max = cnt - 1;
        cnt++;
    }

    console.log(max);
    for(let i=2;i<=n;i++) {
        if(visited[i] === max)  answer++;
    }
    
    return answer;
}