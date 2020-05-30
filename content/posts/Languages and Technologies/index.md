---
path: "/languages-and-technologies"
cover: "./chris-ried-ieic5Tq8YMk-unsplash.jpg"
title: "Languages and Technologies"
published: true
date: "2020-04-07"
---

# Generate Algorithms

## Questions

### What is Multithreading?
a multithreaded program contains two or more parts that can run concurrently and each part can handle different tasks at the same time, making optimal use of the available resources specially when your computer has multiple CPUs.
In java, if your class is intended to be executed as a thread then you can achieve this by implementing the Runnable interface.
You need to implement a run() method provided by the Runnable interface.
Also need to create a new thread and pass the object, like so:
```java
public void start ()
   {
      System.out.println("Starting " +  threadName );
      if (t == null)
      {
         t = new Thread (this, threadName);
         t.start ();
      }
   }
```

You can also extend Thread. It is preferable to use runnable. implementing runnable 


### What are the different states of a thread?
![img](https://howtodoinjava.com/wp-content/uploads/2016/04/Java-Thraed-Life-Cycle-States.jpg)

### What is the difference between a thread and a process?
Both processes and threads are independent sequences of execution. The typical difference is that threads of the same process run in a shared memory space, while processes run in separate memory spaces.
When you start a new application you start a new process. A thread is a path of execution within that process. As threads share the same address space they can read and write to the same data structures and variables, and they can also communicate. Communication between processes - also known as IPC is quite difficult and resource-intensive.
The overhead between threads is very low relative to processes
Threads are considered lightweight because they use far less resources than processes.


### What is the heap and stack?
The stack is the memory set aside as scratch space for a thread. When a function is called, a block is reserved on the top of the stack for local variables and some bookkeeping data. When the function returns, the block becomes unused and can be used the next time a function is called.

The heap is memory set aside for dynamic allocation. Unlike the stack, there’s no enforced pattern to the allocation and deallocation of blocks from the heap. Typically only one heap for an application. The size of the heap is set on application startup, but can grow as space is needed.

The stack is faster because the access pattern makes it trivial to allocate and deallocate memory from it (a pointer/integer is simply incremented or decremented), while the heap has much more complex bookkeeping involved in an allocation or free. Also, each byte in the stack tends to be reused very frequently which means it tends to be mapped to the processor’s cache, making it very fast. Another performance hit for the heap is that the heap, being mostly a global resource, typically has to be multithreading safe.

### What are dynamic and static languages? What are the benefits?
In a statically typed language, the types of variables are known at compile time. In a dynamically typed language, the types are only determinable at runtime.
Static type systems allow IDEs and compilers to spot programmer errors at the earliest stage possible, but usually at the cost of expressiveness.

### Name some different types of testing.
- Black box testing
  - Internal system design is not considered in this testing. Tests are based on requirements and functionality
- White box testing
  - This testing is based on knowledge of the internal logic of an application’s code.
  - Internal software and code working should be known for this type of testing.
  - Tests are based on coverage of code statements, branches, paths, conditions.
- Unit testing
  - Testing of individual software components or modules.
  - Typically done by the programmer and not by tests, as it requires detailed knowledge of the internal program design and code.
- Integration testing
  - Testing of integrated modules to verify combined functionality after integration.
  - Modules are typically code modules, individual applications, client and server applications on a network, etc.
  - This type of testing is especially relevant to client/server and distributed systems.
- Functional testing
  - This type of testing ignores the internal parts and focuses on whether the output is as per requirement or not.
  - Black-box type testing geared to functional requirements of an application.
- Load testing
  - It's a performance test to check system behaviour under load.
  - Testing an application under heavy loads, such as testing of a web site under a range of loads to determine at what point the system’s response time degrades or fails.
- Stress testing
  - System is stressed beyond its specifications to check how and when it fails. 
  - Performed under heavy load like putting large number beyond storage capacity, complex database queries, continuous input to system or database load.
- Acceptance testing
  - Normally this type of testing is done to verify if the system meets the customer specified requirements. 
  - The user or customer do this testing to determine whether to accept the appliction.

# OOP

## Questions

### What is polymporphism?
The ability to present the same interface for differing underlying forms.

### What is encapsulation? What is the primary benefit?
This is when you can have public or private data in a class. The benefit is protection from interference from the outside.

### What is abstraction?
Objects in an OOP language provide an abstraction that hides the internal implementation details. Similar to the coffee machine in your kitchen, you just need to know which methods of the object are available to call and which input parameters are needed to trigger a specific operation. But you don’t need to understand how this method is implemented and which kinds of actions it has to perform to create the expected result.

### What is an interface?
An interface is a programming structure/syntax that allows the computer to enforce certain properties on an object (class). For example, say we have a car class and a scooter class and a truck class. Each of these three classes should have a start_engine() action. How the "engine is started" for each vehicle is left to each particular class, but the fact that they must have a start_engine action is the domain of the interface.

### What is the difference between an abstract and an interface?
An interface is a contract, an empty shell. Classes implement an interface. Can implement many interfaces.
Abstract classes are actually classes, but you cannot instantiate them. They are more expensive to use because there is a look-up to do when you inherit from them. Can only extend one abstract.

### What is downcasting and upcasting?
Upcasting is casting to a supertype, while downcasting is casting to a subtype. Upcasting is always allowed, but downcasting involves a type check and can throw a ClassCastException.

# Java

## Questions

### What is a daemon thread?
Daemon thread is a low priority thread (in context of JVM) that runs in background to perform tasks such as garbage collection (gc) etc., they do not prevent the JVM from exiting (even if the daemon thread itself is running) when all the user threads (non-daemon threads) finish their execution. JVM terminates itself when all user threads (non-daemon threads) finish their execution, JVM does not care whether Daemon thread is running or not, if JVM finds running daemon thread (upon completion of user threads), it terminates the thread and after that shutdown itself.

### What do we mean by thread safety in Java?
Although multithreading is a powerful feature, it comes at a price. In multithreaded environments, we need to write implementations in a thread-safe way. This means that different threads can access the same resources without exposing erroneous behavior or producing unpredictable results. This programming methodology is known as “thread-safety”.
There are multiple ways to ensure thread safety:
- Have stateless implementations, e.g. fibonacci sequence
- Have immutable classes
- Uses thread local fields by have a field on a class of type ThreadLocal.
- Use the set of synchronisation wrappers included in the collections framework.These use intrinsic locking which means that their methods can only be accessed by one thread at a time.
- Use the set of concurrent collection wrappers to create thread-safe collections. These achieve thread-safety by dividing their data into segments. In a ConcurrentHashMap, for instance, several threads can acquire locks on different map segments, so multiple threads can access the Map at the same time.
- Atomic Objects. Atomic classes allow us to perform atomic operations, which are thread-safe, without using synchronization. An atomic operation is executed in one single machine level operation. YOu do incrementAndGet, in one execution, so its atomic.
- Synchronised methods: only one thread cna access a synchronised method at a time. Other threads will remain blocked until the first thread finishes or the method throws an exception. Synchronized methods rely on the use of “intrinsic locks” or “monitor locks”. An intrinsic lock is an implicit internal entity associated with a particular class instance.
- Synchronised statements:  synchronized(this)
- Other objects as a lock. When using this for intrinsic locking, an attacker could cause a deadlock by acquiring the intrinsic lock and triggering a denial of service (DoS) condition. On the contrary, when using other objects, that private entity is not accessible from the outside. This makes it harder for an attacker to acquire the lock and cause a deadlock.
- Volatile fields: The values of regular class fields may be cached by the CPU. Hence, consequent updates to a particular field, even if they're synchronized, might not be visible to other threads.TO prevent this situation, we can use volatile class fields. With the volatile keyword, we instruct the JVM and the compiler to store the counter variable in the main memory. Moreover, the use of a volatile variable ensures that all variables that are visible to a given thread will be read from the main memory as well.
- Reentrant locks: With intrinsic locks, thereReentrantLock instances allow us to do exactly that, hence preventing queued threads from suffering some types of resource starvation. ReentrantLock instances allow us to do exactly that, hence preventing queued threads from suffering some types of resource starvation.
- ReadWriteLock: A ReadWriteLock lock actually uses a pair of associated locks, one for read-only operations and other for writing operations. As a result, it's possible to have many threads reading a resource, as long as there's no thread writing to it. Moreover, the thread writing to the resource will prevent other threads from reading it.

### How does java achieve High Performance?
Java uses Just-In-Time compiler to enable high performance. Just-In-Time compiler is a program that turns Java bytecode, which is a program that contains instructions that must be interpreted into instructions that can be sent directly to the processor.

### Why is Java considered dynamic?
It is designed to adapt to an evolving environment. Java programs can carry extensive amount of run-time information that can be used to verify and resolve accesses to objects on run-time.

### What is the JVM and how is it considered in context of Java’s platform independent feature?
When Java is compiled, it is not compiled into platform specific machine, rather into platform independent byte code. This byte code is distributed over the web and interpreted by virtual Machine (JVM) on whichever platform it is being run.

### what is the difference between C++ and Java?
C++ extends the C language. It is very much C with classes bolted on, and still contains the procedural programming techniques, such as global variables and methods. 
In C++ you can choose to whether to dynamically or statically allocate memory for objects. In java all objects are accessed by reference, and are stored on the heap (with primitives stored on the stack).
C++ is write once, compile anywhere. Java is write once, run anywhere.
C++ runs as native executable machine code, Java runs in a virtual machine
In C++ memory management can be done manually through new/delete, or through using smart pointers. Java has automatic garbage collection.
In C++ you can overload operators, you can’t in Java.
Java contains no destructors.

### What is the difference between StringBuffer and StringBuilder?
Stringbuffer is synchronized.

### Can you destroy an object in Java?
no

### What is the finalize method?
It is a method called by the garbage collector when the gc determines that there are no more references to the object. However it is not recommended, doesn’t work with exceptions.

### What do you mean by checked exceptions?
 It is an exception that is typically a user error or a problem that cannot be foreseen by the programmer. For example, if a file is to be opened, but the file cannot be found, an exception occurs. These exceptions cannot simply be ignored at the time of compilation.

### What do you mean by runtime exceptions?
It is an exception that occurs that probably could have been avoided by the programmer. As opposed to checked exceptions, runtime exceptions are ignored at the time of compilation.

### What are generics? How do they work in Java?
They allow a type or method to operator on objects of various types while providing compile-time type safety
You can use unbounded wildcards, List<?> indicates a list which has an unknown object type.

### What is the JRE?
As the runtime environment for Java, the JRE contains the Java class libraries, the Java class loader, and the Java Virtual Machine. In this system:
The class loader is responsible for correctly loading classes and connecting them with the core Java class libraries.
The JVM is responsible for ensuring Java applications have the resources they need to run and perform well in your device or cloud environment.
The JRE is mainly a container for those other components, and is responsible for orchestrating their activities.

### What is the difference between Vector and ArrayList?
Vectors are synchronized, ArrayLists are not

### How many bits are used to represent Unicode, ASCII, UTF-16, and UTF-8 characters?
Unicode requires 16 bits and ASCII require 7 bits. Although the ASCII character set uses only 7 bits, it is usually represented as 8 bits. UTF-8 represents characters using 8, 16, and 18 bit patterns. UTF-16 uses 16-bit and larger bit patterns.

### What is the difference between the Reader/Writer class hierarchy and the InputStream/OutputStream class hierarchy?
The Reader/Writer class hierarchy is character-oriented, and the Input Stream/Output Stream class hierarchy is byte-oriented.
Basically there are two types of streams.Byte streams that are used to handle stream of bytes and character streams for handling streams of characters.In byte streams input/output streams are the abstract classes at the top of hierarchy,while writer/reader are abstract classes at the top of character streams hierarchy.

### What is a class loader?
The Java Class Loader is a part of the Java Runtime Environment that dynamically loads Java classes into the Java Virtual Machine.[1] Usually classes are only loaded on demand. The Java run time system does not need to know about files and file systems because of classloaders. Delegation is an important concept to understand when learning about classloaders.

### What is serialisation in Java?
Serialisation is a mechanism where an object can be represented as a sequence of bytes that includes the objects data as well as information about the objects type and the type of data stored in the object.It is JVM independent.
All of the fields in the class must be serialisable. If they’re not then it must be marked as transient.
The class needs to implement java.io.Serializable.

### What are synchronized methods and synchronised statements?
The synchronised keyword ensures that it is not possible for two invocations of synchronised methods on the same object to interleave. All other threads block.
When a synchronised method exits, it automatically establishes a happens-before relationship with any subsequent invocation of a synchronised method for the same object. This guarantees that changes to the state of the object are visible to all threads.

### What is runtime polymorphism or dynamic method dispatch?
Runtime polymorphism or Dynamic Method Dispatch is a process in which a call to an overridden method is resolved at runtime rather than compile-time.
In this process, an overridden method is called through the reference variable of a superclass. The determination of the method to be called is based on the object being referred to by the reference variable.

### What are the advantages of ArrayList over arrays?
Resizeable, don't need to declare size. Can grow and shrink.
How do you decide whether to use an ArrayList or a LinkedList?
If look up time is more important, and you know the index, array is better.
If insertion time (at head or tail) is more important, use linked list.

### What is the difference between the >> and >>> operators?
`>>` is arithmetic shift right, `>>>` is logical shift right.
In an arithmetic shift, the sign bit is extended to preserve the signedness of the number.
For example: -2 represented in 8 bits would be 11111110 (because the most significant bit has negative weight). Shifting it right one bit using arithmetic shift would give you 11111111, or -1. Logical right shift, however, does not care that the value could possibly represent a signed number; it simply moves everything to the right and fills in from the left with 0s. Shifting our -2 right one bit using logical shift would give 01111111.

### Can vectors and ArrayLists contain heterogenous objects?
Technically yes, if they’re subclasses of the lists type.

### What’s the difference between an inner class and a nested class?
Nested classes are divided into two categories: static and non-static. Nested classes that are declared static are simply called static nested classes. Non-static nested classes are called inner classes.
Static nested classes are accessed using the enclosing class name:
OuterClass.StaticNestedClass
Objects that are instances of an inner class exist within an instance of the outer class.
An instance of InnerClass can exist only within an instance of OuterClass and has direct access to the methods and fields of its enclosing instance.

### How does a hash map work in java?
It has a number of "buckets" which it uses to store key-value pairs in. Each bucket has a unique number - that's what identifies the bucket. When you put a key-value pair into the map, the hashmap will look at the hash code of the key, and store the pair in the bucket of which the identifier is the hash code of the key. For example: The hash code of the key is 235 -> the pair is stored in bucket number 235. (Note that one bucket can store more then one key-value pair).
When you lookup a value in the hashmap, by giving it a key, it will first look at the hash code of the key that you gave. The hashmap will then look into the corresponding bucket, and then it will compare the key that you gave with the keys of all pairs in the bucket, by comparing them with equals().

### What is the difference between C# and Java?
Properties
CLR vs JVM
NET, programs are not compiled into executable files; they are compiled into Microsoft Intermediate Language (MSIL) files, which the CLR then executes. Similar to byte code
Type Erasure, generics in IL
Has LINQ, similar to lambdas
.NET core now for unix as well

### What’s the difference between a hashtable and a hashmap?
Hashtable is synchronised, whereas HashMap is not. this makes HashMap better for non-threaded applications, as unsynchronised objects typically perform better than synchronised ones.

### Can you raise or lower the access level of a method when you override it?
Yes

### What is the problem with the Singleton pattern and what is a useful alternative?
They are generally used as a global instance, why is that so bad? Because you hide the dependencies of your application in your code, instead of exposing them through the interfaces. Making something global to avoid passing it around is a code smell.
They inherently cause code to be tightly coupled. This makes faking them out under test rather difficult in many cases.
They carry state around for the lifetime of the application. Another hit to testing since you can end up with a situation where tests need to be ordered which is a big no no for unit tests.

We can use dependency injection - inject the instance in the constructor. Wire it up at the start of your application, at the “top” of the system. Need to have interface and default implementation.


### What is the purpose of having multiple generations in a garbage collection algorithm?
The virtual machine incorporates a number of different garbage collection algorithms that are combined using generational collection. While naive garbage collection examines every live object in the heap, generational collection exploits several empirically observed properties of most applications to minimize the work required to reclaim unused (garbage) objects. The most important of these observed properties is the weak generational hypothesis, which states that most objects survive for only a short period of time.

Some objects do live longer, and so the distribution stretches out to the right. For instance, there are typically some objects allocated at initialization that live until the process exits. Between these two extremes are objects that live for the duration of some intermediate computation, seen here as the lump to the right of the initial peak. Some applications have very different looking distributions, but a surprisingly large number possess this general shape. Efficient collection is made possible by focusing on the fact that a majority of objects "die young."

To optimize for this scenario, memory is managed in generations (memory pools holding objects of different ages). Garbage collection occurs in each generation when the generation fills up. The vast majority of objects are allocated in a pool dedicated to young objects (the young generation), and most objects die there. When the young generation fills up, it causes a minor collection in which only the young generation is collected; garbage in other generations is not reclaimed. Minor collections can be optimized, assuming that the weak generational hypothesis holds and most objects in the young generation are garbage and can be reclaimed. The costs of such collections are, to the first order, proportional to the number of live objects being collected; a young generation full of dead objects is collected very quickly. Typically, some fraction of the surviving objects from the young generation are moved to the tenured generation during each minor collection. Eventually, the tenured generation will fill up and must be collected, resulting in a major collection, in which the entire heap is collected. Major collections usually last much longer than minor collections because a significantly larger number of objects are involved.

### If you don’t want a particular data member to be serialised, how do you do it?
Mark them as transient using the transient keyword.

### What is JMX?
Java Management Extensions (JMX) is a Java technology that supplies tools for managing and monitoring applications, system objects, devices (such as printers) and service-oriented networks. Those resources are represented by objects called MBeans (for Managed Bean). In the API, classes can be dynamically loaded and instantiated.

It provides an easily configurable, scalable, reliable and more or less friendly infrastructure for managing Java application either locally or remotely. The framework introduces the concept of MBeans for real-time management of applications.

MX architecture follows a three-layered approach:
Instrumentation layer: MBeans registered with the JMX agent through which resources are managed
JMX agent layer: the core component (MbeanServer) which maintains registry of managed MBeans and provides an interface to access them
Remote management layer: usually client side tool like JConsole

While creating MBeans, there is a particular design pattern which we must conform to. The model MBean class MUST implement an interface with the following name: “model class name” plus MBean.
```java
public interface GameMBean {
 
    public void playFootball(String clubName);
 
    public String getPlayerName();
 
    public void setPlayerName(String playerName);
 
}
public class Game implements GameMBean {
 
    private String playerName;
 
    @Override
    public void playFootball(String clubName) {
        System.out.println(
          this.playerName + " playing football for " + clubName);
    }
 
    @Override
    public String getPlayerName() {
        System.out.println("Return playerName " + this.playerName);
        return playerName;
    }
 
    @Override
    public void setPlayerName(String playerName) {
        System.out.println("Set playerName to value " + playerName);
        this.playerName = playerName;
    }
}
```

### What is JMS?
In a case of messaging between applications written in Java, the JMS (Java Message Service) API is commonly used. For interoperability between different vendors and platforms, we won't be able to use JMS clients and brokers. This is where AMQP comes in handy.

The Java Message Service (JMS) API is a Java message-oriented middleware API for sending messages between two or more clients.[1] It is an implementation to handle the producer–consumer problem.

 It is a messaging standard that allows application components based on Java EE to create, send, receive, and read messages. It allows the communication between different components of a distributed application to be loosely coupled, reliable, and asynchronous

### How to read a file?
Using BufferedReader: This method reads text from a character-input stream. It does buffering for efficient reading of characters, arrays, and lines.
File file = new File("C:\\Users\\pankaj\\Desktop\\test.txt");
  
  BufferedReader br = new BufferedReader(new FileReader(file));
  
  String st;
  while ((st = br.readLine()) != null)
    System.out.println(st);
  }

Reading the whole file in a List: Read all lines from a file. This method ensures that the file is closed when all bytes have been read or an I/O error, or other runtime exception, is thrown. Bytes from the file are decoded into characters using the specified charset.
List<String> lines = Collections.emptyList();
try
 {
      lines =
       Files.readAllLines(Paths.get(fileName), StandardCharsets.UTF_8);
 }
 
public static String readFileAsString(String fileName)throws Exception
  {
    String data = "";
    data = new String(Files.readAllBytes(Paths.get(fileName)));
    return data;
  }

### Which sort does Java use?
Merge sort for objects (stable) quick sort for primitives (faster),

# SQL

## Questions

### What is the difference between an inner and an outer join?
Joins are used to combine the data from two tables, with the result being a new, temporary table. The temporary table is created based on columns that the two tables share.
Joins are performed based on something called a predicate, which specified the conditions to use in order to perform a join.
A join can be either an inner join or an outer join, depending on how one wants the resulting table to look.
Outer joins can be further divided into left outer joins, right outer joins, and full outer joins.

The join predicate is the “on employee.empID = location.empID” bit.
Left outer join:
select * from employee left outer join location 
on employee.empID = location.empID;
Retains all the rows of the left table, regardless of whether there is a row that matches on the right table. The result will be all the rows from the left table, with the matching information from the right table. If no data from the right matches then the fields are null.
right outer join:
Is similar, but retains all the rows from the right table
select * from employee right outer join location 
on employee.empID = location.empID;
Inner join
The difference between an inner join and an outer join is that an inner join will return only the rows that actually match based on the join predicate.
select * from employee inner join location on 
employee.empID = location.empID

### What is the definition of a key?
A key is a subset of columns in a table that allow a row to be uniquely identified.
A key is not allowed to be NULL, however in practise RDBMS implementations often allow both  foreign and unique keys to be NULL.
Primary, unique, and foreign keys all can consist of more than just one column.
A table can have multiple unique and foreign keys. However, a table can have only one primary key.
A foreign key can actually reference a key that is not the primary key of a table. But, a foreign key must reference a unique key.
A foreign key can contain null values.
While unique and primary keys both enforce uniqueness on the column of one table, foreign keys define a relationship between two tables.

### What are natural and surrogate keys?
Natural keys is a key composed of columns that actually have a logical relationship to other columns within the table.
A surrogate key is an artificial key which is introduced just to add uniqueness.

### What is the definition of a secondary key?
Keys which are suitable to be a primary key are known as candidate keys. Keys which are not selected are known as secondary keys.

### What is a superkey?
A superkey is a set of columns in a table for which there are no two rows that will share the same combination of values. So the superkey is unique for each and every row in the table.
A minimal superkey is the minimum number of columns that can be used to uniquely identify a single row. 

### What is referential integrity?
Is a concept in which multiple tables share a relationship based on the data stored in the tables, and that relationship must remain consistent.
Need to add a cascading delete onto the table which is linked by the foreign key.

### What is the difference between the having clause and the where clause?
The WHERE clause does not work with aggreagates like SUM, AVG, MAX, etc… you need to use having.
This won’t work:
select employee, sum(bonus) from emp_bonus 
group by employee where sum(bonus) > 1000;

But this will:
select employee, sum(bonus) from emp_bonus 
group by employee having sum(bonus) > 1000;

### How do database indexes work? How do indexes help?
The whole point of having an index is to speed up search queries by essentially cutting down the number of records/rows in a table that need to be examined.
An index is a data structure (most commonly a B-Tree) that stores the values for a specific column in a table. An index is created on a column of a table.
B-Trees are used because they are time efficient - because lookups, deletions, and insertions can all be done in logarithmic time. Also the data that is stored inside a b-tree can be sorted.

Hash tables can also be used. They are extremely efficient when it comes to just looking up values. The way a hash table would work is that the column value will be the key into the hash table and the actual value mapped to the that key would jey be a pointer to the row data in the table. However hash tables are not sorted data structures, and cannot help with queries such as returning all employees under 40 years of age.

Searching for Jesus will be faster as the index will be alphabetical.
An index contains the data for that column and a pointer to the table row.

To create an index in SQL:
CREATE INDEX name_index
ON Employee (Employee_Name)

Indexes take up space. Another performance hit with indexes is the fact that whenever you add, delete, or update rows in the corresponding table, the same operations will have to be done to your index. 

### What is a self-join?
A self join is basically when a table is joined to itself. The way you should visualise a self join for a given table is by imagining that a join is performed between two identical copies of that table.
When we do a self join, the table names absolutely must use aliases otherwise the column names would be ambiguous.
For example:
SELECT e1.employee_name
FROM employee e1, employee e2
WHERE e1.employee_location = e2.employee_location
AND e2.employee_name="Joe";

We use aliases here, e1 and e2.

### How do we retrieve a list of all cities without duplicates?
SELECT DISTINCT employee_location from employee;
or
SELECT employee_location from employee 
GROUP BY employee_location


### How do you find the second largest number in a field?
SELECT MAX(Salary) FROM Employee
WHERE Salary NOT IN (SELECT MAX(Salary) FROM Employee )
Or
select MAX(Salary) from Employee
WHERE Salary <> (select MAX(Salary) from Employee )
For the Nth highest number:
SELECT * /*This is the outer query part */
FROM Employee Emp1
WHERE (N-1) = ( /* Subquery starts here */
SELECT COUNT(DISTINCT(Emp2.Salary))
FROM Employee Emp2
WHERE Emp2.Salary > Emp1.Salary)

# JavaScript

## Notes
### Strings in JavaScript
```javascript
var str = "Please locate where 'locate' occurs!";
var pos = str.indexOf("locate");
```
Returns 7

```javascript
var str = "Please locate where 'locate' occurs!";
var pos = str.lastIndexOf("locate");
```

Both return -1 if not found.

```javascript
var str = "Please locate where 'locate' occurs!";
var pos = str.search("locate");
```
Can take a regular expression

### How to extract string parts
- slice(start, end)
- substring(start, end)
- substr(start, length)

Replace:
```js
str = "Please visit Microsoft!";
var n = str.replace("Microsoft", "W3Schools");
```

Returns a new string

### Numbers in JavaScript
Numbers in JavaScript are always 64-bit floating point.

Integers are accurate up to 15 digits.
The maximum number of decimals is 17, but floating point arithmetic is not always 100% accurate
Infinity (or -Infinity) is the value JavaScript will return if you calculate a number outside the largest possible number.
JavaScript interprets numeric constants as hexadecimal if they are preceded by 0x.
var x = 0xFF;   

Primitive values (like 3.14 or 2014), cannot have properties and methods (because they are not objects).
But with JavaScript, methods and properties are also available to primitive values, because JavaScript treats primitive values as objects when executing methods and properties.

### Converting Variables to Numbers
There are 3 JavaScript methods that can be used to convert variables to numbers:

- The Number() method
- The parseInt() method
- The parseFloat() method
These methods are not number methods, but global JavaScript methods.

### Max and Min Vales?
```javascript
var x = Number.MAX_VALUE;
var x = Number.MIN_VALUE;
```

### How to create an array?
```js
var cars = ["Saab", "Volvo", "BMW"];
```
Arrays are objects, typeof will return "object".
You can check using:
`Array.isArray(fruits);`

### Useful Array methods
- To string: `fruits.toString();`
- Join all with extra char: `fruits.join(" * ");`
- Remove last element in array: `var x = fruits.pop();`
- Add element to end: `fruits.push("Kiwi");`
- Remove first element: `fruits.shift();`
- Add element to start of array: `fruits.unshift("Lemon");`
- quickly append a new element to array: `fruits[fruits.length] = "Kiwi"; `
- Delete an element: `delete fruits[0];` BUt this can leave undefined holes!
- You can add new elements with splice: `fruits.splice(2, 0, "Lemon", "Kiwi");` First param specifies where, second param specifies how many elements to remove.
- merge arrays: `var myChildren = myGirls.concat(myBoys);`
- Remove elemeent from list and create new array: `var citrus = fruits.slice(1);` Slice can take 2 arguments, start and end.
- Arrays can be reversed: `fruits.reverse()`
- Can be sorted: `fruits.sort()`
  - sort will sort values as strings, which doesn't work right for numbers. For numbers you're best using your own compare function: `points.sort(function(a, b){return a - b});`

### Randomly sort an array (fisher-Yates method)
```js
var points = [40, 100, 1, 5, 25, 10];

for (i = points.length -1; i > 0; i--) {
  j = Math.floor(Math.random() * i)
  k = points[i]
  points[i] = points[j]
  points[j] = k
}
```

### Find Max in Array
```js
return Math.max.apply(null, arr);
```
`Math.max.apply(null, [1, 2, 3])` is equivalent to `Math.max(1, 2, 3)`.

You can do the same for min.

### Array Methods
Most take 3 arguments, item value, item index, array itself.
- map(): `var numbers2 = numbers1.map((a) => a*2);`.
- filter(): `var over18 = numbers.filter((v) => v > 18);`
- reduce(): `var sum = numbers1.reduce((total, value, index, array) => total + value);`
    - Runs a function on each array element to reduce it to a single value.
- every(): `var allOver18 = numbers.every((value) => value > 18);`
- some(): `var someOver18 = numbers.some((value) => value > 18);`
- indexOf(): `fruits.indexOf("Apple");`
- lastIndexOf(): `fruits.lastIndexOf("Apple");`
- find(): `var first = numbers.find((value) => value > 18);`
  - returns the first value that passes the test function.

### Creating Dates
```js
new Date()
new Date(year, month, day, hours, minutes, seconds, milliseconds)
new Date(milliseconds)
new Date(date string)
```
By default, JS will output dates in full text string format:
Wed Mar 25 2015 00:00:00 GMT+0000 (Greenwich Mean Time)

You can use `.setX()` to set date, fullYear, Hours, Minutes, Milliseconds, etc.
You can use `.getX()` to get date, fullYear, Hours, Minutes, Milliseconds, etc.

### Associative Arrays (Hash Maps)
```js
let myMap = new Map()
myMap.set('bla','blaa')
myMap.set('bla2','blaa2')

myMap.has('bla')    // true
myMap.delete('bla') // true
```

### Math Methods
```js
Math.round(4.7);
Math.pow(8, 2);
Math.sqrt(64);
Math.abs(-4.7); 
Math.ceil(4.4);
Math.floor(4.7);
Math.min(0, 150, 30, 20, -8, -200);
Math.max(0, 150, 30, 20, -8, -200);
Math.random();
Math.floor(Math.random() * 10);
```

### Comparison Operators
- == : equal to, `x == "5"` is true
- ===: equal value and type, `x === "5"` is false

Trying to compare numbers to strings can give weird results, e.g.
- `"2" < "12"` is false.
To secure a proper result, do something like this.
```js
age = Number(age);
if (isNaN(age)) {
  voteable = "Input is not a number";
} else {
  voteable = (age < 18) ? "Too young" : "Old enough";
}
```

### RegExp
Follows syntax of `/pattern/modifiers;`

`var patt = /w3schools/i;`   
/w3schools/i  is a regular expression.   
w3schools  is a pattern (to be used in a search).

Brackets are used to find a range of characters:
- [abc]: Find any of the characters between the brackets
- [0-9]: Find any of the digits between the brackets
- (x | y): Find any of the alternatives separated with |

Metacharacters are chracters with a special meaning:
- \d finds a digit
- \s Finds a whitespace character
- \b finds a match at the beginning of a word like this: \bWORD, or at the end of a word like this: WORD\b

Quantifiers define quantities:
- n+: Matches any string that contains at least one n
- n*: Matches any string that contains zero or more occurences of n
- n? Matches any string that contains zero or one occurences of n

### Different Types of Errors
- RangeError:	A number "out of range" has occurred
- ReferenceError:	An illegal reference has occurred
- SyntaxError:	A syntax error has occurred
- TypeError:	A type error has occurred
- URIError:	An error in encodeURI() has occurred

An error has two properties: name and message.

### Scope
Two different scopes:
- local scope
- global scope
- function scope

If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable.
```js
myFunction();

// code here can use carName

function myFunction() {
  carName = "Volvo";
}
```

In "Strict Mode", undeclared variables are not automatically global.

### Strict Mode
You can use strict mode by adding the following string at the beginning of a script or a function:
`"use strict";`

With strict mode, you can not, for example, use undeclared variables.

As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.

In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.

In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.

ES6 Modules are strict by default.

You cannot delete variables or functions in strict mode (but you can still delete properties).

The this keyword refers to the object that called the function.

If the object is not specified, functions in strict mode will return undefined and functions in normal mode will return the global object (window):
```js
"use strict";
function myFunction() {
  alert(this); // will alert "undefined"
}
myFunction();
```

### Block Scoping
ES2015 introduced two important new JavaScript keywords: let and const.

These two keywords provide Block Scope variables (and constants) in JavaScript.


Variables declared with the var keyword can not have Block Scope:
```js
{
  var x = 2;
}
// x CAN be used here
```

```js
{
  let x = 2;
}
// x can NOT be used here

```

```js
var x = 10;
// Here x is 10
{
  let x = 2;
  // Here x is 2
}
// Here x is 10
```

Global variables defined with the var keyword belong to the windo object.

Global variables dfefined with the let keyword do not belong to the window object.

### Arrow Functions
The handling of `this` is also different in arrow functions compared to regular functions.

In short, with arrow functions there are no binding of `this`.

In regular functions the `this` keyword represented the object that called the function, which could be the window, the document, a button or whatever.

With arrow functions the `this` keyword always represents the object that defined the arrow function.

### Classes
```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }

  present() {
    return "I have a " + this.carname;
  }

  static hello() {
    return "Hello!!";
  }
}
```

Inheritance:
```js
class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}
```

Getters and setters:
```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  get cnam() {
    return this.carname;
  }
  set cnam(x) {
    this.carname = x;
  }
}
```

Class declarations are not hoisted.

Classes by default follow strict mode.

### Delay JavaScript Loading
Putting your scripts at the bottom of the page body lets the browser load the page first.

While a script is downloading, the browser will not start any other downloads. In addition all parsing and rendering activity might be blocked.

An alternative is to use defer="true" in the script tag.


### How to check if something is undefined or null
`if (typeof myObj !== "undefined" && myObj !== null) `

You need to check undefined first, and then null.

### Default Parameters
```js
function (a=1, b=1) {
  // function code
}
```

### Arguments Object
```js
function findMax() {
  var i;
  var max = -Infinity;
  for (i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}
```

## Questions

### What happens when you don’t declare a variable in JavaScript?
We’d be creating what is called an implied global variable.

### What happens if you try to reassign a const variable?
TypeError: Assignment to constant variable.

### How does a for loop work?
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
myArray.forEach(function (value) {
  console.log(value);
});
Don’t do this, it will convert to string. Useful for iterating over object properties.
for (var index in myArray) {    // don't actually do this
  console.log(myArray[index]);
}

for (var value of myArray) {
  console.log(value);
}
### Where can JavaScript be placed in HTML?
Can be placed in body or head.
Placing scripts at the bottom of the <body> element improves the display speed, because script interpretation slows down the display.

Placing scripts in external files has some advantages:
It separates HTML and code
It makes HTML and JavaScript easier to read and maintain
Cached JavaScript files can speed up page loads

### How to display data with Javascript?
JavaScript can "display" data in different ways:
Writing into an HTML element, using innerHTML.
Writing into the HTML output using document.write().
Writing into an alert box, using window.alert().
Writing into the browser console, using console.log().
```javascript
document.getElementById("demo").innerHTML = "Hello Dolly.";
```

### How to write a function?
```
function myFunction() {
  document.getElementById("demo1").innerHTML = "Hello Dolly!";
  document.getElementById("demo2").innerHTML = "How are you?";
}
```

### How to access object properties?
`objectName.propertyName`
`objectName["propertyName"]`

### How to create objects?
```
var person = {
  firstName: "John",
  lastName : "Doe",
  id   	: 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```

Adding a new method:
```js
person.name = function () {
  return this.firstName + " " + this.lastName;
};
```

To display properties:
```js
for (x in person) {
  txt += person[x] + " ";
};
```
or
```js
var myArray = Object.values(person);
```
or
```js
var myString = JSON.stringify(person);
```

### What are events?
`<button onclick="document.getElementById('demo').innerHTML = Date()">The time is?</button>`

### What is hoisting in JavaScript?
Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).

If a variable is declared in the middle or even at the very bottom of a function, that variable will still be visible above its declaration.

```js
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x
```

Variables and constants declared with let or const are not hoisted!

### What is the Prototype in JS?
All JS objects inherit properties and methods from a prototype:
- Date objects inherit from Date.prototype
- Array objects inherit from Array.prototype
- Person objects inherit from Person.prototype

The Object.prototype is on the top of the prototype inheritance chain

You cannot add new properties to an existing object constructor. 

If you want to add new properties or methods to all existing objects you'll need to use the prototype property:
```js
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}

Person.prototype.nationality = "English";
```

### What are self Invoking Functions?
Function expressions can be made "self-invoking".

A self-invoking expression is invoked (started) automatically, without being called.

Function expressions will execute automatically if the expression is followed by ().
```js
(function () {
  var x = "Hello!!";  // I will invoke myself
})();
```

### What is minification? What is removed?
Process of removing all characters that are not necessary. Whitespace, comments, new line characters are removed.
Quicker download times
Less bandwidth consumption.
What is obfuscation?
Files are modified to deliberately make them difficult to understand and read.

### What values are falsy?
false
“”
0
null
undefined
NaN

### What is the global object in JavaScript?
Created as soon as the interpreter starts.
The global object is created with some initial properties such as:
global functions such as parseFloat(), eval(), etc.
global properties such as NaN, Infinity, etc.
global objects such as Intl, Math, etc.

### What data types are there in JavaScript?
Number
String
Bool
Object
Function
Array
Date
regexp
Null
Undefined

### How to do form validation in JS?
```html
<form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
Name: <input type="text" name="fname">
<input type="submit" value="Submit">
</form>
```

```js
function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
```


```js
<input id="id1" type="number" min="100" max="300" required>
<button onclick="myFunction()">OK</button>

<p id="demo"></p>

<script>
function myFunction() {
  var inpObj = document.getElementById("id1");
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  }
}
</script>
```

# Operating Systems

## Questions

### What is Paging?

### How is Memory Managed?

# HTML

## Notes
### Accessing HTML Elements
```js
document.getElementById(id)
document.getElementsByTagName(name)
document.getElementsByClassName(name)
document.querySelectorAll("p");
```

### Changing HTML Elements
```js
element.innerHTMML = new html content
element.attribute = new value
element.style.property = new style
element.setAttribute(attribute, value)
```

### Adding and Deleting Element
```js
document.createElement(element)
document.removeChild(element)
document.appendChild(element)
document.replaceChild(new, old)
document.write(text)
```

### Adding Event Handlers
```js
document.getElementById(id).onclick = function(){code}
```

### Adding Event Listeners
```js
document.getElementById("myBtn").addEventListener("click", displayDate);
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseout", myThirdFunction);
```

### JavaScript Timing Events
```js
window.setTimeout(function, milliseconds);
window.setInterval(function, milliseconds);
```

### Cookies
When a browser requests a web page from a server, cookies belonging to the page are added to the request. This way the server gets the necessary data to "remember" information about users.

You can create a cookie like this:
```js
document.cookie = "username=John Doe";
```

### Get data from server
USe the Fetch API
```js
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Questions

### What is the DOM?
Document Object Model
It is constructed as a  tree of objects
![img](https://www.w3schools.com/js/pic_htmltree.gif)

The HTML DOM is a standard object model and programming interface for HTML. It defines:
- The HTML elements as objects
- The properties of all HTML elements
- The methods to access all HTML elements
- The events for all HTML elements
In other words: The HTML DOM is a standard for how to get, change, add, or delete HTML elements.

The HTML DOM can be accessed with JavaScript (and with other programming languages).

In the DOM, all HTML elements are defined as objects.



### WHat was new in HTML 5?



Reduce DOM Size
Keep the number of elements in the HTML DOM small.

This will always improve page loading, and speed up rendering (page display), especially on smaller devices.

Every attempt to search the DOM (like getElementsByTagName) will benefit from a smaller DOM.

## Automatic form validation?
<form action="/action_page.php" method="post">
  <input type="text" name="fname" required>
  <input type="submit" value="Submit">
</form>

## Constraint validation HTML iNput Attributes
Attribute	          Description
disabled	          Specifies that the input element should be disabled
max	                Specifies the maximum value of an input element
min	                Specifies the minimum value of an input element
pattern	            Specifies the value pattern of an input element
required	          Specifies that the input field requires an element
type 	              Specifies the type of an input element

# CSS

## Notes
Selector	Description
:disabled	Selects input elements with the "disabled" attribute specified
:invalid	Selects input elements with invalid values
:optional	Selects input elements with no "required" attribute specified
:required	Selects input elements with the "required" attribute specified
:valid	Selects input elements with valid values

# React

# TypeScript

# MongoDB

# RabbitMQ

# Node.JS

# Git

# RxJava


Photo by Chris Ried on Unsplash
