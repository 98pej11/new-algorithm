function solution(s) {
    let stack = [];
    let word = s.split("");

    while(word.length > 0) {
        if(stack.length > 0 && stack[stack.length - 1] === word[word.length-1]) {
            stack.pop();
            word.pop();
            continue;
        }

        stack.push(word.pop());
    }
    
    if(stack.length > 0) return 0;
    else return 1;
}