function solution(board, skill) {
    const N = board.length;
    const M = board[0].length;

    const prefixSum = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

    for (let [type, r1, c1, r2, c2, degree] of skill) {
        const value = type === 1 ? -degree : degree;

        prefixSum[r1][c1] += value;
        prefixSum[r1][c2 + 1] -= value;
        prefixSum[r2 + 1][c1] -= value;
        prefixSum[r2 + 1][c2 + 1] += value;
    }

    
    for (let i = 0; i <= N ; i++) {
        for (let j = 1; j <= M ; j++) {
            prefixSum[i][j] += prefixSum[i][j - 1];
        }
    }
    for (let j = 0; j <= M; j++) {
        for (let i = 1; i <= N; i++) {
            prefixSum[i][j] += prefixSum[i - 1][j];
        }
    }

    let answer = 0;
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            board[i][j] += prefixSum[i][j];
            if (board[i][j] > 0) answer++;
        }
    }

    return answer;
}
