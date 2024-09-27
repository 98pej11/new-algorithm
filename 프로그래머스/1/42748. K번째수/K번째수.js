function solution(array, commands) {
    var answer = [];
    
    for (let command of commands) {
        let cur = array.slice(command[0]-1, command[1]).sort((a,b) => a-b);
        answer.push(cur[command[2]-1]);
    }
    return answer;
}