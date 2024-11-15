function solution(s) {
    let cnt = [0,0];
    
    while(1) {
        if(s === "1") return cnt;
        
        cnt[0]++;
        cnt[1] += (s.match(/0/g) || []).length;
        
        
        s = s.replace(/0/g, "");
        s = (s.length).toString(2);
    }
}