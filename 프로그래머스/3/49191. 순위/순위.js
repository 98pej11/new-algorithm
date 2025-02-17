function solution(N, results) {
    var answer = 0;
    
    const winMap = Array.from({ length: N + 1 }, () => []);
    const loseMap = Array.from({ length: N + 1 }, () => []);

    // 승리/패배 관계를 리스트에 저장
    for (let [winner, loser] of results) {
        winMap[winner].push(loser); // winner가 이긴 사람
        loseMap[loser].push(winner); // loser가 진 사람
    }

    // BFS를 활용하여 연결된 모든 승리/패배 관계 전파
    function bfs(start, graph) {
        let queue = [start];
        let visited = new Set(queue);

        while (queue.length > 0) {
            let node = queue.shift();

            for (let next of graph[node]) {
                if (!visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }

        return visited.size - 1; // 자기 자신 제외
    }

    // 모든 선수에 대해 승리/패배 관계를 탐색
    for (let i = 1; i <= N; i++) {
        let winCount = bfs(i, winMap);
        let loseCount = bfs(i, loseMap);

        if (winCount + loseCount === N - 1) {
            answer++;
        }
    }

    return answer;
}
