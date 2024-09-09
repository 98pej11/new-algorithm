function solution(k, dungeons) {
    let answer = 0;
    const visited = Array.from({ length: dungeons.length }, () => false);

    dfs(k, 0);

    function dfs(remain, value) {
        for(let i=0;i<dungeons.length;i++) {
            if(!visited[i] && dungeons[i][0] <= remain) {
                visited[i] = true; // 방문처리
                dfs(remain-dungeons[i][1], value+1); // 재귀
                visited[i] = false; // 초기화
            }
        }
        answer = Math.max(answer,value);
    }
    
    return answer;
}