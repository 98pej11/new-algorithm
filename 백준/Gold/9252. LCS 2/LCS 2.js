const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // DP 테이블 초기화
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // DP 배열 채우기
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // LCS의 길이
  const lcsLength = dp[m][n];

  // LCS 문자열 찾기
  let lcsStr = "";
  let i = m,
    j = n;

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcsStr = str1[i - 1] + lcsStr;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  // 출력
  console.log(lcsLength);
  if (lcsLength > 0) {
    console.log(lcsStr);
  }
}

// 입력값 처리
const str1 = input[0];
const str2 = input[1];

// LCS 계산
lcs(str1, str2);
