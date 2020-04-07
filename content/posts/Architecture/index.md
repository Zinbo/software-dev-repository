---
path: "/architecture"
cover: "./architecture.jpg"
title: "Architecture"
published: true
tags: []
date: "2020-04-07"
---


# Software Design
Here is a good diagram showing the different things I need to know:
![system design](https://camo.githubusercontent.com/e45e39c36eebcc4c66e1aecd4e4145112d8e88e3/687474703a2f2f692e696d6775722e636f6d2f6a6a3341354e382e706e67)
This section mostly relates to how you can scale your application to run for your desired userbase.

# How to approach a system design interview question
1. Outline use cases, constraints, and assumptions
    - Gather requirements and scope the problem. Ask questions to clarify use cases and constraints. Ask things like, who is going to use it, how many users are there, how many requests per second do we expect?
2. Create a high level design
    - skwtch the main components and connections and justify them
3. Design core components
    - For example if you were asked to design a url shortening service, 
        - discuss how you would generate and store the hash, e.g. MD5, hash collisions, SQL or no SQL, schema, etc.
        - translate a hashed url to the full url e.g. db look up
        - API and object-oriented design
4. Scale the design
    - idetify and address bottleencks, given the constraints. Do you need a load balancer, horizontal scaling ,caching, db sharding. Discuss potential solutions and trade-offs.

# System Design Answer Flow
1. Understand the problem and scope:
  - define the use cases, with interviewer's help
  - suggest additional features
  - remove items that interviewer deems out of scope
  - assume high availability is required, add as use case
2. Think about constraints:
  - ask how many requests per month
  - ask how many request per second (they may volunteer it or make you do the math)
  - estimate reads vs. writes percentage
  - keep 80/20 rule in mind whne estimating
  - how much data written per second
  - total storage required over 5 years
  - how much data read per second
3. Abstract design:
  - layers (service, data, caching)
  - infrastructure: load balancing, messaging
  - rough overview of any key algorithm that drives the service
  - consider bottlenecks and determine solutions

## Tackling a System Design Question
The idea of these questions is to have a discussion about the problem at hand. What’s important for the interviewer is the process, which you use to tackle the problem. The typical outcome of such a discussion is a high-level architecture addressing the goals and constraints in the question. Perhaps the interviewer will choose one or more areas where they will want to discuss bottlenecks and other common problems.

### Constraints and Use Cases

The very first thing you should do with any system design question is to clarify the system's constraints and to identify what use cases the system needs to satisfy.

Usually, part of what the interviewer wants to see is if you can gather the requirements about the problem at hand, and design a solution that covers them well. Never assume things that were not explicitly stated.

How many users? What will each of those users be doing? How much data per user? How many clicks?

Does it need to provide statistics?

What are the use cases?

The use cases for bitly are:
1. Shortening: take a url and return a much shorter URL
2. Redirection: take a short url and point it to the original url.

There are other use cases that we can take into account that we should check with our interviewer. E.g.:
3. Custom url, allow user to select
4. analytics, allow user to see statistics around URL usage.
5. Automatic link expiration
6. Manual link removal
7. UI vs API, do we need a URL?

Both parties need to agree what is in scope.

Two constraints to consider:
- amount of traffic to handle
- amount of data to should work with

Should ask:
- how many requests site should handle
- how many new urls should handle
both per month

Want to scale these down to per second

Facebook has 1.3 billion active users.
Twitter has 650 million
500 million tweets per day

Twitter was a huge driver for URL shortening, but won't be the only consumer.

15 billion tweets per month
say that 1 in 20 or 1 in 10 tweets have a shortened url that is 750 million to 1.5 billion urls per month

If the interview says that the site is not within the top 3 bit shortening, say that top 30 take 80% of traffic, and the rest take the 20%, so we'll say that a site below top 3 will shorten 300 million per month.

We can say that we'll be shortening a 100 million each month as 1 company below top 3.

 the average time span of a URL (1-2 weeks, let's take the average ~ 10 days). Then he assumed 1 click per day, keeping in mind that the top 20% got much more traffic than the rest 80%. This makes 100 mln * 10 days * 1 click per day = 1 bln.

For usage of urls:
go with assumption that urls ar elike news, and people click them between start date + 2 weeks. That equates to roughly 1 billion requests per month.

10% requests come from shortening, 90% come from URL usage.

Don't worry about these being correct.

Requests per second: 400+ (40, shortens, 360: redirects).

### Abstract Design
Once you've scoped the system you're about to design, you should continue by outlining a high-level abstract design. The goal of this is to outline all the important components that your architecture will need.

You can tell the interviewer that you would like to do that and draw a simple diagram of your ideas. Sketch your main components and the connections between them. If you do this, very quickly you will be able to get feedback if you are moving in the right direction. Of course, you must be able to justify the high-level design that you just drew.

Don’t get lured to dive deep into some particular aspect of the abstract design. Not yet. Rather, make sure you sketch the important components and the connections between them. Justify your ideas in front of the interviewer and try to address every constraint and use case.

#### bitly

Design:
1. Application service layer (seves the request)
    - Shortening service = generate new hash, check if in db, if not its gonna store a new mapping, if not store the mapping, if it there generate new hash
    - Redirection service = pass a hash get the url back?
2. Data storage layer (Keeps track of the hash -> url mappings)
    - Acts like a big hash table, stores new mappings, and retrieves a value given a key.

hashed_url = convert_to_base62(md5(original_url + random_salt))[:6]

### Understanding Bottlenecks
Most likely your high-level design will have one or more bottlenecks given the constraints of the problem.

 You are not expected to design a system from the ground up, which immediately handles all the load in the world. It just needs to be scalable, in order for you to be able to improve it using some standard tools and techniques.

 Now that you have your high-level design, start thinking about what bottlenecks it has. Perhaps your system needs a load balancer and many machines behind it to handle the user requests. Or maybe the data is so huge that you need to distribute your database on multiple machines. What are some of the downsides that occur from doing that? Is the database too slow and does it need some in-memory caching?

 Remember, usually each solution is a trade-off of some kind. Changing something will worsen something else. However, the important thing is to be able to talk about these trade-offs, and to measure their impact on the system given the constraints and use cases defined.

#### bitly
Usually with websites there are 2 challenges - traffic and lots of data.

Request and response are lightweight - shouldn't be an issue.

Data need to store 3TBs for all URLs - could have bottleneck with data.

### Scaling your abstract design
Once you're ready with your high-level design and have made sure that the interviewer is ok with it, you can dive into making it more detailed. Usually, this means making your system scale.

Should talk abouit caching, vertical scaling, horizontal scaling, load balancing, replication, etc.

### Twitter
“Design a simplified version of Twitter where people can post tweets, follow other people and favorite* tweets.”

#### Clarifying the problem
We should ask how many users do we expect. Interviewer says:  
“well… to make things interesting, let’s aim for 10 million users generating around 100 million requests per day”

How connected are users? Interviewer says:
“we expect that each user will be following 200 other users on average, but expect some extraordinary users with tens of thousands of followers”

We have another dimension in the application: tweets. Producing new tweets and favoriting them should be the most common write operations in the application. But how many requests will that generate? Our interviewer says:
“Hm, that’s hard to say… we expect that there will be a maximum of 10 million tweets per day and each tweet will probably be favorited twice on average but again, expect some big outliers.”

Let’s make a few very simple calculations with the information we just received. We will have around 10 million users. Average number of followed other users is 200. This means that the network of users will have about 200 * 10 million edges. This makes 2 billion edges. If the average number of tweets per day is 10 million the number of favorites will then be 20 million.

 In addition to the expected size of different things, for a system like that it will be important to know what availability is expected and what response times are tolerable. Naturally, our interviewer wants to have a system, which loads pretty quickly. None of the operations described above should take more than a few hundred milliseconds. The system should be online all of the time. It is not good to design into this application any downtimes.

 interview time is very limited and you need to find the balance. This session where you ask questions and get answers should probably not last more than just a few minutes assuming your interview lasts 40-45 minutes and especially if this is not the only problem you get in it. Keep that in mind and practice will let you find your sweet spot.

 To summarise:
 - 10 million users
 - 10 million tweets per day
 - 20 million tweet favourites per day
 - 100 million HTTP requests to the site
 - 2 billion "follow" relations
 - Some users and tweets could generate an extraordinary amount of traffic

 #### High Level Design
 As it is often the case, we can divide our architecture in two logical parts:
 1. the logic, which will handle all incoming requests to the application and
 2. the data storage that we will use to store all the data that needs to be persisted.

At this point it has become obvious that our application will need to handle requests for:
- posting new tweets
- following a user
- favoriting a tweet
- displaying data about users and tweets

The first three operations require things to be written somewhere in our database, while the last is more about reading data and returning it back to the user. The last operation will also be the most common one as can be inferred from the numbers discussed in the previous section.

Let’s make it more concrete how the user will interact with our application and design something that will support such interactions. We can describe to the interviewer how we imagine this to work. For example, there will be a profile page for each user, which will show us their latest tweets and will allow for older tweets to be shown. Each such page will have a button for following the user. There will also be a button at the top of the page, which will allow logged in users to open a dialog box and write a message in it. After they click a button the message will be stored and will appear on their profile page. Once we have confirmed this very rough description of the UI we can begin with the design of the back-end supporting everything.

##### Handling User Requests
We know that the expected daily load is 100 million requests. This means that on average the app will receive around 1150 requests per second. Of course, this traffic is expected to be distributed unevenly throughout the day. Therefore our architecture should allow the app to handle at least a few thousand requests per second at times. Here comes the natural question about what is needed to handle this kind of load. As you may have guessed the answer depends on several things.

One aspect is the complexity of the requests that the application receives. For example, one request could require just one simple query to a database. It could also need a few heavier queries to be run and some CPU-intensive computations to be performed by the application.

Another aspect could be the technologies used to implement the application. Some solutions are better at concurrency and use less memory than others. In a situation like this one you should have some common knowledge about what kind of load can be handled by a single machine for sure and what is load that definitely needs more computing power. To build that it would help to spend some time reading about different real-life examples. Some people also compare the throughput they have achieved in different setups using different web frameworks, hosting services and so on. Any information like that could help you build better instincts about this matter. Finally, your personal work experience is always the best way to learn about these things.

When the expected load seems nontrivially high you can always consider scaling up or out. Scaling up would be an approach in which you decide to get a beefier and more expensive server, which is capable of handling the expected load. This approach has a natural limit for its scalability because after a given point the hardware of one machine just isn’t capable of handling all the requests. In some cases doing that makes sense.

Scaling out would involve designing your architecture in a way that spreads the computations over a number of machines and distributes the load across them. This approach is better at scaling if your load grows significantly. However, it involves some other complications.

One more advantage of using more than one server for your application is the resilience that you add to your whole system. If you only have one machine and it goes down your whole application is down. However, if there are 10 servers handling requests and one or two go down the others will be able to handle at least part of the load if not all of it.

In our particular problem we would definitely suggest using a load balancer, which handles initial traffic and sends requests to a set of servers running one or more instances of the application.

One argument is the resilience that we gain as mentioned above. Another one is that our application doesn’t seem to have any special requirements in terms of very high memory or CPU usage. All requests should be serviceable with code that runs on regular commodity machines. Using many such machines in parallel should give us the flexibility to scale out a lot.

How many servers we should have is something that can probably be determined experimentally with time. Also, if we set things up properly it should be fairly easy to add new servers if that is needed.

Behind the load balancer we will be running a set of servers that are running our application and are capable of handling the different requests that arrive.

The application logic itself will most likely be implemented using some web framework, which in general allows us to write apps handling HTTP requests, talking to a database and rendering the appropriate HTML pages requested by the user. The details of which technology will be used are most likely not going to be important for this type of interview question. Nevertheless, it’s strongly advised that you get a good understanding of the different types of modern web frameworks and how they work. This book does not cover such material but some things to look at are Node.js, Ruby on Rails, Angular.js, Ember.js. React.js, etc. This does not mean that you need to get down to learning these in detail but rather to take a look at the existing ecosystem of technologies, how they interact with each other and what are the pros and cons.

Now we have a load balancer and a set of application servers running behind it. The load balancer routes requests to the servers using some predefined logic and the application servers are able to understand the requests and return the proper data back to the user’s browser. There is one more major component for our high-level architecture to be complete - the storage.

##### Storing the Data
We need to store data about our users and their tweets to make the application complete. Let’s quickly look at what needs to be stored. First of all, users have profiles with some data fields attached to them. We’ll need to store that. Each user has a set of tweets that they have produced over time. Moreover, users can follow other users. We need to store these relationships in our database. Finally, users can mark tweets as favorite. This is another kind of relationship between users and tweets. The first one was recording users as authors of tweets. The second one will record users who favorited a tweet.

Obviously, there are some relations between our data objects - users and tweets. Let’s assess the approximate size of the data to be stored. We said that we expect around 10 million users. For each user we’ll have some profile data to store but overall that kind of data shouldn’t be an issue for us. Tweets will be generated at an average speed of 10 million per day. This makes about 115 per second. Also, for a single year there will be 3.65 billion tweets. So, let’s aim for a solution that can store efficiently at least 10 billion tweets for now and the incoming traffic mentioned above. We didn’t really ask how big a tweet can be. Maybe it’s safe to quickly ask that now and let’s assume our interviewer told us it’s the same as it is for the real Twitter - 140 characters. This means that for tweets we want to be able to store at least 140 * 10 bln = 1.4 trillion characters or around 2.8 terabytes if we assume 2 bytes per character and no compression of the data.

Finally, there are the connections between the users and the favorites of tweets. As we mentioned above the connections should be around 2 billion and each connection will most likely just contain two IDs of users where the first follows the second. So very likely it would be enough to store two 4-byte integer fields, making 8 * 2 bln = 16 bln bytes or 16 gigabytes.

The favorites are expected to grow at a rate of 20 mln per day. So, for a year there will be 7.3 bln such actions. Let’s say we want to be able to store at least 20 bln such objects. They can probably just point to one user and one tweet through their IDs. The IDs for the tweets will probably need to be 8 byte fields while for the users we could use 4 bytes only. This is because our tweets will grow a lot in number. So, our very rough calculation gives us 12 * 20 bln = 240 bln bytes or 240 gigabytes.

After this quick analysis it is obvious that the tweets will take up the majority of our storage’s space. In general, you don’t need to make very detailed calculations especially if you don’t have much time. However, it is important to build a rough idea about the size of the data that you will need to handle. If you don’t figure that out any design decision at the higher or lower level may be inappropriate.

Now back to the storage. Our data has a number of relations between its main objects. If we decide to use a relational database for storing users, tweets and the connections between them this could allow us to model these relations easily. We know that the expected size of the data to store is around 2.6 - 2.7 terabytes. Real-life examples show that famous companies like Twitter and Facebook manage to use relational databases for handling much bigger loads than that. Of course, in most cases a lot of tuning and modifications were required.

Let’s say we decide to use a relational database like MySql or Postgres for our design.

The data that will be stored and the rate of the queries it will receive are not going to be absurdly high but they are not going to be trivial either. In order to handle the incoming read requests we may need to use a caching solution, which stands in front of the database server. One such popular tool is memcached. It could save us a lot of reads directly from the database.

In an application like ours it is likely that a given tweet or a user’s profile becomes highly popular and causes many requests to be sent to our database server. The cache solution will alleviate such situations by storing the popular bits of data in memory and allowing for very quick access to them without the need to hit the database.

It is possible that at this moment the interviewer stops you and throws a question about what you were just talking about. For example, you just mentioned using a caching solution and imagine that the interviewer asks you:  
“Sounds good, but could you tell me more about why reading from the cache would be better than just reading from the database?”

It is perfectly fine and expected to receive such questions from your interviewer throughout your discussion. You need to be prepared with enough knowledge about the methods and technologies that you use, so that you can justify their usefulness and talk about how they work. It is also very important to be able to explain why one solution is better than its alternatives and this way motivate your design choices.

To answer the question asked, we could say that a database stores data on disk and it is much slower to read from disk than from memory. A solution like memcached stores data in memory, which provides way faster access. We would need to clarify further that databases usually have their own caching mechanisms but with memcached we have better control over what gets cached and how. For example, we could store more complex pieces of data like the results from popular queries.

It is vital to have a good understanding of the differences in read/write access to different types of storage mechanisms. For example, you need to know how hard drive speeds compare to RAM to CPU cache. And it is worth mentioning that nowadays people are using a lot of SSDs, which provide better parameters than the older spinning ones.

Going further, in order to make it possible to answer read queries fast we will definitely need to add the appropriate indexes. This will also be vital for executing quick queries joining tables. Considering the size of the data we may also think about partitioning the data in some way. This can improve the read and write speeds and also make administration tasks like backups faster.

If you intend to be interviewing at places where relational databases are used, make sure you get comfortable with the main aspects of using them. You should be familiar with the general organization of a database schema, the ways different real-life situations are represented through tables and how indexes come into play, so that the planned queries run fast enough with the expected data size. Throughout this example we will talk about some other interesting topics related to scaling a relational database.

At this point we have a pretty good high-level architecture, which is built considering the important dimensions and requirements of our application. Described like this it looks like something that could work. Most likely you will have drawn one or more simple diagrams for your interviewer to make things more understandable. Now may come the time when you need to start digging deeper into some of the moving parts of this design. Or the interviewer may decide to tighten some of the initial requirements to see how you can alter your system design to accommodate the changes. We will look at a few such issues in the next section, which focuses on various bottlenecks and scalability issues.

Finally, notice that we never dug too deep into any of the aspects of the high-level design. This is our goal - we want to draw the whole picture rather quickly within a few minutes and to make sure our interviewer agrees with the ideas that we presented. If they explicitly want you to focus on a specific aspect of the design, then go ahead and do what they ask for. Otherwise, our advice is to not get into the details of any specific part of the application until everything else is outlined at the higher level. Once we’ve built this bigger picture of the system design the interview could go into more details about specific parts of the system.

#### Low-level Issues
Let’s assume that we’ve shaped the main parts of our Twitter-like application. In a real-life interview situation this would have been more like a discussion with the interviewer where you talk and they interrupt you with questions and comments. It is ok to have to clarify things that did not become apparent to the interviewer. It is also normal to not get everything right from the first time. Be prepared to accept suggestions from the interviewer or to have your design challenged even if it is sound.

All of the above discussion related to the so-called high level design may seem like it would take a lot of time to describe and discuss. This may be true if done inefficiently. Remember that at the interview you are usually given a very limited amount of time. If you want to be able to fit within that time you will need to practice solving system design problems, talking about your solutions, computing things like expected load, storage needed, required network throughput and so on. With time you will get the hang of it and will become better at having this special kind of discussion that the interview requires.

It is very likely that your interviewer would be interested to hear more details about a particular part of your designed system. Let’s look at a couple such aspects.

##### Database Schema
If you’ve picked to use a relational database one possible topic for a more detailed discussion would be the schema that you intend to use. So, your interviewer asks:  
“If you’re going to use a relational database for storing all the data could you draft the tables and the relations between them?”

This is something that is very common and you should be prepared for such questions. Let’s look at what we could draw and explain in this case.

We have two main entities: users and tweets. There could be two tables for them. For the users we would create a table like that with some column names suggested in brackets:

Table users
```
ID (id)
username (username)
full name (first_name & last_name)
password related fields like hash and salt (password_hash & password_salt)
date of creation and last update (created_at & updated_at)
description (description)
```
and maybe some other fields...  

Tweets should be slightly simpler:
```
Table tweets
ID (id)
content (content)
date of creation (created_at)
user ID of author (user_id)
```

Perhaps one can think of other values but this should be enough in our case.

These two entities have several types of relations between them:
1. users create tweets
2. users can follow users
3. users favorite tweets

The first relation is addressed by sticking the user ID to each tweet. This is possible because each tweet is created by exactly one user. It’s a bit more complicated when it comes to following users and favoriting tweets. The relationship there is many-to-many.

For following user we can have a table like that:
```
Table connections
ID of user that follows (follower_id)
ID of user that is followed (followee_id)
date of creation (created_at)
```
Let’s also add a table, which represents favorites. It could have the following fields:
```
Table favorites
ID of user that favorited (user_id)
ID of favorited tweet (tweet_id)
date of creation (created_at)
```

Now that we have this rough idea about the database tables we will need, our interviewer could ask us to think about what else is needed to serve the load of expected queries. We already discussed with some numbers the expected sizes of the data. There is also a pretty good idea about the types of pages that the application will need to serve. Knowing this we could think about the queries that will be sent to our database and to try to optimize things so that these queries are as fast as possible.

Starting with the basics there will be queries for retrieving the details of a given user. Our users’ table above has both id and username fields. We will want to enforce uniqueness on both because IDs are designed to be unique and will serve as a primary key on the table and usernames are also meant to be different for all registered users. Let’s assume that the queries to our data will be filtering users by their username. If that’s the case we will definitely want to build an index over this field to optimize the times for such queries.

The next popular query will fetch tweets for a given user. The query needed for doing that will filter tweets using user_id, which every tweet has. It makes a lot of sense to build an index over this field in the tweets table, so that such queries are performed quickly.

We will probably not want to fetch all tweets of a user at once. For example, if a given user has accumulated several thousand tweets over time, on their profile page we will start by showing the most recent 20 or something like that. This means that we could use a query, which not only filters by user_id but also orders by creation date (created_at) and limits the result. Based on that we may think about expanding our index to include the user_id column but to also include the created_at column. When we have an index over more than one column the order of the columns matters. If our index looks like that: <user_id, created_at>, making a query filtering by just user_id will take advantage of the index even though we are not filtering by the second column. So, such an index will allow us to filter either by just user_id, or by both columns. This will allow us to fetch all tweets authored by a given user or to isolate just the tweets created in a given time frame. Both will be useful queries for our application.

For each user we will want to show the users that they follow and the users that follow them. For this we will need the table connections. To get the users followed by someone we can simply filter the connections table by the column follower_id. To get the users following someone we can filter by followee_id. All this means that it will make a lot of sense to build two indexes in this table - one on follower_id and another one on followee_id. Voila, we are ready to show the connections that each user has in our application. Like for tweets you can figure out how to fetch the connections in a paginated manner.

What about favorited tweets by a user? We will definitely want to see something like that. For this we will need to use the table favorites. We will need to join favorites with tweets and to filter by user_id for the user whose favorites we want to fetch. The columns used for joining will be the tweet_id in favorites and id in tweets.

The above means that it makes sense to add two indexes - one on the user_id column and one on the tweet_id column.

Having discussed these base use cases, our interviewer suggests that you think about one more possible situation:  
“Do you think you could support with our database design the ability to display a page for a given user with their latest tweets that were favorited at least once?”

Let’s think about that. We will need to use the table favorites but instead of filtering by the user_id column we will have to get the user_id from the tweets table. This means that we will again join the two tables - favorites and tweets - and this time will filter by the user_id column in tweets. It seems like we have the needed indexes in place already. One is in favorites over tweet_id, which will help us join this table with tweets. In table tweets the id field is a primary key so it has an index on it. And we also have an index on user_id in tweets, so this will help us filter by user.

One could think of other such query patterns and see what needs to be done in the database schema to address them. For example, for your own pleasure, you can think about supporting a page, which shows for a given user a list of recent tweets that this user either authored or favorited, ordered by date of creation.

Here is another very good candidate for a homework exercise: for a given user A build a page showing the recent tweets authored by users that A is following. What would the query be, which indexes will it use and does it need more indexes to be added?

It is also worth mentioning that after creating the indexes our write queries will become slightly slower but the benefits that we get for our read operations are so significant with the amounts of data we have that we have no other choice.

In general, it is a useful skill to be able to design relational database schemas, to optimize them and to have a discussion about all that. We could cover much more on this topic but it is better to use specialized books and online resources for that. Be prepared to defend your database schema designs during your interviews. As mentioned already, if circumstances allow, it is always helpful to draw something on paper or a whiteboard. We’ve added a very simple diagram of our database schema in the Appendix section.

That was all great but with the expected size of our data we may have a separate discussion with our interviewer about partitioning the database in some way as a further step. We will touch on this a bit later in the text.

##### Building a RESTful API
We have a simple plan for what our schema will be like. Another thing that our interviewer could be interested in is how our front-end would “talk” to the back-end system. Probably the most popular answer nowadays would be by exposing a RESTful API on the back-end side, which has a few endpoints returning JSON objects as responses. Many web applications are built this way nowadays and it is a good idea to take a look at what RESTful APIs are about if you don’t feel confident about this area.

Let’s see what we can draft for our particular task. The API endpoints will likely be built around the data entities that we have and the needs of the user-facing part of the application.

We will definitely need to fetch the profile details for a given user. So we could define an endpoint that looks like that:
```
GET /api/users/<username>
```

It will return a JSON object containing the data fields of a given user if such was found and will return status code 404 if no user matched the supplied username value.

To get the tweets of a given user ordered by date, we can expose an endpoint like that:
```
GET /api/users/<username>/tweets
```

This could be modified by supplying some query parameters telling the back-end that we want paginated tweets. For example, the default behavior will return the most recent 20 tweets only. But we could decide to load the next 20, and the next 20 and so on. A query fetching a subsequent “page” with queries could look like that:
```
GET /api/users/<username>/tweets?page=4
```

This tells the back-end to fetch the 4th page with 20 tweets, instead of the default behavior - 1st page with 20 tweets.

Let’s continue! Our front-end will also be asking about the users following a given user and followed by that user. Here are two possible endpoints for that:
```
GET /api/users/<username>/followers
GET /api/users/<username>/followees
```

So far we defined a few GET requests. Let’s look at creating new data. For example we will need an endpoint for posting a new tweet:
```
POST /api/users/<username>/tweets
```

Or how about following a given user:
```
POST /api/users/<username>/followers
```

If we look at the tweets, we may need API endpoints that cover them, too. For example it will be useful to be able to see a list of all users that favorited a tweet:
```
GET /api/users/<username>/tweets/<tweet_id>/favorites
```

And favoriting a tweet can be done throught:
```
POST /api/users/<username>/tweets/<tweet_id>/favorites
```

As you can see, there will be a number of such endpoints that will be needed to make our application tick. Our endpoints are revolving around the main entities that we have. We highly recommend that you read more about building good RESTful APIs and perhaps think about more scenarios in which you will need to define additional endpoints.

Of course, we will need some sort of authentication to be put in place, so that we make sure that not everyone can query our exposed API.

Now, let’s continue with some possible scenarios that the interview could follow. Imagine that you have outlined your ideas and the interviewer seems happy with what you have offered.

They may want to test your ability to spot bottlenecks and to handle the need to scale your system. Probably one could think of many complications to add to the problem statement and to lead the discussion in various directions. We will cover a few things that seem quite normal to consider and likely to happen in a typical interview.

#### Additional Considerations

##### Increased Number of Read Requests
We have our implementation of the system and it handles everything perfectly. But what would happen if suddenly we got lucky and people started visiting our application 5 times more often generating 5 times more read requests caused by viewing posts and user profiles. What would be the first place that will most likely become a bottleneck?

One very natural answer is our database. It could become overwhelmed with all the read requests coming to it. One typical way to handle more read requests would be to use replication. This way we could increase the number of database instances that hold a copy of the data and allow the application to read this data. Of course, this will help if the write requests are not increased dramatically. An alternative approach could be to shard our database and spread the data across different machines. This will help us if we need to write more data than before and the database cannot handle it. Such an approach does not come for free and it involves other complications that we would need to take care of. Consider getting familiar with these popular techniques for scaling a relational database.

If we manage to stabilize our database, another point where we could expect problems is the web application itself. If we’ve been running it on a limited set of machines, which cannot handle all the load anymore this could lead to slow response times. One good thing about our high-level design is that it allows us to just add more machines running the application. If the database is ready to handle more incoming requests from additional application instances we can scale horizontally like that. We will just add more machines running our application and instruct our load balancer to send requests to these machines, too. Of course, this sounds simpler that it is in practice but that’s the general idea.

One of the reasons why using the services of a company like Amazon or Heroku could be beneficial is that they make it easy to add new machines to your environment. You just need to have the money to pay for them. Having mentioned this, it is also useful to become familiar with some of these products and services that are in the market nowadays. For example, Amazon has a very big stack of services that can work together to provide a reliable and scalable environment for an application like ours. It is good to have an idea about what’s out there if you need to deploy a web-facing application.

Finally, if all else is scaled and capable of handling the increased loads we may need to improve our load balancing solution. We mentioned in the high level design that it is a very good idea to use a load balancer, which would direct requests to different instances of our application. This way our load balancer could become a single point of failure and a bottleneck if the number of requests is really high. In such cases we could start thinking about doing additional load balancing using DNS and directing requests for our domain to different machines, which are acting as load balancers themselves.

##### Scaling the Database
We just touched on that aspect but let’s talk a bit more about it. Let’s say our application needs to be able to store even more data and the read/write requests per second are increased significantly. If we are using a relational database with the proper indexes running on a single machine it could very quickly become unable to handle the loads that our application experiences. One approach mentioned above is to add an in-memory cache solution in front of the database with the goal to not send repeated read requests to the database itself. We could use a key-value store like memcached to handle that.

This will also be really useful for handling situations in which a tweet becomes viral and people start accessing it or the same thing happens to a given user’s profile.

But this could be insufficient if our data grows too quickly. In such cases we may have to start thinking about partitioning this data and storing it on separate servers to increase availability and spread the load. Sharding our data could be a good and necessary approach in such cases. It must be planned and used with care because it will cause additional complications. But sometimes it is just required. It is highly recommended that you read more about this topic and all the implication it brings along. This will help you justify your decision to shard and to have a discussion about the possible downsides of doing it.

##### Unexpected traffic
Let’s look at one more possible issue. We already touched on this but it doesn’t hurt to go through it one more time. In the beginning the interviewer warned us that there will be outliers in the data. This means that some users will have many more followers than the average. Also, some tweets will attract a lot of attention during a short period of time. In most cases such outliers will generate peaks in the number of requests that our application receives.

As we mentioned earlier this could increase the load on our database. In such a situation using a caching solution could help a lot. The idea is that it will be able to answer the popular and repeating requests coming from the application and these requests will never touch the database, which will be busy replying to other queries.

We could also experience unusual peaks in the requests hitting our application servers. If they are not enough to respond quickly enough to all requests this could cause timeout to occur for some of the users. In such situations solutions that offer auto-scaling of the available computing nodes could save the day. Some companies offering such services are Amazon and Heroku and they were already mentioned in this example. You can take the time to investigate what is out there on the market, so that you can have a discussion about possible ways to handle peaks in traffic.


# Crack the system design interview
Four steps:
1.	Clarify requirements and specs. Ultimate goals should always be clear.
2.	Sketch out high level design
3.	Discuss individual components and how they interact in detail
a.	Load balances
b.	Reverse proxy: good to centralised internal services and provided unified interfaces to the public. Can also help with caching and load balancing.
c.	Front end web tier Must be stateless to scale out. Feature toggles or config should be centralised.
i.	Mvc or mvvc  is dominant pattern for this layer. Traditionsllyvrendered on server. People believe that the API can be shared by clients and browsers so SPA web apps are becoming more popular.
d.	Bottlenecks are requests per second and bandwidth. Could improve this using frameworks with asynchronous and non blocking reactor pattern and or scaling up or scaling out.
e.	App service tier: SRP 
f.	Service discovery: zookeeper good choice. Instances with bane, address, port, etc. Are registered into the path in ZooKeeper for each service. Zookeepr is CA in CAP. In contrast, uber is doing work on hyperbahn  which works in decentralised way.  Check out Amazon dynamo which is AP with eventual consistency.
g.	Pick the right db for the job. Don’t store images in relational. For feeds HBase or Cassandra might good for timestamp indexes.
Back of the envelope calculations. The cost is a function of CPU, RAM, storage, bandwidth, number and size of the images uploaded each day.
When we want components to communicate with each other we can use HTTP or RPC. RPC is an application later protocol. Is an interprocess communication that allows s computer program to cause s subroutibe or procedure to execute in another address space, without the programmer explicitly coding the details for this remote interaction. That is, the programmer writes essentially the same code whether the sub routine is local to the executing program or remote. In OOO RPC is also called remote invocation or remote method invocation.
Some RPC protocol frameworks:
-	Google protobuf
-	Facebook thrift
-	Apache avro 
Often used internally but is hard to debug and not flexible.  For public APIs we tend to use HTTP.
If we use MySQL  we can use a db proxy to distribute data, either by clustering or by sharding. 
Clustering is a decentralised solution. Everything is automatic. Data is distributed, moved, rebalance automatically. Nodes talk to each other.
Sharding is a centralised solution. Data is distributed manually and does not move. Nodes are not aware of each other.
Regular internet service has read write
Look these up:
http://puncsky.github.io/images/crack-the-system-design-interview/pinterest-arch-overview.png

## What you need to know before a System Design Interview
Some things you need to be good at:
- Abstraction. It’s a very important topic for system design interview. You should be clear about how to abstract a system, what is visible and invisible from other components, and what is the logic behind it. Object oriented programming is also important to know.
- Database. You should be clear about those basic concepts like relational database. Knowing about No-SQL might be a plus depends on your level (new grads or experienced engineers).
- Network. You should be able to explain clearly what happened when you type “gainlo.co” in your browser, things like DNS lookup, HTTP request should be clear.
- Concurrency. It will be great if you can recognize concurrency issue in a system and tell the interviewer how to solve it. Sometimes this topic can be very hard, but knowing about basic concepts like race condition, dead lock is the bottom line.
- Operating system. Sometimes your discussion with the interviewer can go very deeply and at this point it’s better to know how OS works in the low level.
Machine learning (optional). You don’t need to be an expert, but again some basic concepts like feature selection, how ML algorithm works in general are better to be familiar with.

Make sure you list pros and cons and any constraints that you have assumed.



























































































## Scalability Recap video
FTP sends username and password in plain text? SFTP is better.

VPS = YOu get a virtual machine, meaning you get your own copy of the OS. USe hypervisor.
on a shared we b host you won't get that.

even if you're using a VPS, your data is secure from othr customers, but not the web hosting company.

Virtual scaling - get more ram, get more disk space, etc. Has limit to how powerful the machine is. Limited by CPU, how powerful can one machine be?

With more cores, this means that we can chop up bigger servers into smaller VMs, as if you have 4 cores, you can truely have 4 things running in parallel.

If you're hard hitting db, you should improve your hard drive - use ssd or saas.


Horizontal scaling - get cheaper servers rather than 1. We will need to use a load balancer to distribute across our servers.

When you need to return an IP address, could instead return the IP address of the load balancer to get around the problem of which IP to return for which server.

Your load balancer can just be a fancy DNS set up, where instead of returning the address of the load balancer itself, maybe instead the DNS server just returns the IP address of server one the frist time someone asks for something, and the next time someone requests something it returns the ip address of server 2. i.e. round robin. For this we can use something called BIND.

How could we build our own dns server?

WHat is the difference between a reverse proxy and DNS look up?

THe OS and your browser typically will cache the IP address after it has done a DNS look up. That meand if you're doing a lot of work, the next guy will be sent to server 2, not you, as it'll be cached.

There's typically a TTL associated with an answer from a DNS server. and that's typically between a day or 5 minutes, totally depends on who controls the DNS server what that value is.

The other option is don't use DNS look up, have a load balancer, and that can use some heuristic to decide which server to send to.

However this is a problem with sessions - session recall tends to be for a specific machine. THe sessions can be stored in the temp directory on a linux machine as serialised text files.  
This is a problem for logging in, you'd need to log in for each server, meaning you'll have a session cookie on each machine then. However if your website is an e-commerce website, when you add things to your cart, they're going to be associated with different sesisons on different machines. If you had split your services out such that one server was php server, one was gif server, etc. you wouldn't have this problem, but this would mean no redundancy and you can't scale.  
One way to solve this is to have each server connect to the same seperate hard drive where all session data is stored. You could also put the sessions on the load balancer. But now we have a weakness in our network topology, what is that server breaks?

What happens if the load balancer goes down, do we also have duplicate load balancers?

RAID = Redundant Array of Independent Disks
RAID0  
RAID1 
RAID2
...

RAID0 = two harddrives with identifical size. You stripe data, you write a bit to hd 1, a bit to hd 2, and so you can write faster as you can write to both at once.

RAID1 = two harddrives, store data on both simultaneously. This means either of your drives can die and you'll have all the data intact. If it dies you plug a new one in, and the RAID array will rebuild itself

RAID10 = four hard drives, do both striping and redundancy.

RAID5 = have 3, 4, or 5 drives, but only one is used for redundancy. In this model any of the drives can die and you haven't lost any data. How does that work? how do you store 4 tb of data with redundancy in one drive?

RAID6 = any two drives can die, 2 for redundancy.

Should use RAID at home?

Even if we use RAID for storing session over multiple drives, if someone trips over the power cord, you're still at the mercy of using 1 machine for storing data.

Other ways to get sticky sessions:
- shared storage, MySQL, NFS, etc.
- Cookies? 

Software solutions for load balancers:
- Amazon's Elastic Load Balancer
- HAProxy
- LVS
Hardware solutions:
- Barracuda
- Cisco
- Citrix

Storing everything in a cookie is probably bad because it violates privacy because rather than store a big key you're going to store the ISBNs of the books added to cart, roommates and family members don't need to know this (why would they? if you shared the same device?). Cookies also have a finite size which is usually a few kilbytes.

You could store the server id in a cookie so that the user always goes to the same server. Rather than storing the IP address though, lets just store a big random number and get the load balancer to figure out which host that is. The load balancer could be the one to set the cookie in the first place.

MySQL offers query cache, where if you execute a query it might be slow the first time, but it's then cached, so the second time you call the exact query, if the row hasn't changed then you'll get it back a lot faster. Good for if users are going backwards and forwards quite a bit through your website. 

Memcache:
- memory cache, software, machanism that sotres whatever you want in RAM. Connect with Memcache connect and then set some data. Used by facebook.
- LRU cache

MySQL:
- nodb: supports transacctions
- myisam?: uses full table locks instead, no transactions.

Supports replication

You have a master database which is where you read and write data. ALso have slave databases which get a copy of every row in master. You could have it where reads go to slaves and writes go to master. This is good for read heavy websites. This is good, however if your master goes offline then you can have a period where you can't do writes.

Another strategy for replication is master-master. Write to either server 1 or 2 which are both masters. If you write to 1 that query gets replicated to server 2 and vice versa. Either 1 or 2 can go down and you won't have an outage.

With these strategies we can have:
- a client network that can connect to a load balancer
- the load balancer can load balance across the multiple web servers.
- These web servers can connect to a mySQL master to write queries
- These web servers can connect to another load balancer
- this load balancer loads the balance for reading queries across the MySQL slaves.

You can get two load balancers usually acting in active active mode (similar to master master mode), as opposed to active passive. 
In active active, they're both listening for packets and sending heartbeats to each other.  
In active-passive, all packets come to active, if the passive doesn't hear a heartbeat from passive anymore, it assumes the role of active (which means he takes over the previous actives IP address).

Another option you have is partitioning. For example, you could have it where users from A-M go to one half of your servers (one cluster), and uses N-Z go to the other half of your servers. Each can have half the read MySQL slaves, and all use the same master.

High Availability (HA) can be not only for load balances but databases to with master-master where you send heartbeats.

Usually each of your severs would have 2 ethernet cables going connecting to two switches, so you wouldn't have a single point of failure on the switches. these switches then go across the load balancers, dbs, etc.

You need to make sure you don't just have one set of your hardware in one data center. Amazon offers availability zones, different places. If you have multiple zones you'll have to do load balancing at the DNS level. if you do nslookup you'll see lots of differen addresses for google, will be different zones, probably don't share sessions though, you'll stay in the same availability zone.

 what is quite common is having SSL termination at the load balancer - everything below is unencrypted. That means you don't have to put your SSL certifiacate on all of your web servers. You can just put them in your load balancers.

# Scaliablity Recap Blog
First Golden rule for scalability: every server contains exactly the same codebase and does not store any user-related data, like sesisons or profile pictures, on local disk or memory. 

Sessions need to be stored in a centralized data store which is accessible to all your application servers. Could store it in an external persistent cache, like Redis.

You need to make sure a code change is sent to all your servers, without one server still serving old code. Capistrano is a tool for this.

You should createa an image file from one of one web servers and use this as a super-clone that all your new instances are based on.

## Data slowness
Somewhere down the road your application gets slower and slower and finally breaks down. This is due to the database. You have two options:
1. Hire a DBA, get them to do master-slave replication, and upgrade your master server by adding lots of RAM. Eventually your DBA will talk about sharding, denormalisation, and SQL tuning. At this point, every new action to keep your db running will be more expensive and time consuming than the previous one.
2. Denormalise right from the beginning and include no more joins in any database query. You can stay with MySQL and use it like a NoSQL database, or you can switch t oa better and easier to scale NoSQL db like MongoDB or CouchDB. Eventually you'll need to introduce a cache though.

































# Caching
Do in-memory caches, like memcached or Redis, don't do file-based caching, it makes cloning and autoscaling of your servers just a pain.

Look for data in cache, if not there, go to db.

Two patterns for caching data:
1. Cached database queries: Whenever you do a query to your db, store the result dataset in cache. A hashed version of your query is the cache key. Hard to manage because if a piece of data changes you need to delete all cached queries who may include that table cell.
2. Store an instance of a class of your dataset. 

Ideas of objects to cache:
- user sessions (never use db)
- fully rendered blog articles
- activity streams
- user<->friend relationships

# Caching
Caching consists of: precalculating results, pre-generating expensive indexes, and storing copies of frequently accessed data in a faster backend (e.g. Memcache instead of postresQL).

In practice, caching is important earlier in the development process than load-balancing, and starting with a consistent caching strategy will save you time later on.  It also ensures you don't optimize access patterns which can't be replicated with your caching mechanism or access patterns where performance becomes unimportant after the addition of caching.

## Application vs. Database Caching
Most systems rely on both.

Application caching will check if a value is in the cache, if not it'll retrieve it from the db, and write to cache (very common in LRU cache).

Database caching is on by default using some default config. This will provide some degree of caching. They'll be optimised for a generic use case, and by tweaking them to your system's access patterns you can generally squeeze a great deal of performance improvement. The beauty of database caching is that your application code gets faster "for free", and a talented DBA or operational engineer can uncover quite a bit of performance without your code changing.

The best performance is in-memory caches. However you won't have enough RAM to hold everything so you'll need a strategy for only keeping the host subset of your data in your memory cache.

## CDNs
Some consider CDNs caches as they take the burden of serving static media off your app servers (which are typically optimized for serving dynamic pages rather than static media), and provide geographic distribution. 

# Cache invalidation
Solving the problem of maintaining consistency in caches is know as cache invalidation.
Easy to introduce errors if you have multiple code paths writing to do abs cache. More likely to happend if you don’t go into writing the application with s caching strategy already in mind.
Write through cache: each time a value changes, write the new value into the cache.
Ready through cache: if value changes delete in cache and populate it later on a read.
Invalidation becomes more challenging when you have fuzzy queries, e.g. trying to add application level caching up-front of a full-term search engine like SOLR or modifications to an unknown number of elements, e.g. deleting all objects created more than a week a go.

# Cache
![Cache](https://camo.githubusercontent.com/7acedde6aa7853baf2eb4a53f88e2595ebe43756/687474703a2f2f692e696d6775722e636f6d2f51367a32344c612e706e67)

Caching improves page load times and can reduce the load on your servers and databases. In this model, the dispatcher will first lookup if the request has been made before and try to find the previous result to return, in order to save the actual execution.

Databases often benefit from a uniform distribution of reads and writes across its partitions. Popular items can skew the distribution, causing bottlenecks. Putting a cache in front of a database can help absorb uneven loads and spikes in traffic.

## Client Caching
Caches can be located on the client side (OS or browser), server side, or in a distinct cache layer.

## CDN Caching
CDNs are considered a type of cache.

## Web server caching
Reverse proxies and caches such as Varnish can serve static and dynamic content directly. Web servers can also cache requests, returning responses without having to contact application servers.

## Database caching
Your database usually includes some level of caching in a default configuration, optimized for a generic use case. Tweaking these settings for specific usage patterns can further boost performance.

## Application caching
In-memory caches such as Memcached and Redis are key-value stores between your application and your data storage. Since the data is held in RAM, it is much faster than typical databases where data is stored on disk. RAM is more limited than disk, so cache invalidation algorithms such as least recently used (LRU) can help invalidate 'cold' entries and keep 'hot' data in RAM.

Redis has the following additional features:
- Persistence option
- Built-in data structures such as sorted sets and lists

There are multiple levels you can cache that fall into two general categories: database queries and objects:
- Row level
- Query-level
- Fully-formed serializable objects
- Fully-rendered HTML
Generally, you should try to avoid file-based caching, as it makes cloning and auto-scaling more difficult.

###  LRU Cache
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



## Caching at the database query level
Whenever you query the database, hash the query as a key and store the result to the cache. This approach suffers from expiration issues:
- Hard to delete a cached result with complex queries
- If one piece of data changes such as a table cell, you need to delete all cached queries that might include the changed cell

## Caching at the object level
See your data as an object, similar to what you do with your application code. Have your application assemble the dataset from the database into a class instance or a data structure(s):
- Remove the object from cache if its underlying data has changed
- Allows for asynchronous processing: workers assemble objects by consuming the latest cached object

Suggestions of what to cache:
- User sessions
- Fully rendered web pages
- Activity streams
- User graph data

## When to update the cache
Since you can only store a limited amount of data in cache, you'll need to determine which cache update strategy works best for your use case.

### Cache-aside
![cache-aside](https://camo.githubusercontent.com/7f5934e49a678b67f65e5ed53134bc258b007ebb/687474703a2f2f692e696d6775722e636f6d2f4f4e6a4f52716b2e706e67)

The application is responsible for reading and writing from storage. The cache does not interact with storage directly. The application does the following:
- Look for entry in cache, resulting in a cache miss
- Load entry from the database
- Add entry to cache
- Return entry

```python
def get_user(self, user_id):
    user = cache.get("user.{0}", user_id)
    if user is None:
        user = db.query("SELECT * FROM users WHERE user_id = {0}", user_id)
        if user is not None:
            key = "user.{0}".format(user_id)
            cache.set(key, json.dumps(user))
    return user
```

Memcached is generally used in this manner.

Subsequent reads of data added to cache are fast. Cache-aside is also referred to as lazy loading. Only requested data is cached, which avoids filling up the cache with data that isn't requested.

#### Disadvantage(s): cache-aside
- Each cache miss results in three trips, which can cause a noticeable delay.
- Data can become stale if it is updated in the database. This issue is mitigated by setting a time-to-live (TTL) which forces an update of the cache entry, or by using write-through.
- When a node fails, it is replaced by a new, empty node, increasing latency.

### Write-through
![write-through](https://camo.githubusercontent.com/56b870f4d199335ccdbc98b989ef6511ed14f0e2/687474703a2f2f692e696d6775722e636f6d2f3076426330684e2e706e67)

The application uses the cache as the main data store, reading and writing data to it, while the cache is responsible for reading and writing to the database:
- Application adds/updates entry in cache
- Cache synchronously writes entry to data store
- Return

Application code:
```python
set_user(12345, {"foo":"bar"})
```

Cache code:
```python
def set_user(user_id, values):
    user = db.query("UPDATE Users WHERE id = {0}", user_id, values)
    cache.set(user_id, user)
```

Write-through is a slow overall operation due to the write operation, but subsequent reads of just written data are fast. Users are generally more tolerant of latency when updating data than reading data. Data in the cache is not stale.

#### Disadvantage(s): write through
- When a new node is created due to failure or scaling, the new node will not cache entries until the entry is updated in the database. Cache-aside in conjunction with write through can mitigate this issue.
- Most data written might never be read, which can be minimized with a TTL.

### Write-behind (write-back)
![write-back](https://camo.githubusercontent.com/8aa9f1a2f050c1422898bb5e82f1f01773334e22/687474703a2f2f692e696d6775722e636f6d2f72675372766a472e706e67)

In write-behind, the application does the following:
- Add/update entry in cache
- Asynchronously write entry to the data store, improving write performance
Disadvantage(s): write-behind
- There could be data loss if the cache goes down prior to its contents hitting the data store.
- It is more complex to implement write-behind than it is to implement cache-aside or write-through.

### Refresh-ahead
![refresh-ahead](https://camo.githubusercontent.com/49dcb54307763b4f56d61a4a1369826e2e7d52e4/687474703a2f2f692e696d6775722e636f6d2f6b78746a7167452e706e67)

You can configure the cache to automatically refresh any recently accessed cache entry prior to its expiration.

Refresh-ahead can result in reduced latency vs read-through if the cache can accurately predict which items are likely to be needed in the future.

#### Disadvantage(s): refresh-ahead
Not accurately predicting which items are likely to be needed in the future can result in reduced performance than without refresh-ahead.

## Disadvantage(s): cache
Need to maintain consistency between caches and the source of truth such as the database through cache invalidation.
Cache invalidation is a difficult problem, there is additional complexity associated with when to update the cache.
Need to make application changes such as adding Redis or memcached.




























# Asynchronism
Two ways of doing it:
1. Doing the time-consuming work in advance and server the finished work with a low request time. E.g. pages of a website, maybe built with a massive framework, can be pre-rendered and locally stored as staticHTML on every change.
2. User comes to your website and starts a very computing intensive task which would take several minutes to finish. Frontend of your website sends a job onto a job queue and immediately signals back to the user: your job is in work, please continue to browse the page. The job queue is constantly checked by a bunch of workers for new jobs. If there is a new job then the worker does the job and after some minutes sends a signal that the job was done. The frontend, which constantly checks for new “job is done” - signals, sees that the job was done and informs the user about it.

# Asynchronism
![asynchronism](https://camo.githubusercontent.com/c01ec137453216bbc188e3a8f16da39ec9131234/687474703a2f2f692e696d6775722e636f6d2f353447597353782e706e67)

Asynchronous workflows help reduce request times for expensive operations that would otherwise be performed in-line. They can also help by doing time-consuming work in advance, such as periodic aggregation of data.

## Message Queues
Message queues receive, hold, and deliver messages. If an operation is too slow to perform inline, you can use a message queue with the following workflow:
- An application publishes a job to the queue, then notifies the user of job status
- A worker picks up the job from the queue, processes it, then signals the job is complete
The user is not blocked and the job is processed in the background. During this time, the client might optionally do a small amount of processing to make it seem like the task has completed. For example, if posting a tweet, the tweet could be instantly posted to your timeline, but it could take some time before your tweet is actually delivered to all of your followers.

Redis is useful as a simple message broker but messages can be lost.

RabbitMQ is popular but requires you to adapt to the 'AMQP' protocol and manage your own nodes.

Amazon SQS is hosted but can have high latency and has the possibility of messages being delivered twice.

## Task Queues
Tasks queues receive tasks and their related data, runs them, then delivers their results. They can support scheduling and can be used to run computationally-intensive jobs in the background.

Celery has support for scheduling and primarily has python support.

## Back Pressure
If queues start to grow significantly, the queue size can become larger than memory, resulting in cache misses, disk reads, and even slower performance. Back pressure can help by limiting the queue size, thereby maintaining a high throughput rate and good response times for jobs already in the queue. Once the queue fills up, clients get a server busy or HTTP 503 status code to try again later. Clients can retry the request at a later time, perhaps with exponential backoff.

Within our systems the available capacity is generally a function of the size of our thread pools and time to process individual transactions.  These thread pools are usually fronted by queues to handle bursts of traffic above our maximum arrival rate.  If the queues are unbounded, and we have a sustained arrival rate above the maximum capacity, then the queues will grow unchecked.  As the queues grow they increasingly add latency beyond acceptable response times, and eventually they will consume all memory causing our systems to fail. We should apply back pressure.

Separation of concerns encourages good systems design at all levels.  I like to layer a design so that the gateways to third parties are separated from the main transaction services.  This can be achieved by having gateways responsible for protocol translation and border security only.  A typical gateway could be a web container running Servlets.  Gateways accept customer requests, apply appropriate security, and translate the channel protocols for forwarding to the transaction service hosting the domain model.  The transaction service may use a durable store if transactions need to be preserved.  For example, the state of a chat server domain model may not require preservation, whereas a model for financial transactions must be kept for many years for compliance and business reasons.

![bakc pressure](https://4.bp.blogspot.com/-H5j78ebce9w/T7erBJ8X-gI/AAAAAAAAADM/F_ak3B9Wdl0/s1600/back-pressure.png)

Pools of threads in a gateway accept user requests and forward them to a transaction service.  Let’s assume we have asynchronous transaction services fronted by an input and output queues, or similar FIFO structures.  If we want the system to meet a response time quality-of-service (QoS) guarantee, then we need to consider the three following variables:
1. The time taken for individual transactions on a thread
2. The number of threads in a pool that can execute transactions in parallel
3. The length of the input queue to set the maximum acceptable latency
max latency = (transaction time / number of threads) * queue length
    queue length = max latency / (transaction time / number of threads)

By allowing the queue to be unbounded the latency will continue to increase.  So if we want to set a maximum response time then we need to limit the queue length.

By bounding the input queue we block the thread receiving network packets which will apply back pressure up stream.  If the network protocol is TCP, similar back pressure is applied via the filling of network buffers, on the sender. 

When we need to support synchronous protocols like REST then use back pressure, signalled by our full incoming queue at the gateway, to send a meaningful “server busy” message such as the HTTP 503 status code.  The customer can then interpret this as time for a coffee and cake at the café down the road.

You need to consider the whole end-to-end service.  What if a client is very slow at consuming data from your system?  It could tie up a thread in the gateway taking it out of action.  Now you have less threads working the queue so the response time will be increasing.  Queues and threads need to be monitored, and appropriate action needs to be taken when thresholds are crossed.  For example, when a queue is 70% full, maybe an alert should be raised so an investigation can take place?  Also, transaction times need to be sampled to ensure they are in the expected range.

## Disadvantage(s): asynchronism
Use cases such as inexpensive calculations and realtime workflows might be better suited for synchronous operations, as introducing queues can add delays and complexity.


































# Performance vs scalability
A service is scalable if it results in increased performance in a manner proportional to resources added. Generally, increasing performance means serving more units of work, but it can also be to handle larger units of work, such as when datasets grow.

Patterns are outlined in 3 categories:
- Scalability: two categories
    - state: things like ORM, HTPT caching (reverse proxy, CDM), CAP theorem, Concurrency, paritioning, replcation, etc.
    - behaviour: event-driven architecture (messaging, actors, ESB< domain events, CQRS)
- Availibility: replication and fail-over
- Stability: circuit breaker, timeouts, crash early, throttling.

General recommendations for scalability:
- immutability as default
- referential transparency
0 laziness

In functional programming, referential transparency is generally defined as the fact that an expression, in a program, may be replaced by its value (or anything having the same value) without changing the result of the program. This implies that methods should always return the same value for a given argument, without having any other effect.































# Latency vs throughput
Latency is the time to perform some action or to produce some result.

Throughput is the number of such actions or results per unit of time.

Generally, you should aim for maximal throughput with acceptable latency.

































# CAP theorem
In a distributed computer system, you can only support two of the following guarantees:

- Consistency - Every read receives the most recent write or an error
- Availability - Every request receives a response, without guarantee that it contains the most recent version of the information
- Partition Tolerance - The system continues to operate despite arbitrary partitioning due to network failures

In a centralised system we don;t have network paritions, so you get AC.

Networks aren't reliable, so you'll need to support partition tolerance. You'll need to make a software tradeoff between consistency and availability.

Consistency means that data is the same across the cluster, so you can read or write from/to any node and get the same data.

Availability means the ability to access the cluster even if a node in the cluster goes down.

Partition tolerance means that the cluster continues to function even if there is a "partition" (communication break) between two nodes (both nodes are up, but can't communicate).

In order to get both availability and partition tolerance, you have to give up consistency. Consider if you have two nodes, X and Y, in a master-master setup. Now, there is a break between network communication between X and Y, so they can't sync updates. At this point you can either:

A) Allow the nodes to get out of sync (giving up consistency), or

B) Consider the cluster to be "down" (giving up availability)

All the combinations available are:

CA - data is consistent between all nodes - as long as all nodes are online - and you can read/write from any node and be sure that the data is the same, but if you ever develop a partition between nodes, the data will be out of sync (and won't re-sync once the partition is resolved).
CP - data is consistent between all nodes, and maintains partition tolerance (preventing data desync) by becoming unavailable when a node goes down.
AP - nodes remain online even if they can't communicate with each other and will resync data once the partition is resolved, but you aren't guaranteed that all nodes will have the same data (either during or after the partition)

## CP
Waiting for a response from the partitioned node might result in a timeout error. CP is a good choice if your business needs require atomic reads and writes.

## AP
Responses return the most recent version of the data available on a node, which might not be the latest. Writes might take some time to propagate when the partition is resolved.

AP is a good choice if the business needs allow for eventual consistency or when the system needs to continue working despite external errors.



































# Consistency Patterns

## Weak Consistency
After a write, reads may or may not see it. A best effort approach is taken.

This approach is seen in systems such as memcached. Weak consistency works well in real time use cases such as VoIP, video chat, and realtime multiplayer games.

## Eventual Consistency
After a write, reads will eventually see it (typically within milliseconds). Data is replicated asynchronously.

This approach is seen in systems such as DNS and email. Eventual consistency works well in highly available systems.

## Strong Consistency
After a write, reads will see it. Data is replicated synchronously.

This approach is seen in file systems and RDBMSes. Strong consistency works well in systems that need transactions.



































# Availability Patterns

## Fail-over

### Active-passive
Heartbeats are sent between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service. The length of downtime is determined by whether the passive server is already running in 'hot' standby or whether it needs to start up from 'cold' standby. Only the active server handles traffic.

### Active-Active
both servers are managing traffic, spreading the load between them.

If the servers are public-facing, the DNS would need to know about the public IPs of both servers. If the servers are internal-facing, application logic would need to know about both servers.

### Disadvantages
- fail-over adds more hardware and additional complexity
- There is a potential for loss if the active system fails before any newly written data can be replicated to the passive.

## Replication
master-slave or master-master.

Availablity is genenrally measured in number of 9s - a service with 99.99% availability is described as having four 9s.

99.9% availability - three 9s
| Duration           | Acceptable downtime |
|--------------------|---------------------|
| Downtime per year  | 8h 45min 57s        |
| Downtime per month | 43m 49.7s           |
| Downtime per week  | 10m 4.8s            |
| Downtime per day   | 1m 26.4s            |

99.99% availability - four 9s
| Duration           | Acceptable downtime |
|--------------------|---------------------|
| Downtime per year  | 52min 35.7s         |
| Downtime per month | 4m 23s              |
| Downtime per week  | 1m 5s               |
| Downtime per day   | 8.6s                |

If a service consists of multiple components prone to failure, the service's overall availability depends on whether the components are in sequence or in parallel.

In sequence
Overall availability decreases when two components with availability < 100% are in sequence:
```
Availability (Total) = Availability (Foo) * Availability (Bar)
```
If both Foo and Bar each had 99.9% availability, their total availability in sequence would be 99.8%.

In parallel
Overall availability increases when two components with availability < 100% are in parallel:
```
Availability (Total) = 1 - (1 - Availability (Foo)) * (1 - Availability (Bar))
```
If both Foo and Bar each had 99.9% availability, their total availability in parallel would be 99.9999%.





































































# CDN
Content delivey networks.

IS a globally distributed network of proxy servers, serving content from locations closer to the user.

A CDN helps to spped up static components of your blog by distributing them across a number of servers around the world.


Generally static files such as HTML /CSS/Js, photos, and vidoes are served from CDN, although some CDNs such as Amazon's CloudFront support dynamic content.

Can significantly improve performance in two ways:
- Users receive content at data centers close to them.
- Your servers do not have to serve requests that the CDN fulfills

## Push CDNs
Push CDNs receive new content whenever changes occurs on your server. You take responsiblity for providing content, uploading directly to the CDN and rewriting URLs to point to the CDN.

Sites with a small amount of traffic or sites with content that isn't often updated work well with push CNDs. Content is placed on the CDNs once, instead of being re-pulled at regular intervals.

## Pull CDNs
Grab new content from your server when the first user requests the content. You leave the content on your server and rewrite URLs to point to the CDN. This results in a slower request until the content is cached on the CDN.

A TTL determines how long content is cached. Pull CDNs minimize storage space o nthe CDN, but can create redundant traffic if files expire and are pulled befroe they have actually changed.

Sites with heavy traffic work well with pull CDNs, as traffic is spread out more evenly with only recently-requested content remaining on the CDN.

## Disadvantages
- CDN costs could be significant depending on traffic, although this should be weighed with additional costs you would incur not using a CDN.
- Content might be stale if it is updated before the TTL expires it.
- CDNs require chaning URLs for static content to point to the CDN.









































# Load Balancer
![load balancer](https://camo.githubusercontent.com/21caea3d7f67f451630012f657ae59a56709365c/687474703a2f2f692e696d6775722e636f6d2f6838316e39694b2e706e67)

Distribute incoming requests to computing resources such as application servers and databases..

Good at:
- preventing requests from going to unhealthy servers
- preventing overloading resources
- helping elimiate single points of failure

Can be implemented with hardware or with software such as HAProxy.

Other benefits:
- SSL Termination - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations.
- Session persistence - Issue cookies and route a specific client's requests to same instance if the web apps do not keep track of sessions.

To protect against failures, it's common to set up multiple load balancers, either in active-apssive or active-active mode.

Can route traffic vased on various metrics.

Nginx is best for serving static content - can have node server dynamic content, and get nginx to serve static. Can then also use nginx as a reverse proxy.

Load balancers can route traffic based on various metrics, including:
- Random
- Least loaded
- Session/cookies
- Round robin or weighted round robin
- Layer 4
- Layer 7

Disadvantages:
- The load balancer can become a performance bottleneck if it does not have enough resources or if it is not configured properly.
- Introducing a load balancer to help eliminate single points of failure results in increased complexity.
- A single load balancer is a single point of failure, configuring multiple load balancers further increases complexity.

A moderately large system may balance load at three layers:
- user to your web servers,
- web servers to an internal platform layer,
- internal platform layer to your database.

A smart client is a client which takes a pool of service hosts and balances load across them, detects downed hosts and avoids sending requests their way.

HAProxy is a good smart client. It runs locally on each of your boxes, and each service you want to load-balace has a locally bound port.

















































# Reverse Proxy (Web Server)
A reverse proxy is a web server that centralises internal services and provides unified interfaces to the public. Requests from clients are forwarded to a server that can fulfil it before the reverse proxy returns the server's respone the the client. 

Additional benefits include:
- Increased security - Hide information about backend servers, blacklist IPs, limit number of connections per client
- Increased scalability and flexibility - Clients only see the reverse proxy's IP, allowing you to scale servers or change their configuration
- SSL termination - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations
    - Removes the need to install X.509 certificates on each server
- Compression - Compress server responses
- Caching - Return the response for cached requests
- Static content - Serve static content directly
    - HTML/CSS/JS

## Disadvantages
- Introducing a reverse proxy results in increased complexity.
- A single reverse proxy is a single point of failure, configuring multiple reverse proxies (ie a failover) further increases complexity.

## Load balancer vs reverse proxy
Deploying a load balancer is useful when you have multiple servers. Often, load balancers route traffic to a set of servers serving the same function.
Reverse proxies can be useful even with just one web server or application server, opening up the benefits described in the previous section.
Solutions such as NGINX and HAProxy can support both layer 7 reverse proxying and load balancing.

## Difference between a reverse proxy and a forward proxy?
The main difference between a forward proxy and a reverse proxu is that a forward proxy is used by the client, such as a web browser, whereas a reverse proxy is used by the server such as a web server.

Forward proxy can be used by the client to bypass firewall restrictions in order to visit websites that are blocked by school, government, company etc. If a website blocked an IP range from visiting the website, then a person in that IP range can use forward proxy to hide the real IP of the client so that person can visit the website

Forward proxy can also act as a cache server in an internal network. If a resource is download many times, then the proxy can cache the content on the server so next time when another computer download the same content, the proxy will send the content that is previously stored on the server to the computer.

Reverse proxy is mainly used by server admins to achieve load balancing and high availability. A website may have several web servers behind the reverse proxy. The reverse proxy server takes requests from the Internet and forward these requests to one of the web servers.






































# Difference between an application server and a web server
Used interchangeably.

Web server is designed to serve HTTP content. Application server can also server HTTP contnet but it is not limited to just HTTP. It can be provide other protocol support such as RMI/RPC.

Web sever is mostly designed to serve static content, though most web servers have plugins to support scripting languages (e.g. JSP) through which these servers can generate dynamic HTTP content.

Most of the application servers have a web server as an integral part of them. This means that the app server can do whatever the web server is capable of. Additionally app servers have components and features to support application level services such as connection pooling, object pooling, transaction support, messaging services, etc.

As web servers are well suited for static content and app servers for dynamic content, most of the production environments have web servers acting as a reverse proxy to the application server. That means while servicing a page request, static content is server by the web server that interprets the request. Using some kind of filtering technique the web serve identifies dynamic content requests and transparently forwards to the application server.

A web server would be Apache HTTP and an application server would be Apache Tomcat.










































# Application layer
![Application Layer](https://camo.githubusercontent.com/feeb549c5b6e94f65c613635f7166dc26e0c7de7/687474703a2f2f692e696d6775722e636f6d2f7942355359776d2e706e67)
Also known as platform layer.
Seperating out from web layer allows you to scale and configure both layers independently.

Adding a new API results in adding application servers without necessarily adding additional web servers. The single responsibility principle advocates for small and autonomous services tha work together.

Workers in the application layer also help enable asynchronism.

## Microservices
a suite of independently deployable, small, modular services. Each service runs a unique process and communicates through a well-defined, lightweight mechanism to serve a business goal.

Pinterest, for example, could have the following microservices: user profile, follower, feed, search, photo upload, etc.

## Service Discovery
Systems such as Consul, Etcd, and Zoopkeeper can help services find each other by keeping track of registered names, addresses, and ports. Health checks help verify service integrity and are often done using an HTTP endpoint. Both Consil and Etcd have a build in key-value store that can be useful for storing config values and other shared data

## Service Meshes
Need to look this up

## Disadvantages
- Adding an application layer with loosely coupled services requires a different approach from an architectural, operations, and process viewpoint (vs a monolithic system). 
- Microservices can add complexity in terms of deployment and operations.



































































# Servlets

the user/client can only request static webpage from the server. This is not good enough, if the user wants to read the web page based on his input. The basic idea of Servlet container is using Java to dynamically generate the web page on the server side. So servlet container is essentially a part of a web server that interacts with the servlets.

Servlet is an interface defined in javax.servlet package. It declares three essential methods for the life cycle of a servlet – init(), service(), and destroy(). They are implemented by every servlet(defined in SDK or self-defined) and are invoked at specific times by the server.  
The service() method is invoked upon each request after its initialization. Each request is serviced in its own separate thread. The web container calls the service() method of the servlet for every request. The service() method determines the kind of request being made and dispatches it to an appropriate method to handle the request.

Apache Tomcat is an implementation of the java servlet and a servlet container.

## How does a servlet contaienr and a web server process a request?
1. Web server receives HTTP request
2. Web server forwards the request to servlet container
3. The servlet is dynamically retrieved and loaded into the address space of the container, if it is not in the container.
4. The container invokes the init() method of the servlet for initialization(invoked once when the servlet is loaded first time)
5. The container invokes the service() method of the servlet to process the HTTP request, i.e., read data in the request and formulate a response. The servlet remains in the container’s address space and can process other HTTP requests.
6. Web server return the dynamically generated results to the correct location

Using servlets allows the JVM to handle each request within a separate Java thread, and this is one of the key advantage of Servlet container. Each servlet is a Java class with special elements responding to HTTP requests. The main function of Servlet contain is to forward requests to correct servlet for processing, and return the dynamically generated results to the correct location after the JVM has processed them.





























# Databases

### 1NF
- Each cell to be single valued
- entry in a column are same time
- rows uniquely identified

### 2NF
- All attributes (non-key columns) dependent on the key
- if we have the price of an xbox in the same table containing customer info (with key customer id), then we need to move this out to be 2NF

Can link tables with compound (look up) key

### 3NF
- All fields (columns) can be determined only by the key in the table and no other column
- would move repeating columns out to seperate table
- have foreign keys

### 4NF
No multi-valued dependency

If you have two records that need to change in a table if some data changes, it's not 4NF.













































# Offline processing
Processing that can’t be performed in-line with a client’s request because it creates unacceptable latency (e.g. you want to propagate a user's action across a social graph) or because it needs to occur pperiodically.
Message queues
Easiest solution is to create a message queues.
For the split of offline and online work:
1.	Perform almost no work in the consumer and inform your user that the task will occur offline
2.	Perform enough work to make it appear to the user that the task has completed and tie up hanging ends afterwards. E.g. post a tweet, update your timeline, return, after update other users timelines
The other benefit is take burden off web apps as you can have separate machine pool for performing offline processing.
For scheduled jobs, can use cron jobs to send messages to queue.
















# Map reduce
If your app is dealing with large quantity of data youlllikely add support for map reduce, probably using Hadoop and maybe give or HBase.
Adding a map reduce layer makes it possible to perform data and or processing intensive operations in a reasonable amount of time.
Could use it for calculating suggested users in a social graph, or for generating analytics reports.
For small queries can often get away with adhoc queries on sql server, but wont scale up trivial once the quantity of data stored or write load requires sharing your db.





































# Platform layer
Web apps communicates with platform layer, which in turn communicates with your db. 
Allows you to scale both independently. 

Adding a platform layer can be a way to reuse your infrastructure for multiple products or interfaces es (a web app, an API, an iPhone app, etc.).
A platform should expose a crisp product-agnostic interface which masks implementation details.
If done well, this utilizes the platform's capabilities, as well as another team implementing/optimizing the platform itself.



























# Relational Database Management System
ACID is a set of properties of relational database transactions.

- Atomicity - Each Transaction is all or nothing
- Consistency - Any transaction will birng the database from one valid state to anotehr
- Isolation - Executing transactions concurrently has the same results as if the transactions were executed serially
- Durability - Oncea transaction has been committed, it will remain so.

There are many techniques to scale a relational database: master-slave replication, master-master replication, federation, sharding, denormalization, and SQL tuning.

## Replication 
###  Master-Slave Replication
The master servers reads and writes, replicating writes to one or more slaves, which serve only reads.

Slaves can also replicate to additional slaves.

If the master goes offline, the system can continue to operate in read-only mode until a slave is promoted to a master or a new master is provisioned.

Disadvantages:
- Additional logic is needed to promote a slave to a master.

### Master-Master Replication
Both masters serve reads and writes and coordinate with each other on writes. If either master goes down, the system can continue to operate with both reads and writes.

The primary purposes of multi-master replication are increased availability and faster server response time.

Masters can be located in several physical sites.

Active Directory is master master replication. 

Many directory servers are based on LDAP and implement multi-master replicarion

Disadvantages:
- You'll need a load balancer or you'll need to make changes to your app logic to determine where to write.
- Most master-master sustems are either loosely consistent (violating ACID) or have increased write latency due to synchronisation
- COnflict resolution comes more into play as more nodes are added and as latency increases.

### Replication Disadvantages
- Potential for loss of data if the master fails before any newly written data can be replication to other notes. 
- write sare replayed to the read replicas. If there are a lot of writes, the read replicas can't do as many reads.
- THe more read slaves, the more you have to replicate, the more replication lag.
- adds more hardware and additional complexity

## Federation (Functional Partitioning)
Splits up dbs by function. E.g. Users db, products db, forums db.
Results in less read and write traffic to each db and therefore less replicarion lag. 

Smaller databases result in more data that can fit in memory, which in turn results in more cache hits due to improved cache locality. 

### Disadvantages
- not effective if your schema requires huge functions or tables
- need to update app logic to determine which db to read and write from.
- joining data is more complex
- Adds more hardware and additional complexity

## Sharding
Distributes data across different databases such that each database can only manage a subset of the data. taking a users database as an example, as the number of users increases, more shards are added to  the cluster. 

Advantages:
- less read and write traffic
- less replication
- more cache hits
- index size reduced
- can write in parallel
- faster querying

Still need to add some form of replication to avoid data loss. No single central master serialising writes.

Common ways to shard a table of users is either through the user's last name initial or the user's geographic location.

Data is denormalised. You store together data that are used together. 
- you can replicate data, e.g. if you need comments by user and by photos, you can store comments on both tables. This can cause problems with inconsistency though.


### Disadvantages
- You'll need to update your app logic to work with shards, which could result in complex SQL queries. 
- data distributing can become lopsided in a shard. A set of power users on a shard could result in increased load to that shard compared to others. 
    - Rebalancing adds complexity. A sharding function based on consistent hashing can reduce the amount of transferred data.
- Joining data from multiple shards is more complex.
- Sharding adds more hardware and additional complexity.
- what data do you put in each shard?
- maintaining referential integrity is hard. Often have to enforce it in application code and run regular SQL jobs to clean up dangling references once they move to using database shards.

## Denormalisation
Attempts to improve read performance at the expense of some write performance. redundant coipies of the data are written in multiple tables to avoid expensive joins. Some

Can use views.

Might circumvent the need for such complex joins.

In most systems, reads can heavily outnumber writes 100:1 or even 1000:1. A read resulting in a complex database join can be very expensive, spendiing a significant amount of time on disk operations.

Disavantages:
- Data is duplicated
- Constraints can hlep redundant cipies of information stay in sync, which increases complexity of the database design.

## SQL Tuning
Very broad topic.

Important to benchmark and profile to simulate and uncover bottlenecks.
- Benchmark - Simulate high-load situations with tools such as ab(?)
- Profile - Enable tools such as the slow query log to help track performance issues.

They might point you to the following optimisations:

### Tighten up the schema
- use CHAR instead of VARCHAR for fixed-length fields.
    - effecitvely allows for fast, random access, whereas with VARCHAR you mudy find the end of a string before moving onto the next one
- use TEXT for large blocks of text such as blog posts. Allows for boolean searches. results in storing a pointer on disk that is used to locate the text block.
- Use INT for larger numbers up to 4 billion.
- DECIMAL for currency
- Avoid storing large BLOBS, store the location instead.
- VARCHAR(255) is the largest number of characters that can be counte din an 8 bit number, often maximising the use of a byte in some RDBMS.
- Set the NOT NULL constraint where applicable to improve search performance.

### Use good indices
- Columns that you are querying could be faster with indices.
- Use represented as a self-balancing B-tree.
- Placing an index can keep the data in memory, requiring more space.
- Writes could also be slower since the index also needs to be updated.
- When loading large amounts of data, it might be faster to disable indices, load the data, then rebuild the indices.

### Avoid expensive joins
- Denormalisae where performance demands it

### Partition tables
- Break up a table by putting hot spots in a separate table to help keep it in memory.

### Tune the query cache
- In some cases, the query cache could lead to performance issues.










































# NoSQL
A collection of data items rperesented in a key-value store, document store, wide column store, or a graph database. 

Data is denormalised and joins are generally done in the application code.

Most NoSQL stores lack true ACID transaction and favour eventual consistency.

BASE is often used to describe the properties of NoSQL databases. In comparison with the CAP theorem, BASE chooses availablity over consistency.
- Basically Available - the system guarantees availability
- Soft state - the state of the system masy change over time, even without input.
- Eventual Consistency - the system will become consistent over a period of time, given that the system doesn't receive input during that period.

## Key-value store
Allows for O(1) reads and writes and is often backed by memory or SSD. Can maintain keys in lexicographic order, allowing efficient retriveval of key ranges. Key-value stores can allow for storing of metadata with a value. 

Provide high performance and are often used for simple data models or for rapidly-changing data, such as an in-memory cache layer. 

key-value systems treat the data as a single opaque collection, which may have different fields for every record.

Because optional values are not represented by placeholders or input parameters, as in most RDBs, key-value databases often use far less memory to store the same database, which can lead to large performance gains in certain workloads.

Some graph databases are also key-value databases internally, adding the concept of the relationships (pointers) between records as a first class data type.

### Redis

In Redis, key has to be a string but value can be a string, list, set, sorted set or hash.

Redis stores everything is primary memory. 

Redis has multiple ways to store records in non-volatile memory. 

### Memcache

Most of memcache functionality (add, get, set, flush etc) are o(1).

Your web application can talk to multiple memcache-servers at the same time. You only need to update your application with a list of ip’s where your memcache servers are located so it automatically use all your servers.

As soon we add an object to the memcache, it will automatically choose a server where it can store the data. When you have only one server that decision is easy, but as soon as you have multiple servers running it must find a way to place items. Consistent hashing is used.

## Document Store
Centered around documents (XML, JSON, binary, etc.), where a document stores all information for a given object. Document stores provide APIs or a query language to query based on the internal structure of the document itself. Note, many key-value stores include features for working with a value's metadata, blurring the lines between these two storage types.

Based on the underlying implementation, documents are organized by collections, tags, metadata, or directories. Although documents can be organized or grouped together, documents may have fields that are completely different from each other.

Some document stores like MongoDB and CouchDB also provide a SQL-like language to perform complex queries. DynamoDB supports both key-values and documents.

Document stores provide high flexibility and are often used for working with occasionally changing data.

Document-oriented databases are inherently a subclass of the key-value store, another NoSQL database concept. The difference lies in the way the data are processed; in a key-value store, the data are considered to be inherently opaque to the database, whereas a document-oriented system relies on internal structure in the document in order to extract metadata that the database engine uses for further optimization.

Document databases[ contrast strongly with the traditional relational database (RDB). Relational databases generally store data in separate tables that are defined by the programmer, and a single object may be spread across several tables. Document databases store all information for a given object in a single instance in the database, and every stored object can be different from every other. This eliminates the need for object-relational mapping while loading data into the database.

## Wide Column Store

A wide column store's basic unit of data is a column (name/value pair). A column can be grouped in column families (analogous to a SQL table). Super column families further group column families. You can access each column independently with a row key, and columns with the same row key form a row. Each value contains a timestamp for versioning and for conflict resolution.

Google introduced Bigtable as the first wide column store, which influenced the open-source HBase often-used in the Hadoop ecosystem, and Cassandra from Facebook. Stores such as BigTable, HBase, and Cassandra maintain keys in lexicographic order, allowing efficient retrieval of selective key ranges.

Wide column stores offer high availability and high scalability. They are often used for very large data sets.

![Column store](https://camo.githubusercontent.com/823668b07b4bff50574e934273c9244e4e5017d6/687474703a2f2f692e696d6775722e636f6d2f6e3136694f476b2e706e67)

## Graph
Each node is a record and each arc is a relationship between two nodes. Graph databases are optimized to represent complex relationships with many foreign keys or many-to-many relationships.

Graphs databases offer high performance for data models with complex relationships, such as a social network. They are relatively new and are not yet widely-used; it might be more difficult to find development tools and resources. Many graphs can only be accessed with REST APIs.

Graph databases hold the relationships between data as a priority. Querying relationships within a graph database is fast because they are perpetually stored within the database itself. Relationships can be intuitively visualized using graph databases, making them useful for heavily inter-connected data.

Neo4j is graph db.

![graph db](https://camo.githubusercontent.com/bf6508b65e98a7210d9861515833afa0d9434436/687474703a2f2f692e696d6775722e636f6d2f664e636c3635672e706e67)

## NoSQL Patterns

### API Model
Underlying data model can be considered as a large hash table.

has:
- get
- put
- delete 

Might aslo have

- execute - invoke an operation to the value given its key which is a special data structure
- mapreduce - invoke a map reduce function across a key range?

### Machines Layout
underlying infra composed of large number of cheap, commoditized, unreliable machines connected throug ha network. 

### Data Partitioning (Consistent Hashing)
![ashing](http://1.bp.blogspot.com/_j6mB7TMmJJY/SwohQZ9HTAI/AAAAAAAAAXM/X9CAGfpnL2o/s1600/p1.png)

 the key space is finite and lie on the circumference of a ring. The virtual node id is also allocated from the same key space. For any key, its owner node is defined as the first encountered virtual node if walking clockwise from that key. If the owner node crashes, all the key it owns will be adopted by its clockwise neighbor. Therefore, key redistribution happens only within the neighbor of the crashed node, all other nodes retains the same set of keys.

It would be nice if, when a cache machine was added, it took its fair share of objects from all the other cache machines. Equally, when a cache machine was removed, it would be nice if its objects were shared between the remaining machines. This is exactly what consistent hashing does - consistently maps objects to the same cache machine, as far as is possible, at least.

The basic idea behind the consistent hashing algorithm is to hash both objects and caches using the same hash function. The reason to do this is to map the cache to an interval, which will contain a number of object hashes. If the cache is removed then its interval is taken over by a cache with an adjacent interval. All the other caches remain unchanged.

To find which cache an object goes in, we move clockwise round the circle until we find a cache point.

This works well, except the size of the intervals assigned to each cache is pretty hit and miss. Since it is essentially random it is possible to have a very non-uniform distribution of objects between caches. The solution to this problem is to introduce the idea of "virtual nodes", which are replicas of cache points in the circle. So whenever we add a cache we create a number of points in the circle for it.

For completeness here is a simple implementation in Java. In order for consistent hashing to be effective it is important to have a hash function that mixes well. Most implementations of Object's hashCode do not mix well - for example, they typically produce a restricted number of small integer values - so we have a HashFunction interface to allow a custom hash function to be used. MD5 hashes are recommended here.
```java
import java.util.Collection;
import java.util.SortedMap;
import java.util.TreeMap;

public class ConsistentHash<T> {

  private final HashFunction hashFunction;
  private final int numberOfReplicas;
  private final SortedMap<Integer, T> circle =
    new TreeMap<Integer, T>();

  public ConsistentHash(HashFunction hashFunction,
    int numberOfReplicas, Collection<T> nodes) {

    this.hashFunction = hashFunction;
    this.numberOfReplicas = numberOfReplicas;

    for (T node : nodes) {
      add(node);
    }
  }

  public void add(T node) {
    for (int i = 0; i < numberOfReplicas; i++) {
      circle.put(hashFunction.hash(node.toString() + i),
        node);
    }
  }

  public void remove(T node) {
    for (int i = 0; i < numberOfReplicas; i++) {
      circle.remove(hashFunction.hash(node.toString() + i));
    }
  }

  public T get(Object key) {
    if (circle.isEmpty()) {
      return null;
    }
    int hash = hashFunction.hash(key);
    if (!circle.containsKey(hash)) {
      SortedMap<Integer, T> tailMap =
        circle.tailMap(hash);
      hash = tailMap.isEmpty() ?
             circle.firstKey() : tailMap.firstKey();
    }
    return circle.get(hash);
  } 

}
```

The circle is represented as a sorted map of integers, which represent the hash values, to caches (of type T here).
When a ConsistentHash object is created each node is added to the circle map a number of times (controlled by numberOfReplicas). The location of each replica is chosen by hashing the node's name along with a numerical suffix, and the node is stored at each of these points in the map.

To find a node for an object (the get method), the hash value of the object is used to look in the map. Most of the time there will not be a node stored at this hash value (since the hash value space is typically much larger than the number of nodes, even with replicas), so the next node is found by looking for the first key in the tail map. If the tail map is empty then we wrap around the circle by getting the first key in the circle.

### Data Replication
Replication not only improves the overall reliability of data, it also helps performance by spreading the workload across multiple replicas.

While read-only request can be dispatched to any replicas, update request is more challenging because we need to carefully co-ordinate the update which happens in these replicas.

![repl](http://4.bp.blogspot.com/_j6mB7TMmJJY/SwohcYWqCDI/AAAAAAAAAXU/oH0pDuht4vo/s1600/P2.png)

### Membership Changes
nodes can join and leave the network at any time wutout impacting the operation of the ring.

When a node joins:
- joining node will announce its presence
- All neighbours will adjust the change of key ownership as well as the change of replica memberships. Usually done synchronously
- Joining node starts to bulk copy data from its neighbour in parallell asynchronously.
- Membership change is propagated to other nodes asynchrnously

![change](http://1.bp.blogspot.com/_j6mB7TMmJJY/Sw1b9Sv0fmI/AAAAAAAAAXc/4-YNzhA3LCQ/s1600/p1.png)

Notice that other nodes may not have their membership view updated yet so they may still forward the request to the old nodes. But since these old nodes (which is the neighbor of the new joined node) has been updated (in step 2), so they will forward the request to the new joined node.

On the other hand, the new joined node may still in the process of downloading the data and not ready to serve yet. We use the vector clock (described below) to determine whether the new joined node is ready to serve the request and if not, the client can contact another replica.

When a node leaves (e.g. crash)
- The crashed node no longer responds to gossip messages os its neighbours know about it.
- The neighbour will update the membership changes and copy data asynchronously.

![crash](http://2.bp.blogspot.com/_j6mB7TMmJJY/Sw1jGP6y5tI/AAAAAAAAAXk/rM9k-jNcsKQ/s1600/P2.png)

### Client Consistency
Once we have multiple copies of the same data, we need to worry about how to synchronize them such that the client can has a consistent view of the data.

There is a number of client consistency models
1. Strict Consistency (one copy serializability): This provides the semantics as if there is only one copy of data. Any update is observed instantaneously.
2. Read your write consistency: The allows the client to see his own update immediately (and the client can switch server between requests), but not the updates made by other clients
3. Session consistency: Provide the read-your-write consistency only when the client is issuing the request under the same session scope (which is usually bind to the same server)
4. Monotonic Read Consistency: This provide the time monotonicity guarantee that the client will only see more updated version of the data in future requests.
5. Eventual Consistency: This provides the weakness form of guarantee. The client can see an inconsistent view as the update are in progress. This model works when concurrent access of the same data is very unlikely, and the client need to wait for some time if he needs to see his previous update.

Depends on which consistency model to provide, 2 mechanisms need to be arranged ...
How the client request is dispatched to a replica
How the replicas propagate and apply the updates
There are various models how these 2 aspects can be done, with different tradeoffs.

## SQL or NoSQL
Reasons for SQL:
- Structured data
- Strict schema
- Relational data
- Need for complex joins
- Transactions
- Clear patterns for scaling
- More established: developers, community, code, tools, etc
- Lookups by index are very fast

Reasons for NoSQL:
- Semi-structured data
- Dynamic or flexible schema
- Non-relational data
- No need for complex joins
- Store many TB (or PB) of data
- Very data intensive workload
- Very high throughput for IOPS

Sample data well-suited for NoSQL:
- Rapid ingest of clickstream and log data
- Leaderboard or scoring data
- Temporary data, such as a shopping cart
- Frequently accessed ('hot') tables
- Metadata/lookup tables

# Introduction to NoSQL
The biggest problem with relational database is that you need to seperate out your data into tables. Referred to as the impedance mismatch problem.

SQL was designed to run on big boxes - hard to spread.

Google created big table, amazon created dynamo

Inspired NoSQL movement.

Characteristics of NoSQL:
- non-relational
- open-source
- cluster-friendly
- 21st Century Web
- Schema-less

Often though you have an implicit schema.

The line between key-value and document is fuzzy - key-value can have metadata and document can just store key-values.
- Just referred to as aggregate oriented databases.


column-family is different, have a row key, in that can store multiple column families, where each column family is a combination of columns that kind of fit together. 
- Is still aggregate-based. Column family is effectively the aggregate.
You address it by the combination of the row key and the column family name.

When you cluster you want to distribute data that tends to be accessed togehter. Aggregate orientation naturally fits in very nicely with storing with storing data on large clusters. 

Relational is good when you want access data in a way which isn't through the aggregate - e.g. you have an aggregate of order -> line item -> product, but you then want to get the data based on the line item, therefore the aggregate is now the line item. This is much easier with relational. You can do it by running a map reduce job to transform the data. 

Graph database is seperate. Good for jummping around relationships. you can still store relationships in aggregate-based by storing the ids, but it is more messy.

Relational has ACID
NoSQL has BASE

Graph databases follow ACID

Aggregate-based don't need ACID as much, as the aggregates should be transaction boundaries.

NoSQL is good for large data - but a lot of people use it for ease of development - natural aggregates. Get rid of impedance mismatch problem.

### Offline lock
You have an app, two people open it, one wants to update, and then the second person wants to update, but hasn't got the first update.

Offline lock - give each data record or aggregate a version stamp. When you post you provide the version stamp of where you read from. For the first guy everything works out fine, second guy gets flagged up and need to do some conflict resolution.

Two types of consistency:
- logical: these consistency issues occur whether you're running on a cluster of machines or whether you're running on one single machine.
- replication: 











































































# Communication
![Communication](https://camo.githubusercontent.com/1d761d5688d28ce1fb12a0f1c8191bca96eece4c/687474703a2f2f692e696d6775722e636f6d2f354b656f6351732e6a7067)

## HTTP
Is a method for encoding and transporting data between a client and a server. It is a request/response protocol: clients issue requests and servers issue responses with relevant content and completion status info about the request. HTTP is self-contained, allowing requests and responses to flow through many intermediate routers and servers that perform load balancing, caching, encryption, and compression.

HTTP is an application layer protocol relying on lower-level protocols such as TCP and UDP.

HTTP doesn’t map 1:1 to REST, it’s an implementation of REST. REST is a set of constraints, but it doesn’t include aspects of the HTTP specific implementation. For example your service could implement a RESTful interface that exposes methods other than the ones that HTTP exposes and still be RESTful.

## TCP
TCP is a connection-oriented protocol over an IP network. Connection is established and terminated using a handshake. All packets sent are guaranteed to reach the destination in the original order and without corruption through:

Sequence numbers and checksum fields for each packet
Acknowledgement packets and automatic retransmission
If the sender does not receive a correct response, it will resend the packets. If there are multiple timeouts, the connection is dropped. TCP also implements flow control and congestion control. These guarantees cause delays and generally result in less efficient transmission than UDP.

To ensure high throughput, web servers can keep a large number of TCP connections open, resulting in high memory usage. It can be expensive to have a large number of open connections between web server threads and say, a memcached server. Connection pooling can help in addition to switching to UDP where applicable.

TCP is useful for applications that require high reliability but are less time critical. Some examples include web servers, database info, SMTP, FTP, and SSH.

Use TCP over UDP when:
- You need all of the data to arrive intact
- You want to automatically make a best estimate use of the network throughput

UDP is connectionless. Datagrams (analogous to packets) are guaranteed only at the datagram level. Datagrams might reach their destination out of order or not at all. UDP does not support congestion control. Without the guarantees that TCP support, UDP is generally more efficient.

UDP can broadcast, sending datagrams to all devices on the subnet. This is useful with DHCP because the client has not yet received an IP address, thus preventing a way for TCP to stream without the IP address.

UDP is less reliable but works well in real time use cases such as VoIP, video chat, streaming, and realtime multiplayer games.

Use UDP over TCP when:
- You need the lowest latency
- Late data is worse than loss of data
- You want to implement your own error correction

## RPC
![RPC](https://camo.githubusercontent.com/1a3d7771c0b0a7816d0533fffeb6eeeb442d9945/687474703a2f2f692e696d6775722e636f6d2f6946344d6b62352e706e67)

In an RPC, a client causes a procedure to execute on a different address space, usually a remote server. The procedure is coded as if it were a local procedure call, abstracting away the details of how to communicate with the server from the client program. Remote calls are usually slower and less reliable than local calls so it is helpful to distinguish RPC calls from local calls. Popular RPC frameworks include Protobuf, Thrift, and Avro.

RPC is a request-response protocol:
- Client program - Calls the client stub procedure. The parameters are pushed onto the stack like a local procedure call.
- Client stub procedure - Marshals (packs) procedure id and arguments into a request message.
- Client communication module - OS sends the message from the client to the server.
- Server communication module - OS passes the incoming packets to the server stub procedure.
- Server stub procedure - Unmarshalls the results, calls the server procedure matching the procedure id and passes the given arguments.
- The server response repeats the steps above in reverse order.

Sample RPC calls:
```
GET /someoperation?data=anId

POST /anotheroperation
{
  "data":"anId";
  "anotherdata": "another value"
}
```

RPC is focused on exposing behaviors. RPCs are often used for performance reasons with internal communications, as you can hand-craft native calls to better fit your use cases.

Choose a native library (aka SDK) when:
- You know your target platform.
- You want to control how your "logic" is accessed.
- You want to control how error control happens off your library.
- Performance and end user experience is your primary concern.

HTTP APIs following REST tend to be used more often for public APIs.

(RPC) is way to describe a mechanism that lets you call a procedure in another process and exchange data by message passing. It typically involves generating some method stubs on the client process that makes making the call appear local, but behind the stub is logic to marshall the request and send it to the server process. The server process then unmarshalls the request and invokes the desired method before repeating the process in reverse to get whatever the method returns back to the client. HTTP is sometimes used as the underlying protocol for message passing, but nothing about RPC is inherently bound to HTTP. Remote Method Invocation (RMI) is closely related to RPC, but it takes remote invocation a step further by making it object oriented and providing the capability to keep references to remote objects and invoke their methods.

Disadvantage(s): RPC
- RPC clients become tightly coupled to the service implementation.
- A new API must be defined for every new operation or use case.
- It can be difficult to debug RPC.
- You might not be able to leverage existing technologies out of the box. For example, it might require additional effort to ensure RPC calls are properly cached on caching servers such as Squid.

## REST
Representational state transfer (REST)
REST is an architectural style enforcing a client/server model where the client acts on a set of resources managed by the server. The server provides a representation of resources and actions that can either manipulate or get a new representation of resources. All communication must be stateless and cacheable.

There are four qualities of a RESTful interface:
- Identify resources (URI in HTTP) - use the same URI regardless of any operation.
- Change with representations (Verbs in HTTP) - use verbs, headers, and body.
- Self-descriptive error message (status response in HTTP) - Use status codes, don't reinvent the wheel.
- HATEOAS (HTML interface for HTTP) - your web service should be fully accessible in a browser.

Sample REST calls:
```
GET /someresources/anId

PUT /someresources/anId
{"anotherdata": "another value"}
```

REST is focused on exposing data. It minimizes the coupling between client/server and is often used for public HTTP APIs. REST uses a more generic and uniform method of exposing resources through URIs, representation through headers, and actions through verbs such as GET, POST, PUT, DELETE, and PATCH. Being stateless, REST is great for horizontal scaling and partitioning.

## REST vs RPC

Both RPC and REST use HTTP. HTTP is sometimes used as the underlying protocol for message passing, but nothing about RPC is inherently bound to HTTP. Remote Method Invocation (RMI) is closely related to RPC, but it takes remote invocation a step further by making it object oriented and providing the capability to keep references to remote objects and invoke their methods.

| Verb   | Meaning                                                            |  Idempotent  |  Safe  |  Cacheable                                                         |
|--------|--------------------------------------------------------------------|--------------|--------|--------------------------------------------------------------------|
| GET    | Reads a resource                                                   | Yes          | Yes    | Yes                                                                |
| POST   | Creates a resource or triggers a data-handling process             | No           | No     | Only cacheable if response contains explicit freshness information |
| PUT    | Fully updates (replaces) an existing resource or create a resource | Yes          | No     | No                                                                 |
| PATCH  | Partially updates a resources                                      | No           | No     | Only cacheable if response contains explicit freshness information |
| DELETE | Deletes a resource                                                 | Yes          | No     | No                                                                 |

There are no particular rules for this style but generally:
- The endpoint contains the name of the operation you want to invoke.
- This type of API generally only uses GET and POST HTTP verbs.

How do people choose between GET and POST?
- For those who care a little about HTTP protocol this type of API tends to use GET for operations that don’t modify anything and POST for other cases.
- For those who don’t care much about HTTP protocol, this type of API tends to use GET for operations that don’t need too much parameters and POST for other cases.
- Those who really don’t care or who don’t even think about it choose between GET and POST on a random basis or always use POST.

With a REST API you expose data as resources that you manipulate through HTTP protocol using the right HTTP verb. The endpoint contains the resource you manipulate.

| Operation                      | RPC (operation)                     | REST (resource)          |
|--------------------------------|-------------------------------------|--------------------------|
| Signup                         | POST /signup                        | POST /persons            |
| Resign                         | POST /resign                        | DELETE /persons/1234     |
| Read a person                  | GET /readPerson?personid=1234       | GET /persons/1234        |
| Read a person’s items list     | GET /readUsersItemsList?userid=1234 | GET /persons/1234/items  |
| Add an item to a person’s list | POST /addItemToUsersItemsList       | POST /persons/1234/items |
| Update an item                 | POST /modifyItem                    | PUT /items/456           |
| Delete an item                 | POST /removeItem?itemId=456         | DELETE /items/456        |

### Design

The design of an RPC API needs the designers to be strict to achieve a consistant API as you do not really have constraints.

Designing a REST API may seem easier when you deal mainly with data.

But even if in some certain case , designing a REST API seems a little harder than an RPC one, it gives you a frame that let you achieve more easily a consistent API.

And in both case you’ll have to deal with naming consistency.

### Predictability and Semantic
With RPC the semantic relies (mostly) on the endpoint and there are no global shared understanding of its meaning. For example, to delete an item you could have:
- GET (or POST) /deleteItem?itemId=456
- GET (or POST) /removeIt?itemId=456
- GET (or POST) /trash?itemId=456

With RPC you rely on your human interpretation of the endpoint’s meaning to understand what it does but you can therefore have a fine human readable description of what is happening when you call this endpoint.

With REST the semantic relies (mostly) on the HTTP verb. The verb’s semantic is globally shared. The only way to delete an item is:
- DELETE /items/456

REST is more predictable than RPC as it relies on the shared semantic of HTTP verbs. You don’t know what happen exactly but you have a general idea of what you do.

### Disadvantage(s): REST
- With REST being focused on exposing data, it might not be a good fit if resources are not naturally organized or accessed in a simple hierarchy. For example, returning all updated records from the past hour matching a particular set of events is not easily expressed as a path. With REST, it is likely to be implemented with a combination of URI path, query parameters, and possibly the request body.
- REST typically relies on a few verbs (GET, POST, PUT, DELETE, and PATCH) which sometimes doesn't fit your use case. For example, moving expired documents to the archive folder might not cleanly fit within these verbs.
- Fetching complicated resources with nested hierarchies requires multiple round trips between the client and server to render single views, e.g. fetching content of a blog entry and the comments on that entry. For mobile applications operating in variable network conditions, these multiple roundtrips are highly undesirable.
- Over time, more fields might be added to an API response and older clients will receive all new data fields, even those that they do not need, as a result, it bloats the payload size and leads to larger latencies.

## Hypermedia-Driven RESTful Web Service
Needs filling in
























































# Security
- Encrypt in transit and at rest.
- Sanitize all user inputs or any input parameters exposed to user to prevent XSS and SQL injection.
- Use parameterized queries to prevent SQL injection.
- Use the principle of least privilege.

### Top 10 Web Application Security Risks
1. **Injection.** Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.
2. **Broken Authentication.** Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users’ identities temporarily or permanently.
3. **Sensitive Data Exposure.** Many web applications and APIs do not properly protect sensitive data, such as financial, healthcare, and PII. Attackers may steal or modify such weakly protected data to conduct credit card fraud, identity theft, or other crimes. Sensitive data may be compromised without extra protection, such as encryption at rest or in transit, and requires special precautions when exchanged with the browser.
4. **XML External Entities (XXE).** Many older or poorly configured XML processors evaluate external entity references within XML documents. External entities can be used to disclose internal files using the file URI handler, internal file shares, internal port scanning, remote code execution, and denial of service attacks.
5. **Broken Access Control.** Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users’ accounts, view sensitive files, modify other users’ data, change access rights, etc.
6. **Security Misconfiguration.** Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched/upgraded in a timely fashion.
7. **Cross-Site Scripting XSS.** XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim’s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.
8. **Insecure Deserialization.** Insecure deserialization often leads to remote code execution. Even if deserialization flaws do not result in remote code execution, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks.
9. **Using Components with Known Vulnerabilities.** Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.
10. **Insufficient Logging & Monitoring.** Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data. Most breach studies show time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring.






















































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

# Topics
- Concurrency. Do you understand threads, deadlock, and starvation? Do you know how to parallelize algorithms? Do you understand consistency and coherence?
Networking. Do you roughly understand IPC and TCP/IP? Do you know the difference between throughput and latency, and when each is the relevant factor?
- Abstraction. You should understand the systems you’re building upon. Do you know roughly how an OS, file system, and database work? Do you know about the various levels of caching in a modern OS?
- Real-World Performance. You should be familiar with the speed of everything your computer can do, including the relative performance of RAM, disk, SSD and your network.
- Estimation. Estimation, especially in the form of a back-of-the-envelope calculation, is important because it helps you narrow down the list of possible solutions to only the ones that are feasible. Then you have only a few prototypes or micro-benchmarks to write.
- Availability and Reliability. Are you thinking about how things can fail, especially in a distributed environment? Do know how to design a system to cope with network failures? Do you understand durability?






































# Raft
Raft is a protocol for implementing distributed consensus.

A node can be in one of three states:
- The Follower state
- The Candidate state
- The leader state

All start as followers.  
If followers don't hear from a leader then they can become a candidate.  
The candidate then requests votes from other nodes.  
Nodes will reply with their vote.  
The candidate becomes the leader if it gets votes from a majority of nodes.  
This process is called Leader Election.

All changes to the system now go through the leader.  
Each change is added as an entry in the node's log.  
This log entry is currently uncommitted so it won't update the node's value.  
To commit the entry the node first replicates it to the follower nodes...
then the leader waits until a majority of nodes have written the entry.  
The entry is now committed on the leader node and the node state is "5".  
The leader then notifies the followers that the entry is committed.  
The cluster has now come to consensus about the system state.  
This process is called Log Replication.

In Raft there are two timeout settings which control elections.
First is the election timeout.
The election timeout is the amount of time a follower waits until becoming a candidate.
The election timeout is randomized to be between 150ms and 300ms.
After the election timeout the follower becomes a candidate and starts a new election term... votes for itself...and sends out Request Vote messages to other nodes.  
If the receiving node hasn't voted yet in this term then it votes for the candidate...
...and the node resets its election timeout.
Once a candidate has a majority of votes it becomes leader.
The leader begins sending out Append Entries messages to its followers.
These messages are sent in intervals specified by the heartbeat timeout.
Followers then respond to each Append Entries message.
This election term will continue until a follower stops receiving heartbeats and becomes a candidate.
Requiring a majority of votes guarantees that only one leader can be elected per term.
If two nodes become candidates at the same time then a split vote can occur.


Once we have a leader elected we need to replicate all changes to our system to all nodes.
This is done by using the same Append Entries message that was used for heartbeats.
First a client sends a change to the leader.
The change is appended to the leader's log...
...then the change is sent to the followers on the next heartbeat.
An entry is committed once a majority of followers acknowledge it...
...and a response is sent to the client.
Now let's send a command to increment the value by "2".
Our system value is now updated to "7".
Raft can even stay consistent in the face of network partitions.

































# Scalable Web Architecture and Distributed Systems
Below are some of the key principles that influence the design of large-scale web systems:

- Availability: The uptime of a website is absolutely critical to the reputation and functionality of many companies. For some of the larger online retail sites, being unavailable for even minutes can result in thousands or millions of dollars in lost revenue, so designing their systems to be constantly available and resilient to failure is both a fundamental business and a technology requirement. High availability in distributed systems requires the careful consideration of redundancy for key components, rapid recovery in the event of partial system failures, and graceful degradation when problems occur.
- Performance: Website performance has become an important consideration for most sites. The speed of a website affects usage and user satisfaction, as well as search engine rankings, a factor that directly correlates to revenue and retention. As a result, creating a system that is optimized for fast responses and low latency is key.
- Reliability: A system needs to be reliable, such that a request for data will consistently return the same data. In the event the data changes or is updated, then that same request should return the new data. Users need to know that if something is written to the system, or stored, it will persist and can be relied on to be in place for future retrieval.
- Scalability: When it comes to any large distributed system, size is just one aspect of scale that needs to be considered. Just as important is the effort required to increase capacity to handle greater amounts of load, commonly referred to as the scalability of the system. Scalability can refer to many different parameters of the system: how much additional traffic can it handle, how easy is it to add more storage capacity, or even how many more transactions can be processed.
- Manageability: Designing a system that is easy to operate is another important consideration. The manageability of the system equates to the scalability of operations: maintenance and updates. Things to consider for manageability are the ease of diagnosing and understanding problems when they occur, ease of making updates or modifications, and how simple the system is to operate. (I.e., does it routinely operate without failure or exceptions?)
- Cost: Cost is an important factor. This obviously can include hardware and software costs, but it is also important to consider other facets needed to deploy and maintain the system. The amount of developer time the system takes to build, the amount of operational effort required to run the system, and even the amount of training required should all be considered. Cost is the total cost of ownership.

Each of these principles provides the basis for decisions in designing a distributed web architecture. However, they also can be at odds with one another, such that achieving one objective comes at the cost of another. 

Investing in scaling before it is needed is generally not a smart business proposition; however, some forethought into the design can save substantial time and resources in the future.

When considering scalable system design, it helps to decouple functionality and think about each part of the system as its own service with a clearly defined interface. In practice, systems designed in this way are said to have a Service-Oriented Architecture (SOA). For these types of systems, each service has its own distinct functional context, and interaction with anything outside of that context takes place through an abstract interface, typically the public-facing API of another service.

Deconstructing a system into a set of complementary services decouples the operation of those pieces from one another. This abstraction helps establish clear relationships between the service, its underlying environment, and the consumers of that service. Creating these clear delineations can help isolate problems, but also allows each piece to scale independently of one another. This sort of service-oriented design for systems is very similar to object-oriented design for programming.

IF you're going to have a big unbalance of reads and writes (especially if your writes are heavy meaning that you'll block your reads), then it's a good idea to split out the read and write service.

A key part of service redundancy is creating a shared-nothing architecture. With this architecture, each node is able to operate independently of one another and there is no central "brain" managing state or coordinating activities for the other nodes. This helps a lot with scalability since new nodes can be added without special conditions or knowledge. However, and most importantly, there is no single point of failure in these systems, so they are much more resilient to failure.

There are challenges distributing data or functionality across multiple servers. One of the key issues is data locality; in distributed systems the closer the data to the operation or point of computation, the better the performance of the system. Therefore it is potentially problematic to have data spread across multiple servers, as any time it is needed it may not be local, forcing the servers to perform a costly fetch of the required information across the network.

## Proxies
At a basic level, a proxy server is an intermediate piece of hardware/software that receives requests from clients and relays them to the backend origin servers. Typically, proxies are used to filter requests, log requests, or sometimes transform requests (by adding/removing headers, encrypting/decrypting, or compression).

It is worth noting that you can use proxies and caches together, but generally it is best to put the cache in front of the proxy, for the same reason that it is best to let the faster runners start first in a crowded marathon race. This is because the cache is serving data from memory, it is very fast, and it doesn't mind multiple requests for the same result. But if the cache was located on the other side of the proxy server, then there would be additional latency with every request before the cache, and this could hinder performance.

Proxies are also immensely helpful when coordinating requests from multiple servers, providing opportunities to optimize request traffic from a system-wide perspective. One way to use a proxy to speed up data access is to collapse the same (or similar) requests together into one request, and then return the single result to the requesting clients. This is known as collapsed forwarding.

What are intermediate indexes and inverse indexes?

## Load Balancers

Like proxies, some load balancers can also route a request differently depending on the type of request it is. (Technically these are also known as reverse proxies.)

If a system only has a couple of a nodes, systems like round robin DNS may make more sense since load balancers can be expensive and add an unneeded layer of complexity. Of course in larger systems there are all sorts of different scheduling and load-balancing algorithms, including simple ones like random choice or round robin, and more sophisticated mechanisms that take things like utilization and capacity into consideration. All of these algorithms allow traffic and requests to be distributed, and can provide helpful reliability tools like automatic failover, or automatic removal of a bad node (such as when it becomes unresponsive). However, these advanced features can make problem diagnosis cumbersome. For example, when it comes to high load situations, load balancers will remove nodes that may be slow or timing out (because of too many requests), but that only exacerbates the situation for the other nodes. In these cases extensive monitoring is important, because overall system traffic and throughput may look like it is decreasing (since the nodes are serving less requests) but the individual nodes are becoming maxed out.

## Queues
In the cases where writes, or any task for that matter, may take a long time, achieving performance and availability requires building asynchrony into the system; a common way to do that is with queues.





















# Fallacies of Distributed Computing Explained

The 8 fallacies of distributed computing:
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous. 

















































# Scalable System Design Patterns

## Load Balancer
![Load Balancer](http://1.bp.blogspot.com/_j6mB7TMmJJY/TLnj_mWL50I/AAAAAAAAAgg/JFPsfGcAenI/s400/p1.png)

## Scatter and Gather
the dispatcher multicast the request to all workers of the pool. Each worker will compute a local result and send it back to the dispatcher, who will consolidate them into a single response and then send back to the client. Used in search engines.
![Scatter and Gather](http://2.bp.blogspot.com/_j6mB7TMmJJY/TLlDyOK60HI/AAAAAAAAAfI/JreI7fqvohA/s400/P2.png)

## Result Cache
![Result Cache](http://4.bp.blogspot.com/_j6mB7TMmJJY/TLlEpBawVMI/AAAAAAAAAfQ/Jp8vbVYnF0s/s400/P3.png)

## Shared Space
This model also known as "Blackboard"; all workers monitors information from the shared space and contributes partial knowledge back to the blackboard. The information is continuously enriched until a solution is reached.
![Shared Space](http://3.bp.blogspot.com/_j6mB7TMmJJY/TLlFf-b8lPI/AAAAAAAAAfY/Poy8V0eH1gA/s1600/P4.png)

## Pipe and Filter
This model is also known as "Data Flow Programming"; all workers connected by pipes where data is flow across.
![Pipe and Filter
](http://4.bp.blogspot.com/_j6mB7TMmJJY/TLlGIM4IDiI/AAAAAAAAAfg/nQgVADmUl5w/s1600/P5.png)

## Map Reduce
The model is targeting batch jobs where disk I/O is the major bottleneck. It use a distributed file system so that disk I/O can be done in parallel.
![Map Reduce](http://3.bp.blogspot.com/_j6mB7TMmJJY/TLlHPyMkTII/AAAAAAAAAf4/McnK_GGkYpw/s1600/P7.png)

## Bulk Synchronous Parellel
This model is based on lock-step execution across all workers, coordinated by a master. Each worker repeat the following steps until the exit condition is reached, when there is no more active workers.
1. Each worker read data from input queue
2. Each worker perform local processing based on the read data
3. Each worker push local result along its direct connection
![](http://4.bp.blogspot.com/_j6mB7TMmJJY/TLnhYZH7PTI/AAAAAAAAAgY/YHy5K8H6hZA/s1600/P8.png)

## Execution Orchestrator
This model is based on an intelligent scheduler / orchestrator to schedule ready-to-run tasks (based on a dependency graph) across a clusters of dumb workers.
![Execution Orchestrator](http://3.bp.blogspot.com/_j6mB7TMmJJY/TLlH_a9WOMI/AAAAAAAAAgI/41l0bvV3fkE/s1600/P8.png)














# Lessons from YouTube
- Tao of YouTube: choose the simplest solution possible with the loosest guarantees that are practical. The reason you want all these things is you need flexibility to solve problems. The minute you over specify something you paint yourself into a corner. You aren’t going to make those guarantees. Your problem becomes automatically more complex when you try and make all those guarantees. You leave yourself no way out.
- That whole process is what scalability is about. A scalable system is one that’s not in your way. That you are unaware of. It’s not buzz words. It’s a general problem solving ethos.
- Hallmark of big system design: Every system is tailored to its specific requirements. Everything depends on the specifics of what you are building.
YouTube is not asynchronous, everything is blocking.
- Believes more in philosophy than doctrine. Make it simple. What does that mean? You’ll know when you see it. If you do code review that changes thousands of lines of code and many files then there was probably a simpler way. Your first demo should be simple, then iterate.
- To solve a problem: One word - simple. Look for the most simple thing that will address the problem space. There are lots of complex problems, but the first solution doesn’t need to be complicated. The complexity will come naturally over time.
- A lot of YouTube systems start as one Python file and become large ecosystems after many many years. All their prototype were written in Python and survived for a surprising amount of time.
- In a design review:
    - What’s the first solution?
    - How are you going to iterate?
    - What do we know about how this data is going to be used?
- Things change over time. How YouTube started out has no bearing on what happens later. YouTube started out as a dating site. If they had designed for that they would have different conversation. Stay flexible.
- YouTube CDN. Originally contracted it out. Was very expensive so they did it themselves. You can build a pretty good video CDN if you have a good hardware dude. You build a very large rack, stick machines in, then take lighttpd, and then override the 404 handler to find the video that you didn’t find. That took two weeks and it’s first day served 60 gigabits. You can do a lot with really simple tools.
- You have to measure. Vitess swapped out one its protocols for an HTTP implementation. Even though it was in C it was slow. So they ripped out HTTP and did a direct socket call using python and that was 8% cheaper on global CPU. The enveloping for HTTP is really expensive.














## It's All A Numbers Game

Start with domain - DDD, hexagonal design, etc.

Performance tests and profiling is really important:
- component performance tests
- production monitoring
- common performance test mistakes
- theory of constraints
- Drives the economics of a development.

Tests need to model realistic scenarios
- model based on production

Should look at cache oblivious algorithms.

Unbounded queries are very bad. Deal in chinks.

Don't have a single database, a single load balancer that everything goes to, or you'll get contention points, large queues. locking.




Image by <a href="https://pixabay.com/users/jamesmarkosborne-1640589/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1076536">James Osborne</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1076536">Pixabay</a>
