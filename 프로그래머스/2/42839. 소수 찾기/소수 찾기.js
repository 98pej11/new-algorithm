function solution(numbers) {
    let primes = new Set();
    let nums = numbers.split("");
    
    dfs('',nums,primes);
    
    // dfs 탐색 순열
    function dfs(fixed, list, result) {
        // 종료 조건
        if(list.length === 0) return;
        
        for(let i=0;i<list.length;i++){
            let newFixed = fixed + list[i];
            let newList = [...list];
            newList.splice(i,1);
            
            if (isPrime(parseInt(newFixed))){
                primes.add(parseInt(newFixed));
            }
            
            dfs(newFixed, newList, primes);
        }
    }
    
    // 소수 찾기
    function isPrime(num) {
        if(num <= 1) return false;
        for(let i=2;i<=Math.sqrt(num);i++){
            if(num % i === 0) return false;
        }
        return true;
    }
    
    return primes.size;
}