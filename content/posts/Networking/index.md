---
path: "/networking"
cover: "./networking.jpg"
title: "Networking"
published: true
tags: ["something"]
date: "2018-10-15"
---

# Networking

## Internet
The internet is a distributed packet-switched network. No one person is in charge of it, it is a distributed network.

Bandwidth is the maximum transmission capacity of a device.

Bit Rate: Number of bits that we can send over a given period of time.

Latency: Time it takes for a bit to travel from one place to another.

Ethernet cables have real measurable signal loss over a few hundred feet.

A better way is through light, using fiber optic cables. Send bits as light beams. Fiber optic cable is a thread of glass engineered to reflect light. Depending on the bounce angle we can actually send multiple bits simultaneously all of them travelling at the speed of light. The signal doesn't degrade over long distances, no signal loss. We use fiber optic cables across the ocean floors to connect one continent to another. At one point there was a cable that was cut near egypt that disrupted the intenet for most of the middle east and india. Unfortunately fiber optic is really expensive and hard to work with. Most of the time we'll see copper cable.

Wireless bit-sending machines use radio signals to send bits from one place to another. The machines have to translate the ones and zeroes into radio waves of different frequencies. The receiving machines reverse the process. A radio signal can't travel far before it gets garbled. If you're using wifi, you'll send your bits over radio to the wireless router and that uses a physical wire to travel the really long distances of the internet.

ISP connects you to billions of devices around the world through hundres of thousands of networks.

The internet is a design philosophy expressed in a set of protocols.

A protocol is a well known set of rules and standards used to communicate between machines.

All device on the internet has a distinct IP

Traditional IP addresses are 32 bits - 8 bits per part of the addresses.  
An IP address is made up of a network and sub-network. This is IPv4. 4 billion unique devices. Not enough.

Transition to IPv6, 128 bits, 340 undecillion addresses.

DNS associates names with addresses. Computer uses DNS name to look up address. Asks DNS server.

DNS Servers are connected in a distributed hierarchy and are divided into zones. Splitting up responsibilties for different domains, .org, .com, etc.

Created to be a open and public communication protocol. Susspectible to DNS spoofing.

Traffic on the internet doesn't travel on a direct line - this doesn't scale, instead it travels in a much less direct fashion.
The path may change in the midts of computer to computer conversation.

Information goes from one pc to another in a packet of information.

Info needs to be broken down into packets. THey may get to their destination at different times. Packets don't decide their route, they only know where they came from and where they're going.

Special computers on the internet called routers act like traffic managers to keep the packets moving through the networks smoothly. If networks become congested packets may travel through different routes through the internet and they may arrive at different times or out of order. Every router keeps track of multiple paths for sending packets and  it picks the cheapest available path for each packket of data.

Cheapest is not cost, but time, politics, and relationships between companies. Having options make the network fault tolerant.

Transmission control protocol

manages the sending and receiving of all all data by packets.

TCP does an inventory and sends bac kacknowledgements of each packet received. If all packets are there TCP will sign off the delivery and you're done. If TCP finds some packets are missing, it won't sign. For each missing or incomplete packet, spotify will resend then. Once TCP verifies the delivery for many packets for that one delivery your song will start to play.

Routers and TCP are built to scale. The more routers, the more reliable the internet becomes. We can grow and scale without interrupting the internet for anyone.

Packets are reassembled in order.

When you request a website, the server starts to talk to your computer in language called HTTP

HyperText Transfer Protocol.

How does port forwarding work?

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

## UDP and TCP
Every network packet follws the following 5 layer structure:
- Application: e.g. HTTP
- Transport: UDP and TCP
- Network: IP 
- Link: e.g. ethernet or WiFi
- Physical layer: e.g. Coaxial Ethernet cable

The purpose of the transport layer is to let multiple applications use one network connection simultaneously.  

The transport layer creates about 65K ports on computer per network connection. These ports can be reserved and used by applications on your computer and one application can use multiple ports at the same time.

When an application creates a message it is passed on to the transport layer. On this layer we wrap the message inside what we call a segment. This segment contains some additional information like the source and the destination ports. It is then passed onto the network layer for further processing. The receiver will see our segment when the network layer passes it to the transport layer. The segment will be examined to determine the destination port and then the message is unwrapped and delivered to the correct port.

### UDP
User Datagram Protocol

The lightweight, connectionless choice.

Has smaller packet sizes than TCP.  
UDP header: 8 bytes  
TCP header: 20 bytes

Is connectionless, means you don't have to create a connection first before sending out data 

More control over when data is sent out

Data corruption is a common occurance on the internet.

It has primitive error detection, its packets carry a 16-bit checksum but it is not that relaiable. When UDP detects corruption it will not try to recover from it. The corrupted segment will be dicarded. It does not try to compensate for lost packets, each packet is sent out once.

It does not guarantee in order packet delivery.

There is no congestion control in UDP, evne if the network is really busy, UDP will just cram those packets into the same network.

Is called message-oriented, this means applications send their data in distinct chunks. Like sending a text message.

Don't have the overhead of opening and closing connections every time.

### TCP
Transmission COntrol Protocol

The reliable, connection-based choice.

Since TCP is connection based, we have to negotiate a connection first before we can do anything. This procedure is known as the three-way handshake. First the initiator will ask the acceptor if it wants to setp up a connection. THe acceptor will reply to this request and when the initiator receives this reply it will send a packet to the acceptor that achnowledges that the connection has now been established. Similar happens when closing a connection. When the sender sends info, the receiver will acknowledge that it recieved that data.

Offers retransmission when a sender doesn't get a delivery acknowledgement within a certain amount of time.

Can implement in order delivery. Even though they may arrive out of order, TCP will rearrange the packets before sending them to the application.

Has congestion control - delays transmission when the network is congested. Side effect of this is that data doesn't always get sent out immediately.

Has mandatory checksum - no better than UDP, but is made mandatory for IPv4, whereas only IPv6 is mandatory for UDP.

Has a bigger communication overhead than UDP. Bigger header, retransmission of packets, acknowledgement of packets, etc.

Is stream-oriented, is used as a continuous flow od data. Data is split up into chunks by TCP. More like a phone conversation.

Good use cases for TCP:
- text communication: need data in correct order
- file transfers: can't lose data or in wrong order

Multimedia streaming can use either UDP or TCP:
- UDP is preferred because it has less overhead, send delay is undesirable, and data loss can be masked.
- TSDP is sometimes preferred when its overhead doesn't deteriorate performance, and some firewalls block UDP for security reasons.

## OSI and TCP/IP
Bakc in the past, every operating system had their own way to communicate over a network.  
This was chaos, so the International Standards Origanisation (ISO) created a model called Open Systems Interconnect (OSI) to solve this interoperability problem. It doesn't really exist, it is used to describe how networks work.

Around the year 200, the network works ended and TCP/IP won.

TCP/IP is a suite of protocols, it's a whole bunch of protocols its more than just TCP and IP.

The OSI model consists of 7 layers:
- 7 - Application. E.g. email, web browsers, etc.
- 6 - Presentation: configurs the data. Responsible for things like encryption, compression, translation. Is also responsible for translating from ASCII to other formats if the device you're talking to doesn't support it?
- 5 - Session: Controlls the communcation. Things like Login rights, permissions, and rights.
- 4 - Transport: It's job is to guarantee end to end delivery of data.
- 3 - Network: It has the duty to find the shortest path to the destination network.
- 2 - Data Link: It decides whose turn it is to talk AND finds the physical device on the network.
- 1 - Physical: It describes the physical part of the network, cables, voltages, frquences, connectors, bits, transfer rates, etc.

Read from the bottom up

The OSI Model describes:
- The network protocol stack
- a set of rules
- how data is communicate
- the network devices

TCP/IP has four layers (in brackets is matching OSI layers):
- Application (application, presentation, session)
- transport (transport)
- Internet (network)
- Network Access (data link and physical)

TCP/IP Application layer has lots of protocols, such as HTTP, HTTPS, FTP, SMTP, SSH, Telnet, DNS, etc.
If you use HTTPS and login, that becomes part of the session layer, any encryption, and that is part of the presentation layer.

Transport layer protocols are TCP and UDP. Most of our networks are digital and extremely reliable now, that means UDP is more applicable now?

Internet Layer protocols are IP, ICMP, ARP. Ping uses ICMP

Network Access protocols are ethernet, WiFI, Fiber Optics, microwave, etc.

# Networking

## Sockets
When establishing connectivity, the client and server each bind a "socket" to their end of the connection. Once a connection has been established the client and sever both read from and writre to the socket when communicating.

A socket is a combination of both an IP address and a port number. Each socket used in a client-sever communication is an endpoint of the two-way communication link used to send packets between applications. Multiple TCP connections can be initiated between each client and a server and each connection is unique by its combination of ports and endpoints.

The sever runs on a specific host where it creates and continously listens to a "server socket" that is bound to a specified port number and waits for clients to make connection requests. The client needs to know the correct port and up address to initiate a connection. WHen the server accepts the client's connection request, the client also creates a socket and communication between the client and sever takes place as both read from and write to their sockets.

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

 If you do ipconfig you'll see all your dss servers.

 When tcp does the handskae, each time a number is incremented as the acknowledgement.

 Wireshark is a packet sniffer, how does that work?

## SSL
Facebook had a problem where they didn't encrypt their traffic after sign in, so anyone could sniff your packets.

You could use tools like firesheep to do this, you could get the users cookie and use it to impersonate them,

SSL (or its successor, TLS) provides:
- confidentiality
- integrity
- authenticity

Often if we say we are using SSL we using TLS as it's newer.

With SSL we need to do a handshake

First step is client hello, tell the client that we can communicate securely through certain protocols, e.g. AES.

These method are known as cipher suites.

Can use wireshake to view these.

The next step is the server hello.

The server confirms on a cipher suite.


Step 3 Server key exchange

The server sends its digital certificate, and a digital certificate is what associates a domain name with a public key.

The purpose of this is to prove to the client that the server is actually who they say they are.

A certificaten is a trusted third party that verifies the owner of the certificate.

You can see the public key in the certificate.

Next step is server hello done. Server saying I've sent my cert, waiting on your response.

Next is client key exchange
Everything up to this point has been in plain text.

Now to communicate securely we are not going to use the public key and private key anymore, we are going to have the same symetric key that we both enctypt and decrypt with.

The client sends a random number, which is encrypted wit hthe public key so not suseptible to man in the middle attacks.

This step will be repeated if session expires, a user logs out, etc.

Step 6 is change cipher spec. 
Both client and server signal that we're going from insecure communication to secure.

Step 7 is encrypted handshake.

Both going to send each other an encrypted message, this signals and verifies that the key information that they just created is correct, verifies that everything they agreed upon in the previous handshake is still the same.

When all this is done you'll see the lock symbol.

SSL is the version before TLS.

When you send over the list of ciphers they are: 
SSL 2.0     TLS 1.0
SSL 3.0     TLS 1.1 
etc.

## Packet Transmission across the internet
Packets can take different routes - this is packet switching.

Circuit switching - used by POTS plain old telephone systems. One path all packets take. Path set up prior to any communication.

MAC addresses change as packet crosses the internet but IP addresses stay the same.

MAC Addresses = layer 2 Data Link
IP Addresses = Layer 3 Network

The header added by the network layer, together with other layer info makes a frame.  
This header targets a specific MAC address for a router. When it gets to that router, it removes the header, then passes that datagram (frame without network header) to network layer. Network layer looks what next hop is, whic his router 3. Router 1 sends datagram down the network layer to add header for router 2 to make up frame.

Repeat this till you get to the host (destination IP).

Routers look in their routing table to see what the next hop is.

When host seems IP address in datagram is its own it removes network header. Then passes up to the transport layer and looks at port, removes header, goes to application layer, and data is passed to app running on that port.

## Random
TCP looks at all the packets whne they are received to make sure all packets are there and will sign if all are there ,else it won't sign and they need to be sent asgain. - Routes and TCp are scalable. The more routes, the more reliable.

## HTTP 2
HTTP 1.1. didn't have multiplexing, you could send multiple requests but only get back data after the first returned. 

Only could have 6 TCP connections from one origin.

In HTTP 2 streams are multiplexed by splitting communication into frames, these frames are then interleaved.

This allows prioritisation. This allows you to say things like: this css, is critical, so has priority 1, but this cat image isn't so get that last.

There is also stream flow control. This allows us to say things like, I will accept 64kb of kitten image, then load all of this critical.js, then later load the rest of the kitten image.

Server push is replacing inlining. You can do a push promise and sever will send it. What is inlining?

It would need to be a low res image then and need to be a progressive image.

HTTP 2 supports header compression.

Binary headers rather than text?

For HTTP2 to be successful we need to have smarter servers who are going to understand the metadata sent from the client.

One RPC stack to rule them all - standardised high performance RPC protocol stack. No longer need gRPC and protobuf?

### Network Performance
**Problem:** What are the two major issues in networking performance?

Any network can be measured by two major characteristics: latency and bandwidth. Latency refers to the time it takes a given bit of information to get from one point to another on the network. 

Bandwidth refers to the rate at which data moves through the network once communication is established. The perfect network would have infinite bandwidth and no latency. 

A pipe is a useful analog for a network. The time it takes for a molecule of water to go through the whole pipe is related to the length; this is analogous to the latency. The width of the pipe determines the bandwidth: how much water can pass in a given time. 

Image by <a href="https://pixabay.com/users/TheAndrasBarta-2004841/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1264062">TheAndrasBarta</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1264062">Pixabay</a>
