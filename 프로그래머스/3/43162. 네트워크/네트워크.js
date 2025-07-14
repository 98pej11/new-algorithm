function solution(n, computers) {
    var answer = 0;
    const visited = Array.from({length: n}, () => false);
    
    for(let i=0;i<n;i++) {
        if(!visited[i]) {
            BFS(i);  // DFS도 가능
            answer++;
        }
    }
    
    function BFS(start) {
        const queue = [start];
        
        while(queue.length > 0) {
            const item = queue.shift();
            visited[item] = true;
            
            for(let i=0;i<n;i++) {
                if(i !== item && !visited[i] && computers[item][i] === 1) {
                    queue.push(i);
                }
            }
        }
    }

    return answer;
}