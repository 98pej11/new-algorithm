function solution(k, dungeons) {
    let answer = 0;
    const visited = Array.from({length: dungeons.length}, ()=>false);
    
    dfs(k, 0);
    
    function dfs(remain, result) {
        answer = Math.max(answer, result);
        
        for(let i=0;i<dungeons.length;i++) {
            if(!visited[i] && remain >= dungeons[i][0]) {
                 visited[i] = true;
                 dfs(remain - dungeons[i][1], result + 1);
                 visited[i] = false;
            }
        }
    }
    
    return answer;
}