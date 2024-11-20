function solution(n, words) {
    let set = new Set();
    
    let lastword = words[0][0];
    
    for(let i=0;i<words.length / n;i++) {
        for(let j=0;j<n;j++) {
            if(set.has(words[(i*n)+j]) || words[(i*n)+j].slice(0,1) !== lastword) {
                return [j+1,i+1];
            }
            set.add(words[(i*n)+j]);
            lastword = words[(i*n)+j].slice(-1);
        }
    }
    
    return [0,0];
}