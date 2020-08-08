---
path: "/networking"
cover: "./networking.jpg"
title: "Networking"
published: true
date: "2020-04-07"
---

# Internet
The internet is a distributed packet-switched network. No one person is in charge of it, it is a distributed network. It is a design philosphy expressed in a set of protocols.

A protocol is a well known set of rules and standards used to communicate between machines.

Bandwidth is the maximum transmission capacity of a device.

- **Bit Rate**: Number of bits that we can send over a given period of time.
- **Latency**: Time it takes for a bit to travel from one place to another.

Your ISP connects you to billions of devices around the world through hundres of thousands of networks.


## Fiber Optic
Ethernet cables have real measurable signal loss over a few hundred feet.

A better way is through light, using fiber optic cables. Send bits as light beams. 

A fiber optic cable is a thread of glass engineered to reflect light. Depending on the bounce angle we can actually send multiple bits simultaneously all of them travelling at the speed of light. The signal doesn't degrade over long distances, no signal loss. We use fiber optic cables across the ocean floors to connect one continent to another. At one point there was a cable that was cut near egypt that disrupted the intenet for most of the middle east and india. Unfortunately fiber optic is really expensive and hard to work with. Most of the time we'll see copper cable.

## Wireless 
Wireless bit-sending machines use radio signals to send bits from one place to another. The machines have to translate the ones and zeroes into radio waves of different frequencies. The receiving machines reverse the process. A radio signal can't travel far before it gets garbled. If you're using wifi, you'll send your bits over radio to the wireless router and that uses a physical wire to travel the really long distances of the internet.

## IP
All device on the internet has a distinct IP

Traditional IP addresses are 32 bits - 8 bits per part of the addresses.  
An IP address is made up of a network and sub-network. This is IPv4. 4 billion unique devices. Not enough.

Transition to IPv6, 128 bits, 340 undecillion addresses.

## Information flow
Information goes from one pc to another in a packet of information.

Info needs to be broken down into packets. THey may get to their destination at different times. Packets don't decide their route, they only know where they came from and where they're going.

Special computers on the internet called routers act like traffic managers to keep the packets moving through the networks smoothly. If networks become congested packets may travel through different routes through the internet and they may arrive at different times or out of order. Every router keeps track of multiple paths for sending packets and  it picks the cheapest available path for each packket of data.

Cheapest is not cost, but time, politics, and relationships between companies. Having options make the network fault tolerant.

Packets can take different routes - this is packet switching.

Circuit switching - used by POTS plain old telephone systems. One path all packets take. Path set up prior to any communication.

MAC addresses change as packet crosses the internet but IP addresses stay the same.

MAC Addresses = layer 2 Data Link  
IP Addresses = Layer 3 Network

# OSI and TCP/IP
Back in the past, every operating system had their own way to communicate over a network.  
This was chaos, so the International Standards Origanisation (ISO) created a model called Open Systems Interconnect (OSI) to solve this interoperability problem. It doesn't really exist, it is used to describe how networks work.

Around the year 2000, the network wars ended and TCP/IP won.

TCP/IP is a suite of protocols, it's a whole bunch of protocols its more than just TCP and IP.

The OSI model consists of 7 layers:
- 7 - Application. E.g. email, web browsers, etc.
- 6 - Presentation: configures the data. Responsible for things like encryption, compression, translation.
- 5 - Session: Controls the communcation. Things like Login rights, permissions, and rights.
- 4 - Transport: It's job is to guarantee end to end delivery of data.
- 3 - Network: It has the duty to find the shortest path to the destination network.
- 2 - Data Link: It decides whose turn it is to talk AND finds the physical device on the network.
- 1 - Physical: It describes the physical part of the network, cables, voltages, frquences, connectors, bits, transfer rates, etc.

The OSI Model describes:
- The network protocol stack
- a set of rules
- how data is communicated
- the network devices

TCP/IP has four layers (in brackets is matching OSI layers):
- Application (application, presentation, session)
- transport (transport)
- Internet (network)
- Network Access (data link and physical)

TCP/IP Application layer has lots of protocols, such as HTTP, HTTPS, FTP, SMTP, SSH, Telnet, DNS, etc.
If you use HTTPS and login, that becomes part of the session layer, any encryption, and that is part of the presentation layer.

Transport layer protocols are TCP and UDP. Most of our networks are digital and extremely reliable now, that means UDP is more applicable now

Internet Layer protocols are IP, ICMP, ARP. Ping uses ICMP

Network Access protocols are ethernet, WiFI, Fiber Optics, microwave, etc.

# Sockets
When establishing connectivity, the client and server each bind a "socket" to their end of the connection. Once a connection has been established the client and sever both read from and write to the socket when communicating.

A socket is a combination of both an IP address and a port number. Each socket used in a client-sever communication is an endpoint of the two-way communication link used to send packets between applications. Multiple TCP connections can be initiated between each client and a server and each connection is unique by its combination of ports and endpoints.

The server runs on a specific host where it creates and continously listens to a "server socket" that is bound to a specified port number and waits for clients to make connection requests. The client needs to know the correct port and up address to initiate a connection. When the server accepts the client's connection request, the client also creates a socket and communication between the client and sever takes place as both read from and write to their sockets.

A socket API is usually provided by the OS.

Datagram (connectionless) sockets use UDP

Stream (connection-oriented) sockets use TCP or SCTP.

Raw sockets typically available in routers and other network equipment. Here the trasnport layer is bypassed, adn the packet headers are made accessible to the application.

famous port numbers:

| Port | Service | Transport Protocol |
|------|---------|--------------------|
| 21   | FTP     | TCP, UDP, SCTP     |
| 22   | SSH     | TCP, UDP, SCTP     |
| 23   | Telnet  | TCP, UDP           |
| 80   | HTTP    | TCP, UDP           |
| 443  | HTTPS   | TCP, UDP, SCTP     |

On the server side we will:
- create a socket with the socket() system call
- Bind the socket to an address using the bind() system call.
- Listen for connections with the listen() system call
- Accept a connection with the accept() system call. This call typicall blocks until a client connects with the server
- send and receive data.

On the client side:
- Create a socket with the socket() system call
- Connect the socket to the address of the server using the connect() system call
- Send and receive data. There are a number of ways to do this, but the simplest is to use the read() and write() system calls.
The client already knows the port and ip to connect to.

# UDP and TCP
Every network packet follows the following 5 layer structure:
- Application: e.g. HTTP
- Transport: UDP and TCP
- Network: IP 
- Link: e.g. ethernet or WiFi
- Physical layer: e.g. Coaxial Ethernet cable

The purpose of the transport layer is to let multiple applications use one network connection simultaneously.  

The transport layer creates about 65K ports on computer per network connection. These ports can be reserved and used by applications on your computer and one application can use multiple ports at the same time.

When an application creates a message it is passed on to the transport layer. On this layer we wrap the message inside what we call a segment. This segment contains some additional information like the source and the destination ports. It is then passed onto the network layer for further processing. The receiver will see our segment when the network layer passes it to the transport layer. The segment will be examined to determine the destination port and then the message is unwrapped and delivered to the correct port.

## UDP
User Datagram Protocol

The lightweight, connectionless choice.

Has smaller packet sizes than TCP.  
UDP header: 8 bytes  
TCP header: 20 bytes

Is connectionless, means you don't have to create a connection first before sending out data 

More control over when data is sent out

Data corruption is a common occurance on the internet.

It has primitive error detection, its packets carry a 16-bit checksum but it is not that relaiable. When UDP detects corruption it will not try to recover from it. The corrupted segment will be discarded. It does not try to compensate for lost packets, each packet is sent out once.

It does not guarantee in order packet delivery.

There is no congestion control in UDP, even if the network is really busy, UDP will just cram those packets into the same network.

Is called message-oriented, this means applications send their data in distinct chunks. Like sending a text message.

Don't have the overhead of opening and closing connections every time.

Used by HTTP/3.

## TCP
Transmission Control Protocol

The reliable, connection-based choice.

Since TCP is connection based, we have to negotiate a connection first before we can do anything. This procedure is known as the three-way handshake. First the initiator will ask the acceptor if it wants to setup up a connection. The acceptor will reply to this request and when the initiator receives this reply it will send a packet to the acceptor that achnowledges that the connection has now been established. Similar happens when closing a connection. When the sender sends info, the receiver will acknowledge that it recieved that data.

Offers retransmission when a sender doesn't get a delivery acknowledgement within a certain amount of time.  
TCP does an inventory and sends bac kacknowledgements of each packet received. If all packets are there TCP will sign off the delivery and you're done. If TCP finds some packets are missing, it won't sign. For each missing or incomplete packet, spotify will resend then. Once TCP verifies the delivery for many packets for that one delivery your song will start to play.

Can implement in order delivery. Even though they may arrive out of order, TCP will rearrange the packets before sending them to the application.

Has congestion control - delays transmission when the network is congested. Side effect of this is that data doesn't always get sent out immediately.

Has mandatory checksum - no better than UDP, but is made mandatory for IPv4, whereas only IPv6 is mandatory for UDP.

Has a bigger communication overhead than UDP. Bigger header, retransmission of packets, acknowledgement of packets, etc.

Is stream-oriented, is used as a continuous flow od data. Data is split up into chunks by TCP. More like a phone conversation.

Routers and TCP are built to scale. The more routers, the more reliable the internet becomes. We can grow and scale without interrupting the internet for anyone.

## Use cases

Good use cases for TCP:
- text communication: need data in correct order
- file transfers: can't lose data or in wrong order

Multimedia streaming can use either UDP or TCP:
- UDP is preferred because it has less overhead, send delay is undesirable, and data loss can be masked.
- TCP is sometimes preferred when its overhead doesn't deteriorate performance, and some firewalls block UDP for security reasons.


# SSL
Facebook had a problem where they didn't encrypt their traffic after sign in, so anyone could sniff your packets.

You could use tools like firesheep to do this, you could get the users cookie and use it to impersonate them,

SSL (or its successor, TLS) provides:
- confidentiality
- integrity
- authenticity

Often if we say we are using SSL we are using TLS as it's newer.

With SSL we need to do a handshake.

Steps:
1. client hello, tell the client that we can communicate securely through certain protocols, e.g. AES. These method are known as cipher suites. Can use wireshark to view these.  
2. server hello. The server confirms on a cipher suite.  
3. Server key exchange. The server sends its digital certificate, where a digital certificate is what associates a domain name with a public key. The purpose of this is to prove to the client that the server is actually who they say they are. A certificate is a trusted third party that verifies the owner of the certificate. You can see the public key in the certificate.  
4. server hello done. Server saying I've sent my cert, waiting on your response.
5. Next is client key exchange. Everything up to this point has been in plain text. Now to communicate securely we are not going to use the public key and private key anymore, we are going to have the same symetric key that we both enctypt and decrypt with. The client sends a random number, which is encrypted wit hthe public key so not suseptible to man in the middle attacks. This step will be repeated if session expires, a user logs out, etc.
6. change cipher spec. Both client and server signal that we're going from insecure communication to secure.
7. encrypted handshake. Both going to send each other an encrypted message, this signals and verifies that the key information that they just created is correct, verifies that everything they agreed upon in the previous handshake is still the same.

When all this is done you'll see the lock symbol.

SSL is the version before TLS.

When you send over the list of ciphers they are: 
SSL 2.0     TLS 1.0
SSL 3.0     TLS 1.1 
etc.


## SSL

Safe websites prevent snooping and tampering by asking your web browser to communicate on a secure channel using Secure Sockets Layer, and its successor Transport Layer Security. They are a layer of security wrapped around your communications.

When a website asks your browser to engage in a secure connection, it first provides a digital certificate, proving that it is the website it claims to be. Certificates are provided by certificate authorities. Which are trusted entities that verify identities of websites and issues certificates for them.

If you try to set up a secure connection without a valid certificate, your browser will warn you.

Todays secure communications are encrpyted using 256 bit keys. That is a lot of different possible keys. We predict that in a few hundred years, 256 bits won't be enough to be safe.

Increasing the size of a key doesn't make encrpytion much harder, but it exponentially increases the number of guesses needed to crack a cipher.

When the sender and the receiver uses the same key to encrypt and decrypt a message, it's called symmetric encryption.

It's impossible for two computers on the internet to meet in private to exchange a key. Instead computers use asymmetric keys: a public key which can be exchanged with anybody, and a private key that is not shared. 

The public key is used to encrypt data and anybody  can use it to create a secret message. The secret can only be decrypted by a computer with access to the private key. 

Public key cryptography is the foundation of all secure mesasging on the internet. Including SSL and TLS.

Using viruses, hackers cna take over millions of computers world wide and then use them as a digital army, known as a botnet, to attack and take down websites. This is a DDoS.

90% of the time a system gets hacked due to a human error. 




# HTTP 2
HTTP 1.1. didn't have multiplexing, you could send multiple requests but only get back data after the first returned. 

Only could have 6 TCP connections from one origin.

In HTTP 2 streams are multiplexed by splitting communication into frames, these frames are then interleaved.

This allows prioritisation. This allows you to say things like: this css, is critical, so has priority 1, but this cat image isn't so get that last.

There is also stream flow control. This allows us to say things like, I will accept 64kb of kitten image, then load all of this critical.js, then later load the rest of the kitten image.

It would need to be a low res image then and need to be a progressive image.

HTTP 2 supports header compression.

Uses binary headers rather than text.

For HTTP2 to be successful we need to have smarter servers who are going to understand the metadata sent from the client.

One RPC stack to rule them all - standardised high performance RPC protocol stack. No longer need gRPC and protobuf?


# HTTP 3
Fill in

# DNS
DNS is hierarchical, has few authoritative servers at the top level.

You router or ISP provides information about which DNS server(s) to contact when doing a lookup.

Lower level DNS servers cache mappings, which could become stale due to DNS propagation delays.

DNS results can also be cached by your browser or OS for a certain period of time, determined by the time to live.

- NS Record (name server) - Specifies the DNS servers for your domain/subdomain.
- MX record (mail exchange) - specifies the mail servers for accepting messages.
- A record (address) - Points a name to an IP address.
- CNAME (canonical) - Points a name to another name or `CNAME` (example.com to www.example.com) or to an `A` record.

Services such as CloudFlare and Route53 provide managed DNS services. Some DNS services can route traffic through various methods:
- Weighted round robin
    - Prevent traffic from going to servers under maintenance
    - balance between varying cluster sizes
    - A/B testing
- Latency-based
- Geolocation-based

Disadvantages:
- Accessing a DNS server introduces a slight delay, mitagated by caching
- DNS server management could be complex and is generally managed by governments, ISPs and large companies.
- DNS services have recently come under DDoS attack, prevents users from accessing website such as Twitter without known Twitter's IP address(es).

DNS architecture is a hierarchical distributed database and an associated set of protocols that define:
- A mechanism for querying and updating the database.
- A mechanism for replicating the information in the database among servers.
- A schema of the database.

In the early days of the internet, the host names of the computers in the network were managed through the use of a single HOSTS file located on a centrally administered server.

Each site that needed to resolve host names on the network downloaded this file.

As the number of hosts on the internet grew, we needed a scalable decentralised administration.

With DNS, the host names reside in a database that can be distributed among multiple servers, decreasing the load on any one server and providing the ability to administer their naming system on a per-partition basis. DNS supports hierarchical names and allows registration of various data types in addition to host name-to-IP address mapping used in HOSTS files. Because the DNS database is distributed, its potential size is unlimited and performance is not degraded when more servers are added.

The names in a DNS database form a hierarchical tree structure called the domain namespace. Domain names consist of individual labels separated by dots, for example: mydomain.microsoft.com

![DNS Tree](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/images/dd197427.b806a082-8b59-44cd-87cc-eaaffceef548%28ws.10%29.gif)

This figure shows how Microsoft is assigned authority by the Internet root servers for its own part of the DNS domain namespace tree on the Internet. DNS clients and servers use queries as the fundamental method of resolving names in the tree to specific types of resource information. This information is provided by DNS servers in query responses to DNS clients, which then extract the information and pass it to a requesting program for resolving the queried name. In the process of resolving a name, keep in mind that DNS servers often function as DNS clients, querying other servers in order to fully resolve a queried name.

Any DNS domain name used in the tree is technically a domain. Most DNS discussions, however, identify names in one of five ways, based on the level and the way a name is commonly used. For example, the DNS domain name registered to Microsoft (microsoft.com.) is known as a second-level domain. This is because the name has two parts (known as labels) that indicate it is located two levels below the root or top of the tree. Most DNS domain names have two or more labels, each of which indicates a new level in the tree. Periods are used in names to separate labels.

Traffic on the internet doesn't travel on a direct line - this doesn't scale, instead it travels in a much less direct fashion.
The path may change in the midst of computer to computer conversation.

# Network Performance Questions
**Problem:** What are the two major issues in networking performance?

Any network can be measured by two major characteristics: latency and bandwidth. Latency refers to the time it takes a given bit of information to get from one point to another on the network. 

Bandwidth refers to the rate at which data moves through the network once communication is established. The perfect network would have infinite bandwidth and no latency. 

A pipe is a useful analog for a network. The time it takes for a molecule of water to go through the whole pipe is related to the length; this is analogous to the latency. The width of the pipe determines the bandwidth: how much water can pass in a given time. 

Image by <a href="https://pixabay.com/users/TheAndrasBarta-2004841/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1264062">TheAndrasBarta</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1264062">Pixabay</a>





