function solution(n) {
    let list = new Array(n+1).fill(0);
    
    list[0] = 0;
    list[1] = 1;
    
    for(let i=2;i<=n;i++) {
        list[i] = (list[i-1] + list[i-2]) % 1234567;;
    }
    
    return list[n];
}