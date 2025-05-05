function solution(plans) {
    let result = [];
    
    for(let item of plans) {
        item[1] = convertTime(item[1]);
        item[2] = Number(item[2]);
    }
    
    plans.sort((a,b) => a[1]-b[1]);
    console.log(plans);
    
    let cur = 0;
    let stack = [];
    
    while(cur < plans.length - 1) {
        let [curName, curTime, curPlay] = plans[cur];
        let nextTime = plans[cur+1][1];
        
        // 다음 시간이 내 플레이 시간을 잡아먹을 경우: 그만큼 빼고 다음거 실행하고 스택에 넣음
        if(curTime + curPlay - nextTime > 0) {
            stack.push([curName,  curPlay - (nextTime - curTime)]);
        }
        // 다음 시간이 내 플레이 시간과 같을 경우: 결과에 넣고 다음거 실행
        else if(curTime + curPlay - nextTime === 0) {
            result.push(curName);
        }
        // console.log(stack);
        // 다음 시간이 내 플레이 시간보다 적을 경우: 결과에 넣고 스택에 있는거 확인
        else {
            result.push(curName);
            let remain = nextTime - (curTime + curPlay);
            // 붕 뜬 시간이 더 클 경우
            while(stack.length && remain >= stack[stack.length - 1][1]) {
                result.push(stack[stack.length - 1][0]);
                remain -= stack[stack.length - 1][1];
                stack.pop();
            }
            // 그게 아니면
            if(stack.length) stack[stack.length - 1][1] -= remain; 
        }
        cur++;
    }
    
    result.push(plans[plans.length-1][0]);
    while(stack.length) {
        result.push(stack[stack.length-1][0]);
        stack.pop();
    }

    function convertTime(time) {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    }

    
    return result;
}