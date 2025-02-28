class Solution {
    public String solution(String rsp) {
        return rsp.replaceAll("2", "1")
            .replaceAll("5","2")
            .replaceAll("0", "5")
            .replaceAll("1", "0");
    }
}