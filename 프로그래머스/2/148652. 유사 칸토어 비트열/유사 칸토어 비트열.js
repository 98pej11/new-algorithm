function solution(n, l, r) {
    let answer = 0;

    for (let i = l - 1; i < r; i++) {
        answer += isOne(i);
    }

    function isOne(index) {
        while (index > 0) {
            if (index % 5 === 2) return 0; // 가운데 구간이면 무조건 0
            index = Math.floor(index / 5); // 상위 레벨로 이동
        }
        return 1;
    }

    return answer;
}
