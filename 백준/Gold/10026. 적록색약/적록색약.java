import java.io.*;
import java.util.*;

public class Main {
	static int N;
	static char[][] map;
	static boolean[][] visited;
	static int nocount, yescount;
	static int[] dr = {0,1,0,-1};
	static int[] dc = {1,0,-1,0};
	
	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		map = new char[N][N];
		visited = new boolean[N][N];
		
		for (int i = 0; i < N; i++) {
			String str = br.readLine();
			map[i] = str.toCharArray();
		}
		
		nocount = 0;
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if(!visited[i][j]) {
					dfs(i,j);
					nocount++;
				}
			}
		}
		
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if(map[i][j]=='G') map[i][j]='R';
			}
		}
		
		visited = new boolean[N][N];
		yescount = 0;
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if(!visited[i][j]) {
					dfs(i,j);
					yescount++;
				}
			}
		}
		System.out.println(nocount+" "+yescount);
	}
	
	private static void dfs(int r, int c) {
		visited[r][c] = true;
		
		for (int d = 0; d < 4; d++) {
			int nr = r+dr[d];
			int nc = c+dc[d];
			
			if(check(nr,nc) && !visited[nr][nc] && (map[r][c]==map[nr][nc])) {
				dfs(nr,nc);
			}
		}
	}
	
	private static boolean check(int nr, int nc) {
		return nr>=0 && nr<N && nc>=0 && nc<N;
	}
}
