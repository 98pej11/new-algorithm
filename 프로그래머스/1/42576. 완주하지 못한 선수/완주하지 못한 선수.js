function solution(participant, completion) {
    const map = new Map();
    
    // 시간 초과 코드
//     for(let i=0;i<participant.length;i++) {
//          let idx = completion.indexOf(participant[i]);
//          if(idx === -1) {
//              answer = participant[i];
//              break;
//          }
//          completion.splice(idx,1);
//     }
    
    for(let i=0;i<participant.length;i++) {
        let a = participant[i], b = completion[i];
        
        map.set(a, (map.get(a) || 0) + 1);
        map.set(b, (map.get(b) || 0) - 1);
    }
    
    for(let [k,v] of map) {
        if(v === 1) return k;
    }
}