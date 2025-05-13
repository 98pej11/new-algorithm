function solution(a) {
    const MAX = 1000000000;
    
    let leftMin = MAX;
    let rightMin = MAX;
    
    let leftSet = new Set();
    let rightSet = new Set();
    
    for(let i=0;i<a.length;i++) {
        if(i !== 0) {
            leftMin = Math.min(leftMin, a[i-1]);
        }
        
        if(a[i] > leftMin) leftSet.add(i);
    }
    
    for(let i=a.length - 1;i>=0;i--) {
        if(i !== a.length - 1) {
            rightMin = Math.min(rightMin, a[i+1]);
        }
        if(a[i] > rightMin) rightSet.add(i);
    }
    
    let count = 0;
    
    for(let i=0;i<a.length;i++) {
        if(leftSet.has(i) && rightSet.has(i)) count++;
    }
    
    return a.length - count;
}
// 작은거 최대 하나 없앨 수 있음, 나머지는 다 둘중 큰거
// 큰게 더 많아야 되는건데?
// [-16,27,65,-2,58,-92,-71,-68,-61,-33]
// 큰것들을 다 없앳을때, 양쪽이 다 나보다 작은 수면, 불가

// -