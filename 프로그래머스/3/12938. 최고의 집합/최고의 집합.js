function solution(n, s) {
    if (s < n) return [-1]; // 자연수니까 1 이상은 되어야 함

    const base = Math.floor(s / n); // 기본값
    const remainder = s % n; // 나머지를 얼마나 더해줘야 하나

    // n - remainder 개는 base, remainder 개는 base + 1
    const result = Array(n - remainder).fill(base).concat(Array(remainder).fill(base + 1));
    return result.sort((a, b) => a - b);
}
