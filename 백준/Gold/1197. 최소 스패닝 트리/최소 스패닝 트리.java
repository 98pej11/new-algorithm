import java.util.*;

public class Main {
	static int V,E;
	static PriorityQueue<Edge> points = new PriorityQueue<>();
	
	static class Edge implements Comparable<Edge>{
		int s,e,w;
		public Edge(int s, int e, int w) {
			this.s = s;
			this.e = e;
			this.w = w;
		}
		@Override
		public int compareTo(Edge o) {
			return Integer.compare(this.w, o.w);
		}
	}
	static long min;
	static int[] p;
	static int[] r;
	public static void main(String[] args) {
		Scanner scann = new Scanner(System.in);
		V = scann.nextInt();
		E = scann.nextInt();
		
		for (int i = 0; i < E; i++) {
			int s = scann.nextInt();
			int e = scann.nextInt();
			int w = scann.nextInt();
			Edge edge = new Edge(s,e,w);

			points.offer(edge);
		}
		p = new int[V+1];
		r = new int[V+1];
		makeSet();
		
		int cnt = 0;
		min = 0;
		while(cnt!=V-1) {
			Edge edge = points.poll();
			if(union(edge.s, edge.e)) {
				min += edge.w;
				cnt++;
			}
		}
		System.out.println(min);
	}
	
	private static void makeSet() {
		for (int i = 1; i <= V; i++) {
			p[i] = i;
		}
		for (int i = 1; i <= V; i++) {
			r[i] = i;
		}
	}
	
	private static int find(int x) {
		if(x==p[x]) return p[x];
		else return p[x] = find(p[x]); // 최종 부모 찾아줌
	}

	private static boolean union(int x, int y) {
		x = find(x);
		y = find(y);
		if(x==y) return false; // 싸이클 있다.
		if(r[x]<r[y]) {
			r[y]+=r[x];
			p[x] = y;
		}
		else {
			r[x]+=r[y];
			p[y] = x;
		}
		return true;
	}
}
