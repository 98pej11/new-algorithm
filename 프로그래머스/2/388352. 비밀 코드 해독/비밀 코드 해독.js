function solution(n, q, ans) {
    let answer = 0;
    let list = [];
    
    for(let i=1;i<=n;i++) {
        list.push(i);
    }
    // console.log(list);
    combination([],1);

    
    function combination(arr, start) {
        if(arr.length === 5) {
            // console.log(arr);
            if(check(arr)) answer++;
            return;
        }

        for(let i=start;i<=n;i++) {
            let newArr = [...arr, i];
            combination(newArr, i+1);
        }
    }

    function check(arr) {
        for(let i=0;i<q.length;i++) {
            let cur = q[i];
            let cnt = 0;

            for(let j=0;j<5;j++) {
                if(arr.includes(cur[j])) cnt++;
            }
            if(cnt !== ans[i]) return false;
        }
        return true;
    }
            
    return answer;
}

