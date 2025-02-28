import java.util.*;

class Solution {
    public int solution(String s) {
        String answer = "";
        char[] numArr = {'0','1','2','3','4','5','6','7','8','9'};
     
        
        List<String> arr = Arrays.asList(new String[]{"zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine"});
        
        String str = "";
        
        List<Character> list = new ArrayList<>();
        
        for(char i: numArr) {
            list.add(i);
        }
        
        for(int i=0;i<s.length();i++) {
            if(list.contains(s.charAt(i))) {
                answer += s.charAt(i);
                continue;
            }
            str += "" + s.charAt(i);
            if(arr.indexOf(str) != -1) {
                answer += "" + arr.indexOf(str);
                str = "";
            }
        }

        return (answer.isEmpty())? 1 : Integer.parseInt(answer);
    }
}