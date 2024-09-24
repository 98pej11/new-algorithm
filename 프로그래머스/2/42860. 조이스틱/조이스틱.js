function solution(name) {
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    // 가운데: M,N : 77,78
    // A = 65 / Z = 90
    var answer = 0;
    let min = name.length - 1;
    
    for(let i=0;i<name.length;i++) {
        if(name.charCodeAt(i)<78) {
            answer += name.charCodeAt(i) - 65;
        }
        else{
            answer += 91 - name.charCodeAt(i);
        }
        
        let nextIndex = i + 1;
        
        while (nextIndex < name.length && name.charCodeAt(nextIndex) === 65) {
          nextIndex += 1;
        }
        
        min = Math.min(
          min, // 그대로 쭉갈지
          i * 2 + name.length - nextIndex,  // 가다가 만나면 뒤로 돌릴지
          i + (name.length - nextIndex) * 2
        );
    }
    
    answer += min;
    
    return answer;
}