const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 접두사의 길이를 계산하는 함수
function prefixLength(word1, word2) {
  let minLen = Math.min(word1.length, word2.length);
  for (let i = 0; i < minLen; i++) {
    if (word1[i] !== word2[i]) {
      return i; // 접두사가 끝나는 위치 반환
    }
  }
  return minLen; // 접두사가 끝까지 같으면, 더 작은 길이 반환
}

// 가장 비슷한 두 단어를 찾는 함수
function findMostSimilarWords(words) {
  let maxLen = -1;
  let bestPair = null;

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      let length = prefixLength(words[i], words[j]);
      if (length > maxLen) {
        maxLen = length;
        bestPair = [words[i], words[j]];
      }
    }
  }

  return bestPair;
}

// 입력 처리
const N = parseInt(input[0]); // 단어의 개수
const words = input.slice(1); // 단어들 배열

// 가장 비슷한 두 단어를 찾음
const [S, T] = findMostSimilarWords(words);

// 결과 출력
console.log(S);
console.log(T);
