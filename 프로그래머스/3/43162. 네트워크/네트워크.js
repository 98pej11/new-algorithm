function solution(n, computers) {
    let answer = 0;
    const visited = Array.from({length: n}, () => false);

    for(let i=0;i<n;i++){
        if(!visited[i]) {
            // visited[i] = true;
            dfs(i);
            answer++;
        }
    }
   
    
    function dfs(idx) {
        // console.log(idx, cnt);
        visited[idx] = true;

        for(let i=0;i<n;i++){
            if(!visited[i]) {
                // computers[0][]
                if(computers[idx][i] === 1)  dfs(i);
                // else dfs(i, 0);              
            }
        }
    }
    
    return answer;
}