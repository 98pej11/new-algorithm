import java.util.*;

class Solution {
    public String[] solution(String[] players, String[] callings) {
        ArrayList<String> list = new ArrayList<>();
       
        for(String s: players) {
            list.add(s);
        }
        
        Map<String, Integer> idxMap = new HashMap<>();
        
        for(int i=0;i<players.length;i++) {
            idxMap.put(players[i], i);
        }
        
        for(String cur: callings) {
            int idx = idxMap.get(cur);
            String player = list.get(idx-1);
            
            idxMap.put(cur, idx-1);
            idxMap.put(player, idx);
            
            list.remove(idx);
            list.add(idx-1, cur);
        }
        
        return list.toArray(String[]::new);
    }
}