function solution(n, s, a, b, fares) {
      const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

      for (let i = 1; i <= n; i++) {
          graph[i][i] = 0;
      }

      for (let [u, v, cost] of fares) {
        graph[u][v] = cost;
        graph[v][u] = cost;
      }

      for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
          for (let j = 1; j <= n; j++) {
            graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
          }
        }
      }

      let answer = graph[s][a] + graph[s][b];
      for (let i = 1; i <= n; i++) {
          answer = Math.min(answer, graph[s][i] + graph[i][a] + graph[i][b]);
      }

      return answer;
}