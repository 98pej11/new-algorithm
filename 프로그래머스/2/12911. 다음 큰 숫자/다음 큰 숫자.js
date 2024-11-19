function solution(n) {
    let res = n+1;
    let cnt = n.toString(2).match(/1/g).length;
 
    while(1) {
        if(res.toString(2).match(/1/g).length === cnt) return res;
        res++;
    }
    
    return res;
}