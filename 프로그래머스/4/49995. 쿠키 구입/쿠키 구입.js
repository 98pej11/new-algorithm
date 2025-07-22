function solution(cookie) {
    let maxSum = 0;

    for (let m = 0; m < cookie.length - 1; m++) {
        let left = m;
        let right = m + 1;
        let leftSum = cookie[left];
        let rightSum = cookie[right];

        while (left >= 0 && right < cookie.length) {
            if (leftSum === rightSum) {
                maxSum = Math.max(maxSum, leftSum); // 둘 다 같으니 한 쪽만
            }

            if (leftSum <= rightSum) {
                left--;
                if (left >= 0) leftSum += cookie[left];
            } else {
                right++;
                if (right < cookie.length) rightSum += cookie[right];
            }
        }
    }

    return maxSum;
}
