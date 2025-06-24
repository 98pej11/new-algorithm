function solution(enroll, referral, seller, amount) {
    const map = new Map();
    
    for(let i=0;i<enroll.length;i++) {
        map.set(enroll[i], [referral[i], 0]);
    }
    
    for(let i=0;i<seller.length;i++) {
        let curVal = amount[i] * 100;
        let curMem = map.get(seller[i]);
        
        while(curVal > 0 && curMem) {
            let div = Math.floor(curVal / 10);
            curMem[1] += curVal - div;
            curVal = div;
            curMem = map.get(curMem[0]);
            
            if (!curMem) break;
        }
    }

    return enroll.map(member => map.get(member)[1]);
}