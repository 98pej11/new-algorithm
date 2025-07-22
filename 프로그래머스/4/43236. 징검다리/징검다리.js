function solution(distance, rocks, n) {
    rocks.sort((a, b) => a - b); // 바위 정렬
    rocks.push(distance); // 도착 지점도 바위처럼 생각

    let left = 1;
    let right = distance;
    let answer = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2); // 최소 거리 후보
        let prev = 0; // 이전 바위 위치
        let removeCount = 0;

        for (let i = 0; i < rocks.length; i++) {
            const gap = rocks[i] - prev;

            if (gap < mid) {
                // 거리가 너무 짧으면 바위 제거
                removeCount++;
            } else {
                // 유지
                prev = rocks[i];
            }
        }

        if (removeCount > n) {
            // 너무 많이 제거해야 하면, 거리 줄이자
            right = mid - 1;
        } else {
            // 이 거리(mid)로도 가능, 더 큰 거리로 도전
            answer = mid;
            left = mid + 1;
        }
    }

    return answer;
}
