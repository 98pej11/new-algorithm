function solution(relation) {
    let answer = [];
    const arr = Array.from({ length: relation[0].length }, (_, i) => i);
    
    for(let i=0;i<arr.length;i++) {
        answer.push(...combination(arr, i+1));
    }
    
    answer = checkUnique(answer, relation);
    answer = checkMinimal(answer);
    
    return answer.length;
}

function combination(arr,N){
    let result = [];
    
    if(N === 1){
        return arr.map(v=>[v])
    }
    
    arr.forEach((fix,i,origin)=>{
        const rest = origin.slice(i+1);
        const combi = combination(rest,N-1);
        const attached = combi.map((c)=>[fix,...c]);
 
        result.push(...attached);
    })
    
    return result;
}

const checkUnique = (combi, table) => {
    const result = [];

    combi.forEach((v,i) => {
        const set = new Set();
        table.forEach((tv,ti) => {
            set.add(v.map((v) => tv[v]).join(","));
        })
        if(set.size === table.length) result.push(v);
    })
    
    return result;
}

const checkMinimal = (combi) => {
    const result = [];

     while (combi.length) {
        console.log(combi);
        result.push(combi[0]);
        
        // 첫 번째 원소를 제외한 나머지 원소들 중에서
        // combi[0]의 모든 원소를 포함하지 않는 것만 필터링
        combi = combi.filter(cur => {
            let check = combi[0].every(v => cur.includes(v));
            return !check;  // combi[0]을 포함하지 않으면 true 반환
        });
    }

    return result;
}
