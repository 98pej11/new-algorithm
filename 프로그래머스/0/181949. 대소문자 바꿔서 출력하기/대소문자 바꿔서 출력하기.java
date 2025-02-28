import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        char[] a = sc.next().toCharArray();
        String answer = "";
        
        for(char ch: a) {
            if(Character.isUpperCase(ch)) answer += Character.toLowerCase(ch);
            else answer += Character.toUpperCase(ch);
        }
        System.out.println(answer);
    }
}