function solution(coin, cards) {
    let round = 1;
    
    const originSet = new Set();
    const nextSet = new Set();
    const N = cards.length+1;
    let idx = 0;
    
    console.log(N);
    
    for(let i=0;i<cards.length/3;i++) {
        originSet.add(cards[idx++]);
    }
    console.log(originSet);
    
    while(idx < cards.length) {
        // 뒤의 두개중에서 있는지 확인
        nextSet.add(cards[idx++]);
        nextSet.add(cards[idx++]);
        
        // 일단 버릴 카드 있는지 확인
        if(isOriginDeleteCard()) {
            round++;
            continue;
        }
        
        if(isMixDeleteCard() && coin >= 1) {
            round++;
            coin--;
            continue;
        }
             
        if(isNextDeleteCard() && coin >= 2) {
            round++;
            coin-=2;
            continue;
        }
        
        break;
    }
    
    function isOriginDeleteCard() {
        for(let item of originSet) {
            if(originSet.has(N-item)) {
                originSet.delete(item);
                originSet.delete(N-item);
                return true;
            }
        }
        return false;
    }
    
    function isMixDeleteCard() {
        for(let item of nextSet) {
            if(originSet.has(N-item)) {
                nextSet.delete(item);
                originSet.delete(N-item);
                return true;
            }
        }
        return false;
    }
    
    function isNextDeleteCard() {
        for(let item of nextSet) {
            if(nextSet.has(N-item)) {
                nextSet.delete(item);
                nextSet.delete(N-item);
                return true;
            }
        }
        return false;
    }
    
    
         
    return round;
}