function solution(food_times, k) {
    let n = food_times.length;

    // 음식들을 [소요 시간, 인덱스] 형태로 묶어서 정렬
    let foodArr = food_times.map((time, idx) => [time, idx + 1]);

    // 음식들을 소요 시간 기준으로 오름차순 정렬
    foodArr.sort((a, b) => a[0] - b[0]);

    // 총 시간
    let totalTime = 0;
    
    // 이전 음식의 소모 시간
    let prevTime = 0;

    // 남은 음식 개수
    let remainingFoods = n;

    for (let i = 0; i < n; i++) {
        // 이번 음식을 먹는데 걸리는 시간
        let timeToEat = foodArr[i][0] - prevTime;

        // 전체 시간에서 남은 시간 계산
        let totalCost = timeToEat * remainingFoods;

        if (k >= totalCost) {
            // 현재 음식은 다 먹을 수 있다면, k를 빼고 계속 진행
            k -= totalCost;
            prevTime = foodArr[i][0]; // 현재 음식의 소요 시간으로 갱신
            remainingFoods--;
        } else {
            // k가 남을 때, 더 이상 먹을 수 없으면, 나머지 음식을 순차적으로 처리
            foodArr = foodArr.slice(i).sort((a, b) => a[1] - b[1]);
            return foodArr[Math.floor(k % remainingFoods)][1];
        }
    }

    return -1;  // 모두 먹었다면 -1 반환
}
