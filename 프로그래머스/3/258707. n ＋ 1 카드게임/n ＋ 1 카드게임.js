function solution(coin, cards) {
    let round = 1;
    
    const originSet = new Set();
    const nextSet = new Set();
    const N = cards.length+1;
    let idx = 0;

    for(let i=0;i<cards.length/3;i++) {
        originSet.add(cards[idx++]);
    }
    
    while(idx < cards.length) {
        nextSet.add(cards[idx++]);
        nextSet.add(cards[idx++]);
        
        // 기존 카드중 일단 버릴 카드 있는지 확인
        if(isOriginDeleteCard()) {
            round++;
            continue;
        }
        // 기존 카드 + 새로 추가된 카드 고려해서 버릴 카드 있는지 확인
        if(isMixDeleteCard() && coin >= 1) {
            round++;
            coin--;
            continue;
        }
        // 새로 추가된 카드중 버릴 카드 있는지 확인
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