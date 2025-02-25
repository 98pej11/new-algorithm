function solution(schedules, timelogs, startday) {
    let answer = schedules.length; // 3
    let day = startday;
    
    for(let i=0;i<schedules.length;i++) {
        let time = schedules[i]; // 700 , 800 , 1100
        day = startday;
        
        for(let item of timelogs[i]) {
            // 토 일 스킵
            if(day === 6 || day === 7 || day === 0) {
                day = (day+1) % 7;
                continue;
            }
            
            if(timeConvert(item) <= timeConvert(time) + 10) {
                day = (day+1) % 7;
                continue;
            }
            else {
                answer--;
                break;
            }
        }
    }
    
    function timeConvert(time) {
        return (parseInt(time/100))*60 + time%100;
    }
    
    return answer;
}