class Solution {
    public String solution(String my_string, int s, int e) {
        String answer = "";
        return my_string.substring(0,s) + new StringBuilder(my_string.substring(s,e+1)).reverse().toString() + my_string.substring(e+1, my_string.length());
    }
}