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

    while(combi.length){
        result.push(combi[0]);
        combi = combi.reduce((acc, cur) => {
            let check = combi[0].every(e => cur.includes(e));
            if(!check) acc.push(cur);
            return acc;
        },[]);
    }

    return result;
}
