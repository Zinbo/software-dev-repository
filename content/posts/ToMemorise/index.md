---
path: "/memorise"
cover: "./image.jpg"
title: "To Memorise"
published: true
date: "2020-05-13"
---

## Algorithms 
| Algorithms                                                           | Time Complexity |
|----------------------------------------------------------------------|-----------------|
| Binary Search in a sorted array of N elements                        | O(log N)        |
| Reversing a string of N elements                                     | O(N)            |
| Linear search in an unsorted array of N elements                     | O(N)            |
| Computing the Nth Fibonacci number using dynamic programming         | O(N)            |
| Sorting an array of N elements using Merge Sort/Quick Sort/Heap Sort | O(N logN)       |
| Sorting an array of N elements using Bubble sort                     | O(N^2)          |
| Two nested loops from 1 to N                                         | O(N^2)          |
| Generating all subsets of a set of N elements                        | O(2^N)          |


## Stack
| Operation                                | Time Complexity |
|------------------------------------------|-----------------|
| Adding a value to the top of a stack     | O(1)            |
| Removing the value at the top of a stack | O(1)            |
| Reversing a stack                        | O(N)            |

## Heap
| Operation                                 | Time Complexity |
|-------------------------------------------|-----------------|
| Adding a value to the heap                | O(log N)        |
| Removing the value at the top of the heap | O(log N)        |

## Hash
| Operation                        | Time Complexity |
|----------------------------------|-----------------|
| Adding a value to a hash         | O(1)            |
| Checking if a value is in a hash | O(1)            |

## Data Structures
![img](DataStructures.PNG)

## Array Sorting
![Sorting](Sorting.PNG)

# Numbers

## Powers of Two
| Power | Exact Value       | Approx Value | Bytes             |
|-------|-------------------|--------------|-------------------|
| 7     | 128               |              |                   |
| 8     | 256               |              |                   |
| 10    | 1024              | 1 thousand   | 1 KB              |
| 16    | 65,536            | 64 KB        |                   |
| 20    | 1,048,576         | 1 million    | 1 MB              |
| 30    | 1,073,741,824     | 1 billion    | 1 GB              |
| 32    | 4,294,967,296     | 4 GB         |                   |
| 40    | 1,099,511,627,776 | 1 trillion   | 1 TB              |

## Latency Numbers Every Programmer Should Know

| Action                              | Nanoseconds | Microseconds | Milliseconds | Notes                       |
|-------------------------------------|-------------|--------------|--------------|-----------------------------|
| L1 cache reference                  | 0.5         |              |              |                             |
| Branch mispredict                   | 5           |              |              |                             |
| L2 cache reference                  | 7           |              |              | 14x L1 cache                |
| Mutex lock/unlock                   | 25          |              |              |                             |
| Main memory reference               | 100         |              |              | 20x L2 cache, 200x L1 cache |
| Compress 1K bytes with Zippy        | 10,000      | 10           |              |                             |
| Send 1 KB bytes over 1 Gbps network | 10,000      | 10           |              |                             |
| Read 4 KB randomly from SSD*        | 150,000     | 150          |              | ~1GB/sec SSD                |
| Read 1 MB sequentially from memory  | 250,000     | 250          |              |                             |
| Round trip within same datacenter   | 500,000     | 500          |              |                             |
| Read 1 MB sequentially from SSD*    | 1,000,000   | 1,000        | 1            | ~1GB/sec SSD, 4X memory     |
| Disk seek                           | 10,000,000  | 10,000       | 10           | 20x datacenter roundtrip    |
| Read 1 MB sequentially from 1 Gbps  | 10,000,000  | 10,000       | 10           | 40x memory, 10X SSD         |
| Read 1 MB sequentially from disk    | 30,000,000  | 30,000       | 30           | 120x memory, 30X SSD        |
| Send packet CA->Netherlands->CA     | 150,000,000 | 150,000      | 150          |                             |

```
1 ns = 10^-9 seconds
1 us = 10^-6 seconds = 1,000 ns
1 ms = 10^-3 seconds = 1,000 us = 1,000,000 ns
```

Handy metrics based on numbers above:
- Read sequentially from disk at 30 MB/s
- Read sequentially from 1 Gbps Ethernet at 100 MB/s
- Read sequentially from SSD at 1 GB/s
- Read sequentially from main memory at 4 GB/s
- 6-7 world-wide round trips per second
- 2,000 round trips per second within a data center

# System Design Topics
- Concurrency. Do you understand threads, deadlock, and starvation? Do you know how to parallelize algorithms? Do you understand consistency and coherence?
Networking. Do you roughly understand IPC and TCP/IP? Do you know the difference between throughput and latency, and when each is the relevant factor?
- Abstraction. You should understand the systems you’re building upon. Do you know roughly how an OS, file system, and database work? Do you know about the various levels of caching in a modern OS?
- Real-World Performance. You should be familiar with the speed of everything your computer can do, including the relative performance of RAM, disk, SSD and your network.
- Estimation. Estimation, especially in the form of a back-of-the-envelope calculation, is important because it helps you narrow down the list of possible solutions to only the ones that are feasible. Then you have only a few prototypes or micro-benchmarks to write.
- Availability and Reliability. Are you thinking about how things can fail, especially in a distributed environment? Do know how to design a system to cope with network failures? Do you understand durability?
