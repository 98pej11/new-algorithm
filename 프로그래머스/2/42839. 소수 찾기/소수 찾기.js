function solution(numbers) {
    let result = new Set();
    let list = numbers.split("");
    
    dfs("", list);
    
    function dfs (select, list) {
        if(isPrime(parseInt(select)) && select !== '' && select[0] !== '0') {
            result.add(select);
        }
        if(list.length === 0) return;
        
        for(let i=0;i<list.length;i++) {
            let newList = [...list];
            
            newList.splice(i,1);
            dfs(select+list[i], newList);
        }
    }
    
    function isPrime (num) {
        if(num <= 1) return false;
        for(let i=2;i<=Math.sqrt(num);i++) {
            if(num % i === 0) return false;
        }
        return true;
    }
    
    return result.size;
}