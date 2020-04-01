---
path: "/algorithms"
cover: "./fractal-1119594_640.jpg"
title: "Algorithms"
published: true
---
# Starting A Problem
There are a number of steps to follow to solve a problem:
1. Make sue you understand the problem
2. When you understand the question, try a simple example
3. Focus on the algorithm and data structures you will use to solve the problem. Requires problem recognition.
4. After you figure out the algorithm and how you can implement it, explain your solution to your interviewer.
5. While you code, explain what you're doing.
6. Ask question when necessary
7. After you write the code for a problem, immediately verify that the code works by tracing through it with an example.
8. Make sure you check your code for all errors and special cases, especially boundary conditions.
9. Check time and space complexities and mention them to your interviewer (best, average, and worst case).
10. If you get stuck, go back to the example and/or try a different data structure.

# Big-O
Big-O is used for time and space complexity.

## How to do Big-O Analysis
1. Figure out what the input is and what `n` represents
2. Express the number of operations the algorithm performs in therms of n.
3. Eliminate all but the highest-order terms
4. Remove all constant factors

## Common Runtimes
- O(log n)
- O(n)
- O(n log n) - super linear
- O(n<sup>c</sup>) - polynomial
- O(c<sup>n</sup>) - exponential
- O(n!)  - factorial

A cheatsheet can be found [here](https://www.bigocheatsheet.com/).

## Examples of Big-O
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

If you sort students by name and then by class, you want this to be stable becasue you want to preserve the name ordering as much as you can.

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
- For each i from 0 to N-1, exchange a[i] with entries that arte larger in a[i] to a[0].
- As the index travels from left to right the entries to the left of u are in sorted order.
- This algorithm is much faster array is in order or nearly in order.
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
This is a recursive method.
- Divide list into two halves
- sort the two halves recursively
- merge the two havlves

Time Complexity:
- O(NlogN)

Space Complexity:
- uses extra space proportional to N.

To merge:  
We copy over the array to a new array, and we need to hold 3 indicies:
- i, the current element in the first half
- j, the current element in the second half
- k, the current element in the sorted result.

We compare the value at i and value at j, we take the smallest one and place it at k, and increment either i or j, depending which element we took. We do this until we reach the end of both halves.

### Top Down Merge Sort

```java
public class MergeTD {
    private static Comparable[] aux;
    // auxiliary array for merges
    public static void sort(Comparable[] a)   {
        aux = new Comparable[a.length];
        // Allocate space just once.
        sort(a, 0, a.length - 1);
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        // Sort a[lo..hi].
        if (hi <= lo) return;
        int mid = lo + (hi - lo)/2;
        sort(a, lo, mid);
        // Sort left half.
        sort(a, mid+1, hi);
        // Sort right half.
        merge(a, lo, mid, hi);
        // Merge results (code on page 271).   
    }

    public static void merge(Comparable[] a, int lo, int mid, int hi) {  
        // Merge a[lo..mid] with a[mid+1..hi].  
        int i = lo, j = mid+1;   
        for (int k = lo; k <= hi; k++)  
            // Copy a[lo..hi] to aux[lo..hi].      
            aux[k] = a[k];   
        for (int k = lo; k <= hi; k++)  
            // Merge back to a[lo..hi].      
            if (i > mid)                    a[k] = aux[j++];      
            else if (j > hi )               a[k] = aux[i++];      
            else if (less(aux[j], aux[i]))  a[k] = aux[j++];      
            else                            a[k] = aux[i++]; 
    }
    
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}
```

### Recursion
```java
private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
    if(hi <= lo) return;
    int mid = lo + (hi - lo) / 2;
    sort(a, aux, lo, mid);
    sort(a, aux, mid+1, hi);
    merge(a, aux, lo, mid, hi);
}
```

```java
public static void sort(Comparable[] a) {
    aux = new Comparable[a.length];
    sort(a, aux, 0, a.length - 1);
}
```

### Bottom-Up Merge Sort
In bottom up, we pass through the entire arrat, merging sub arrays of size 1, then for size 2, then for size 4, etfc.  
No recursion is needed for this.  
It uses more space?

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
- Partitions an array into two sub arrats, then sorts the sub arrays indepedently.
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

If the array is in order, then worst case is O(N^2). Therefore we should shuffle the array.
Best case is O(N log N).  

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
        // If running on Java 6 or older, use `new Random()` on RHS here
        Random rnd = new Random();
        for (int i = ar.length - 1; i > 0; i--)
        {
            int index = rnd.nextInt(i + 1);
            // Simple swap
            Comparable a = ar[index];
            ar[index] = ar[i];
            ar[i] = a;
        }
    }

    private static void sort(Comparable[] a, int lo, int hi)   {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        // Partition (see page 291).
        sort(a, lo, j-1);
        // Sort left part a[lo .. j-1].
        sort(a, j+1, hi);
        // Sort right part a[j+1 .. hi].
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

### converting a string to an integer
1. Initialise the variable to 0
2. If there are no more digits in the string then the algorithm is complete
3. Fetch the next digit from the stirng (left to right)
4. Multiply by 10 and add digit
5. Repeat from step 2.

### Converting Integer to string:
1. Initialie empty string
2. If 0, output 0
3. Divide value by 10, computing remaiunder and quotent
4. Convert remainder to a character, concat to end of string
5. If quotent is not 0, make new value
6. Output chars in reverse order







# Selection Algorithms
Goal: Given an array of N items, find the Kth largest.

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
































# Dynamic Programming
It is a general-purpose algorithm design technique that is most often used to solve combinatorial optimisation problems, where we are looking for the best possible input to some function chosen from an exponentially large search space.

There are two parts:
- programming technique: dynamic programming is essentially divide and conquer in reverse. We start from the bottom with the snallest instances of the problem, solving each increaseingly large instance in turn and storing the result in a table.
- design principle: in building up our table, we are careful always to preserve alternative solutions we may need later, by delaying commitment to particular choices to the extent that we can.

Bottom up aspect is most useful with recursion that produces many duplicate subproblems.

## Memoization
With fib sequence, a naive way to solve it is
```c
int
int fib(int n)
{
    if(n < 2) {
        return 1
    } else {
        return fib(n-1) + fib(n-2);
    }
}
```

Memoization: wrap our recursive solution in a memoiser that stores previously-computed solutions in a hash table. 
```c
int
memoFib(int n)
{
    int ret;

    if(hashContains(FibHash, n)) {
        return hashGet(FibHash, n);
    } else {
        ret = memoFib(n-1) + memoFib(n-2);
        hashPut(FibHash, n, ret);
        return ret;
    }
}
```

However using a hash table can add overhead rather than using an array. 

## Dynamic programming
We should instead build an array from the bottom up, and we can then just use that result.
```c
int fib2(int n)
{
    int *a;
    int i;
    int ret;
    
    if(n < 2) {
        return 1;
    } else {
        a = malloc(sizeof(*a) * (n+1));
        assert(a);

        a[1] = a[2] = 1;

        for(i = 3; i <= n; i++) {
            a[i] = a[i-1] + a[i-2];
        }
    }

    ret = a[n];
    free(a);
    return ret;
}
```
Now this is linear time rather than the original algorithm, which was exponential.

## Recursion Problems
</br>

### Binary Search
**Problem:** Implement a function to perform a binary search on a sorted array of integer to find the index of a given integer. Comment on the efficiency of this search, and compare it with other search methods.

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
  
            // Recurvise call 
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

### Telephone Words
**Problem:** People in the United States often give others their telephone number as a word representing the seven-digit number after the area code. For example, if my telephone number were 866-2665, I could tell people my number is “TOOCOOL,” instead of the hard-to-remember seven-digit number. Note that many other possibilities (most of which are nonsensical) can represent 8662665.  
Write a function that takes a seven-digit telephone number and prints out all of the possible “words” or combinations of letters that can represent the given number. Because the 0 and 1 keys have no letters on them, you should change only the digits 2–9 to letters. You’ll be passed an array of seven integers, with each element being one digit in the number. You may assume that only valid phone numbers will be passed to your function.  
You can use the helper function 
`char getCharKey( int telephoneKey, int place )`
which takes a telephone key (0–9) and a place of either 1, 2, 3 and returns the character corresponding to the letter in that position on the specified key. For example, GetCharKey(3,2) will return ‘E’ because the telephone key 3 has the letters “DEF” on it and ‘E’ is the second letter.

```java
public void printOutAllCombinations(int[] phoneNumber) {
	this.phoneNumber = phoneNumber;
	printOutStringRecursively(0);
}

public void printOutStringRecursively(int index){
	if(index == PHONE_NUMBER_LENGTH) {
		System.out.println(recursiveArray);
		return;
	}

	for(int i = 0; i < 3; i++) {
		recursiveArray[index] = getLetterForNumberAtIndex(phoneNumber[index], i);
		printOutStringRecursively(index+1);
		if(phoneNumber[index] == 0 || phoneNumber[index] == 1) return;
	}
}
```



Image by <a href="https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1119594">Pete Linforth</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1119594">Pixabay</a>

