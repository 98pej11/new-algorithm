import java.util.*;

class Solution {
    public int[] solution(String today, String[] terms, String[] privacies) {
        List<Integer> answer = new ArrayList<>();
        
        String[] str = today.split("\\.");
        
        int Y = Integer.parseInt(str[0]);
        int M = Integer.parseInt(str[1]);
        int D = Integer.parseInt(str[2]);
        
        Map<String, Integer> map = new HashMap<>();
        
        for(int i=0;i<terms.length;i++) {
            String[] s = terms[i].split(" ");
            map.put(s[0], Integer.parseInt(s[1]));
        }

        for(int i=0;i<privacies.length;i++) {
            String[] cur = privacies[i].split(" ");
            String[] date = cur[0].split("\\.");
            int term = map.get(cur[1]);
            
            int year = Integer.parseInt(date[0]) + term / 12;
            int month = Integer.parseInt(date[1]) + term % 12;
            int day = Integer.parseInt(date[2]);
            
            if(getTime(year, month, day) <= getTime(Y,M,D)) answer.add(i+1);
        }
        
        return answer.stream()
            .mapToInt(i->i)
            .toArray();
    }
    
    public int getTime(int year, int month, int day){
        return day+month*28+year*12*28;
    }
}