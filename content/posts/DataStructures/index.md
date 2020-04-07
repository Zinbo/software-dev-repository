---
path: "/data-structures"
cover: "./data-structures.jpg"
title: "Data Structures"
published: true
tags: ["something"]
date: "2018-10-15"
---

# What is a data type?
A set of values and a set of operations on those values. Most programming languages support common data types of real, integer, boolean, floating-point numbers, strings.   

For example, in the Java programming language, the type int represents the set of 32-bit integers ranging in value from −2,147,483,648 to 2,147,483,647, as well as the operations that can be performed on integers, such as addition, subtraction, and multiplication. 

Most programming languages also allow the programmer to define additional data types, usually by combining multiple elements of other types and defining the valid operations of the new data type. For example, a programmer might create a new data type named "complex number" that would include real and imaginary parts. A data type also represents a constraint placed upon the interpretation of data in a type system, describing representation, interpretation and structure of values or objects stored in computer memory. 
The different data types are:
- primitive data types
- machine data types
- boolean type
- numeric types
- composite types (e.g. array, record, union, set, an object). They are derived from more than one primitive type. This can be done in a number of ways. The ways they are combined are called data structures. Can also have linked list, but is argued to be more of a data structure rather than a type, although some people think its a type.
- enumerations
- string and text types
- pointers and references

An attribute of data which tells the compiler or interpreter how the programmer intends to use the data.

# What is an abstract data type?
An abstract data type is a data type whose representation is hiddle from the client. We use an API to specify behaviour.   
Exampels of ADTs: Integer, Date, Stack, Queue, Bag, Tree, Graph, List, Hash, Smart Pointer

Any type that does not specify an implementation is an abstract data type. For instance, a stack (which is an abstract type) can be implemented as an array (a contiguous block of memory containing multiple values), or as a linked list (a set of non-contiguous memory blocks linked by pointers).

Abstract types can be handled by code that does not know or "care" what underlying types are contained in them. Programming that is agnostic about concrete data types is called generic programming. Arrays and records can also contain underlying types, but are considered concrete because they specify how their contents or elements are laid out in memory.

There are a mathematical model for data types, where a data type is defined by its behaviour from the point of view of a user of the data (API).   
This contrasts with data structures, which are concrete reprensentations of data, and are the point of view of an implementer, not a user.  
Examples are: Map, List, Set, Queue, Graph, Stack.

# What is a data structure?
A data organisation, management, and storage format that enables efficient access and modification. Is a collection of data vlaues, the relationships among them, and the functions or operations that can be applied to the data.
Array, record, union, tagged union, object, graphs, binary trees.

# Arrays
- To access an element: array_addr + elem_size x (i - first_index). This is why elements have to be homogenous, so the size can be calculated correctly.
- To access elements in multidimensional arrays (not jagged), we use the same algo. If we want to find element (3, 4) with row size 6 (with elem size 1): `array_adr + (3 - 1) x 6 + (4 - 1)`.
- arrays can be organised in memory either by row major, where each row is contiguous, or column-major, where each column is contiguous.
|           | Add  | Remove |
|-----------|------|--------|
| Beginning | O(n) | O(n)   |
| End       | O(1) | O(1)   |
| Middle    | O(n) | O(n)   |
- Important to remember that access is constant time.

## Dynamic arrays
Static arrays have size declared at compile time.  
Dynamically-allocated arrays have their size and memory allocated at runtime, from dynamic memory, but once declared they don't change.  
Dynamic arrays don't have a constant size, they can grow. Like array list.


2D arrays have their rows all of the same length. Some languages have this built in, such as C#.  
Jagged arrays, rows can have different lengths, require a bit more work to declare
- Arrays are contiguous in memory, even 2d arrays, which have the rows after each other.
- Java doesn't support true multi-dimensional arrays, even when you declare like so: `int[][] array3 = new int[32][32];` it is a jagged array in java. What's the difference between this and a multidimensional array?

## Arrays
AN array is a sequence of variables of the same type arranged contiguously in a block of memory.  
Array lookup is O(1) as long as you know the index of the element you want.  
The price for this improved look up is significately decreaased efficiency for insertion and deletion of data in the middle of the array. Because an array is essentially a bloc kof contiguous memory, it's not possible to create or eliminate storage between any two elements as it is wit ha linked list. Ins4tead you must physically move data within the array to make room for an insertion or close the gap left by a deletion, this is an O(n) operation.

They are not dynamic.

They are best used when you know how many elements you need to store before the program executes.

In C and C++, array names point to the first element of an array. The compiler tracks only the location of arrays, not their size. This means you can write to the 20th element in an array of size 10. This will usually overwrite some other data structure.

In java, an array is an object in and of itself, seperate from the data type it holds. A reference to an array is therefore not interchangeable with a reference to an element of the array.

In C#, there are some differences. In Java the concept of multi-dimensional arrays, an array of array objects, such as int[2][3], is called a jagged array in C#, and multidimensional arrays specified using comma-seperated arguments, such as int[2,3].

In javascript arrays are dynamic and resize themmselves automatically.





























































# Strings
There are different encodings of strings, e.g. UTF-16 which represents code points as 16-bit chars, and uses two 16-bit chars to represent the remainder. This is used to encode strings in Java and C#. UTF-8 which uses one to four 8-bit chars to encode all unicode code points and has the advatange that all ASCII code are represented by a single byte. So ASCII encoded text is a subset of UTF-8 encoded text. Variable length encodings make string manupulation considerably more complicated.  There may be fewer characters in a string than the number of chars required to store it.

Most languages store strings interally as arrays.

In C, a string is contained in a char array. As C doesn't keep track of the size of arrays, it uses the null cahracter '\0'. The character array must have room for the terminator: A 10-character string requires an 11-character array. This makes finding the length of a string O(n).

C++ strings are not null-terminated, so they can store null bytes, unlike C strings. Multiple copies of the same string share the same underlying buffer whenever possible, but because a string is mutable, new buffers are creatred as necessary.

In Java, String interally holds a string using a char array. Java's char type has a size of two bytes. The compiler implicitly uses StringBuffer instances when two String instances are concatenated using the + operator, which is convenient buit can lead to inefficient code if you're not careful. Same for C#

## Problems
### First the First Nonrepeated Character
**Problem:**  Write an efficient function to find the first nonrepeated character in a string. For instance, the first nonrepeated character in `total` is `o` and the first nonrepeated character in `teeter` is `r`. Discuss the efficiency of your algorithm.

One solution is to go through the string, and then compare that character to the rest of the characters in the string. However the time complexity for this is O(n<sup>2</sup>).  
Another solution is to use a data structure to hold the number of times we've seen a character. We go through the string once, build up the data structure, then go through the string again to find the first character which has a number of 1.  
One option is to use an array. The overhead of look up in an array is O(1) so this can be a good choice. If we're only interested in storing ASCII characters then we'd need an array of size 128. However if we're using Unicode then we would need more than 100,000 elements.  
Another option is a hash table. The lookup is more expensive (worst case is O(n), average case is O(1)), however we'd have to hold a lot less values.

```java
public static Character firstNonRepeated( String str ){
	HashMap<Character,Integer> charHash = new HashMap<Character,Integer>();
	int i, length;
	Character c;
 
	length = str.length();
	// Scan str, building hash table
	for (i = 0; i < length; i++) {
		c = str.charAt(i);
		if (charHash.containsKey(c)) {
			// Increment count corresponding to c
			charHash.put(c, charHash.get(c) + 1);
		} else {
			charHash.put(c, 1);
		}
	}
	// Search hash table in order of str
	for (i = 0; i < length; i++) {
		c = str.charAt(i);
		if (charHash.get(c) == 1)
			return c;
	}
	return null; 
}
```

There are however two flaws with this solution. One is that it assumes that every Unicode character can be represented in a single 16-bit Java char.. With the UTF-16 encioding that Java uses ionternally for stirngs ,only the first 2<sup>16</sup> Unicode characters or code points  (the Basic Multilingual Plane or BMP) can be represented in a single char, the remaining code points require 2 chars. Because the implementation iterates through the string one char at a time, it won't interpret anything outside the BMP correctly.

As generics only works with reference types, it means that every time we increment the value assicated with a jey the Integer object that held the value is thrown away and a new Integer with the incremented value is constructed.   
As we only need to know about three values: zero times, one time, more than one time, we can create objects to represent these states.
```java
public static String firstNonRepeated( String str ){
	HashMap<Integer,Object> charHash = new HashMap<Integer,Object>();
	Object seenOnce = new Object(), seenMultiple = new Object();
	Object seen;
	int i;
	final int length = str.length();
	// Scan str, building hash table
	for (i = 0; i < length; ) { //increment intentionally omitted
		final int cp = str.codePointAt(i);
		i += Character.charCount(cp); //increment based on code point
		seen = charHash.get(cp);
		if (seen == null) {  // not present
			charHash.put(cp, seenOnce);
		} else {
			if (seen == seenOnce) {
				charHash.put(cp, seenMultiple);
			}
		}
	}
	// Search hash table in order of str
	for (i = 0; i < length; ) {
		final int cp = str.codePointAt(i);
		i += Character.charCount(cp);
		if (charHash.get(cp) == seenOnce) {
			return new String(Character.toChars(cp));
		}
	}
	return null; 
}
```

### Remove Specified Characters
**Problem:** Write an efficient function that deletes characters from an ASCII string. Use the prototype  
`string removeChars( string str, string remove );`
where any character existing in remove must be deleted from `str`. For example, given a str of `"Battle of the Vowels: Hawaii vs. Grozny"` and a remove of `"aeiou"`, the function should transform `str` to `“Bttl f th Vwls: Hw vs. Grzny”`. Justify any design decisions you make, and discuss the efficiency of your solution.

The obvious approach is to loop over str, and loop over remove, and build a new string with string builder.
```java
public String removeChars( string str, string remove ) {
	char[] s = str.toCharArray();
	char[] r = remove.toCharArray();
	StringBuilder sb = new StringBuilder();
	for(int i = 0; i < s.length; i++) {
		boolean toRemove = false;
		char charInStr = s[i];
		for(int j = 0; j < r.length; j++) {
			if(charInStr != r[j]) continue;
			toRemove = true;
			break;
		}
		if(toRemove) continue;
		sb.append(charInStr);
	}
}
```
However this runs with time complexity O(m.n) where n is length of str, and m is length of remove.

We can improve performance by translating remove to a data structure which has O(1) look up. We can either convert it to an array or a hash map. Lets use an array because it's ASCII so we only have 128 characters.

```java
public String removeChars( string str, string remove ) {
	char[] s = str.toCharArray();
	char[] r = remove.toCharArray();

	boolean[] flags = new boolean[128];
	for(int i = 0; i < r.length; i++) {
		flags[r[i]] = true;
	}

	StringBuilder sb = new StringBuilder();
	for(int i = 0; i < s.length; i++) {
		char charInStr = s[i];
		if(flags[charInStr]) continue;
		sb.append(charinStr);
	}
}
```

It would be more efficient to replace the string in place, rather than using a StringBuilder:
```java
public String removeChars( string str, string remove ) {
	char[] s = str.toCharArray();
	char[] r = remove.toCharArray();
	int destinationIndex = 0;

	boolean[] flags = new boolean[128];
	for(int i = 0; i < r.length; i++) {
		flags[r[i]] = true;
	}

	StringBuilder sb = new StringBuilder();
	for(int currentCharIndex = 0; currentCharIndex < s.length; currentCharIndex++) {
		char charInStr = s[i];
		if(flags[charInStr) continue;
		//skip over char, not needed to remove, just need to place the next char in the array
		s[destinationIndex++] = s[currentCharIndex];
	}
}
```

### Reverse Words
**Problem:** Write a function that reverses the order of the words in a string. For example, your function should transform the string `"Do or do not, there is no try."` to `"try. no is there not, do or Do"`. Assume that all words are space delimited and treat punctuation the same as letters.

One way to solve this is to use a token scanner that iterates through each character of the stirng. The scanner can differentiate between nonword characters, namely, the space character, and word characters, which for this problem are all fcharacters except space.  
We can scan for words, then write these words into a temporary buffer, and then copy the buffer back over the origina string. To reverse the order of the words, we should scan the string backwards to identify the words in the reverse order, but we will have to write the words back in a forward order.  
So for the string `piglet quantum` we would need to start with the letter m, scan until we get to q and then copy the letyters in the word in the forward direction until we get back to m. Next we would copy the space character immediately because it's a nonword character. We would then move onto the next word.  
After we scan and copy the whole string, copy the buffer back over the original string. Then you can deallocate the temp buffer nad return from the function.

### Integer/String Conversions
**Problem:** Write two conversion routines. The first routine converts a string to a signed integer. You may assume that the string contains only digits and the minus character ('-'), that it is a properly formatted integer number, and that the number is within the range of an int type. The second routine converts a signed integer stored as an int back to a string.

#### String to integer

To go from string to integer we need to look first if the string starts with a '-'. If it does then we need to have a flag which says to negate the number at the end.
We then need to go through each character in the string and add it to our integer. After we add it we need to multiply the integer by 10 before adding the final number, and then
negate it at the end.
If we convert a character to integer it will be its ascii value. To get the numeric value of the character 1 we need to get the ascii value of 1 minus the ascii value of 0.

We can summarise this algorithm like so:
```
start number at 0  
If the first character is '-'  
	Set the negative flag  
	Start scanning with the next character  
For each character in the string  
	Multiply number by 10  
	Add (digit character - '0') to number
If negative flag set
	Negate number
return number
```

We can write it in Java like this:
```java
public static int strToInt( String str ){
	int i = 0, num = 0;
	boolean isNeg = false;
	int len = str.length();
		if( str.charAt(0) == '-' ){
		isNeg = true;
		i = 1;
	}
	while( i < len ){
		num *= 10;
		num += ( str.charAt(i++) - '0' );
	}
	if( isNeg )
		num = -num;
	return num; 
} 
```

#### Integer to String
This one is more tricky.  
We again need to check if the number is negative, and set a negative flag.  
We then need to go through the string and process each number. One way we can do this is to do the mod of 10 of the integer to get the next digit, save that into a string, and then divide the number by 10 and again get the mod of 10.  
The issue with this is that you'll get the string in the reverse order.  
We can instead save the characters to a buffer and then create the string by going backwards through the buffer.  
As an integer can only store 32 bits that means an integer can only be (2^31)-1 (one bit for the sign, first bit represents 0) meaning the max number is 2,147,483,648 which is 10 charactees long, plus 1 character for the sign bit, which is a max of 11 characters

We can summarise this algorithm like so:
```
If number less than zero:
	 Negate the number
	 Set negative flag 
While number not equal to 0
	Add '0' to number % 10 and write this to temp buffer
	Integer divide number by 10 
If negative flag is set
	 Write '-' into next position in temp buffer 
	 Write characters in temp buffer into output string in reverse order: 
```

```java
public static final int MAX_DIGITS = 10; 
public static String intToStr( int num ){
	int i = 0;
	boolean isNeg = false;
	/* Buffer big enough for largest int and - sign */
	char[] temp = new char[ MAX_DIGITS + 1 ];
	/* Check to see if the number is negative */
	if( num < 0 ){
		num = -num;
		isNeg = true;
	}
	/* Fill buffer with digit characters in reverse order */
	do{
		temp[i++] = (char)((num % 10) + '0');
		num /= 10;
	} while( num != 0 );
	StringBuilder b = new StringBuilder();
	if( isNeg )
		b.append( '-' );
		while( i > 0 ){
		b.append( temp[--i] );
	}
	return b.toString(); 
}
```














































































# Linked List
API for Linked List with time complexity
| Singly-Linked List   | no tail pointer | with tail pointer |
|----------------------|-----------------|-------------------|
| PushFront(Key)       | O(1)            |                   |
| TopFront()           | O(1)            |                   |
| PopFront()           | O(1)            |                   |
| PushBack(Key)        | O(n)            | O(1)              |
| TopBack()            | O(n)            | O(1)              |
| PopBack()            | O(n)            |                   |
| Find(Key)            | O(n)            |                   |
| Erase(Key)           | O(n)            |                   |
| Empty()              | O(1)            |                   |
| AddBefore(Node, Key) | O(n)            |                   |
| AddAfter(Node, Key)  | O(1)            |                   |


# Linked List
Types of linked list:
- singly linked lists
- doubly linked lists
- circular linked lists

## Singly Linked List
The first element is the head.  
The last element is the tail and has an empty or null link.

A compelte traversal of the list must begin with the first node. It's common to store the pointer or reference ot the first element of a list in a seperate data structure.

```java
public class <T> ListElement {
    private ListElement<T> next;
    private T data;
    
    public ListElement(T value) {
        data = value;
    }

    public void setValue(T value) {
        data = value;
    } 
}
```

## Doubly Linked List
The advantage of a doubly linbked list is that you can traverse it in any direction.   
The head has the previous as null, and the tail has next as null.
```java
public class <T> ListElement {
    private ListElement<T> next;
    private ListElement<T> previous;
    private T data;
    
    public ListElement(T value) {
        data = value;
    }

    public void setValue(T value) {
        data = value;
    } 
}
```

## Circular linked list
Has no ends - no head or tail.  
Primary traversal problem is cycle avoidance. If you don't track where you start you'll cycle infiniately through the list.

## Tracking the head element
The head must always be tracked, otherwise the list will be lost - eitheer garbage collected or leaked.   
The pointer must be updated when a new element is inserted at the front of the list.

Method which inserts shoould return the new head
```java
public ListElement<Integer> insertInFront(ListElement<Integer> list, int data) {
    ListElement<Integer> l = new ListElement<Integer>(data);
    l.setNExt(list);
    return l;
}
```

## Traversing a list
When traversing you must always check that you haven't reached the end of the list.
To traverse safely:
```java
public ListElement<Integer find(ListElement<Integer> head, int data) {
    ListElement<Integer> elem = head;
    while(elem != null && elem.value() != data) {
        elem = elem.next();
    }
    return elem;
}
```

## Inserting and deleting elements
If you're given the element to delete or before which to insert, this requires traversal of the list from the head. Special care must be taken when the element to be delete is the head of the list.

To delete an element from a list:
```cpp
bool deleteElement(IntElement **head, IntElement * deleteMe) {
    IntElement *elem;
    if (!head || *head || !deleteMe) {
        // check for null pointers
        return false;
    }
    elem = *head;
    if (deleteMe == *head) {
        // special case for head
        head = elem-> next;
        free(deleteMe);
        return true;
    }
    while(elem) {
        if(elem -> next == deleteMe) {
            elem->next = deleteMe->next;
            free(deleteMe)
            return true;
        }
        elem = elem->next;
    }
    // deleteMe not found
    return false;
}
```

If you aren't using garbage collection you need to use two pointers. One to hold elem->next and one to hold elem after. The same for insert.

## linked list problems

### Implement a stack
**Problem:** Implement a stack using a linked list or a dynamic array.  

The main advatage of dynamic arrays over linked lists is that arrays offer random access to the array elements. However this is not needed for a stack.  
As the dynamic array grows it must be resized, which can be a time consuming operation.  

Linked lists usually allocate mmeory dynamically for each element. Depending on the overhead of the memory allocator, these allocations are often more time consuming than the copies required by a dynamic array, so a stack based on a dynamic array is usually faster than one based on a linked list. 

A linked list is less complicated to implement for a stack.

Will need push and pop methods. Push needs the data to push, pop will return the data removed.

We should think about creating createStack and deleteStack methods. Not necessarily needed for linked list, but needed for dynamic array. Adding them allows the interface to be implementation independent.
```c
bool createStack(Element **stack) {
    *stack = NULL;    
    return true; 
}

bool deleteStack(Element **stack) {
    Element *next;
    while( *stack ){
        next = (*stack)->next;
        free( *stack );
        *stack = next;
    }
    return true;
}

bool push(Element **stack, void *data) {
    Element *elem = malloc(sizeof(Element));
    if(!elem) return false;

    elem->data = data;
    elem->next = *stack;
    *stack = elem;
    return true;
}

bool pop(Element **stack, void **data) {
    Element *elem;
    if(!(elem = *stack)) return false;

    *data = elem->data;
    *stack = elem->next;    
    free( elem );    
    return true;
}
```
 The problem is easier with C++, because create and delete can be the constructor and destructor.

### Maintain Linked List Tail Pointer

**Problem:** head and tail are global pointers to the first and last element, respectively, of a singly linked list of integers. Implement C functions for the  following prototypes:
bool delete( Element *elem ); 
bool insertAfter( Element *elem, int data ); 
Your functions must keep the head and tail pointers current.

We can break this down into cases for:
- middle of the list
- end of the list
- start of the list

Two things to consider:
- null pointer argument
- length of the list

An empty list has no beginning, middle, or end.  
1 elem = same beginning, middle and end  
2 elem = different start, different end, no middle  
3+ elem = all distinct classes.

For delete:
- start by checking the head
- loop through the middle of the list
- if the next elem is the elem to delete then free elem, If next is null then update tail.
```cpp
bool delete( Element *elem ){    
	Element *curPos = head;
    if( elem == head ){
		head = elem->next;
		free( elem );    
	}
    while( curPos ){
		if( curPos->next == elem ){
			curPos->next = elem->next;
			free( elem );
			if( curPos->next == NULL )
				tail = curPos;
			return true;
		}
		curPos = curPos->next;    
	}         
	return false; 
}
```

Insert is similar:
```cpp
bool insertAfter( Element *elem, int data ){
	Element *newElem, *curPos = head;

	newElem = malloc( sizeof(Element) );
	if( !newElem )
		return false;
	newElem->data = data;

	/* Insert at beginning of list */
	if( !elem ){
		newElem->next = head;
		head = newElem;

		/* Special case for empty list */
		if( !tail )
			 tail = newElem;
		return true;
	}

	while( curPos ){
		if( curPos == elem ){
			 newElem->next = curPos->next;
			 curPos->next = newElem;

			 /* Special case for inserting at end of list */
			 if( !(newElem->next) )
				  tail = newElem;
			 return true;
		}
		curPos = curPos->next;
	} 

	/* Insert position not found; free element and return failure */
	free( newElem );
	return false; 
}
```


### Checking for bugs in code
Four common problem areas for any function:
1. Check that the data comes into the function properly.
    - accessing a variable you don't have
    - reading as an int and should be a long
2. Check that each line of the function works correctly
3. Check that the data comes out fo the function correctly
4. Check common error conditions
    - empty data structures, null, etc.

### Mth-to-last Element of a linked list
**Problem:** Given a singly linked list, devise a time- and space-efficient algorithm to find the mth-to-last element of the list. Implement your algorithm, taking care to handle relevant error conditions. Define mth to last such that when m = 0 the last element of the list is returned.

Keep a pointer m spaces ahead or behind.  
Worth mentioning to the interviewer that array or doubly linked list would be better suited.  
Check if list is < m length  
```cpp
ListElement *findMToLastElement( ListElement *head, int m ){
	ListElement *current, *mBehind;
	int i;
	if (!head)
		return NULL;
	/* Advance current m elements from beginning,
	* checking for the end of the list
	*/
	current = head;
	for( i = 0; i < m; i++ ) {
		if( current->next ){
			current = current->next;
		} else {
			return NULL;
		 }
	}

	/* Start mBehind at beginning and advance pointers
	 * together until current hits last element
	 */
	mBehind = head;
	while( current->next ){
		current = current->next;
		mBehind = mBehind->next;
	}

	/* mBehind now points to the element we were
	 * searching for, so return it
	  */
	return mBehind; 
}
```

### List Flattening
**Problem:** Start with a standard doubly linked list. Now imagine that in addition to the next and previous pointers, each element has a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure.

Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head and tail of the first level of the list. Each node is a C struct with the following definition:
```cpp
typedef struct Node {
	struct Node *next;
	struct Node *prev;
	struct Node *child;
	int value; 
} Node;
```

There are two ways to interpret flattening:
1. Each child list comes directly afer its parent
2. Each child list is appeneded to the end of the list.

The problem is much easier if we don't copy list to a new structure.

You don't need to use recursion because when you append the elements they're next in the lsit so you just advance to them.

The algorithm can be summarised as follows:
- Start at the beginning of the first level 
- While you are not at the end of the first level
    - If the current node has a child
		- Append the child to the end of the first level
		- Update the tail pointer
    - Advance to next node 

```cpp
void flattenList( Node *head, Node **tail ){
	Node *curNode =  head;
	while( curNode ){
		/* The current node has a child */
		if( curNode->child ){
			append( curNode->child, tail );
		}
		curNode = curNode->next;
	} 
}

/* Appends the child list to the end of the tail and updates the tail. */
void append( Node *child, Node **tail ){
	Node *curNode;

	/* Append the child child list to the end */
	(*tail)->next = child;
	child->prev = *tail;

	/* Find the new tail, which is the end of the child list. */
	for( curNode = child; curNode->next;  curNode = curNode->next )
		; /* Body intentionally empty */

	/* Update the tail pointer now that curNode is the new tail. */
	*tail = curNode; 
}
```

### List unflattening
**Problem:** Unflatten the list created by the previous problem and restore the data structure to its original condition.

We need to seperate the child from its previous node, explore te child list, and acarry on with the original list. This problem lends itself to recursion because we need to keep track of multiple things at once.

The algorithm can be summarised as follows:
- Explore path:
    - While not at the end
	- If current node has a child
	- Separate the child from its previous node
	- Explore path beginning with the child
	- Go onto the next node 

```cpp
/* unflattenList wraps the recursive function and updates the tail pointer. */ 
void unflattenList( Node *start, Node **tail ){
	Node *curNode;

	exploreAndSeparate( start );

	/* Update the tail pointer */
	for( curNode = start; curNode->next; curNode = curNode->next )
		; /* Body intentionally empty */

	*tail = curNode; 
}

/* exploreAndSeparate actually does the recursion and separation */ 
void exploreAndSeparate( Node *childListStart ){
	Node *curNode = childListStart;

	while( curNode ){
		if( curNode->child ){
			/* terminates the child list before the child */
			 curNode->child->prev->next = NULL;
			/* starts the child list beginning with the child */
			curNode->child->prev = NULL;
			exploreAndSeparate( curNode->child );
		}
		curNode = curNode->next;
	} 
}
```

### Null or Cycle
**Problem:**  You are given a linked list with at least one node that is either nullterminated (acyclic), or ends in a cycle (cyclic).  
Write a function that takes a pointer to the head of a list and determines whether the list is cyclic or acyclic. Your function should return false if the list is acyclic and true if it is cyclic. You may not modify the list in any way.

Thid can be solved by using two pointers. If the first pointer is ever behind or equal to the slower pointer you have a cyclic list. If you encounter a null pointer, you havr an acyclic list.

```cpp
/* Takes a pointer to the head of a linked list and determines if * the list ends in a cycle or is NULL terminated  */ 
bool determineTermination( Node *head ){
	Node *fast, *slow;
	slow = head;
	fast = head->next;
	while( true ){
		if( !fast || !fast->next )
			return false;
		else if( fast == slow || fast->next == slow )
			return true;
		else {
			slow = slow->next;
			fast = fast->next->next;
		}
	} 
}
```
## Using a linked list for Stack
Linked List achieves optimum design goals:
- Use for any type
- Space required is always proportional to the size of the collection
- Time is independent of size
This is all better than an array, because you don't need to resize.
```java
public class  Stack<Item> implements Iterable<Item> {           private Node first; // top of stack (most recently added node)   
    private int N;      // number of items   
    private  class Node {  
        // nested class to define nodes      
        Item item;      
        Node next;   
    }   
    
    public boolean isEmpty() {  
        return first == null; 
    }  
    // Or: N == 0.   
    
    public int size() {  
        return N; 
    }   
    
    public void push(Item item) {  
        // Add item to top of stack.      
        Node oldfirst = first;      
        first = new Node();      
        first.item = item;      
        first.next = oldfirst;      
        N++;   
    }   
    
    public Item pop() {  
        // Remove item from top of stack.      
        Item item = first.item;      
        first = first.next;      
        N--;      
        return item;   
    }   
}
```

## Using a Linked List for a Queue
Linked list is also good for a queue
```java
public class  Queue<Item> implements Iterable<Item> {           
    private Node first; // link to least recently added node   
    private Node last;  // link to most recently added node   
    private int N;      // number of items on the queue   
    
    private  class Node   {  
        // nested class to define nodes      
        Item item;      
        Node next;   
    }   
    
    public boolean isEmpty() {  
        return first == null;  
    }  
    // Or: N == 0.   
    
    public int size() {  
        return N;  
    }   
    
    public void enqueue(Item item) {  
        // Add item to the end of the list.      
        Node oldlast = last;      
        last = new Node();      
        last.item = item;      
        last.next = null;      
        if (isEmpty()) first = last;      
        else           oldlast.next = last;      
        N++;   
    }   
    
    public Item dequeue() {  
        // Remove item from the beginning of the list.      
        Item item = first.item;
        first = first.next;      
        if (isEmpty()) last = null;      
        N--;      
        return item;   
    }
    
}
```


## Array vs Linked List
| Advantages | Disadvantages |
| ---------- | ------------- |
| index provides immediate accesss to any item | need to know size on initialisation |
| uses space proportional to size | need reference to access an item |







































































# Vectors
Need a backing array, can set the capacity to 10  at start.
- need to keep track of the capacity and the size.
- On add, if size + 1 < capacity, insert at next available slot (which is size-1), else create a new array of twice the size, copy over the array, and add new element
- On delete, if size <= capacity/4 then reduce capacity by half.

```java
public class MyArrayList<T> {
    private int size = 0;
    private int capacity = 10;
    private Object[] backingArray = new Object[capacity];

    public int size() {
        return size;
    }

    public int capacity() {
        return capacity;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public T at(int index) {
        throwExceptionIfOutOfBounds(index);
        return (T)backingArray[index];
    }

    public void push(T item) {
        if(size + 1 > capacity) resize(capacity * 2);
        backingArray[size++] = item;
    }

    public void insert(int index, T item) {
        throwExceptionIfOutOfBounds(index);
        T elemToReplaceCurrent = item;
        for(int i = index; i < size; i++) {
            T previousElemInCurrent = (T)backingArray[i];
            backingArray[i] = elemToReplaceCurrent;
            elemToReplaceCurrent = previousElemInCurrent;
        }
        //Set the previous last element to the next free space at the end
        backingArray[size++] = elemToReplaceCurrent;
    }

    public void prepend(T item) {
        insert(0, item);
    }

    public T pop() {
        int index = size - 1;
        T item = (T) backingArray[index];
        backingArray[index] = null;
        size--;
        if(capacity/4 <= size) resize(capacity/2);
        return item;
    }

    public void delete(int index) {
        throwExceptionIfOutOfBounds(index);
        for(int i = index; i < size-1; i++) {
            backingArray[i] = backingArray[i+1];
        }
        backingArray[--size] = null;
    }

    public void remove(T item) {
        int index = 0;
        while(index < size) {
            if(backingArray[index].equals(item)) delete(index);
            else index++;
        }
    }

    public int find(T item) {
        for(int i = 0; i < size; i++) {
            if(backingArray[i].equals(item)) return i;
        }
        return -1;
    }

    private void resize(int newCapacity) {
        Object[] newArray = new Object[newCapacity];
        if (size >= 0) System.arraycopy(backingArray, 0, newArray, 0, size);
        backingArray = newArray;
        capacity = newCapacity;
    }

    private void throwExceptionIfOutOfBounds(int index) {
        if(index < 0 || index >= size) throw new IndexOutOfBoundsException("index: " + index + " size: " + size);
    }
}
```











































































# Queues
A priority queue allows you to assign a priority to elements. If you insert an element with a higher priority, it will move to its proper place in the queue. You'll usually need to define a comparator for comparing elements. Java has its own implementation, PriorityQueue. 

Deque is a double ended queue and works either like a stack or a queue. Can add and remove from both ends. Linked list implements deque.

### Queue with a linked list
```java
public class LinkedListQueue<T> {

    private class Node <Y> {
        public Y data;
        public Node<Y> next;

        public Node(Y data) {
            this.data = data;
        }
    }

    private Node<T> head;
    private Node<T> tail;

    public boolean isEmpty() {
        return head == null;
    }

    public void enqueue(T value) {
        Node<T> newNode = new Node<>(value);
        if(isEmpty()) {
            head = newNode;
            tail = newNode;
        }
        else {
            tail.next = newNode;
            tail = newNode;
        }
    }

    public T dequeue() {
        if(isEmpty()) return null;
        T data = head.data;
        if(head == tail) { //size = 1
            head = null;
            tail = null;
        }
        else head = head.next;
        return data;
    }

    public void prettyPrintQueue() {
        StringBuilder sb = new StringBuilder();
        Node<T> currentNode = head;
        if(head == null) sb.append("EMPTY QUEUE");
        while(currentNode != null) {
            sb.append(currentNode.data);
            currentNode = currentNode.next;
            if(currentNode != null) sb.append(" -> ");
        }
        System.out.println(sb);
    }
}
```

### Queue with a fixed array (static queue)
```java
public class StaticQueue<T> {
    private Object[] array;
    private int capacity;
    private int nextAvailableSpace;

    public StaticQueue(int capacity) {
        this.capacity = capacity;
        array = new Object[capacity];
    }

    public boolean isEmpty() {
        return nextAvailableSpace == 0;
    }

    public void enqueue(T data) {
        if(nextAvailableSpace == capacity) throw new RuntimeException("reached capacity");
        array[nextAvailableSpace++] = data;
    }

    public T dequeue() {
        if(isEmpty()) throw new RuntimeException("no elements in queue");
        T data = (T) array[0];
        for(int i = 0; i < nextAvailableSpace - 1; i++) {
            array[i] = array[i+1];
        }
        nextAvailableSpace--;
        return data;
    }

    public void prettyPrintQueue() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nextAvailableSpace; i++) {
            sb.append(array[i]);
            if(i != nextAvailableSpace-1) sb.append(" -> ");
        }
        if(sb.length() == 0) sb.append("EMPTY QUEUE");
        System.out.println(sb);
    }
}
```






























































# Hash Maps

Databases either use hashing or search trees. Hash tables are also useful for compilers, substring search, file synchronisation.

The two problems you have to solve when you use a hash table are:
- use a key which is a nonnegative integer
- not having a gigantic array which every key's value mapping to a position.

### Chaining
To solve the big array problem, we can use what's called chaining. Here we use a prehash function to convert each key to a number, then we use some algorithm like `k mod m` where `k` is the key and `m` in the length of the array.

Load factor is the expected size of the linked list.

 There are other algorihms but mod is the easiest.

 With chaining, if you have two values map to the same key you store the values in a linked list. If you want to look up a value you need to get the list by the key and go through the linked list until you find the element.  
 WHen we havea table of size `m` and `n` elements, we want `m >= n`. if `n > m` then we want to resize the table. Table doubling is where we resize the table to be `2m`. When we rebuild the table we need to resize the table, then rehash all of the elements using a new hash function (as our hash function was built on the notion of the table being size m).

 If we double the table we only to rebuild on inserting  the log n element.  

 Amortisation: spread out the high cost, so it's cheap on average.

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class HashTableChaining<K,V> {
    public class Entry {
        private K key;
        private V value;

        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

    }

    // Should this just be an array, rather than array list?
    private List<LinkedList<Entry>> entries = new ArrayList<>();
    int noOfBuckets = 10;
    int size = 0;

    public HashTableChaining() {
        for (int i = 0; i < noOfBuckets; i++) {
            entries.add(new LinkedList<>());
        }
    }

    public V get(K key) {
        int index = hash(key);
        List<Entry> chain = this.entries.get(index);
        if(chain.isEmpty()) return null;
        for(Entry e : chain) if(e.getKey().equals(key)) return e.getValue();
        return null;
    }

    public int hash(K key) {
        return key.hashCode() % noOfBuckets;
    }

    public void add(K key, V value) {
        int index = hash(key);
        LinkedList<Entry> chain = entries.get(index);
        boolean found = false;
        for (Entry entry : chain) {
            if (!key.equals(entry.getKey())) continue;
            entry.value = value;
            found = true;
            break;
        }

        if(!found) {
            chain.addFirst(new Entry(key, value));
            size++;
        }
        if(size >= noOfBuckets) resizeAndRehash(noOfBuckets * 2);
    }

    private void resizeAndRehash(int newCapacity) {
        List<LinkedList<Entry>> newMap = new ArrayList<>();
        for (int i = 0; i < newCapacity; i++) {
            newMap.add(new LinkedList<>());
        }

        List<LinkedList<Entry>> oldMap = entries;
        entries = newMap;
        noOfBuckets = newCapacity;

        for (List<Entry> chain : oldMap) {
            for(Entry entry : chain) add(entry.key, entry.value);
        }
    }

    public void remove(K key) {
        int index = hash(key);
        LinkedList<Entry> chain = this.entries.get(index);
        if(chain == null) return;
        for(Entry e : chain) {
            if(e.key.equals(key)) {
                this.entries.remove(e);
                size--;
                break;
            }
        }

        int potentialNewCapacity = noOfBuckets / 4;
        if(size <= potentialNewCapacity) resizeAndRehash(potentialNewCapacity);

    }
}

```

 ### Linear Probing and open addressing
 Another way to solve these problems is to use linear probing. 
In this we don't use a linked list, but instead if the prehash function maps to a slot which is already filled then we use the next slot. When we go to find an element then we look at the element that the prehash function points to. If the hashes don't match we look at the next slot, and keep going until we find either null or the element.  
When deleting an element we need to set a flag on that position to say "there was an element here" so that when we're searching we skip over this position and don't incorrectly think it's an empty slot so we can stop scanning.

 ```java
import java.util.ArrayList;
import java.util.List;

public class HashTableOpenAddressing<K, V> {
    private List<Entry> entries = new ArrayList<>();
    private int size = 0;
    private int capacity = 10;


    public HashTableOpenAddressing() {
        for(int i = 0; i < capacity; i++) {
            entries.add(null);
        }
    }

    public V get(K key) {
        int hashIndex = hash(key);
        Entry e = entries.get(hashIndex);
        while(e != null) {
            if(e.key.equals(key)) return e.value;
            hashIndex = nextHashIndex(hashIndex);
            e = entries.get(hashIndex);
        }
        return null;
    }

    public void add(K key, V value) {
        int hashIndex = hash(key);
        while(entries.get(hashIndex) != null) {
            Entry entry = entries.get(hashIndex);
            if(entry.key.equals(key)) {
                entry.value = value;
                return;
            }
            hashIndex = nextHashIndex(hashIndex);
        }

        // if we're here, that means we couldn't find the key
        Entry newEntry = new Entry(key, value);
        entries.add(hashIndex, newEntry);
        if((float)size / capacity > 0.66) resizeAndRehash(capacity * 2);
    }

    public void delete(K key) {
        int hashIndex = hash(key);
        while(entries.get(hashIndex) != null) {
            Entry entry = entries.get(hashIndex);
            if(entry.key.equals(key)) {
                entries.remove(hashIndex);
                size--;
                rehashCluster(hashIndex);
                return;
            }
            hashIndex = nextHashIndex(hashIndex);
        }
    }

    private void rehashCluster(int hashIndex) {
        // Check if size is now too small, if it is, rehash the whole table
        int newCapacity = capacity / 4;
        if(size <= newCapacity) resizeAndRehash(newCapacity);

        // Else only rehash cluster
        int nextIndex = nextHashIndex(hashIndex);
        for(int i = nextIndex; entries.get(i) != null; i=nextHashIndex(hashIndex)) {
            Entry e = entries.get(i);
            // set entry at that position to null, and rehash the element and place back in table
            entries.add(i, null);
            size--;
            add(e.key, e.value);
        }
    }

    private void resizeAndRehash(int newCapacity) {
        List<Entry> newMap = new ArrayList<>();
        for (int i = 0; i < newCapacity; i++) {
            newMap.add(null);
        }

        List<Entry> oldMap = entries;
        entries = newMap;
        capacity = newCapacity;

        for (Entry entry: oldMap) add(entry.key, entry.value);
    }

    private int nextHashIndex(int hashIndex) {
        return ++hashIndex % capacity;
    }

    private int hash(K key) {
        return key.hashCode() % capacity;
    }

    public class Entry {
        private K key;
        private V value;

        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

    }
}
 ```

### Python
In python e use open addressing, To keep collisions rare, dictionaries resize when they are 2/3s full.
When < 50k entries, resize to 4 times the size
> 50k entries resize to 2 times the size.

Linear probing is fast, most of the time it doesn't even need to compare the strings, just the hash values. 

Baal, which was 16 probes deep, was not even double the time for the best case of one probe.

### Other Notes

Hash tables trade space for time. 

Need both hash and equals method, because once we've compared hashes, we need to then compare equals.

Hash functions are one way - they are not invertible, they lose information.

Two equals objects shoudl return the same hash, two hashes might not be the same object. 

The order of a hash map is not insertion order, it is hash order.

When we add: run element through hash function
When we get: run key through hash function, get hash, go to element.

Default hash code is based off memory location.

Also known as associative arrays.

In java, a hash table is synchronised, a hash map is not. Should probably use ConcurrentHashMap instead.

### Chaining
add impl for this and open addressing

### Hash Tables
We reference key-value pairs using arrays by doing arithmetic operations to transform keys into array indices.
Two parts:
- Compute hash function that transforms the search key into an array index.
- Collision-resolution process that deals with this situation.
Time-space trade off:
- no memory limitation, use key as index
- no time limitation, min amount of memory by using sequential search in unordered arra
If we have an array that can hold M key-value pairs, then we need a hash function that can transform any given key into an index in that array. Every int should be equally likely.   
Most common method: Size M is prime, compute remainder when dividing key k by M.   
Requirement for good hash function
- consistent
-effeciient to compute
- uniformly distributes keys
Seperate chaining (collision resolution): For each array index build a linked list of the key-value pairs whose keys hash to that index. Search is two step, hash to find list, search through list for key.
```java
Look this up online
```
Linear probing (CR): store N key-value pairs in a hash table of size M > N. Called open addressing hashing methods. Liner probing, if there is a collision then go to the next entry.
- key equal to search keyt: search hit
- Empty position (null key at index position): search miss
- Key not equal to search key: try next entrym till found or empty.
```java
Look this up online
```














































































































# Trees
A binary tree is complete if all its levels are filled, except possibly the last one which is filled from left to right. A complete binary tree with n nodes has height at most O(log n).  
A complete binary tree can be stored in an array. The first (or last) element will contain the root. The children of the node at position n will be at positions 2n +1 and 2n+2.  
Parent element is at (n-1)/2 position (floored).  

## Breadth first search
level order

We use a queue

time compelxity: O(n)
space complexity: best: O(1), worst O(n)

Social network, how closely are you connected to person D, benefits from breadth first search.

## Depth First Search
time compelxity: O(n)
space complexity: best: O(log n) (average height of tree), worst O(n)
in order: left, self, right
post-order: left right self
pre-order: self left right

maze traversal benefits from depth=first search traversal, as you want to go until you get to a dead end and then back track your way out.

## Deleting
To delete from a binary tree we need to:
- find that node
- find the left-most child of the node's right node.
- replace the data in the node to be deleted with the node we found in the previous step
- we then need to go and delete the node whose data we stole

If you have duplicate values, bes tto place them in the right child because then you'll have a stable sort.

Like linked lists, trees have a linked structure.

## Vs arrays
Sorted arrays are good for searching but bad for add and remove. Binary search trees are good at both.

## Binary Search Trees
A binary search tree gives fast search and fast insertions and removal.  
There's no rule that BSTs will be full trees (or balanced)  

Can be solved cleanly with either iteration or recursion.

In a balanced BST the `|leftHeight - rightHeight| <= 1`

Tree set in java is a balanced binary search tree.

### Find Height
```cpp
struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

int FindHeight(struct Node *root) {
    if(root == NULL) return -1;
    return max(FindHeight(root0>left), FindHeight(root->right)) + 1;
}
```

### Check if a binary tree is a binary search tree
We have to check:
- for the left sub tree, that ALL nodes are lesser than parent
- for the right sub tree, that ALL nodes are greater than parent
- do these checks for every subtree on the left and the right of the parent

```java
public class CheckIfBST {
    public static class TreeNode {
        public int data;
        public TreeNode left;
        public TreeNode right;

        public TreeNode(int data) {
            this.data = data;
        }
    }

    public static boolean isBST(TreeNode root){
        if(root == null) return true;
        return entireSubTreeIsLesserThanParent(root.left, root.data) &&
                entireSubtreeIsGreaterThanParent(root.right, root.data) &&
                isBST(root.left) &&
                isBST(root.right);
    }

    private static boolean entireSubTreeIsLesserThanParent(TreeNode currentNode, int parentValue) {
        if(currentNode == null) return true;
        if(currentNode.data >= parentValue) return false;
        return entireSubTreeIsLesserThanParent(currentNode.left, parentValue) &&
                entireSubTreeIsLesserThanParent(currentNode.right, parentValue);
    }

    private static boolean entireSubtreeIsGreaterThanParent(TreeNode currentNode, int parentValue) {
        if(currentNode == null) return true;
        if(currentNode.data < parentValue) return false;
        return entireSubtreeIsGreaterThanParent(currentNode.left, parentValue) &&
                entireSubtreeIsGreaterThanParent(currentNode.right, parentValue);
    }

    public static void main(String[] args) {
        //valid tree
        TreeNode tree1 = createTree1();
        TreeNode tree2 = createTree2();
        TreeNode tree3 = createTree3();
        TreeNode tree4 = createTree4();

        System.out.println("Tree 1 is valid? " + isBST(tree1));
        System.out.println("Tree 2 is valid? " + isBST(tree2));
        System.out.println("Tree 3 is valid? " + isBST(tree3));
        System.out.println("Tree 4 is valid? " + isBST(tree4));
    }

    private static TreeNode createTree1(){
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(6);
        root.left.left = new TreeNode(4);

        return root;
    }

    private static TreeNode createTree2() {
        TreeNode root = new TreeNode(10);
        root.left = new TreeNode(5);
        root.left.left = new TreeNode(4);
        root.left.left.left = new TreeNode(1);
        root.left.right = new TreeNode(7);
        root.left.right.right = new TreeNode(11);
        root.right = new TreeNode(16);
        return root;
    }

    private static TreeNode createTree3() {
        TreeNode root = new TreeNode(7);
        root.left = new TreeNode(4);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(6);
        root.right = new TreeNode(9);
        return root;
    }

    private static TreeNode createTree4() {
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(1);
        root.right = new TreeNode(8);
        root.right.left = new TreeNode(9);
        root.right.right = new TreeNode(12);
        return root;
    }
}
```

The issue is that the calls to check subtree lesser and greater are expensive, and they are called multiple times for each sub tree. Another way to do it is to keep track of the bounds:
```java
public static class TreeNode {
    public int data;
    public TreeNode left;
    public TreeNode right;

    public TreeNode(int data) {
        this.data = data;
    }
}

private static int noOfCalls = 0;

public static boolean isBST(TreeNode root) {
    noOfCalls = 0;
    return nodeIsWithinBounds(Integer.MIN_VALUE, Integer.MAX_VALUE, root);
}

private static boolean nodeIsWithinBounds(int minValue, int maxValue, TreeNode node) {
    noOfCalls++;
    if(node == null) return true;
    if(!(node.data >= minValue && node.data < maxValue)) return false;
    return nodeIsWithinBounds(minValue, node.data, node.left) &&
            nodeIsWithinBounds(node.data, maxValue, node.right);
}
```

### Find In-Order successor
```java
public class InorderSuccessor {
    public static class TreeNode {
        public int data;
        public TreeNode left;
        public TreeNode right;

        public TreeNode(int data) {
            this.data = data;
        }
    }

    // In in-order we visit the left most child first, then that childs parent, then that parents right child.
    // If we want the successor of a node then we must visit their right child's left-most child.
    // if the node has no right child, then the successor will be its parent node, as it's a depth-first search strategy
    public static TreeNode getSuccessor(TreeNode root, int data) {
        TreeNode foundNode = find(root, data);
        if(foundNode == null) return null;
        // case where node has a right subtree
        if(foundNode.right != null) {
            return findLeftMostChild(foundNode.right);
        }
        // case where node doesn't have right subtree, we want to find the deepest node
        // which is an ancestor of the node, where the node is on the left side of the ancestor
        TreeNode successor = null;
        TreeNode ancestor = root;
        while(ancestor != foundNode) {
            //ancestor has node on the left side of its tree
            if(foundNode.data < ancestor.data) {
                successor = ancestor;
                ancestor = ancestor.left;
            }
            else ancestor = ancestor.right;
        }
        return successor;
    }

    private static TreeNode findLeftMostChild(TreeNode node) {
        while(node.left != null) node = node.left;
        return node;
    }

    private static TreeNode find(TreeNode node, int data) {
        if(node == null) return null;
        if(node.data == data) return node;
        if(data < node.data) return find(node.left, data);
        return find(node.right, data);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.left.left = new TreeNode(8);
        root.left.left.left = new TreeNode(6);
        root.left.right = new TreeNode(12);
        root.left.right.left = new TreeNode(11);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(17);
        root.right.left.left = new TreeNode(16);
        root.right.right = new TreeNode(25);
        root.right.right.right = new TreeNode(27);

        System.out.println("Successor of node 10? " + getSuccessor(root, 10).data);
        System.out.println("Successor of node 27? " + getSuccessor(root, 27));
        System.out.println("Successor of node 12? " + getSuccessor(root, 12).data);
    }
}
```

### Code a for a binary tree
```java
package other;

import java.util.function.Consumer;

public class BinarySearchTree<T extends Comparable<T>> {
    private TreeNode root;

    public void insert(T data) {
        if(root == null) {
            root = new TreeNode(data);
            return;
        }

        insertData(root, data);
    }

    public void insertData(TreeNode node, T data) {
        if(data.compareTo(node.data) < 0) {
            if(node.left == null) node.left = new TreeNode(data);
            else insertData(node.left, data);
        }
        else{
            if(node.right == null) node.right = new TreeNode(data);
            else insertData(node.right, data);
        }
    }

    public TreeNode insertOther(TreeNode node, T data) {
        if(node == null) return new TreeNode(data);
        if(data.compareTo(node.data) < 0) node.left = insertOther(node.left, data);
        else node.right = insertOther(node.right, data);
        return node;
    }

    public void insertIteratively(T data) {
        if(root == null) {
            root = new TreeNode(data);
            return;
        }

        TreeNode node = root;
        while(true) {
            if(data.compareTo(node.data) < 0) {
                if(node.left == null) {
                    node.left = new TreeNode(data);
                    break;
                }
                else node = node.left;
            }
            else{
                if(node.right == null) {
                    node.right = new TreeNode(data);
                    break;
                }
                else insertData(node.right, data);
            }
        }
    }

    public void printValues() {
        StringBuilder sb = new StringBuilder();
        inorderTraversal(root, (node) -> sb.append(node.data));
    }

    public void remove(T data) {
        deleteFromTree(root, data);
    }

    public boolean existsInTree(T data) {
        return lookForNodeInTree(root, data);
    }

    public int getTreeHeight() {
        return getNodeHeight(root);
    }

    public T getMin() {
        return findLeftMostChild(root).data;
    }

    public T getMax() {
        return findRightMostChild(root).data;
    }

    private TreeNode deleteFromTree(TreeNode node, T data) {
        if(node == null) return node;
        if(data.compareTo(node.data) < 0) node.left = deleteFromTree(node.left, data);
        else if(data.compareTo(node.data) > 0) node.right = deleteFromTree(node.right, data);
        else {
            //case 1: node has no children, can just return null to remove the node
            if(node.left == null && node.right == null) return null;

            // case 2: node has a left child
            if(node.right == null) {
                node = node.left;
                return node;
            }

            // case 3: node has a right child
            if(node.left == null) {
                node = node.right;
                return node;
            }

            // case 4: node has 2 children
            TreeNode nodeToReplaceWith = findLeftMostChild(node.right);
            node.data = nodeToReplaceWith.data;
            node = deleteFromTree(node.right, node.data);
            return node;
        }
        return node;
    }



    private boolean lookForNodeInTree(TreeNode node, T data) {
        if(node == null) return false;
        if(node.data.equals(data)) return true;
        if(data.compareTo(node.data) < 0) return lookForNodeInTree(node.left, data);
        return lookForNodeInTree(node.right, data);
    }



    private int getNodeHeight(TreeNode node) {
        // base case
        // node is null, return -1, went too far
        if(node == null) return -1;

        //recursive case
        // take max of height of traversing left tree, vs right tree, + 1
        return Math.max(getNodeHeight(node.left), getNodeHeight(node.right)) + 1;

    }

    private TreeNode findRightMostChild(TreeNode node) {
        while(node.right != null) node = node.right;
        return node;

    }

    private TreeNode findLeftMostChild(TreeNode node) {
        while(node.left != null) node = node.left;
        return node;
    }

    private void inorderTraversal(TreeNode node, Consumer<TreeNode> actionToPerform) {
        if(node.left != null) inorderTraversal(node.left, actionToPerform);
        actionToPerform.accept(node);
        if(node.right != null) inorderTraversal(node.right, actionToPerform);
    }

    public class TreeNode {
        public T data;
        public TreeNode left;
        public TreeNode right;

        public TreeNode(T data) {
            this.data = data;
        }
    }
}

```

## Tries
A BST doesn't take advantage or shared structure.
For example, if we have elements: ear, east, and eat, they all share the same first 2 letters.

In a trie:
- not every node is a word
- nodes can have more than 2 children

Each node has an array of all of the letters represented by words in the tree. You start at the root, look up that letter in the array to see if it has a link to another node. You keep going till you find the word or find a null node.  
For a binary tree, the worst case is determined by the number of words. In a trie the worst case is determined by the number of letters in the word.  
A dictionary holds about 250,000 words. Log n of that is 18, so at most would need to do 18 comparisons. For a trie however the equivalent would be for a word that is 18 characters long, which is a pretty long word, most likely be looking for words around 5-6 characters long.

A trie node for a string can look like this
```java
public class trieNode {
    boolean isWord;
    Map<Character, TrieNode> children;
    String text; //Optional
}
```

If we want to autocomplete a word then we first first go down the tree to the node which represents that stem, then we can do a depth-first or breadth-first traversal.

# Trees
Trees are made up of nodes with zero, one, or several references to other nodes.
Each node has only one other node referencing it.

Usually you will define a class for the common parts of the node and subclasses for the data held by each node.
```cpp
public class Node {
    public Node[] children;
}

public class IntNode : Node {
    public int value;
}
```
Why is this better than using generics? So you can hold nodes of any type in one tree?

## Binary Trees
THe most common trees are binary trees.  
Has no more than 2 children, referenced as left and right.

The most common way to store ordered data in a tyree is to use a special tree called a binary search tree (BST).

All desendants to the left of a noe are less than or equal to the node, and all decendants to the right of the node are greater than or equal to the node.

One advantage of a BST is that the loojk up operation is fast and simple.
```java
Node findNode( Node root, int value ){
	while( root != null ){
		int currval = root.getValue();
		if( currval == value ) break;
		if( currval < value ){
			root = root.getRight();
		} else { // currval > value
			root = root.getLeft();
		}
	}

	return root; 
}
```
This is O(log n).  

Deletion and insertion are also O(logn).

Worst case is O(n) where inserting sorted nodes (only 2 child per node).

You can find the smallest element by following all the left children.

Great for recursion, as each node in a tree is the root of a subtree beginning at that node.  
In tree recursion you start with a root, perform an action, then move to the left or right subtree. The process continues until you reach a null reference, which is the end of a tree, and a good base case.

Recursion involves solving a problem in terms of similar sub-problems and a base case.

Find node can be reimplemented as a recursive algorithm:
```java
Node findNode( Node root, int value ){
	if( root == null ) return null;
	int currval = root.getValue();
		
	if( currval == value ) return root;
		
	   if( currval < value ){
		return findNode( root.getRight(), value );
	} else { // currval > value
		return findNode( root.getLeft(), value );
	}  
}
```

## Common Searchs for unordered trees

IF your node is likely to be in upper levels of the tree, BFS is most efficient. If the target node is likely to be in the lower levels of the tree, DFS has the advatnage that it doesn't exampine any single level last.

### Breadth First Search
Start wit hthe root, move left to right across second level, etc.  
Uses additional memory because it is necessary to track the child nodes for allndoes on a given level whilst searching that level

### Depth-Frist Search
Follows one branch down till we reach the bottom or found the node. Continues at the nearest ancestor with unexplored children. It has lower memory requirements than BFS. It doesn't need to storea ll the child pointers at each level.

## Traversals

### Pre Order
Performs the operation first on the node itself, then on its left descendents, then on its right descendents.

### In Order
Performs the op on left descendents, then the node, then the right descendents.

### Post Order
Performs the operation on the left, then the right, then the descendents, then the node itself.

# Problems
### Height of a tree
**Problem:**: The height of a tree (binary or not) is defined to be the maximum distance from the root node to any leaf node. Write a function to calculate the height of an arbitrary binary tree.

The height of a tree is the height of its tallest sub-tree + 1.

```java
public static int treeHeight( Node n ){
    if( n == null ) return 0;
    return 1 + Math.max( treeHeight( n.getLeft() ),
						 treeHeight( n.getRight() ) ); 
}
```

### Pre-order traversal
**Problem:** Informally, a preorder traversal involves walking around the tree in a counter-clockwise manner starting at the root, sticking close to the edges, and printing out the nodes as you encounter them. Perform a preorder traversal of a binary search tree, printing the value of each node.

We can solve this by:
1. Print out the root (or the subtree root) value.
2. Do a preorder traversal on the left sub-tree.
3. Do a preorder traversal om the right sub-tree.

```java
void preorderTraversal( Node root ){
	if( root == null ) return;
	root.printValue();
	preorderTraversal( root.getLeft() );
	preorderTraversal( root.getRight() ); 
} 
```

This is O(n)

The inorder and post order traversals are almost identical:
```java
void inorderTraversal( Node root ){
	if( root == null ) return;
	inorderTraversal( root.getLeft() );
	root.printValue();
	inorderTraversal( root.getRight() ); 
}
	
void postorderTraversal( Node root ){
	if( root == null ) return;
	postorderTraversal( root.getLeft() );
	postorderTraversal( root.getRight() );
	root.printValue(); 
}
```
### Pre-order traversal, no recursion
Recursion implicitly uses a stack data structure by placing data on the call stack. That means there should be an equivalent solution that avoids recursion by explicitly using a stack.

The recursive call serves to implicitly store the address of the right subtree on the stack, so it can be travesed after the left subtree traversal is complete. Each time you print a node and move onto its left child, the right child is first stored on an implicit stack. Whnever there is no child you return from a recrusive call, effectively popping a right child node off the implicit stack, so you can carry on traversing.

Push both children onto the stack so you don't have to do the ligc seperately for the left child.

The algorithm can be summarised as follows:
- Create the stack
- Push the root node onto the stack
- While the stack is not empty
    - Pop a node
    - print its value
    - if right child exists, push the node's right child
    - if the left child exists, push the node's left child.

```java
void preorderTraversal( Node root ){
	NodeStack stack = new NodeStack();
	stack.push( root );
	while( stack.size() > 0 ){
		Node curr = stack.pop();
		curr.printValue();
		Node n = curr.getRight();
		if( n != null ) stack.push( n );
		n = curr.getLeft();
		if( n != null ) stack.push( n );
	} 
}
```

You don't have the overhead of many recursive function calls in this implementation. But the stack used here probably requires dynamic memory allocation, so unclear which is better. 
time is O(n).

### Lowest Common Ancestor
**Problem:**  Given the value of two nodes in a binary search tree, find the lowest (nearest) common ancestor. You may assume that both values already exist in the tree. 

An intuitive solution is to make lists of all the ancestorys of both nodes and then search through tee two lists to find the first node where they differ. The node immediately above thhis divergence is hte lowest common ancestor.  
There is one property of a binary tree which makes this easier: the lowest common ancestor will be the first number you find which is inbetween both nodes.

This algorithm can be summarised as:
- Examine the current node If value1 and value2 are both less than the current node's value
    - Examine the left child If value1 and value2 are both greater than the current node's value
    - Examine the right child Otherwise
    - The current node is the lowest common ancestor

And can be implemented like this:
```java
Node findLowestCommonAncestor( Node root, int value1, int value2 ){
	while( root != null ){
		int value = root.getValue();
			
	if( value > value1 && value > value2 ){
			root = root.getLeft();
		} else if( value < value1 && value < value2 ){
			root = root.getRight();
		} else {
			return root;
		}
	}

	return null; // only if empty tree 
} 
```

Running time?  
Recall that travelking a path to any one node takes O(log n). In addition, this is slightly more efficient than a similar recursive solution because you don’t have the overhead of repeated function calls.

### Unbalanced binary search tree
**Problem:** Given an unbalanced binary search tree with more nodes in the left subtree than the right, reorganize the tree to improve its balance while maintaining the properties of a binary search tree

The solution is to take a new root. If we're in a sub-tree we would need to make sure we update the parent with the new root. To rebalance a whole tree would we need to rotate the tree at each level all the way down to the "new" root?

The algorithm for this is:
```java
public static Node rotateRight( Node oldRoot ){
	Node newRoot = oldRoot.getLeft();
	oldRoot.setLeft( newRoot.getRight() );
	newRoot.setRight( oldRoot );
	return newRoot; 
} 
```

### Binary Search Tree
Is a binary tree where each node has a Comparable key and an associated value and satisfies the restriction that the key in any node is larger than the keys in all nodes to the left and smaller than the keys in all ndoes to the right.
```java
public class  BST<Key extends Comparable<Key>, Value> {
    private Node root; // root of BST
    private class  Node   {
        private Key key;              // key
        private Value val;            // associated value
        private Node left, right;     // links to subtrees
        private int N;                // # nodes in subtree rooted here

        public Node(Key key, Value val, int N)      {
            this.key = key; this.val = val; this.N = N;
        }
    }

    public int size()   {
        return size(root);
    }

    int size(Node x)   {
        if (x == null) return 0;
        else
            return x.N;
    }

    public  Value get(Key key) {
        return get(root, key);
    }

    private Value get(Node x, Key key) {
        // Return value associated with key in the subtree rooted at x;
        // return null if key not present in subtree rooted at x.
        if (x == null) return null;   int cmp = key.compareTo(x.key);
        if      (cmp < 0) return get(x.left, key);
        else if (cmp > 0) return get(x.right, key);
        else return x.val;
    }

    public void put(Key key, Value val) {
        // Search for key. Update value if found; grow table if new.
        root = put(root, key, val);
    }

    private Node put(Node x, Key key, Value val) {
        // Change key’s value to val if key in subtree rooted at x.
        // Otherwise, add new node to subtree associating key with val.
        if (x == null) return new Node(key, val, 1);
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = put(x.left,  key, val);
        else if (cmp > 0) x.right = put(x.right, key, val);
        else x.val = val;   x.N = size(x.left) + size(x.right) + 1;
        return x;
    }

    public Key min() {
        return min(root).key;
    }

    private Node min(Node x) {
        if (x.left == null)
            return x;
        return min(x.left);
    }

    public Key floor(Key key) {
        Node x = floor(root, key);
        if (x == null) return null;
        return x.key;
    }

    private Node floor(Node x, Key key) {
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if (cmp == 0) return x;
        if (cmp < 0)  return floor(x.left, key);
        Node t = floor(x.right, key);
        if (t != null) return t;
        else return x;
    }

    public Key select(int k) {     
        return select(root, k).key; 
    } 
        
    private Node select(Node x, int k) {   
        // Return Node containing key of rank k.    
        if (x == null) return null;    
        int t = size(x.left);    
        if      (t > k) return select(x.left,  k);    
        else if (t < k) return select(x.right, k-t-1);    
        else            return x; 
    } 
        
    public int rank(Key key) {  
        return rank(key, root);  
    } 
    
    private int rank(Key key, Node x) {  
        // Return number of keys less than x.key in the subtree rooted at x.   
        if (x == null) return 0;   
        int cmp = key.compareTo(x.key);   
        if      (cmp < 0) return rank(key, x.left);   
        else if (cmp > 0) return 1 + size(x.left) + rank(key, x.right);   
        else              return size(x.left);
    }
}
```

### Balanced search trees
These are trees where we want the height to be logN.

### 2-3 Search Trees
Is empty or:
- A 2-node, with 1 key and associated value and two links, a left link to a 2-3 tree with smaller keys and a right link to a 2-3 tree with larger keys
- A 3-nde, with two keys (and assicated values) and their links, a left link to a 2-3 tree with smaller keys, a middle link to a 2-3 tree with keys between the nodes kets, and a right link to a 2-3 search tree with larger keys.

### Red-Black trees
Need to look this up.

### Tries
Is a search tree.  
Each node has R links, where R is the alphabet size. We can view each link as pointing to a trie. Composed of nodes that contain links that are either null or references to other nodes.  
Each link corresponds to a chracter value - since each link points to exactly one node, we label each node with the chracter value corresponding to the link that points to it. Each node has a value which may be null or the vaslue associated with one of the string keys in the symbol table. We store the value assoicated with each key in the node corresponding to its last character.
| Key    | Value |
|--------|-------|
| by     | 4     |
| sea    | 1     |
| sells  | 1     |
| she    | 0     |
| shells | 3     |
| the    | 5     |
- copy graph from page 17 on paper   
Seach hits take time proportional to the legnth of the search key.  
Search misses involve examining only a few chracters.   
The vlaue of non-terminating nodes is null, so we known that a substring isn't a valid search term.
```java
public class  TrieST<Value> {   
    private static int R = 256; // radix   
    private Node root;          // root of trie   
    private static class Node   {      
        private Object val;      
        private Node[] next = new Node[R];   
    }   
    
    public Value get(String key)   {      
        Node x = get(root, key, 0);      
        if (x == null) return null;      
        return (Value) x.val;   
    }
    
    private Node get(Node x, String key, int d)   {  
        // Return value associated with key in the subtrie rooted at x.      
        if (x == null) return null;      
        if (d == key.length()) return x;      
        char c = key.charAt(d); // Use dth key char to identify subtrie.      
        return get(x.next[c], key, d+1);   
    }   
    
    public void put(String key, Value val)   {  
        root = put(root, key, val, 0);  
    }   
    
    private Node put(Node x, String key, Value val, int d)   {  
        // Change value associated with key if in subtrie rooted at x.      
        if (x == null) x = new Node();      
        if (d == key.length()) {  
            x.val = val; return x; 
        }      
        char c = key.charAt(d); // Use dth key char to identify subtrie.
        x.next[c] = put(x.next[c], key, val, d+1);      
        return x;   
    } 
}
```







































































































# Heaps
Is a specialized tree-based data structure.
The heap is one maximally efficient implementation of an abstract data type calle da priority queue, and in fact, priority queues are oftne referred to as "heaps", regardless of how they may be implemented.  
In a heap, the highest or lower priority element is always stored at the root. However, a heap is not a sorted structure; it can be regarded as being partially ordered. A heap is a useful data structure when it is necessary to repeatedly remove the object with highest (or lowest) priority.

Binary max-heap is a binary tree where the value of each node is at least the value of its children.

A common implementation of a heap is the binary heap, in which the tree is a binary tree.

It was introduced as a data structure for the heapsort sorting algorithm.

There is no implied ordering between siblings or cousins, and no implied sequence for an in-order traversal.

The heap relation mentioned above applies only between nodes and their parents/grandparents, etc.

Heaps are usually implemented using an array (fixed size or dynamic).

The first (or last) element will contain the root. The children of the node at position n will be at positions 2n +1 and 2n+2.  
Parent element is at (n-1)/2 position (floored).  

Balancing a heap is done by sift-up or sift-down operations (swapping elements which are out of order). As we build a heap from an array without requiring extra memory (for the nodes, for example), heapsort can be used to sort an array in-place.

## Operations
To insert an element we insert it at the next available leaf (does it matter if we go left or right?). We then sift the element up to its rightful place by swapping values with parents. Inserting is therefore big O(h) where h is tree height.

To extract the max element (whic his the root), we replace it with one of the leaves and then sift it down. We choose the child with the largest element, as then we will fix violations on both of the roots edges.

To change the priority of an element, we need to change the value and then sift it up or down. O(tree height).  

To remove an element, we change the priority of the element to infinity, let it sift up, and then extract the maximum, which will replace the root with a leaf node and sift it down. the run time is also O( tree height).

### Keeping the tree complete
For insert, insert the element as a leaf in the leftmost vacant position in the last level and let it sift up.

To extract the maximum value, replace the root by the last leaf and let it sift down.

## Pseudocode for heap
We need:
- maxSize: maximum number of elements in the heap
- size: is the size of the heap
- H[1 ... maxSize]: is an array of length maxSize where the heap occupies the first size elements.

Functions:
- parent(i): returns (i+1/2) floored.
- leftChild(i): return 2i+1
- rightChild(i): return 2i + 2
- siftUp(i): 
```
while i > 1 and H[Parent(i)] < H[i]:
    swap H[Parent(i)] and H[i]
    i <- Parent(i)
```
- siftDown(i):
```
maxIndex <- i
l <- leftChild(i)
if l <= size and H[l] > H[maxIndex]:
    maxIndex <- l
r <- rightChild(i)
if r <= size and H[r] > H[maxIndex]:
    maxIndex <- r
if i =/= maxIndex:
    swap H[i] and H[maxIndex]
    siftDown(maxIndex)
``` 
- ExtractMax():
```
result <- H[1]
H[1] <- H[size]
size <- size - 1
siftDown(1)
return result
```
- remove(i)
```
H[i] <- infinity
siftUp(i)
ExtractMax()
```

The resulting implementation is 
- fast, all ops work in time O(log n).
- space efficient: we store an array of priorities, parent child connections are not stored, but are computed on the fly
- easy to implement: all operations are impletements in just a few lines of code.

## HeapSort
create an empty priority queue
```

for i from 1 to n:
    Insert(A[i])
for i from n downto 1:
    A[i] <- ExtractMax()

```
This has O(n log n) running time.  
It is a natural generalisation of selection sort: instead of scanning the rest of the array to find the nax value, we use a smart data structure

However this is not an in-place algorithm, it uses additional space to store the priority queue.

Instead what we want to do is turn a given array into a heap by permuting its elements, so the search will be in place

To do this:
```
BuildHeap(A[1...n]):
    size <- n
    for i from floor(n/2) downto 1:
        SiftDown(i)
```
We don't have to fix the leaf nodes, they don't have any children so no invariants, start at the second to last level in the tree.  

This is O(n log n) as siftDown is log n and we call it n times.

So HeapSort is now:
```
BuildHeap(A)
repeat (n - 1) times:
    swap A[1] and A[size]
    size <- size - 1
    siftDOwn(1)
```

This is too pessimistic however, sift up is n log n, sift donw is O(n) as you move the levels which have the least elements the most.

Heap sort is still O(n log n ) however, as we need to extract the maximum

In heap sort, pushing elements down from the root is faster than pushing up from the bottom. Have to move less elements. So when inserting into a heap, get elements unsorted into an array and then push them down to correct order. O(n) operation.

Heap sort is not stable

### Implementation
```java
public class ArrayHeap<T extends Comparable<T>> implements Heap<T> {

    private List<T> backingArray = new ArrayList<>();

    @Override
    public void insert(T element) {
        backingArray.add(element);
        siftUp(backingArray.size()-1);
    }

    @Override
    public T getMax() {
        if(backingArray.isEmpty()) return null;
        return backingArray.get(0);
    }

    @Override
    public int getSize() {
        return backingArray.size();
    }

    @Override
    public boolean isEmpty() {
        return backingArray.isEmpty();
    }

    @Override
    public T extractMax() {
        if (backingArray.isEmpty()) return null;
        T result = backingArray.get(0);
        replaceIndexWithLastLeafAndSort(0);
        return result;
    }

    @Override
    public T remove(int index) {
        if(index > getSize()-1) throw new IllegalArgumentException("index cannot be bigger than size");
        T removed = backingArray.get(index);
        replaceIndexWithLastLeafAndSort(index);
        return removed;
    }

    private void replaceIndexWithLastLeafAndSort(int index) {
        int lastElementIndex = backingArray.size() - 1;
        backingArray.set(index, backingArray.get(lastElementIndex));
        backingArray.remove(lastElementIndex);
        siftDown(index);
    }

    private void siftUp(int index) {
        int currentElementIndex = index;
        while(currentElementIndex > 0) {
            int parentIndex = getParentIndex(currentElementIndex);

            T parentElement = backingArray.get(parentIndex);
            T currentElement = backingArray.get(currentElementIndex);

            //if current element is smaller than parent, we're done
            if(currentElement.compareTo(parentElement) < 0) break;

            // swap elements
            backingArray.set(parentIndex, currentElement);
            backingArray.set(currentElementIndex, parentElement);

            currentElementIndex = parentIndex;
        }
    }

    private int getParentIndex(int childIndex) {
        return (int) Math.floor((childIndex - 1) / 2.0);
    }

    private void siftDown(int index, int sizeOfHeap) {
        int currentElementIndex = index;
        int maxParentIndex = getParentIndex(sizeOfHeap - 1);

        //if currentElementIndex is greater than maxParentIndex, that means we're at one of the leaf nodes
        // and we can stop
        while(currentElementIndex <= maxParentIndex) {
            int largerChildIndex = getLargestChildIndex(currentElementIndex, sizeOfHeap);

            T currentElement = backingArray.get(currentElementIndex);

            T largerChild = backingArray.get(largerChildIndex);
            // if element is larger than largest child, we're done
            if (currentElement.compareTo(largerChild) > 0) break;

            // swap elements
            backingArray.set(largerChildIndex, currentElement);
            backingArray.set(currentElementIndex, largerChild);

            currentElementIndex = largerChildIndex;
        }
    }

    private void siftDown(int index) {
        siftDown(index, getSize());
    }

    private int getLeftChildIndex(int parentIndex) {
        return  (parentIndex*2) + 1;
    }

    private int getRightChildIndex(int parentIndex) {
        return (parentIndex*2) + 2;
    }

    private int getLargestChildIndex(int parentIndex, int size) {
        int leftChildIndex = getLeftChildIndex(parentIndex);
        // if left child is last element, there is no right child
        if(leftChildIndex == size-1) return leftChildIndex;
        int rightChildIndex = getRightChildIndex(parentIndex);
        return (backingArray.get(leftChildIndex).compareTo(backingArray.get(rightChildIndex)) < 0) ? rightChildIndex : leftChildIndex;
    }

    static <Y extends Comparable<Y>> ArrayHeap<Y> heapify(List<Y> elements) {
        int maxParentIndex = (elements.size() - 1)/2;
        ArrayHeap<Y> heap = new ArrayHeap<>();
        heap.backingArray = elements;
        for(int i = maxParentIndex; i >= 0 ; i--) {
            heap.siftDown(i);
            heap.printHeap();
        }

        return heap;
    }

    static <Y extends Comparable<Y>> List<Y> heapSort(List<Y> elements) {
        ArrayHeap<Y> heap = ArrayHeap.heapify(elements);
        heap.heapSort();
        return heap.backingArray;
    }

    private void heapSort() {
        for(int i = getSize() - 1; i >= 0 ; i--) {
            T lastElement = backingArray.get(i);
            T maxElement = backingArray.get(0);
            backingArray.set(0, lastElement);
            backingArray.set(i, maxElement);
            siftDown(0, i);
        }
    }

    @Override
    public void printHeap() {
        System.out.println(Arrays.toString(backingArray.toArray()));
    }
}
```

## Heaps
Heaps are trees (usually binary trees) where (in a max-heap) each child of a node has a value less than or rqual to the node's own value. The root node alwayus has the largest value in the tree.

### Binary Tree to Heap

A Binary Heap is a Binary Tree with following properties.
1) It’s a complete tree (All levels are completely filled except possibly the last level and the last level has all keys as left as possible). This property of Binary Heap makes them suitable to be stored in an array.

2) A Binary Heap is either Min Heap or Max Heap. In a Min Binary Heap, the key at root must be minimum among all keys present in Binary Heap. The same property must be recursively true for all nodes in Binary Tree. Max Binary Heap is similar to MinHeap.

A Binary Heap is a Complete Binary Tree. A binary heap is typically represented as an array.

The root element will be at Arr[0].
For the rest of the elements:
| Index        | Node                         |
|--------------|------------------------------|
| Arr[i-1/2]   | Returns the parent node      |
| Arr[(2*i)+1] | Returns the left child node  |
| Arr[(2*i)+2] | Returns the right child node |

The key to constructing the balaced heap from the array is identifying the location of a node's children relative to the node itself. If you arrange the nodes of a binary tree in an array by level, the root node (at index 0) has children at index 1 adnd 2. The node at index 1 has children at 3, and 4, etc.

As we have to do a sort the complexity is atleast O(n log n).

```java
public static Node heapifyBinaryTree( Node root ){

	int size = traverse( root, 0, null ); // Count nodes
	Node[] nodeArray = new Node[size];
	traverse( root, 0, nodeArray );
	   // Load nodes into array 

	// Sort array of nodes based on their values, using Comparator object
	Arrays.sort( nodeArray, new Comparator<Node>(){
		@Override public int compare(Node m, Node n){
			int mv = m.getValue(), nv = n.getValue();
			return ( mv < nv ? -1 : ( mv == nv ? 0 : 1));
		}
	});

	// Reassign children for each node
	 for( int i = 0; i < size; i++ ){
	int left = 2*i + 1;
		int right = left + 1;
		nodeArray[i].setLeft( left >= size ? null : nodeArray[left] );
		nodeArray[i].setRight( right >= size ? null : nodeArray[right] );
	}
	return nodeArray[0]; // Return new root node 
}

public static int traverse( Node node, int count, Node[] arr ){
	if( node == null )
		return count;
	if( arr != null )
		arr[count] = node;
	count++;
	count = traverse( node.getLeft(), count, arr );
	count = traverse( node.getRight(), count, arr );
	return count; 
}
```





























































































# Graphs

## Adjacency matrix
We can hold a matrix which represents connections (edges) between vertices. The size of the matrix is V x V, where V is the number of vertices. The vlaue is either 0 or 1, depending if there is a connection.

### pros
adding, removing, and checking edges is constant time.  
If the graph is dense and the number of edges is large, matrix should be finrst choice.  

### Cons
Is a memory hog, Graphs don't usually have too many connections, so an adjacency list is often better.

while basic operations are easy, operations like inEdges and outEdges are expensive.

### Programming
There are hard to set up when you want to store both vertices and edges. If you just want to store edges you can use them like this:
```java
// matrix is quite hard to represent with data, so we do with the notion of just having nodes represented by indices
public class GraphAdjMatrix {
    private boolean adjMatrix[][];
    private int numVertices;

    public GraphAdjMatrix(int numVertices) {
        this.numVertices = numVertices;
        adjMatrix = new boolean[numVertices][numVertices];
    }

    public void addEdge(int i, int j) {
        adjMatrix[i][j] = true;
        adjMatrix[j][i] = true;
    }

    public void removeEdge(int i, int j) {
        adjMatrix[i][j] = false;
        adjMatrix[j][i] = false;
    }

    public boolean isEdge(int i, int j) {
        return adjMatrix[i][j];
    }

    public String toString() {
        StringBuilder s = new StringBuilder();
        for (int i = 0; i < numVertices; i++) {
            s.append(i + ": ");
            for (boolean j : adjMatrix[i]) {
                s.append((j?1:0) + " ");
            }
            s.append("\n");
        }
        return s.toString();
    }

    public static void main(String args[])
    {
        GraphAdjMatrix g = new GraphAdjMatrix(4);

        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 0);
        g.addEdge(2, 3);

        System.out.print(g.toString());
        /* Outputs
           0: 0 1 1 0
           1: 1 0 1 0
           2: 1 1 0 1
           3: 0 0 1 0
          */
    }

}
```

## Adjacency list
With a list, you hold the vertex and all of the edges that the vertex is connected to. If the graph is undirected then if you have a connection fron A to B, you have to put that edge in A's adjacency list and B adjacency list.
```java
public class GraphAdjLists {
    private LinkedHashMap<Vertex, List<Vertex>> adjVertices = new LinkedHashMap<>();

    void addVertex(String label) {
        adjVertices.putIfAbsent(new Vertex(label), new ArrayList<>());
    }

    void removeVertex(String label) {
        Vertex v = new Vertex(label);
        adjVertices.values().stream().forEach(e -> e.remove(v));
        adjVertices.remove(new Vertex(label));
    }

    void addEdge(String label1, String label2) {
        Vertex v1 = new Vertex(label1);
        Vertex v2 = new Vertex(label2);
        adjVertices.get(v1).add(v2);
        adjVertices.get(v2).add(v1);
    }

    void removeEdge(String label1, String label2) {
        Vertex v1 = new Vertex(label1);
        Vertex v2 = new Vertex(label2);
        List<Vertex> eV1 = adjVertices.get(v1);
        List<Vertex> eV2 = adjVertices.get(v2);
        if (eV1 != null)
            eV1.remove(v2);
        if (eV2 != null)
            eV2.remove(v1);
    }

    public String getRoot() {
        return adjVertices.entrySet().iterator().next().getKey().label;
    }

    public List<Vertex> getAdjVertices(String vertex) {
        return adjVertices.get(new Vertex(vertex));
    }

    public void bfs(){
        //start from root, and print out the value, then add the children to the queue,
        // and process each node like this
        // need to keep a list of nodes that were visited, such that we don't print them again
        // as this is an undirected graph (we add vertices to both lists)
        if(adjVertices.isEmpty()) return;

        String root = getRoot();
        Set<String> visited = new HashSet<>();
        Queue<String> nodesToVisit = new LinkedList<>();
        nodesToVisit.add(root);

        while(!nodesToVisit.isEmpty()) {
            String nodeToVisit = nodesToVisit.poll();
            System.out.println("Node visited: " + nodeToVisit);
            visited.add(nodeToVisit);
            getAdjVertices(nodeToVisit).forEach(vertex -> {
                String label = vertex.label;
                if(!visited.contains(label)) nodesToVisit.add(label);
            });
        }
    }

    public void dfs() {
        // start at the root, then recursively go to the next element
        // if node hasn't been visited, then print the value, add to visit list
        // and recursive with that nodes vertices
        // if node has been visited, return
        // base case;
        // node has been visited, return
        // at end of list of vertices, return
        dfs(new HashSet<>(), getRoot());
    }

    public void dfs(Set<String> visited, String nodeToVisit) {
        if(visited.contains(nodeToVisit)) return;
        System.out.println("Visited node: " + nodeToVisit);
        visited.add(nodeToVisit);
        List<Vertex> neighbours = getAdjVertices(nodeToVisit);
        List<String> neighbourLabels = neighbours.stream().map(n -> n.label).collect(Collectors.toList());
        for (int i = 0; i < neighbours.size(); i++) {
            dfs(visited, neighbourLabels.get(i));
        }
    }

    public void dfsIterative() {
        Set<String> visited = new HashSet<>();
        Stack<String> toVisit = new Stack<>();
        String root = getRoot();
        toVisit.add(root);
        while(!toVisit.isEmpty()) {
            String visitedNode = toVisit.pop();
            System.out.println("Visited node: " + visitedNode);
            visited.add(visitedNode);
            List<Vertex> neighbours = getAdjVertices(visitedNode);
            for (int i = neighbours.size() - 1; i >= 0; i--) {
                String label = neighbours.get(i).label;
                if(!visited.contains(label)) toVisit.push(label);
            }
        }
    }

    public static void main(String args[]) {
        GraphAdjLists graph = new GraphAdjLists();
        graph.addVertex("Bob");
        graph.addVertex("Alice");
        graph.addVertex("Mark");
        graph.addVertex("Rob");
        graph.addVertex("Maria");
        graph.addVertex("John");
        graph.addEdge("Bob", "Alice");
        graph.addEdge("Bob", "Rob");
        graph.addEdge("Alice", "Mark");
        graph.addEdge("Alice", "John");
        graph.addEdge("Rob", "Maria");

        System.out.println("============== BFS =====================");
        graph.bfs();

        System.out.println("============== DFS =====================");
        graph.dfs();

        System.out.println("============== DFS (Iterative) =========");
        graph.dfsIterative();
    }


    class Vertex {
        String label;
        Vertex(String label) {
            this.label = label;
        }

        // equals and hashCode

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Vertex vertex = (Vertex) o;
            return Objects.equals(label, vertex.label);
        }

        @Override
        public int hashCode() {
            return Objects.hash(label);
        }
    }
}
```

# Graphs
Graphs are like trees. They consist of nodes with children - a tree is actually a special case of a graph.

Graph nodes = vertices.  
The lniks between nodes as well the nodes themselves may have values or weights. These are called edges.  
one way edges = direct graph  
two way edges = undirected graph

We can represent a graph where aech node has an adjacency list of references to toher nodes.  
Another way is an adjacency matrix, which is a square matrix with dimensions equal to the number of nodes.  

The matrix element at position i, j represents the number of edges extending from node i to j.  

### Six degrees of Kevin Bacon
**Problem:** The game “Six Degrees of Kevin Bacon” involves trying to find the shortest connection between an arbitrarily selected actor and Kevin Bacon. Two actors are linked if they appeared in the same movie. The goal of the game is to connect the given actor to Kevin Bacon using the fewest possible links. Given a list of all major movies in history and their casts (assume that the names of movies and actors are unique identifiers), describe a data structure that could be constructed to efficiently solve Kevin Bacon problems. Write a routine that uses your data structure to determine the Bacon number (the minimum number of links needed to connect to Kevin Bacon) for any actor.

A graph is well suited for this problem.

We will need an actor graph node class to represent an actor in the graph
```java
public class ActorGraphNode {
    private String name;
    private Set<ActorGraphNode> linkedActors;
    public ActorGraphNode( String name ) {
        this.name = name;
        this.linkedActors = new HashSet<ActorGraphNode>();
    }

    public void linkCostar(ActorGraphNode costar) {
        linkedActors.add(costar);
        costar.linkedActors.add(this);
    }
}
```
We have a bidirectional graph of actors (so we can traverse both ways).

If we were to go through a list of movies it would be best to hold a list of all of the actors to add hydrate the graph.

We then have to find the length of the shortest path to the kevin bacon node.

We don't use dijkstra's algorithm as that is for weighted edges, not finding the least number of edges.

It's important to note that we'll need to keep a list of unvisited nodes such that we don't get caught in a loop. Then our base case will be when we have a node where

We could try depth first search, but that isn't really going to find us the shortest path. As we're going as far down as we can and then back tracking, most of the time we'd find the longest route. If we did use this then we'd need a base case. Our base case would be a node with no unvisited costars (so we don't get stuck in a cyclic loop).

The best strategy is to use breadth-first search.

To do this we will need to:
- start by visiting each of the nodes adjacent to the starting noode
- then need to visit all the unvisted nodes adjacent to each of these nodes as well, but not until after we visit all the nodes adjacent to the start node.
- We should use a queue to keep track of unvisited nodes as we discover them so we can come back to them when it's their turn.
    - prepare the queue by adding the start node. On each iterative cycle, remove a node from the front of the queue, and add each unvisited adjacent node to the ned of the queue.
    - You're done when you find ytour target node or the queue is empty.
- We will need to mark each node that we find with the bacon number so we know the degrees of seperation when we find kevin bacon

This can be summarised as:
- Create a queue and initialize it with the start node While the queue is not empty
	- Remove the first node from the queue
	- If it is the target node, return its Bacon number
	- For each node adjacent to the current node
	- If the node is unvisited (Bacon number is -1)
		- Set the Bacon number to current node's Bacon number + 1
		- Add the adjacent node to the end of the queue 
- Return failure because the loop terminated without finding the target

An optimisation we can make is to precalculate all bacon numbers for all actors, then when we want the number we can just go and look at that actors bacon number.
```java
private int baconNumber = -1;
public int getBaconNumber() { return baconNumber; }

// To be called only on the Kevin Bacon node
public void setBaconNumbers(){
	baconNumber = 0;
	Queue<ActorGraphNode> queue = new LinkedList<ActorGraphNode>();
	queue.add( this );
	ActorGraphNode current;
	while( (current = queue.poll()) != null ){
		for( ActorGraphNode n : current.linkedActors ){
			if( -1 == n.baconNumber ){  //if node is unvisited
				n.baconNumber = current.baconNumber + 1;
				queue.add( n );
			}
		}
	}
}
```

The runtime for this is O(m + n) where m is the number of nodes, and n is the edges. We expect n >>m, so this reduces to O(n)
















































































# Arrays and Strings


## Strings


## Array and String problems
Many array and string problems require the use of additional temporary data structures to acheive the most efficient solution. In languages where strings are objects, it may be more efficient to convert the string to an array than to process it directly as a string.




























































# Recursion

A recursive function performs a task in part by calling itself to perform the subtasks. At some point, the function encounters a subtask that it can perform without calling itself. This case, in which the function does not recurse, is called the base case; the former, in which the function calls itself to perform a subtask, is referred to as the recursive case.

This is an example of a recursive function:
```c
int factorial( int n ){
	if (n > 1) {
		/* Recursive case */        
		return factorial(n-1) * n;    
	} else {        
		/* Base case */        
		return 1;    
	} 
}
```

In many cases, your recursive functions may need additional data structures or an argument that tracks the recursion levle. Often the best solution in such cases is to move the data structure or argument initialisation into a separate function, This wrapper function ,which performs initialisation and then calls the purely recursive function, provides a clea, simple interface to the rest of the program.

Although recursion is a powerful technique, it is not always the best approach, and rarely is it the most efficient approach. This is due to the relatively large overhead for function calls on most platforms. For a simple recursive function like factorial, many computer architectures sped more time on call overhead than on the actual calculation.  Iterative functions, which use looping constructs instead of recursive function calls, do not suffer from this overhead and are frequently more efficient.

Any problem that can be solved recursively can also be solved iteratively. Iterative algorithms are often easy to write, even for tasks that might appear to be fundamentally recursive. As an example, here is how we can do factorial:
```c
int factorial( int n ){
	int i, val = 1;
	for( i = n; i > 1; i-- )  /* n = 0 or 1 falls through */
		val *= i;
	return val; 
} 
```
It is significantly more efficient than the previous recursive implementation because it doesn't make any additional function calls.  
You can eliminate the need for recursive calls by allocating your own stack and manually storing and retrieving local variable values from this stack.  
Implementing this type of stack-based iterative function tends to be significantly more complicated than implementing an equivalent function using recursive calls. Furthermore, unless the overhead for the stack you use is significantly less than the function call overhead, a function written this way won't be more efficient than a conventional recursive implementation. Therefore you should implement recursive algorithms with recrusive calls unless instructed otherwise.  

In an interview, a working solution is of primary importance; an efficient solution is secondary.

## Tail recursion
A recursive function is tail recurisve when the recursive call is the last thing executed by the function. For example the following C++ function print() is tail recurisve.
```c
void print(int n) 
{ 
    if (n < 0)  return; 
    cout << " " << n; 
  
    // The last executed statement is recursive call 
    print(n-1); 
}
```
Tail recursive functions are considered better than non-tail recursive functions as tail-recursion can be optimised by the compiler. The idea used by compilers to optimise tail-recursive functions is simple, since the recursive call is the last statmeent, there is nothing left to do in the current function, so saving the current function's stack frame is of no use.

### How to rewrite a non-tail recursive function to be tail-recursive?
Consuider this algorithm:
```java
// A NON-tail-recursive function. 
// The function is not tail 
// recursive because the value  
// returned by fact(n-1) is used 
// in fact(n) and call to fact(n-1) 
// is not the last thing done by 
// fact(n) 
static int fact(int n) 
{ 
	if (n == 0) return 1; 
	
	return n*fact(n-1); 
} 
	
// Driver program 
public static void main(String[] args) 
{ 
	System.out.println(fact(5)); 
} 
```
Although it looks tail recursive, we can see that the value returned by `fact(n-1)` is used in `fact(n)`, so the call to `fact(n-1)` is not the last thing done by `fact(n)`.  

We can write this as a tail recursive function, where we use one more argument and accumulate the factorial value in the second algorithm. When `n` reaches 0, return the accumulated value.
```java
// A tail recursive function  
// to calculate factorial 
static int factTR(int n, int a) 
{ 
	if (n == 0)  
		return a; 
	
	return factTR(n - 1, n * a); 
} 
	
// A wrapper over factTR 
static int fact(int n) 
{ 
	return factTR(n, 1); 
} 

// Driver code 
static public void main (String[] args) 
{ 
	System.out.println(fact(5)); 
} 
```
































































## Data Structures
### Synbol Table
A data structure for key-value pairs that support two operations:;
- insert (put) a new pair into the table ans search for (get) the value associated with a given key.

















Image by <a href="https://pixabay.com/users/Manuchi-1728328/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2462436">Денис Марчук</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2462436">Pixabay</a>

