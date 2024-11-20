function gcd(a,b) {
    while(b!==0) {
        let tmp = b;
        b = a%b;
        a = tmp;
    }
    return a;
}

function solution(arr) {
    let totalMulti = arr.reduce((acc,cur) => (acc*cur) / gcd(acc,cur));
    return parseInt(totalMulti);
}