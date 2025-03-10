const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number); // 퀸의 초기 배치 상태 (1-based index)

const cols = Array(N).fill(false); // 각 열에 퀸이 있는지 여부
const diag1 = Array(2 * N - 1).fill(false); // 좌상단에서 우하단 대각선 (r - c + N - 1)
const diag2 = Array(2 * N - 1).fill(false); // 우상단에서 좌하단 대각선 (r + c)

let result = [];

// 초기 상태에서 퀸 배치
for (let i = 0; i < N; i++) {
  if (arr[i] !== 0) {
    const col = arr[i] - 1; // 1-based index를 0-based index로 변환
    cols[col] = true;
    diag1[i - col + N - 1] = true;
    diag2[i + col] = true;
  }
}

// 백트래킹 함수
function backtrack(r) {
  // 모든 행에 퀸을 배치했으면, 결과를 저장하고 true 반환
  if (r === N) {
    result = arr.map((val, idx) => (val === 0 ? idx + 1 : val)).join(" ");
    return true;
  }

  // 주어진 값이 이미 배치된 행은 건너뛰고, 그 행은 고정된 값으로 계속 진행
  if (arr[r] !== 0) {
    return backtrack(r + 1);
  }

  // 현재 행에 퀸을 놓을 수 있는 모든 열을 시도
  for (let c = 0; c < N; c++) {
    if (!cols[c] && !diag1[r - c + N - 1] && !diag2[r + c]) {
      // 퀸을 놓을 수 있으면 배치
      cols[c] = true;
      diag1[r - c + N - 1] = true;
      diag2[r + c] = true;
      arr[r] = c + 1; // 퀸을 놓은 열을 기록 (1-based index)

      if (backtrack(r + 1)) return true; // 다음 행으로 진행

      // 백트래킹: 퀸을 제거하고 다시 시도
      cols[c] = false;
      diag1[r - c + N - 1] = false;
      diag2[r + c] = false;
      arr[r] = 0; // 퀸을 제거
    }
  }

  return false; // 퀸을 놓을 수 없으면 false 반환
}

// 백트래킹 실행
if (backtrack(0)) {
  console.log(result); // 결과 출력
} else {
  console.log(-1); // 퀸을 배치할 수 없다면 -1 출력
}
