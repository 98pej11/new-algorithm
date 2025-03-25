const fs = require("fs");

// 입력 받기
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number); // N, M, K 값 추출
const A = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // 양분 배열
const treeInfo = input.slice(N + 1); // 나무 정보

// 나무 상태 관리: age별로 관리
let trees = Array.from({ length: N }, () => Array.from({ length: N }, () => [])); // 2D 배열로 나무 정보 초기화

// M개의 나무 정보 받기
for (let i = 0; i < M; i++) {
  const [x, y, z] = treeInfo[i].split(" ").map(Number);
  trees[x - 1][y - 1].push(z); // 0-indexed로 나무 위치와 나이 저장
}

// 2D 배열로 양분 초기화 (초기 양분은 5로 설정)
let nutrient = Array.from({ length: N }, () => Array(N).fill(5));

// 방향 (가을에 나무 번식)
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// K년 동안 시뮬레이션 수행
for (let year = 0; year < K; year++) {
  // 봄: 나무가 양분을 먹고 성장
  const deadTrees = []; // 죽은 나무 저장
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      trees[r][c].sort((a, b) => a - b); // 나이순으로 정렬 (어린 나무부터)
      let i = 0;
      while (i < trees[r][c].length) {
        const age = trees[r][c][i];
        if (nutrient[r][c] >= age) {
          nutrient[r][c] -= age; // 양분을 먹고
          trees[r][c][i] += 1; // 나이가 1 증가
          i++;
        } else {
          deadTrees.push([r, c, age]); // 죽은 나무 기록
          trees[r][c].splice(i, 1); // 죽은 나무는 리스트에서 제거
        }
      }
    }
  }

  // 여름: 죽은 나무가 양분으로 변환
  for (const deadTree of deadTrees) {
    const [r, c, age] = deadTree;
    nutrient[r][c] += Math.floor(age / 2); // 죽은 나무는 나이 // 2 만큼 양분으로 변환
  }

  // 가을: 나이가 5의 배수인 나무가 번식
  const newTrees = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      for (const age of trees[r][c]) {
        if (age % 5 === 0) {
          // 번식
          for (const [dr, dc] of directions) {
            const nr = r + dr,
              nc = c + dc;
            if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
              newTrees.push([nr, nc]); // 나이가 1인 나무 생성
            }
          }
        }
      }
    }
  }

  // 새로 생성된 나무 추가
  for (const [r, c] of newTrees) {
    trees[r][c].push(1); // 새 나무 추가
  }

  // 겨울: 양분 추가
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      nutrient[r][c] += A[r][c]; // 해당 칸에 양분 추가
    }
  }
}

// 살아있는 나무의 수 구하기
let aliveTrees = 0;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    aliveTrees += trees[r][c].length; // 각 칸에 있는 나무의 개수 세기
  }
}

console.log(aliveTrees);
