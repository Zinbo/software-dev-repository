---
path: "/algorithms"
cover: "./fractal-1119594_640.jpg"
title: "Algorithms"
published: true
date: "2020-04-07"
---
# Algorithm Basics
<br>

## Starting A Problem
<br>

There are a number of steps to follow to solve a problem:
1. Make sure you understand the problem
2. When you understand the question, try a simple example
3. Focus on the algorithm and data structures you will use to solve the problem. Requires problem recognition.
4. After you figure out the algorithm and how you can implement it, explain your solution to your interviewer.
5. While you code, explain what you're doing.
6. Ask question when necessary
7. After you write the code for a problem, immediately verify that the code works by tracing through it with an example.
8. Make sure you check your code for all errors and special cases, especially boundary conditions.
9. Check time and space complexities and mention them to your interviewer (best, average, and worst case).
10. If you get stuck, go back to the example and/or try a different data structure.

## Algorithm Helper
![Canvas](https://www.hiredintech.com/the-algorithm-design-canvas.png)

## Checking for bugs in code
Four common problem areas for any function:
1. Check that the data comes into the function properly.
    - accessing a variable you don't have
    - reading as an int and should be a long
2. Check that each line of the function works correctly
3. Check that the data comes out fo the function correctly
4. Check common error conditions
    - empty data structures, null, etc.

## Constraints to look out for 
<br/>

### Strings, Arrays and Numbers
- How many elements can be in the array?
- How large can each element be? If it’s a string, how long? If it’s a number, what is the minimum and maximum value?
- What is in each element? If it’s a number, is it an integer or a floating point? If it’s a string, is it single-byte or multibyte (unicode)?
- If the problem involves finding a subsequence, does “subsequence” mean that the elements must be adjacent, or is there no such requirement?
- Does the array contain unique numbers or can they be repeated? (This is sometimes relevant)

### Graphs
- How many nodes can the graph have?
- How many edges can the graph have?
- If the edges have weights, what is the range for the weights?
- Can there be loops in the graph? Can there be negative-sum loops in the graph?
- Is the graph directed or undirected?
- Does the graph have multiple edges and/or self-loops?

### Return Values
- What should my method return? For example, if I’m trying to find the longest subsequence of increasing numbers in an array, should I return the length, the start index, or both?
- If there are multiple solutions to the problem, which one should be returned?
- If it should return multiple values, do you have any preference on what to return? E.g. should it return an object, a tuple, an array, or pass the output parameters as input references? (This may not be applicable in languages allowing you to return multiple values, e.g. Python)
- What should I do/return if the input is invalid / does not match the constraints? Options may be to do nothing (always assume the input is correct), raise an exception, or return some specific value.
- In problems where you’re supposed to find something (e.g. a number in an array), what should be returned if the element is not present?


## Common Big-O Runtimes
- O(log n)
- O(n)
- O(n log n) - super linear
- O(n<sup>c</sup>) - polynomial
- O(c<sup>n</sup>) - exponential
- O(n!)  - factorial

### Examples of Big-O
| Description | Order of Growth | Typical Code Framework | Description | Example |
| ----------- | -------------- | ---------------------- | ----------- | ------- |
| constant  | 1 | a = b + c; | statement | add two numbers |
| logarithmic | logN | binary search | divide in half | binary search |
| linear | N | <span class="in-table">`double max = a[0]; for (int i = 1; i < N; i++) if (a[i] > max) max = a[i];`</span> | loop | find the maximum |
| linearithmic | NlogN |  | divide and conquer | mergesort |
| quadratic | N<sup>2</sup> | <span class="in-table">`for (int i = 0; i < N; i++)      for (int j = i+1; j < N; j++) if (a[i] + a[j] == 0) cnt;`</span> | double loop | check all pairs |
| cubic | N<sup>3</sup> |<span class="in-table"> `for (int i = 0; i < N; i++)   for (int j = i+1; j < N; j++)      for (int k = j+1; k < N; k++)         if (a[i] + a[j] + a[k] == 0)            cnt++;`</span> | triple loop | check all triples |
| exponential | 2<sup>N</sup> |  | exhaustive search | check all subsets |

# Sorting Algorithms
</br>

## Stability
Stability is when the initial order is preserved for elements that are the same.  
If the sort isn't stable you can't do two sorts consecutively.  
Insertion sort and merge sort are stable, selection sort and shellsort are not.

## Selection sort
- Find smallest, exchange with first, find next smallest, exchange with second
- Running time is insensitive to order of array
- Data movement is minimal, uses N exchanges

```java
public class Selection {
    public static void sort(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for(int j = i+1; j < N; j++) if(less(a[j], a[min])) min = j;
            exch(a, i, min);
        }
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}
```
time complexity is O(n)<sup>2</sup>

## Insertion Sort
- For each `i` from 0 to `N-1`, exchange `a[i]` with entries that are larger in `a[i]` to `a[0]`.
- As the index travels from left to right the entries to the left of `u` are in sorted order.
- This algorithm is much faster if array is in order or nearly in order.

```java
public class  Insertion {
    public static void sort(Comparable[] a) {
        // Sort a[] into increasing order.      
        int N = a.length;
        for (int i = 1; i < N; i++) {
            // Insert a[i] among a[i-1], a[i-2], a[i-3]... ..
            for (int j = i; j > 0 && less(a[j], a[j - 1]); j--)
                exch(a, j, j - 1);
        }
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}
```
Best time complexity: O(n)   
average/worst: O(n)<sup>2<sup>

## Merge sort
This is a recursive method:
- Divide list into two halves
- sort the two halves recursively
- merge the two halves

To merge:  
We copy over the array to a new array, and we need to hold 3 indicies:
- `i`, the current element in the first half
- `j`, the current element in the second half
- `k`, the current element in the sorted result.

We compare the value at `i` and value at `j`, we take the smallest one and place it at `k`, and increment either `i` or `j`, depending which element we took. We do this until we reach the end of both halves.

Time Complexity:
- O(NlogN)

Space Complexity:
- uses extra space proportional to `N`.

### Top Down Merge Sort

```java
public class MergeTD {
    private static Comparable[] aux;
    // auxiliary array for merges
    public static void sort(Comparable[] a)   {
        aux = new Comparable[a.length];
        sort(a, 0, a.length - 1);
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        // Sort a[lo..hi].
        if (hi <= lo) return; // If the split array is size 0, return.
        int mid = lo + (hi - lo)/2;
        sort(a, lo, mid); // Sort left half.
        sort(a, mid + 1, hi); // Sort right half.
        merge(a, lo, mid, hi); 
    }

    public static void merge(Comparable[] a, int lo, int mid, int hi) {  
        // Merge a[lo..mid] with a[mid+1..hi].  
        int pointerToLowerHalf = lo, pointerToUpperHalf = mid+1;   
        for (int k = lo; k <= hi; k++)  {
            // Copy a[lo..hi] to aux[lo..hi].      
            aux[k] = a[k];   
        }
        for (int k = lo; k <= hi; k++)  {
            // Merge back to a[lo..hi].      
            if (pointerToLowerHalf > mid)                                       a[k] = aux[pointerToUpperHalf++];      
            else if (pointerToUpperHalf > hi )                                  a[k] = aux[pointerToLowerHalf++];      
            else if (less(aux[pointerToUpperHalf], aux[pointerToLowerHalf]))    a[k] = aux[pointerToUpperHalf++];      
            else                                                                a[k] = aux[pointerToLowerHalf++]; 
        }
    }
    
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}
```

### Bottom-Up Merge Sort
In bottom up, we pass through the entire array, merging sub arrays of size 1, then for size 2, then for size 4, etc.  
No recursion is needed for this.

```java
public class MergeBU {
    private static Comparable[] aux;

    // Same as before
    private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi) {
    // assumption is both a[lo..mid] and a[mid+1..hi] are sorted
    for(int k = lo; k <=hi; k++) aux[k] = a[k] // copy the part of the array that you
    // want to sort to an aux array

    int i = lo; j = mid+1;
    for(int k = lo; k <= hi; k++) {
        if      (i > mid)               a[k] = aux[j++];
        else if (j > hi)                a[k] = aux[i++];
        else if (less(aux[j], aux[i]))  a[k] = aux[j++];
        else                            a[k] = aux[i++];
    }

    public static void sort(Comparable[] a) {
        int N = a.length;
        aux = new Comparable[N];
        for(int sz = 1; sz < N; sz = sz+sz) {
            for(int lo = 0; lo < N-sz; lo += sz+sz)
                merge(a, lo, lo+sz-1, Math.min(lo+sz+sz-1, N-1))
        }
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}
```

### Optimisations 
you can make merge sort faster by having a cut off point where anything smaller than that you use insertion sort. The cut off should be around 7 items. Merge sort has too much overhead for tiny arrays.

```java
private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
    if(hi <= lo + CUTOFF - 1) {
        Insertion.sort(a, lo, hi);
        return;
    }
    int mid = lo + (hi - lo) / 2;
    sort(a, aux, lo, mid);
    sort(a, aux, mid+1, hi);
    merge(a, aux, lo, mid, hi);
}
```

This algorithm will go through and sort the first half of the array first, in chunks of 2, and then work on the second half of the array, and then merge those two together

## Quick sort
- Is the most widely used.
- works well for a variety of different input data.
- substantially faster than any other sorting method in typical applications.
- Is in place, time proportional to NlogN on average.
- Partitions an array into two sub arrays, then sorts the sub arrays independently.
- We do not merge, when the two sub arrays are sorted, the whole array is sorted.

Is the sort used for primitives in Java

Basic idea is:
- Shuffle array
- Partition so that, for some j
    - entry a[j] is in place
    - no larger entry to the left of j
    - no smaller entry to the right of j
- sort each piece recursively

Advantage of quick sort over merge sort is that it doesn't require extra space. However it is not stable.

Also benefits from using insertion sort at cut off point.


```java
import java.util.Random;

public class Quick {
    public static void sort(Comparable[] a)   {
        shuffleArray(a);
        // Eliminate dependence on input.
        sort(a, 0, a.length - 1);
    }

    static void shuffleArray(Comparable[] ar) {
        Random rnd = new Random();
        for (int i = ar.length - 1; i > 0; i--)
        {
            int index = rnd.nextInt(i + 1);
            Comparable a = ar[index];
            ar[index] = ar[i];
            ar[i] = a;
        }
    }

    private static void sort(Comparable[] a, int lo, int hi)   {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j-1); // Sort left part a[lo .. j-1].
        sort(a, j+1, hi); // Sort right part a[j+1 .. hi].
    }

    private static int partition(Comparable[] a, int lo, int hi) {
        // Partition into a[lo..i-1], a[i], a[i+1..hi].
        int i = lo, j = hi + 1;
        // left and right scan indices
        Comparable v = a[lo];
        // partitioning item
        while (true) {
            // Scan right, scan left, check for scan complete, and exchange.
            //find item on left to swap
            while (less(a[++i], v)) if (i == hi) break;
            //find item on right to swap
            while (less(v, a[--j])) if (j == lo) break;
            if(i >= j) break;   // Check if pointers cross
            exch(a, i, j);      // swap
        }
        exch(a, lo, j); // Put v = a[j] into position (swap with partitioning item)
        return j; // with a[lo..j-1] <= a[j] <= a[j+1..hi]. (return index of item now known to be in place)
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}
```

If the array is in order, then worst case is O(N<sup>2</sup>). Therefore we should shuffle the array.
Best case is O(N log N).  

## Algorithms For Strings
</br>

### LSD Search Sort
To sort an array a[] of strings that each have exactly W characters we do W key-indexed counting sorts: one for each character position, proceeding from right to left.
```java
public class LSD {  
    public static void sort(String[] a, int W)   {  
        // Sort a[] on leading W characters.      
        int N = a.length;      
        int R = 256;      
        String[] aux = new String[N];      
        for (int d = W-1; d >= 0; d--)      { 
            // Sort by key-indexed counting on dth char.         
            int[] count = new int[R+1]; // Compute frequency counts.         
            for (int i = 0; i < N; i++)             
                count[a[i].charAt(d) + 1]++;         
            for (int r = 0; r < R; r++)     // Transform counts to indices.            
                count[r+1] += count[r];         
            for (int i = 0; i < N; i++)     // Distribute.            
                aux[count[a[i].charAt(d)]++] = a[i];         
            for (int i = 0; i < N; i++)     // Copy back.            
                a[i] = aux[i];        
        }    
    } 
}
```

### MSD Search Sort
General purpose, where not all strings are same length.   
use key-indexed counting to sort the strings according to their first character, then recursively sort the sub arrays corresponding to each characters (excluding the first character, which we known to be the same for each string in each subarray).
```java
public class  MSD {   
    private static int R = 256;        // radix   
    private static final int M = 15;   // cutoff for small subarrays   
    private static String[] aux;       // auxiliary array for distribution   
    private static int charAt(String s, int d)   {  
        if (d < s.length()) 
            return s.charAt(d); else return -1;  
    }   
    
    public static void sort(String[] a)   {      
        int N = a.length;      
        aux = new String[N];      
        sort(a, 0, N-1, 0);   
    }   
    
    private static void sort(String[] a, int lo, int hi, int d)   {  
        // Sort from a[lo] to a[hi], starting at the dth character.       
        if (hi <= lo + M)      {  
            Insertion.sort(a, lo, hi, d); 
            return;  
        }      
        
        int[] count = new int[R+2];        // Compute frequency counts.      
        for (int i = lo; i <= hi; i++)         
        count[charAt(a[i], d) + 2]++;      
        for (int r = 0; r < R+1; r++)      // Transform counts to indices.         
            count[r+1] += count[r];      
        for (int i = lo; i <= hi; i++)     // Distribute.          
            aux[count[charAt(a[i], d) + 1]++] = a[i];      
        for (int i = lo; i <= hi; i++)     
            // Copy back.         
            a[i] = aux[i - lo];      // Recursively sort for each character value.     
        for (int r = 0; r < R; r++)         
            sort(a, lo + count[r], lo + count[r+1] - 1, d+1);    
    }
}
 
```

# Selection Algorithms
Goal: Given an array of `N` items, find the `K`th largest.

We can use quick sort for this, but instead of sorting the whole array, we only sort the half of the array that the Kth element will be in.  
Implementation:
```java
public static Comparable select(Comparable[] a, int k) {
    StdRandom.shuffle(a);
    int lo = 0, hi = a.length - 1;
    while (hi > lo) {
        int j = partition(a, lo, hi);
        if          (j < k) lo = j + 1;
        else if     (j > k) hi = j - 1;
        else                return a[k];
    }
    return a[k];
}
```

As an example, if we're looking for the 5th largest element, if j comes back as 7, then we want to look in the left (smaller) part of the array.

It takes linear time on average.

Another way of doing this is to use a min heap of size `K`. Go through array and add elements if heap isn't full. If its full then add element and remove first element. Take the first element at top of heap and that will be the kth largest. 


### Binary Search
**Problem:** Implement a function to perform a binary search on a sorted array of integer to find the index of a given integer. 

In binary search there are 3 possibilities:
1. The central element is less than what you're searching for, so you eliminate the first half of the search space.
2. The central element is greater than what you're searching for, so you elimiate the second half of the search space.
3. The central element is what you're searching for, so you return that element.

Solved recursively:
```java
public static int searchRecursively(int[] arr, int toFind) {
	return searchRecursion(arr, toFind, 0, arr.length-1);
}

private static int searchRecursion(int[] arr, int toFind, int start, int end) {
	int length = (end - start) + 1;
	int midPointIndex = (length/2) + start;
	int midPointElem = arr[midPointIndex];
	if(toFind == midPointElem) return midPointIndex;
	if(toFind > midPointElem) start = midPointIndex + 1;
	else end = midPointIndex - 1;
	if(end - start < 0) return -1;
	return searchRecursion(arr, toFind, start, end);
}
```

Solved iteratively:

```java
private static int searchIteratively(int[] arr, int toFind) {
	int start = 0;
	int end = arr.length-1;
	while(end - start >= 0) {
		int length = (end - start) + 1;
		int midPointIndex = (length/2) + start;
		int midPointElem = arr[midPointIndex];
		if(toFind == midPointElem) return midPointIndex;
		if(toFind > midPointElem) start = midPointIndex + 1;
		else end = midPointIndex - 1;
	}
	return -1;
}
```

The iterative function is more efficient.  

A binary search is `O(log(n))` because half of the search space is eliminated on each iteration. This is more efficient than a simple search through all the elements, which would be O(n). However to perform a binary search the array must be sorted, an operation that is usually `O(nlog(n))`.

```java
public class BinarySearch {   
    public static int rank(int key, int[] a)   {  
        // Array must be sorted.      
        int lo  = 0;      
        int hi = a.length - 1;      
        while (lo <= hi) {  
            // Key is in a[lo..hi] or not present.         
            int mid = lo + (hi - lo) / 2;         
            if (key < a[mid]) hi = mid - 1;         
            else if (key > a[mid]) lo = mid + 1;         
            else return mid;      
        }      
        
        return -1;   
    }    
    
    public static void main(String[] args) {      
        int[] whitelist = In.readInts(args[0]);      
        Arrays.sort(whitelist);      
        while (!StdIn.isEmpty()) {  
            // Read key, print if not in whitelist.         
            int key = StdIn.readInt(); 
            if (rank(key, whitelist) < 0)            
            System.out.println(key);      
        }   
    } 
}
```

### Permutations of a String
**Problem:**  Implement a routine that prints all possible orderings of the characters in a string. In other words, print all permutations that use all the characters from the original string. For example, given the string “hat”, your function should print the strings “tha”, “aht”, “tah”, “ath”, “hta”, and “hat”. Treat each character in the input string as a distinct character, even if it is repeated. Given the string “aaa”, your routine should print “aaa” six times. You may print the permutations in any order you choose.

```java
static void printPermutn(String str, String ans) 
    { 
  
        // If string is empty 
        if (str.length() == 0) { 
            System.out.print(ans + " "); 
            return; 
        } 
  
        for (int i = 0; i < str.length(); i++) { 
  
            // ith character of str 
            char ch = str.charAt(i); 
  
            // Rest of the string after excluding  
            // the ith character 
            String ros = str.substring(0, i) +  
                         str.substring(i + 1); 
  
            // Recursive call 
            printPermutn(ros, ans + ch); 
        } 
    } 
  
    // Driver code 
    public static void main(String[] args) 
    { 
        String s = "abb"; 
        printPermutn(s, ""); 
    }
```

Permutation of numbers in array:
```java
class Solution {
  public void backtrack(int n,
                        ArrayList<Integer> nums,
                        List<List<Integer>> output,
                        int first) {
    // if all integers are used up
    if (first == n)
      output.add(new ArrayList<Integer>(nums));
    for (int i = first; i < n; i++) {
      // place i-th integer first 
      // in the current permutation
      Collections.swap(nums, first, i);
      // use next integers to complete the permutations
      backtrack(n, nums, output, first + 1);
      // backtrack
      Collections.swap(nums, first, i);
    }
  }

  public List<List<Integer>> permute(int[] nums) {
    // init output list
    List<List<Integer>> output = new LinkedList();

    // convert nums into list since the output is a list of lists
    ArrayList<Integer> nums_lst = new ArrayList<Integer>();
    for (int num : nums)
      nums_lst.add(num);

    int n = nums.length;
    backtrack(n, nums_lst, output, 0);
    return output;
  }
}
```

### Combinations of a String
```java
public class Combinations {    
	private StringBuilder out = new StringBuilder();    
	private final String in;
    
	public Combinations( final String str ){ 
		in = str; 
	}
    
	public void combine() { 
		combine( 0 ); 
	}    
	
	private void combine(int start ){        
		for( int i = start; i < in.length(); ++i ){
			out.append( in.charAt(i) );            
			System.out.println( out );            
			if ( i < in.length() )                
				combine( i + 1);            
			out.setLength( out.length() - 1 );        
		}
	} 
}
```

Combinations of numbers:
```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> combs = new ArrayList<>();
        if(nums == null || nums.length == 0) return combs;
        
        combs.add(new ArrayList<>());
        for(int num : nums) {
            int length = combs.size();
            for(int i = 0; i < length; i++) {
                List<Integer> copy = new ArrayList<>(combs.get(i));
                copy.add(num);
                combs.add(copy);
            }
        }
        return combs;
    }
}
```

Image by <a href="https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1119594">Pete Linforth</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1119594">Pixabay</a>

