class Solution {
    public int solution(String s) {
        int answer = 0;
        
        int xCnt = 0;
        int yCnt = 0;
        char ch = s.charAt(0);
        
        for(int i=0;i<s.length();i++) {
            if(s.charAt(i) == ch) xCnt++;
            else yCnt++;
            
            if(xCnt == yCnt) {
                if(i+1 < s.length()) ch = s.charAt(i+1);
                answer++;
            }
        }
        return (xCnt == yCnt)? answer : answer+1;
    }
}