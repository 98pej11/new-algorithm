function solution(name) {
    var answer = 0;
    let len = name.length - 1;

    for(let i=0;i<name.length;i++) {
        answer += Math.min(name.charCodeAt(i) - 65, 91 - name.charCodeAt(i));
    
        let idx = i+1;

        while(idx < name.length && name[idx] === 'A') {
            idx++;
        }

        len = Math.min(len, 2*i + name.length - idx, 2*(name.length - idx) + i);
    }
    
    
    return answer + len;
}