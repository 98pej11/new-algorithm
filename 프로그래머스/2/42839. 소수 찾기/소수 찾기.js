function solution(numbers) {
    const set = new Set();
    const arr = numbers.split("");
    const visited = Array.from({length: arr.length}, () => false);

    dfs("", arr);
    
    function dfs(select, list) {
        if(select !== '' && select[0] !== '0' && isPrime(parseInt(select))) {
            set.add(select);
        }
        if(select.length === numbers.length) return;

        for(let i=0;i<list.length;i++) {
            if(!visited[i]) {
                visited[i] = true;
                dfs(select+list[i], list);
                visited[i] = false;
            }
        }
    }
    
    function isPrime(num) {
        if(num <= 1) return false;
        for(let i=2;i<=Math.sqrt(num);i++) {
            if(num % i === 0) return false;
        }
        return true;
    }
    
    return set.size;
}