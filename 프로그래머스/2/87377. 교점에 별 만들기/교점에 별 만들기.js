function solution(line) {
    const N = line.length;
    const set = new Set();
    const result = [];
    
    for(let i=0;i<N;i++) {
        let [A,B,E] = line[i];
        for(let j=i+1;j<N;j++) {
            let [C,D,F] = line[j];

            let x = (B*F - E*D) / (A*D - B*C);
            let y = (E*C - A*F) / (A*D - B*C);
            
            if(Number.isInteger(x) && Number.isInteger(y)) set.add(x+" "+y);
        }
    }
    
    let rMin = Infinity;
    let rMax = -Infinity;
    let cMin = Infinity;
    let cMax = -Infinity;
    
    for(let item of set) {
        let [r,c] = item.split(" ");
        rMin = Math.min(rMin, r);
        rMax = Math.max(rMax, r);
        cMin = Math.min(cMin, c);
        cMax = Math.max(cMax, c);
    }
    
    for(let i=cMax;i>=cMin;i--) {
        let str = "";
        
        for(let j=rMin;j<=rMax;j++) {
            if(set.has(j+" "+i)) str+='*';
            else str+='.';
        }
        
        result.push(str);
    }
    
    return result;
}