import java.util.*;
import java.io.*;

class Solution {
    public List<Integer> solution(int[] fees, String[] records) {
        List<Integer> answer = new ArrayList<>();

        int defHour = fees[0];
        int defMoney = fees[1];
        int unitHour = fees[2];
        int unitMoney = fees[3];
        
        System.out.println(defHour+" "+defMoney);
        
        Map<String, List<Integer>> map = new TreeMap<>();
        
        for(int i=0;i<records.length;i++) {
            String[] cur = records[i].split(" ");
            String key = cur[1];
            int time = convertTime(cur[0]);
            
            if(!map.containsKey(cur[1])) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(time);
        }
        
        for(String key: map.keySet()) {
            if(map.get(key).size() % 2 == 1) {
                map.get(key).add(23*60+59);
            }
            System.out.println(map.get(key));
            
            List<Integer> list = map.get(key);
            
            int sum = 0;
            for(int i=list.size() -1;i>=0;i--) {
                int a = list.get(i);
                int b = list.get(i-1);
                i--;
                
                sum += a-b;
            }
            System.out.println(sum);
            
            int money = defMoney;
            if(sum > defHour) {
                System.out.println(Math.ceil((sum - defHour) / unitHour));
                money += Math.ceil((double)(sum - defHour) / unitHour) * unitMoney;
            }
            
            System.out.println(money);
            answer.add(money);
        }
        
        return answer;
    }
    
    public int convertTime(String str) {
            String[] cur = str.split(":");
            int hour = Integer.parseInt(cur[0]);
            int min = Integer.parseInt(cur[1]);
            System.out.println(hour+" "+min);

            return hour*60 + min;
    }
}