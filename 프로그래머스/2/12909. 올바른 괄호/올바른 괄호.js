function solution(s){
    const stack = s.split("");

    if(stack[stack.length - 1] === '(') return false;
    
    let cnt = 0;
    while(stack.length > 0) {
        while(stack.length > 0 && stack[stack.length - 1] === ')') {
            stack.pop();
            cnt++;
        }
        while(stack.length > 0 && stack[stack.length - 1] === '(') {
            stack.pop();
            cnt--;
        }
        if(cnt < 0) return false;
    }

    if(cnt!==0) return false;
    return true;
}