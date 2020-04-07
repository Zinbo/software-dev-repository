---
path: "/computer-science"
cover: "./computer-science.jpg"
title: "Computer Science"
published: true
tags: ["something"]
date: "2018-10-15"
---

# Bit manipulation
Left shift is the equivlent of multiplying by 2, unless there is an overflow.

## Setting a bit
```python
def set_bit(x, position):
    mask = 1 << position
    return x | mask
```
To set a bit to 1 in the fifth position, we do an OR with the original number, and one with the fifth bit set to 1.

## Clear a bit
```python
def clear_bit(x, position):
    mask = 1 << position
    return x & ~mask
```

## Flip a bit
```python
def flip_bit(X, position):
    mask = 1 << position
    return x ^ mask
```

## Modify a bit
```python
def modify_bit(x, position, state):
    mask = 1 << position
    return (x & ~mask) | (~state & mask)
```
The state is 1s complement.

## Check if even
```python
(x & 1) == 0
```

## Checkj if power of two
```python
(x & x-1) == 0
```
If something is a power of 2 then it will only have 1 bit set.

## 1s and 2s complement
In 1s complement, we negate all of the bits (the first bit is the sign bit). However this still leaves us with 2 numbers for 0. In 2s complement we negate all of the bits and add one, meaning that we only have one zero.

Bit manipulation is the act of algorithmically manipulating bits or other pieces of data shorter than a word.

# Processes and Threads
Processes are the abstraction of running programs: A binary image, virtualized memory, various kernel resources, an associated security context, and so on.   
Threads are the unit of execution in a process: A virtualized processor, a stack, and program state. A process contains one or more threads.

The two primary virtualized abstractions in modern operating systems are virtualized memory and a virtualized processor. Both afford the illusion to running processes that they alone consume the machine's resources. Virtualized memory gives processes a unique view of memory that seamlessly maps back to physical RAM or on-disk storage (swap space). A virtualized processor lets processes act as if they alone run on a processor, when in fact multiple processes are multitasking across multiple processors.


Virtualized memory is associated with the process and not the thread. Thus, threads share one memory address space. Conversely, a distinct virtualized processor is associated with each thread. Each thread is an independent schedulable entity.

The benefits of multithreading are:
- Programming abstraction dividing up work and assigning each division to a unit of execution (a thread) is a natural approach to many problems.
- Parallelism: in machiens with multiple processors, threads provide an efficient way to achieve true parallelism. As each thread  receives its own virtualised processor and is an independently-schedulable entity, multiple threads may run on multiple processors at the same time, imrpoving a system's throughput.
- Blocking I/O: Without threads, blocking I/O halts the whole process. This can be detrimental to both throughput and latency. In a multithreaded process, individual threads may block ,waiting on I/O, while other threads make forward progress. Asynchronous and non-blocking I/O are alternative solutions to threads for this issue.
- Memory savings: Threads provide an efficient way to share memory yet utilise multiple units of exection. In this manner they are an alternative to multiple processes.

The costss are:
- increased complexity, need mutexes to manage concurrency. 

## C++ threads
Two forms of concurrent programming models:
- multiprocessing: process 1 and process 2 communicate by interprocess - queues, messages, files, etc.
- multithreading: threads communicate through shared memory.

Threads are faster to start and low overhead for communication.
Difficult to implement, cannot be run on a distributed system

Can create a new thread and executed a program like so:
```cpp
#include <iostream>
#include <thread>
using namespace std;
void function1() {
    std::cout << "something";
}

int main() {
    std::thread t1(function1()); // t1 starts running
    t1.join(); // main threads waits for t1 to finish

    return 0;
}
```
Here we will see the message `something`.

```cpp
#include <iostream>
#include <thread>
using namespace std;
void function1() {
    std::cout << "something";
}

int main() {
    std::thread t1(function1()); // t1 starts running
    t1.detach();   // connection between main thread and t1 is severed
                    // t1 will run freely on its own - daemon process

    return 0;
}
```
Here we will see nothing, as the main thread exits before t1 has printed out.


You can only join or detach once, if you detach a child, they are detached forever, the following will crash:

```cpp
#include <iostream>
#include <thread>
using namespace std;
void function1() {
    std::cout << "something" << std::endl>>;
}

int main() {
    std::thread t1( function1()); // t1 starts running
    t1.detach();   // connection between main thread and t1 is severed
                    // t1 will run freely on its own - daemon process

    t1.join();      // crash

    return 0;
}
```

You can call `t1.joinable()` to check if a thread can be joined.

If we get an exception before we join, then the thread will be destroyed before it is joined. so we need to wrap things in try catch or have a wrapper class which jonis the thread in the destructor (RAII). 

A parameter to a thread is always passed by value, even when passing as a reference. If you really want to pass a reference you have to wrap it in `std::ref(myParam)`.  

You cannot assign a thread to another variable as it cannot be copied. If you want to assign to anotehr variable you must do:
```cpp
std::thread t2 = std::move(t1);
```

We shouldn't create more threads than core, because else we get context switching. Calling `std::thread::hardware_concurrency();` will give you an indication of how many threads can be truly running concurrently for our program. 

We can use mutexes to lock our resources:
```cpp
#include <mutex>
using napspace std;

std::mutex mu;

void shared_print(string msg, int id) {
    mu.lock();
    cout << msg << id << edl;
    mu.unlock();
}
```
However this is not recommended, because if we get an exception at cout then our mutex will be locked forever. Instead we should use:
```cpp
void shared_print(string msg, int id) {
    std::lock_guard<std::mutex> guard(mu);
    cout << msg << id << edl;
}
```
Here the mutex will be unlocked when the guard goes out of scope, it uses RAII.

To avoid deadlock, we need to ensure that everyone is locking mutexes in the same order. A better way is to create a lock, which takes an arbitrary set of objects to lock. We then use the lock guard and adopt the lock, which states that the object is already locked, and to take ownership over it:
```cpp
void shared_print(string id, int value) {
    std::lock(_mu, _mu2);
    std:lock_guard<mutex> locker(_mu, std::adopt_lock);
    std::lock_guard<mutex> locker2(_mu2, std:adopt_lock);
    ccout << "From " << id << ": " << value << endl;
}
```

Avoid deadlock:
1. Prefer locking single mutex.
2. Avoid locking a mutex and then calling a user provided function;
3. Use std::lock() to lock more than one mutex.
4. Lock the mutex in the same order

Locking Granularity:
- Fine-grained lock: protects small amount of data
- Course-grained lock: protects big amount of data

Another way of locking is unique_lock. With this we can:
- defer locking
- unlock and lock again without the lock going out of scope

```cpp
class LogFile {
    std::mutex _mu;
    ofstream _f;
public:
    LogFile() {
        _f.open("log.text");
    } // Need destructor to close file
    void shared_print(string id, int value) {
        std::unique_lock<mutex> locker(_mu);
        _f << "From " << id << ": " << value << endl;
        locker.unlock();
        // do something else that doesn't require lock
    }
}
```

```cpp
class LogFile {
    std::mutex _mu;
    ofstream _f;
public:
    LogFile() {
        _f.open("log.text");
    } // Need destructor to close file
    void shared_print(string id, int value) {
        std::unique_lock<mutex> locker(_mu, std::defer_lock); // defer lock
        // do something else furst 
        locker.lock();
        _f << "From " << id << ": " << value << endl;
        locker.unlock();
        // do something else that doesn't require lock

        locker.lock();
    }
}
```

A unique lock can be moved, but a lock guard cannot be moved.

unique lock is more heavy weighted than lock guard.

If we want to guarantee that a file is opened only once then we can do the following:
```cpp
std::mutex _mu_open;
void shared_print(string id, int value) {
    if(!_f.is_open()) {
        std::unique_lock<mutex> locker(_mu_open);
        _f.open("log.txt");
    }
}
```
However this won't work because if two threads call this at the same time, the first one will get the lock and open the file, the second will get the lock after and open the file again. We can instead do the following:
```cpp
std::mutex _mu_open;
void shared_print(string id, int value) {
    {
        std::unique_lock<mutex> locker(_mu_open);
        if(!_f.is_open()) {
            _f.open("log.txt");
        }
    }
}
```
However this is inefficient as every time we call this method we'll need to wait for the lock.

Instead what we can do is this:
```cpp
std::once_flag _flag;
void shared_print(string id, int value) {
    {
        std::call_once(_flag, [&]() {_f.open("log.txt"); }); // the file will be opened only once by one thead.
    }
}
```
This is more efficient.  

If we want to have a proeducer ahnd consuemr we will need to use a conditional variable to wait and notify the threads to sleep and wake up. So that you don't busy wait.
```cpp
void function1() {
    int count = 10;
    while(count > 0) {
        std::unique_lock<mutext> locker(mu)
        q.push_front(count)
        locker.unlock();
        cond.notify_one();
        // cond.notify_all();
        std::this_thread::sleep_for(chrono::seconds(1));
        count--;
    }
}

void function2() {
    int data = 0;
    while (data != 1) {
        std::unique_lock<mutex> locker(mu);
        cond.wait(locker, []() { return !q.empty();});
        data = q.back();
        q.pop_back();
        locker.unlock();
        cout << "t2 got a value from t1: " << data << endl;
    }
}
```

If we want a thread to execute something and reutrn the value and we want to wait for the value, we will need to havea global mutex and possibly a conditional variable to control threads. (why can't we just wait for join? Is this because x is a shared variable?) instead what we can do is wrap the function as an async call, which will return a future, which can contain the value. A future may ormay not create a new thread.

```cpp
int factorial (int N) {
    int res = 1;
    for(int i = N; i > 1; i++) res *= i;
    cout << "Result is: " << res << endl;
    return res;
}

int main() {
    int x;
    std::future<int> fu = std::async(factorial, 4);
    x = fu.get();
    // fu.get(); // this will crash
}
```

You can only call the get function once on a future.

We can use either derred or async or let the compiler decid. If we use deferred the same thread will be used to execute the function when we call get. If we use async a new thread will be spawned to execute the function. Else if we say both then either will be used depending on implementation:

```cpp
int main() {
    int x;
    std::future<int> fu1 = std::async(factorial, 4);
    std::future<int> fu2 = std::async(std::launch::async, factorial, 4); // spawn new thread
    std::future<int> fu3 = std::async(std::launch::deferred, factorial, 4); // execute at geyt on same thread
    std::future<int> fu4 = std::async(std::launch::async | std::launch::deferred, factorial, 4); // do either depending on impl, default option
    x = fu.get();
    // fu.get(); // this will crash
}
```

If we want to send a variable to a child thread running a function we can pass in a promise wrapped in a future. In the child function we can call get to get the value which will wait until we set the value in the promise.
```cpp
int factorial (std::future<int>& f) {
    int res = 1;
    int N = f.get();
    for(int i = N; i > 1; i++) res *= i;
    cout << "Result is: " << res << endl;
    return res;
}

int main() {
    int x;

    std::promise<int> p;
    std::future<int> f = p.get_future();

    std::future<int> fu = std::async(factorial, std::ref(f));
    
    //do something else
    std::this_thread::sleep_for(chrono::milliseconds(20));
    p.set_value(4);

    return 0;
}
```

If you don't set a value to a promise you'll get a broken promise exception;

You can throw exceptions in promises rather than setting a value.

Promises can't be copied, only moved. Futures have to be passed by refernece, not copied.

Sunce get can only be called once, if we need to call it more than once we can use a shared future:
```cpp
int main() {
    int x;

    std::promise<int> p;
    std::future<int> f = p.get_future();
    std::shared_future<int> sf = f.share();

    std::future<int> fu = std::async(factorial, sf);
    std::future<int> fu2 = std::async(factorial, sf);
    std::future<int> fu3 = std::async(factorial, sf);
    
    //do something else
    std::this_thread::sleep_for(chrono::milliseconds(20));
    p.set_value(4);
    cout << "Get from child: " << x << endl;

    return 0;
}
```

There are a few different ways to use callback objects:
```cpp
class A {
    public: 
        void f(int x, char c) {}
        long g(double x) { return 0; }
        int operator()(int N) { return 0; }
};

void foo(int x) {}

int main() {
    A a;
    std::thread t1(a, 6);                           // copy_of_a() in a different thread
    std::thread t2(std::ref(a), 6);                 // a() in a different thread
    std::thread t8(std::move(a), 6);                // a is no longer usable in main thread
    std::thread t3(A(), 6);                         // temp A
    std::thread t4([](int x) { return x*x; }, 6);
    std::thread t5(foo, 7);

    std::thread t6(&A::f, a, 8, 'w');               // copy_of_a.f(8, 'w') in a different thread
    std::thread t7(&A::f, &a, 8, 'w');              // a.f(8, 'w') in a different thread

    return 0;
}
```

We can creatae a packaged task with a function passed in:
- this package can be passed along to different places suhc as as different function, object, or thread.
- Can be executed in a different context to where its made
- It is a template class parameterised with the function sig of this class

To get the return value we need to do `t.get_future().get()`.

You can not add a parameters when you define a package task without using bind:
```cpp
std::thread t1(factorial, 6)                        // fine
std::packaged_task<int(int)> t2(factorial, 6);      // not fine

std::packaged_task<int(int)> t3(factorial);
t3.();                                              // fine, runs task

std::packaged_task<int> t4(std::bind(factorial, 6));
t4();
```

The main purpose of a packaged task is to link a callable object to a future. oTherwise we could just do this:
```cpp
t = std::bind(factorial, 6);
t();
```

Good for adding tasks to a queue and then running the tasks on a separate thread.
```cpp
void thread_1() {
    std::packaged_task<int()> t;
    {
        std::unique_lock<std::mutex> locker(mu);
        cond.wait(locker []() { return !task_q.empty(); });
        t = std::move(task_q.front());
        task_q.pop_front();
    }
    t();
}

int main() {
    std::thread t1(thread_1);
    std::packaged_task<int()> t(bind(factorial, 6));
    std::future<int> fu = t.get_future();
    {
        std::lock_guard<std::mutex> locker(mu);
        task_q.push_back(std::move(t));
    }
    cond.notify_one();

    cout << fu.get();

    t1.join();

    return 0;
}
```

To summarise, the following can be used:
```cpp
int main() {
    /* thread */
    std::thread t1(factorial, 6);
    std::this_thread::sleep_for(chrono::milliseconds(3));
    chrono::steady_clock::time_point tp = chrono::steady_clock::now() + chrono::microseconds(4);
    std::this_thread::sleep_until(tp);

    /* Mutex */
    std::mutex mu;
    std::lock_guard<mutex> locker(mu);
    std::unique_lock<mutex> ulocker(mu);
    ulocker.try_lock();
    ulocker.try_lock_for(chrono::nanoseconds(500));
    ulocker.try_lock_until(tp);

    /* Conditional Variable */
    std::conditional_variable cond;
    cond.wait_for(ulocker, chrono::microseconds(2));
    cond.wait_until(ulocker, tp);

    /* Future and Promise */
    std::promise<int> p;
    std::future<int> f = p.get_future();
    f.get();
    f.wait();

    /* async() */
    std::future<int> fu = async(factorial, 6);

    /* Packaged Task */
    std::packaged_task<int(int)> t(factorial);
    std::future<int> fu2 = t.get_future();
    t(6);
}
```
You can try lock a unique lock. `try_lock()` will try to lock and return if it immediately can't. `try_lock_for(time)` will try and wait for `time` to get the lock. If it can't it will return.

# LRU Cache
Least Recently Used.  

When you do a get, it moves that item to the front of the list.

It is a key value store.

It is a bounded container - need to specify size at the start.

For the size - can call getMemoryClass() in andoird, then divide by some multiple of 8.

Need to specify size of cache, size of bit map to place in the cache. If your objects aren't uniform in size, multiple objects could get evicted to make space for the new bit map.

An LRU needs a tag, a value, and an LRU counter per block.

Each blocks counter is initialised to a different value:
| Block Contents | Counter |
|----------------|---------|
| A              | 0       |
| B              | 1       |
| C              | 2       |
| D              | 3       |

When we access a block:
- if the counter is 3, do nothing
- else set this counter to 3, and decrement every counter value lower than the original value.

If we need to insert into a block we insert into the 0 counter block.

To summarize: LRU order tracked via keys in a linked list. As a key is used, it is popped to the front of the list. When linked list capacity reached, get the key at the end of the list, remove the key from map and from the linked list

# Cache
Memory is:
- main memory; billion 32 bit words, RAM
- Register file: in CPU

SRAM: static RAM, used in register file.

Dynamic RAM: normal RAM

Key idea is to keep the most often-used data in a small, fast SRAM (often local to CPU chip).  
Refer to amin memory only rarely, for removing data.  
The reason this works is due to locality.

Locality of Reference: Reference to location X at time t implies that reference to location X + deltaX at time t + deltaT becomes more probable as delaX and deltaT apprach 0.

The machine can take advantage of the fact that most data lives togehter if you ask for the start of the foo subroutine, most liekly you'll want all of it so that the amchine can load it all into memory

- CPU 
- SRAM (small) Cache
- Dynamic RAM (bigger) working memory
- Hard Disk: Heap Space

Building a high performance multicore app is harder - need to keep cache well populated for all cores.

# Floating Point Numbers
Number with decimal is stored as floating point. Broken down into:
M x B<sup>e</sup>       From this we want to form a word in binary
M = Mantissa <- The significand of a common logarithm or floating point number.
B = Base = 2
e = Exponent

For 7:
7 x 2<sup>0</sup> = 7  
111 x 2<sup>0</sup> = 7  
With floating point we have to normalise our mantissa, which means there can not be any significant digits on the left of the decimal point. So this becomes
0.111 x 2<sup>3</sup> = 7
0.111 x 2<sup>011</sup> = 7

If we have an 8 bit word, we use one bit to represent the sign of the mantissa, and the rest for the exponent and mantissa.  
We have to represent our exponent in two's complement.  
We can't store the mantissa as 2's complement asa we get rid of all 0's after decimal point, so it will always look negative.
0       011 .   1110  
If we have  our mantisa and theres not enough 0's we pad out the right e.g. 111 becomes 1110

Side Not: a 32 bit CPU can only host 4GB of RAM, as each byte needs an address.  
2<sup>32</sup> = 4,294,967,296 addresses
4GB = 4,294,967,296 bytes which need addresses

For 32-bit float following IEEE standard:
- 1 sign bit
- 8 exponent bits
- an implied bit (where is that stored? IS it stored anywhere?)
- 23 mantissa bits

The exponent is 8 bits. In order to find the value it represents, we will need to subtract 127 from it. 127 is called the bias, it is different for different size floats.

Another way of calculating the form of a number is to keep dividing by 2 until we get to 1. something. This is under the assumption we have a 1-based implied bit.  

```
156
= 1.22109375 x 2^7

Exponent = 7+127 = 134 = 10000110
```

Side note: double and floats will always have accuracy issues with numbers which can't be represented by a binary fraction, e.g. 0.1. If we want accuracy in Java then we should use a BigDecimal as this is stored as an integer and a scale value such that we have `unscaled x 10`<sup>scale</sup>. You construct a BigDecimal using a string.  

To work out the mantissa, minus 1 from the mantissa, and then divide by 2. if the number is 1. something then add 1 to that slot in the mantissa, else add 0. Keep dividing by 2 and adding a 1 or a zero until you fill all 23 bits.

# Unicode
ASCII is able to represent every character using a number between 32 and 127. This could conveniently be stored in 7 bits. Codes below 32 were used for control characters. Anything bigger than 127 became a free for all of different companies and countries.

Unicode was a brave effort to create a single character set that included every reasonable writing system on the planet and some make-believe ones like Klingon, too. Some people are under the misconception that Unicode is simply a 16-bit code where each character takes 16 bits and therefore there are 65,536 possible characters. This is not, actually, correct.

In Unicode, a letter maps to something called a code point. Every platonic letter in every alphabet is assigned a magic number by the Unicode consortium which is written like this: U+0639.  This magic number is called a code point. The U+ means “Unicode” and the numbers are hexadecimal. The English letter A would be U+0041. You can find them all by visiting the Unicode web site.
 
 OK, so say we have a string:  
Hello  
which, in Unicode, corresponds to these five code points:  
U+0048 U+0065 U+006C U+006C U+006F.  
Just a bunch of code points. Numbers, really. We haven’t yet said anything about how to store this in memory or represent it in an email message.

This is where encodings come in. The first idea was to store each code point as two bytes each, so hello becomes:  
00 48 00 65 00 6C 00 6C 00 6F
However if we were in low-endian mode would we want:
48 00 65 00 6C 00 6C 00 6F 00?

Due to this people were forced to come with the convention of storing a FE FF at the beginning of every Unicode string, which was called the Unicode Byte Order mark. If you wanted to swap your high and low bytes it would look like FF FE instead.

This wasted a lot of space, so the concept of UTF-8 was born. UTF-8 was another system for storing your string of Unicode code points. In UTF-8 every code point from 0-127 is stored in a single byte. Only code points 128 and above are stored using 2,3, and up to 6 bytes.

Hello, which was U+0048 U+0065 U+006C U+006C U+006F, will be stored as 48 65 6C 6C 6F, which, behold! is the same as it was stored in ASCII, and ANSI, and every OEM character set on the planet.

It does not make sense to have a string without knowing what encoding it uses. You can no longer stick your head in the sand and pretend that “plain” text is ASCII.

There Ain’t No Such Thing As Plain Text.

If you have a string, in memory, in a file, or in an email message, you have to know what encoding it is in or you cannot interpret it or display it to users correctly.


## Emails
How do we preserve this information about what encoding a string uses? Well, there are standard ways to do this. For an email message, you are expected to have a string in the header of the form

Content-Type: text/plain; charset="UTF-8"

## HTML
you can always get this far on the HTML page without starting to use funny letters:
```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```
But that meta tag really has to be the very first thing in the <head> section because as soon as the web browser sees this tag it’s going to stop parsing the page and start over after reinterpreting the whole page using the encoding you specified.

## Unicode in Java

Characters are a graphical entity which is part of human culture. When a computer needs to handle text, it uses a representation of those characters in bytes. The exact representation used is called an encoding.

Internally, Java uses UTF-16. This means that each character can be represented by one or two sequences of two bytes. The character you were using, 最, has the code point U+6700 which is represented in UTF-16 as the byte 0x67 and the byte 0x00.
That's the internal encoding. You can't see it unless you dump your memory and look at the bytes in the dumped image.

But the method `getBytes()` does not return this internal representation.
`public byte[] getBytes()`  
Encodes this String into a sequence of bytes using the platform's default charset, storing the result into a new byte array.

The "platform's default charset" is what your locale variables say it is. That is, UTF-8. So it takes the UTF-16 internal representation, and converts that into a different representation - UTF-8.
Note that
```
new String(bytes, StandardCharsets.UTF_16);
```

does not "convert it to UTF-16 explicitly" as you assumed it does. This string constructor takes a sequence of bytes, which is supposed to be in the encoding that you have given in the second argument, and converts it to the UTF-16 representation of whatever characters those bytes represent in that encoding.

But you have given it a sequence of bytes encoded in UTF-8, and told it to interpret that as UTF-16. This is wrong, and you do not get the character - or the bytes - that you expect.

You can't tell Java how to internally store strings. It always stores them as UTF-16.

## More about Unicode
To use bits to represent anything at all besides bits, we need rules. We need to convert a sequence of bits into something like letters, numbers and pictures using an encoding scheme, or encoding for short. Like this:

01100010 01101001 01110100 01110011
b        i        t        s
In this encoding, 01100010 stands for the letter "b", 01101001 for the letter "i", 01110100 stands for "t" and 01110011 for "s".

### Definitions
character set, charset = The set of characters that can be encoded. "The ASCII encoding encompasses a character set of 128 characters." Essentially synonymous to "encoding".

code page = A "page" of codes that map a character to a number or bit sequence. A.k.a. "the table". Essentially synonymous to "encoding".

string = A string is a bunch of items strung together. A bit string is a bunch of bits, like 01010011. A character string is a bunch of characters, like this. Synonymous to "sequence".

### Unicode Encodings
Unicode basically defines a ginormous table of 1,114,112 code points that can be used for all sorts of letters and symbols.

So, how many bits does Unicode use to encode all these characters? None. Because Unicode is not an encoding.

Unicode first and foremost defines a table of code points for characters. That's a fancy way of saying "65 stands for A, 66 stands for B and 9,731 stands for ☃" (seriously, it does). How these code points are actually encoded into bits is a different topic. To represent 1,114,112 different values, two bytes aren't enough. Three bytes are, but three bytes are often awkward to work with, so four bytes would be the comfortable minimum. But, unless you're actually using Chinese or some of the other characters with big numbers that take a lot of bits to encode, you're never going to use a huge chunk of those four bytes.

To optimize this, there are several ways to encode Unicode code points into bits. UTF-32 is such an encoding that encodes all Unicode code points using 32 bits. That is, four bytes per character. It's very simple, but often wastes a lot of space. UTF-16 and UTF-8 are variable-length encodings. If a character can be represented using a single byte (because its code point is a very small number), UTF-8 will encode it with a single byte. If it requires two bytes, it will use two bytes and so on. It has elaborate ways to use the highest bits in a byte to signal how many bytes a character consists of. This can save space, but may also waste space if these signal bits need to be used often. UTF-16 is in the middle, using at least two bytes, growing to up to four bytes as necessary.

#### Unicode
Unicode is a large table mapping characters to numbers and the different UTF encodings specify how these numbers are encoded as bits.

#### Code Points
Characters are referred to by their "Unicode code point". Unicode code points are written in hexadecimal (to keep the numbers shorter), preceded by a "U+" (that's just what they do, it has no other meaning than "this is a Unicode code point"). The character Ḁ has the Unicode code point U+1E00.

## Issues
Issues can happen if your db stores things in latin-1, but you send in UTF-8 and get and translate to UTF-8 when you read it back. From your app everything is fine, but the db interface may show it as garbaled because it thinks its latin-1. This may be a problem if there is some operation manipulating the text.

You can have a problem if you save a document as UTF-8 but it's interpreted as some other encoding.

If you save something as Japanese Shift-JIS encoding, then resave it as UTF-8, you'll change all the characters to be encoded as UTF-8, and now it'll be really hard to get back to Japanese Shift-JIS meaning.

The ingenious thing about UTF-8 is that it's binary compatible with ASCII, which is the de-facto baseline for all encodings. All characters available in the ASCII encoding only take up a single byte in UTF-8 and they're the exact same bytes as are used in ASCII. In other words, ASCII maps 1:1 unto UTF-8. Any character not in ASCII takes up two or more bytes in UTF-8. For most programming languages that expect to parse ASCII, this means you can include UTF-8 text directly in your program.

# Endian
In its most common usage, endianness indicates the ordering of bytes within a multi-byte number. A big-endian ordering places the most significant byte first and the least significant byte last, while a little-endian ordering does the opposite.

Big is left to right, little is right to left.

Memory is one large array, with the array containing bytes. 

If a word is 32 bits, that is 4 bytes. Each memory address can only store a single byte, not 4 bytes. That means we split the 32 bit quantity into 4 bytes. For example, say we havea 32 bit quantity, written as 90AB12CD16, which is hexadecimal. Since each hex digit is 4 bits, we need 8 hex digits to represent the 32 bit value.

So the 4 bytes are: 90, AB, 12 CD, where each byte requires 2 hex digits.

There are two ways to store this in memory.

## Big Endian
In big endian, you store the most significant byte in the smallest address. This would be:
1000    90
1001    AB
1002    12
1003    CD

## Little Endian
In little endian, you store the least significant byte in the smallest address.
Opposite to above.

## Memory
This only makes sense when talking about breaking a number into bytes, so its relvant when talking about storing a 32 bit integer in memory, as each slot in memory can only hold a byte, but it makes no sense when talking about storing in a 32 bit register. It's least significant byte, not bit.

A registry is simply a 32 bit quantity, b31..b0, and endianness does not apply to it.

Watch video

Why would a 32 bit system be more performant than a 64 bit system?


# Hexadecimal

**Conversion**: The number 1234<sub>16</sub> is equivalent to   
1 x 16<sup>3</sup> + 2 x 16<sup>1</sup> + 3 x 16<sup>`</sup> + 4 x 16<sup>0</sup> = 4660<sub>10</sub>.

**Representation**: C- derivative programming languages use the prefix `0x` to denote a hex value DEAD<sub>16</sub> = 0xDEAD.

## Converting between hex and binary
| Binary | Hex |
| ------ | --- |
| 0000   | 0   |
| 0001   | 1   |
| 0010   | 2   |
| 0011   | 3   |
| 0100   | 4   |
| 0101   | 5   |
| 0110   | 6   |
| 0111   | 7   |
| 1000   | 8   |
| 1001   | 9   |
| 1010   | A   |
| 1011   | B   |
| 1100   | C   |
| 1101   | D   |
| 1110   | E   |
| 1111   | F   |

## Terminology
Nibble? 4 bits    
Byte? 8 bits, smallest addressable data item on many CPUs.

What is a word? Depends on the CPU, 16-bit, 32-bit, 64-bit. Most CPUs efficient hbandle objects up to a certain size. Typically programs handle numeric objects no longer than 128 or 256 bits

What is two's complement? With n bits we can only represent 2<sup>n</sup>  different objects. With n bits we can represent signed values in the range of -2<sup>n-1</sup> to +2<sup>n-1</sup>-1.   
We use the HO (most significant) bit as the sign bit 0 = positive, 1 = negative.   

How to negate a two's complement number?
1. Invert all the bits in tyhe number.
2. Add one to inverted result (ignoring any overflow). You cannot negate the smallest negative value in two's complement numbering system.   

Facts about binary numbers:
1. If first bit is 0, the number is even, else it's odd. 
2. If the LO n bits all contain 0, then the number is evenly divisible by 2<sup>n</sup>.
3. If a binary value contains a 1 at n and zeros everywhere else it is 2<sup>n</sup>.
4. Shift all the bits to the left by 1 multiplies the number by 2.
5. Shifting all the bits of an unsigned interger divides it by 2 (and rounds it down).

What is extension and subtraction?   
With two's complement you cannot arbitrarily add a 8 bit and a 16 bit number. Converting an 8-bit number to a 16-bit number is calleld sign extension and the inverse is called contraction.

What is packing?   
CPUs generally work must efficiently on byte, word, and double word data. You may be able to save some memory by packing different strings of bits together as compactly as possible, without wasting any bits to align a particular data field on a byte or other boundary.
Alothough they are space efficient they are computationally inefficient as it takes time to unpack them. More info on this needed.

What is the problem with floating point numbers?
Some numbers cannot be accurately represented, e.g. 0.3. This canm result in rounding errors.
They can be used to represent big numbers but with limited precision.
![alt](https://wikimedia.org/api/rest_v1/media/math/render/svg/8573a801876eeb57196afa082267ede480c64cbb)
There is:
- 1 sign bit
- 23 bit mantissa
- 8 bit exponent
Single precision is float, double precision is double. The HO is always assumed to be 1. The mantissa uses a 1's complement format (is unsigned). 
More clarification on this is needed.


What is ASCII?
Is a character set which maps 128 chars to the unsigned ionteger values 0..127. It is the standard for data integerchange across systerms and programs.

What are control characters?
THe firrst 32 cahracters from a specicial set of non-rpinting chars. They perform various printer and display control operations, e.g. carriage return. There is very little
standardisation among output devises.

What is unicode?
16-bit word to rerpesent each character. Is upward comptabile with ASCII.   
Only half of the 65536 possible character codes have been defined. RTest is reserved for expansion.


What is a zero-terminated string?
"abc", if ASCII, requires 4 bytes, a, b, c, and 0.

What are the different types of busus?   
Address, data, control. A bus is a collection of wires on which electrical signals pass between components of the system (CPU, I/O, memory).
The bus size is one of the main attributes that define the size of procerssor 32-bit wide vs 64-bit wide..

What is the data bus?   
Shuffles data between component. They can process data blocks up to the bit width of the bus.

Address bus?   
When software wants to access a particular memory location or I/O device, it places the corresponding address on the bus. With n address lines, the processor can access 2<sup>n</sup> unique addresses. The number of bits on a bus will determine the max number of addressable memory and I/O locations.

Size of a process?   
Smaller of:
1. number of data lines on the processor.
2. Size of largest general purpose integer register.

Control bus?
Controls how the processor communicates with the rest of the system. There is a read and write line, which says whether the data is going to or from memory.   
Has system clock lines, interrupt lines, byte enable lines, and status lines.

What is memory?   
Can think of it like an array of bytes. The address of the first byte is 0 and the last byte is 2<sup>-1</sup>.   
To execute Memory[125] := 0 you do:
- data bus = 0
- address bus = 125
- write line = 1

What is the system clock?  
Serves as the timing standard within the system. It is an electrical signal on the control bus that alternates between 0 and 1 at a periodic rate. All activity within the CPU is synchronized with the edge of this clock signal.  
The frequency it alternates between 0 and 1 is the clock frequency. THe time it takes for the system to switch from 0 -> 1 -> is a clock period, also called a clock cycle.   
Hz is 1 cycle per second.  
TO ensure synchronisation, most CPUs start any operation on an edge. The CPU cannot perform any task faster than the clock runs. 
The clock ensures statements are executed in a serialised order.

What is cache memory?
- Sits between CPU and main meory
- Small amount, very fast
- Bytes do not have fixed addresses, can dynamically reassign addresses.

What is a pointer?   
A memory variable whose value is the address of some other memory object.  
Reference anonymous variables that you allocate on the heap.

What is a record?
It is a data class, oa struct in C++  
THe fields are stored together in memory
- most compilers will also ensure that the length of the eniture record is a multiple of two, for, or eight bytes by adding padding.

Union?
- Simlar to a record, but each field has the same offset and all overlap
- You can only use one field at a time.

How does a CPU work?
- Two main components, Control Unit and Arithmetric and logical unit.
- CU: Uses a special register, the instruction pointer, that holds the address of an instructions numerical code (opcode). Fetches the opcode from meory and places it in instruction decoding register for execution. After execution the CU increments the instruction pointer and fetches the next instruction.
- ALU: Consists of logic gates to perform arithmetic operations.
CPU has registers to store the data of output.  
Instructions are hardwired inside the CPU.

What is instruction pipelining?  
Parallelisation in instruction execution  
The stages of execution are: fetch, decode, execute.  
When one instruction is in decode phase the CPU can fetch another.  
CPU execute instructions which are not dependent and is different order.  

Memory Expense?  
Registers > L1 Cache > L2 Cache > main memory > NUMA > virtual memory > file storage   
NUMA = things like memory on video display card.   
THe whole point of having a memory hierarchy is to enable us to take advantage of the principles of spatial locality of reference and temporality of reference.

What is virtual memory?
Gives each process its own 32 bit address space. $1000 in one program is physically different from address $1000 in a different program. CPU maps virtual addrresses used by programs to different physical address. It does this by paging.

What is paging?
Break up memory into blocks of bytes called pages. Use a look up table to map the HO bits of a virtual address to the HO of the physical address, and LO bits as an index into that page.  
You can move unused pages to disk. 

When does thrashing occur?
- Insufficient memory at a given level in the memory hierarchy to properly contain the program working sets of cache lines or pages.
- A program that does not exhibit locality of refernece

What are machine data types?
All data in computers based on digital electronics is represented as bits (alternatives 0 and 1) on the lowest level. The smallest addressable unit of data is usually a group of bits called a byte (usually an octet, which is 8 bits). The unit processed by machine code instructions is called a word (as of 2011, typically 32 or 64 bits). Most instructions interpret the word as a binary number, such that a 32-bit word can represent unsigned integer values from 0 to {\displaystyle 2^{32}-1}2^{{32}}-1 or signed integer values from {\displaystyle -2^{31}}-2^{{31}} to {\displaystyle 2^{31}-1}2^{{31}}-1. Because of two's complement, the machine language and machine doesn't need to distinguish between these unsigned and signed data types for the most part.


# Concurrency

## Threads
A thread is a fundamental uinit of execution within an application: A running application consists of at least one thread. Each thread has its own stack and runs independently from the application’s other threads. By default, threads share their resources, such as file handles or memory. Problems can occur when access to shared resources is not properly controlled. Data corruption is a common side effect of having two threads simultaneously write data to the same block of memory, for example. On most systems, threads are created and managed by the operating system: These are called native threads or kernel-level threads. 

Because the number of threads that can be executed at any given instant is limited by the number of cores in the computer, the operating system rapidly switches from thread to thread,  giving each thread a small window of time to run. This is known as preemptive threading, because the operating system can suspend a thread’s execution at any point to let another thread run. (A cooperative model requires a thread to explicitly take some action to suspend its own execution and let other threads run.) Suspending one thread so another can start to run is referred to as a context switch.

### System vs User
A system thread is created and managed by the system. The first (main) thread of an application is a system thread, and the application often exits when the first thread terminates.

 User threads are explicitly created by the application to do tasks that cannot or should not be done by the main thread. 

Applications that dispay user interfaces usually call their main thread the event thread. User threads often communicate data back to the event thread by queueing events for it to process. This allows the event thread to receive data without stopping and waiting or wasting resources by repeatedly polling.

### Monitors and Semaphores
Applications must use thread synchronisation mechanism to control threads' interaction with shared resources. Two constructs are monitors and semaphores.

A monitor is a set of routines protected by a mutual exclusion lock. A thread cannot execute any of the routines in the monitor until it acquires the lock, which means that only one thread at a time can execute within the monitor; all other threads must wait for the currently executing thread to give up control of the lock.  A thread can suspend itself in the monitor and wait for an event to occur, in which case another thread is given the chance to enter the monitor. 

A semaphore is a simpler construct: just a lock that protects a shared resource. Before using a shared resource, the thread is supposed to acquire the lock. Any other thread that tries to acquire the lock to use the resource is blocked until the lock is released by the thread that owns it, at which point one of the waiting threads (if any) acquires the lock and is unblocked. This is the most basic kind of semaphore, a mutual exclusion, or mutex, semaphore. Other semaphore types include 
 counting semaphores (which let a maximum of n threads access a resource at any given time) and event semaphores (which notify one or all waiting threads that an event has occurred).

 Monitors and semaphores can be used to achieve similar goals, but monitors are simpler to use because they handle all details of lock acquisition and release. When using semaphores, each thread must be careful to release every lock it acquires, including under conditions in which it terminates unexpectedly; otherwise, no other thread that needs the shared resource can proceed. In addition, every routine that accesses the shared resource must explicitly acquire a lock before using the resource, something that can be accidentally omitted when coding. Monitors automatically acquire and release the necessary locks. 

 In java, the synchronised keyword creates a monitor

## Busy Waiting
Busy waiting is avoided by using a monitor or a semaphore, depending on what’s available to the programmer. The waiting thread simply sleeps (suspends itself temporarily) until the other thread notifies it that it’s done. In Java, any shared object can be used as a notification mechanism:

```java
Object theLock = new Object();
    synchronized(theLock)

    {
        Thread task = new TheTask(theLock);
        task.start();
        try {
            theLock.wait();
        } catch (InterruptedException e) {        
            // .... do something if interrupted    
        }
    }

    class TheTask extends Thread {
        private Object theLock;

        public TheTask(Object theLock) {
            this.theLock = theLock;
        }

        public void run() {
            synchronized (theLock) {            
                //.... do the task            
                theLock.notify();
            }
        }
    }
```

## Concurrency Problems

### Producer/Consumer
**Problem:** Write a Producer thread and a Consumer thread that share a fixedsize buffer and an index to access the buffer. The Producer should place numbers into the buffer, and the Consumer should remove the numbers. The order in which the numbers are added or removed is not important.
```java
public static void main(String[] args) {
	IntBuffer buffer = new IntBuffer();
	Thread producer = new ProducerThread(buffer);
	producer.start();
	Thread consumer = new ConsumerThread(buffer);
	consumer.start();
}

public static class ProducerThread extends Thread {
	private IntBuffer buffer;

	public ProducerThread(IntBuffer buffer) {
		this.buffer = buffer;
	}

	@Override
	public void run() {
		Random r = new Random();
		while(true) {
			int num = r.nextInt();
			buffer.add(num);
			System.out.println("Produced " + num);
		}
	}
}

public static class ConsumerThread extends Thread {
	private IntBuffer buffer;

	public ConsumerThread(IntBuffer buffer) {
		this.buffer = buffer;
	}

	@Override
	public void run() {
		while(true) {
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println("Consumed: " + buffer.remove());
		}
	}
}

public static class IntBuffer {
	private int index;
	private int[] buffer = new int[8];

	public synchronized void add(int num) {
		while(index == buffer.length - 1) {
			try {
				System.out.println("Waiting for buffer to empty...");
				wait();
				System.out.println("Add thread woke up!");
			} catch(InterruptedException e) {}
		}
		buffer[index++] = num;
		System.out.println("Notifying from add method that threads that they can now take the lock!");
		notifyAll();
	}

	public synchronized int remove() {
		while(index == 0) {
			try {
				System.out.println("Waiting for buffer to be filled...");
				wait();
				System.out.println("Remove thread woke up!");
			}
			catch(InterruptedException e) {}
		}

		int ret = buffer[--index];
		notifyAll();

		System.out.println("Notifying from remove method that threads that they can now take the lock!");
		return ret;
	}
}
```

### The Dining Philosophers
Deadlocks occur when locks (forks) are acquired in different orders. philospher 1 will try to get fork 1 then fork 2, but philosopher 2 will try to get fork 2 first and then fork. This is true of every philosopher except the last, which will try to get fork n-1 first and then fork 0. Reversing the order of acquisition for this philospher means that all philosophers acquire forks in the same order from a global perspective: lower number first.
```java
public class DiningPhilosophers {    // Each "fork" is just an Object we synchronize on
    private Object[] forks;
    private Philosopher[] philosophers;    // Prepare the forks and philosophers

    private DiningPhilosophers(int num) {
        forks = new Object[num];
        philosophers = new Philosopher[num];
        for (int i = 0; i < num; ++i) {
            forks[i] = new Object();
            int fork1 = i;
            int fork2 = (i + 1) % num;
            if (i == 0) {
                philosophers[i] = new Philosopher(i, fork2, fork1);
            } else {
                philosophers[i] = new Philosopher(i, fork1, fork2);
            }
        }
    }    // Start the eating process

    public void startEating() throws InterruptedException {
        for (int i = 0; i < philosophers.length; ++i) {
            philosophers[i].start();
        }
        // Suspend the main thread until the first philosopher
        // stops eating, which will never happen -- this keeps
        // the simulation running indefinitely
        philosophers[0].join();
    }

    // Each philosopher runs in its own thread.
    private class Philosopher extends Thread {
        private int id;
        private int fork1;
        private int fork2;

        Philosopher(int id, int fork1, int fork2) {
            this.id = id;
            this.fork1 = fork1;
            this.fork2 = fork2;
        }

        public void run() {
            status("Ready to eat using forks " + fork1 + " and " + fork2);
            while (true) {
                status("Picking up fork " + fork1);
                synchronized (forks[fork1]) {
                    status("Picking up fork " + fork2);
                    synchronized (forks[fork2]) {
                        status("Eating");
                    }
                }
            }
        }

        private void status(String msg) {
            System.out.println("Philosopher " + id + ": " + msg);
        }
    }

    // Entry point for simulation
    public static void main(String[] args) {
        try {
            DiningPhilosophers d = new DiningPhilosophers(5);
            d.startEating();
        } catch (InterruptedException e) {
        }
    }
}
```

# Object-Oriented Programming

## OO Problems

### Interfaces and Abstract Classes
**Problem:** What is the difference between an interface and an abstract class in object-oriented programming?

An interface declares a set of related methods, outside of any class.  
An abstract class is an incomplete class definition that declares but does not define all its methods.

### Virtual Methods
**Problem:** What are virtual methods? Why are they useful?

If the method is virtual, the method definition to invoke is determined at run time based on the actual type of the object on which it is invoked. Nonstatic java methods are always virtual, but in C# and C++, methods are only virtual when declared with the virtual keyword. nonvirtual methods are the default. If the method is not virtual, then the method definition invoked is determined at compile time based on the type of the reference (or pointer).
```cpp
class A {
	public:
		void print() { cout << "A"; } 
};

class B : A {
	public:
		void print() { cout << "B"; } 
};

class C : B {
	public:
		void print() { cout << "C"; } 
};


A *a = new A(); 
B *b = new B(); 
C *c = new C(); a->print(); // "A" 
b->print(); // "B" 
c->print(); // "C" 
((B *)c)->print(); // "B" 
((A *)c)->print(); // "A" 
((A *)b)->print(); // "A"


class A { 
public:    
	virtual void print() { cout << "A"; } 
};

class B : A { 
public:    
	virtual void print() { cout << "B"; } 
}; 

class C : B { 
public:    
	virtual void print() { cout << "C"; } 
};

A *a = new A(); 
B *b = new B(); 
C *c = new C(); 
a->print(); // "A" 
b->print(); // "B" 
c->print(); // "C" 
((B *)c)->print(); // "C" 
((A *)c)->print(); // "C" 
((A *)b)->print(); // "B" 
```

Virtual methods aren’t free. It (almost always) takes longer to invoke a virtual method because the address of the appropriate method definition must be looked up in a table before it is invoked. This table also requires a small amount of extra memory. In most applications, the overhead associated with virtual methods is so small as to be negligible.

## Multiple Inheritance
**Problem:** Why do C# and Java disallow the multiple inheritance of classes?
Because of the diamond problem:
```cpp
class A { 
protected:    
	bool flag; 
}; 

class B : public A {}; 

class C : public A {}; 

class D : public B, public C {
public:    
	void setFlag(bool nflag) {
		flag = nflag; // ambiguous    
	} 
}; 
```
There are other complexities with multiple inheritance, such as the order in which the base classes are initialized when a derived object is constructed, or the way members can be inadvertently hidden from derived classes.

### thread safe deferred initialisation

You can defeered and static initialisaiton by employing deferred loading of a na inner class that performs static initisation of an instance. This is thread-safe because the classloader is guaranteed to be serialised, so the inner class is loaded and initialised only once, no matter how many threads call getInstance simultaneously. 

```java
public class Logger {
    // Create and store the singleton.    
    private static Logger instance = null; // no longer final

    // Prevent anyone else from creating this class.    
    private Logger() {
    }

    // Log a string to the console.    
    public void log(String msg) {
        System.out.println(System.currentTimeMillis() + ": " + msg);
    }
    // Inner class initializes instance on load, won't be loaded until referenced by getInstance()

    private static class LoggerHolder {
        public static final Logger instance = new Logger();
    }

    //    Return the singleton instance.

    public static Logger getInstance() {
        return Logger.LoggerHolder.instance;
    }

}
```

# Databases
Example of tables:
```sql
Player (  
	name   CHAR(20),
	number INTEGER(4) PRIMARY KEY 
);

Stats (  
	number      INTEGER(4),
	totalPoints INTEGER(4),
	year        CHAR(20),
	FOREIGN KEY (number) REFERENCES Player 
);
```

Example of insert:
```sql
INSERT INTO Player VALUES('Bill Henry', 50); 
INSERT INTO Player (name, number) VALUES ('Bill Henry', 50);
```

Example of select:
```sql
SELECT name FROM Player WHERE number < 10 OR number > 40;
```

## Inner join
The inner join keyword selects all rows from both tables as long as there is a match between the columns. If there are records in the player table that do not have a match in the stats table then these players will not be shown.
```sql
SELECT name, totalPoints, year FROM Player INNER JOIN Stats ON Player.number = Stats.number; 
```

## Outer join
Outer joins include rows with key values that don't match the corresponding key in the joined table. The values returned will be NULL.  
Three kind of outer joins:
- left: retains all rows from the first table, but only matching rows from the second.
- right: retains all rows from the second table, but only matching rows from the first
- outer: retails all rows from both tables.

This would include players with no stats:
```sql
SELECT name, totalPoints, year FROM Player LEFT OUTER JOIN Stats ON Player.number = Stats.number;
```

## Transactions
The four properties of a transaction are:
- Atomicity: either all operations succeed or they all fail
- Consistency: must ensure that the database is in a correct, consistent state at the start and the end of a transaction. No referential integretiy constraints can be broken, for example.
- Isolation: All changes to the database within a transaction are isolated from all other queries and transactions until the transaction is committed.
- Durability: When committed, changes made in a transaction are permanent. 

## Problems
**Problem:** Return the names of all companies and the total number of employees that each company hired during fiscal quarters 1 through 4, given the following SQL:
```sql
Company (
	    companyName CHAR(30),
		id          INTEGER(4) PRIMARY KEY 
); 

EmployeesHired (
	    id            INTEGER(4),
		numHired      INTEGER(4),     
		fiscalQuarter INTEGER(4),  
		FOREIGN KEY (id) REFERENCES Company
);
```

```sql
SELECT companyName, COALESCE(SUM(numHired), 0) FROM Company LEFT OUTER JOIN EmployeesHired     ON Company.id = EmployeesHired.id GROUP BY companyName;
```

**Problem:** Given the following SQL database schema:
```sql
TEST (
	num INTEGER(4)
);
```
write a SQL statement that returns the maximum value from num without using an aggregate (MAX, MIN, etc.).

```sql
SELECT DISTINCT num FROM Test WHERE num NOT IN (SELECT Lesser.num FROM Test AS Greater, Test AS Lesser WHERE Lesser.num < Greater.num);
```

**Problem:** Given the following table
```sql
Address (
	street CHAR(30) NOT NULL,
	apartment CHAR(10),    
	city CHAR(40) NOT NULL, 
); 
```
write a SQL statement that returns nonapartment addresses only.

This won't work:
```sql
SELECT * FROM Address WHERE apartment = NULL;
```
Need to use:
```sql
SELECT * FROM Address WHERE apartment IS NULL; 
```

# Knowledge-Based Questions

## Problems

## Java vs C++
**Problem:** What are the differences between C++ and Java

Java is compiled to virtual machine byte-code and requires a virtual machine to run. C++ is compiled to native machine code. This gives Java greater potential for portability and security.  Historically, this has also made Java slower than C++, but with just-in-time compiler techniques in modern virtual machines, performance is often comparable. 

C++ is an approximate superset of C and maintains features such as programmer-controlled memory management, pointers, and a preprocessor for backward compatibility with C. In contrast, Java eliminates these and other error-prone features. Java replaces programmer memory deallocations with garbage collection. Java further dispenses with C++ features, such as operator overloading and multiple inheritance.

In Java, all objects are passed by reference, whereas in C++, the default behavior is to pass objects by value. 

 In Java, all methods are virtual, meaning the implementation for a method is selected according to the type of the object as opposed to the type of the reference. In C++, methods must be explicitly declared as virtual. Java has defined sizes for primitive data types, whereas type sizes are implementation-dependent in C++. 

In situations in which there is legacy C code and a great need for performance, C++ has certain benefits, especially when low-level system access is required. In situations in which portability, security, and speed of development are emphasized, Java (or a similar language such as C#) may be a better choice.

## Friend classes
**Problem:** Discuss friend classes in C++ and give an example of when you would use one.

Can be applied to either a function or a class. It gives the friend function or friend class access to the private members of the class in which the delcaration occurs.

Some feel this vilates the principles of OO because it allows a class to operate on another class's private members. 

In some cases, however, the benefits of a friend class outweigh its drawbacks. For example, suppose you implemented a dynamic array class. Imagine that you want a separate class to iterate through your array. The iterator class would probably need access to the dynamic array class’s private members to function correctly. It would make sense to declare the iterator as a friend to the array class. The workings of the two classes are inextricably tied together already, so it probably doesn’t make sense to enforce a meaningless separation between the two. 

Java and C# do not support the concept of friend classes. The closest match these languages have to friends is to omit the access modifiers, thereby specifying “default” access (in Java) or use the “internal” access modifier (in C#) for member data. However, this makes every class in the package (Java) or assembly (C#) equivalent to a friend. In some cases, it may be possible to use a nested class to accomplish a similar design to that achieved with friend classes in C++.

## Argument Passing
**Problem:**  Consider the following C++ function prototypes for a function, foo, which takes an object of class Fruit as an argument:
```cpp
void foo(Fruit bar);        // Prototype 1 
void foo(Fruit* bar);       // Prototype 2 
void foo(Fruit& bar);       // Prototype 3 
void foo(const Fruit* bar); // Prototype 4 
void foo(Fruit*& bar);      // Prototype 5
```
1. passed by value, changes to bar won't be reflected outside the method
2. passes pointer, changes to bar will be reflected outside the method
3. passes reference, changes to bar will be reflected outside the method, don't have to use pointer syntax `->`
4. passes const pointer, can't change bar, can only use const methods
5. passes reference to a pointer, we can change the fruit pointed to by bar and we can change what fruit bar points to, which will be reflected outside the method.

## Macros and Inline Functions
**Problem:** In C++ and C99, compare and constrast macros and inline functions.

Macros are implemented with simple text replacement in the preprocessor. For example, if you define the macro:
```c
#define AVERAGE(a, b) ((a + b) / 2)
```
then the preprocessor replaces any occurrences of AVERAGE(foo, bar) in your code with ((foo + bar) / 2).  
You commonly use macros in places where the thing that you’re substituting  is ugly and used often enough that it warrants abstraction behind a pretty name, but is too simple to be worth the overhead of a function call. 

Inline functions are declared and defined much like regular functions. Unlike macros, they are handled by the compiler directly. An inline function implementation of the AVERAGE macro would look like:
```cpp
inline int Average(int a, int b) {    
	return (a + b)/2; 
}
```

Inline functions have better type safety, byt you can use a single definition of the amcro for any type that has addition and division operators defined.  
From the compiler's perspective, when it encounters a call to an inline function, it writes a copy of the compiled function definition instead of generating a function call.

Macros can create bugs due to unexpected behaviour. This:
```c
#define CUBE(x) x * x * x

int foo, bar = 2; 
foo = CUBE(++bar); 
```
Will get replaced with this:
```c
foo = ++bar * ++bar * ++bar; 
```

When you use macros, the code that is compiled is not visible in the source, which makes debugging difficult. 

### Garbage Collection
**Problem:** What is garbage collection? What are some of the different implementations of garbage collection, and what are the trade-offs between them?

Garbage collection is the process by which memory that is no longer in use is identified and reclaimed. 

Garbage collection provides several advantages over having a programmer explicitly deallocate memory. It eliminates bugs caused by dangling pointers, multiple deallocation, and memory leaks. Makes programming simpler.

Often run more slowly becaue of the overhead. System might over-allocate mmeory and not free memory at an ideal time. 

One method of GC is reference counting. A problem is that if you have something like a circular linked list, then the memory will never get reclaimed. One way to get around this is to use weak references, which are available in C++.

Another method is tracing garbage collector. Under this scheme, memory that is no longer referenced remains allocated until it is identified and deallocated during a garbage collection cycle.  This has the advantages of handling cyclical data structures and avoiding the overhead of incrementing and decrementing reference counts. The simplest implementation of a tracing garbage collector is called mark and sweep.  Each cycle involves two passes. In the first pass, the memory manager marks all objects that can be accessed by any thread in the program. In the second pass, all unmarked objects are deallocated, or swept away. Mark and sweep requires that all execution threads are suspended during garbage collection, which results in unpredictable pauses during program execution.  Most modern tracing garbage collectors, including those in the Java Virtual Machine and the .NET Common Language Runtime that C# uses, employ a more complex scheme called tri-color marking, which doesn’t require suspending execution. (Although it doesn’t eliminate the computational overhead of garbage collection cycles.)

### 32-bit versus 64-bit applications
**Problem:** What’s the difference between a 32-bit application and a 64-bit application? Which is faster?

The terms refer to the size of the memory address and general purpose registers an app uses.

64-bit: a process can address 2^64 = 16 exabytes of memory. 
32-bit 4 gb of memory
64-bit may be faster as it can keep more data in memory, reducing slow disk access.

64-bit bmemory addresses means all pointers require twice as much memory to store. Any given system has the same fixed-size process cache whether running 32-bit or 64-bit applications.  Because the 64-bit data structures are larger, less of them fit in cache, so there are likely to be more cache misses in which the processor must wait for values to be accessed from main memory (or higher cache levels). 

In practice, intel and AMD include additional general purpose registers that help improve performance for 64 bit.

### Cryptography
**Problem:** Discuss the differences between symmetric key cryptography and public key cryptography. Give an example of when you would use each.

Symmetric key cryptography, also called shared key cryptography, involves two people using the same key to encrypt and decrypt information. Public key cryptography makes use of two different keys: a public key for encryption and a private key for decryption.

Symmetric key cryptography has the advantage that it’s much faster than public key cryptography. It is also generally easier to implement and usually requires less processing power. On the downside, the two parties sending messages must agree on the same private key before securely transmitting information. 

 If the two parties are geographically separated, then a secure means of communication is needed for one to tell the other what the key will be. 

 Public key cryptography has the advantage that the public key, used for encryption, does not need to be kept secret for encrypted messages to remain secure. This means public keys can be transmitted over insecure channels. Often, applications use public key cryptography to establish a shared session key and then communicate via symmetric key cryptography using the shared session key. This solution provides the convenience of public key cryptography with the performance of shared key cryptography. 

 Both public key and symmetric key cryptography are used to get secure information from the web. First your browser establishes a shared session key with the website using public key cryptography. 
 Then you communicate with the website using symmetric key cryptography to actually obtain the private information.

# Threading
Threads in Java have their own stack but they share the same heap, so we can share data between them - in that sense when using the observer pattern an object doesn't have a "thread" or a "heap", they will be changed by the thread executing that code.


## How to determine memory usage of an object?
Add amout of memory used by each instance variable to the overhead associated with each object. Typically 16 byte. The overhead includes a reference to the class, garabage collection info, and sync info.   
The object will usually be padded to be a multiple of 8.
- A reference to an object is typically 8 bytes.  
A nested non-static class requires an extra 8 bytes for a reference to the enclosing instance.

## Size of array
Implemeent5ed as objects, with overhead for length.
For a primitive type:
- 24 bytes for header info (16 bytes overhead, 4 bytes for length, 4 bytes for padding) + memory used to store values, e.g. for int then it's + 4N
For objects:
- Same but 8N for 8 bytes for reference.

## Memory for strings
- Aliasing is common
- Space needed for the characters is accounted for seperately because a char array is often shared among strings.


Image by <a href="https://pixabay.com/users/blickpixel-52945/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=453758">Michael Schwarzenberger</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=453758">Pixabay</a>

