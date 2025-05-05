function solution(plans) {
    let result = [];
    
    for(let item of plans) {
        item[1] = convertTime(item[1]);
        item[2] = Number(item[2]);
    }
    
    plans.sort((a,b) => a[1]-b[1]);

    let cur = 0;
    let stack = [];
    
    while(cur < plans.length - 1) {
        let [curName, curTime, curPlay] = plans[cur];
        let nextTime = plans[cur+1][1];
        
        // 다음 시간이 현제 플레이 종료 전에 맞물릴 경우: 스택에 넣음
        if(curTime + curPlay - nextTime > 0) {
            stack.push([curName,  curPlay - (nextTime - curTime)]);
        }
        // 다음 시간이 현제 플레이 종료 시간과 같을 경우: 결과에 넣고 다음 과제 실행
        else if(curTime + curPlay - nextTime === 0) {
            result.push(curName);
        }
        // 다음 시간이 현제 플레이 종료 후에도 시간이 남을 경우: 결과에 넣고 스택에 중지된 과제 확인
        else {
            result.push(curName);
            let remain = nextTime - (curTime + curPlay);
            
            // 붕 뜬 시간이 중지된 과제의 시간보다 더 클 경우
            while(stack.length && remain >= stack[stack.length - 1][1]) {
                result.push(stack[stack.length - 1][0]);
                remain -= stack[stack.length - 1][1];
                stack.pop();
            }
            
            if(stack.length) stack[stack.length - 1][1] -= remain; 
        }
        cur++;
    }
    
    // 마지막 과제 실행 및 중지된 과제들 최신순으로 실행
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