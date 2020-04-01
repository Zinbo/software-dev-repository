---
path: "/testing"
cover: "./testing.jpg"
title: "Testing"
published: true
---


# Testing

Some people don't agree with Test Driven Development - puts too much enphasis on unit testing and not enough on integration testing/system testing.

Don't mix test code and production - should avoid having ability to run "test mode", should be externalised if possible.

Integration tests should not contribute to code coverage

We should write tests before fixing bugs.

Need notes on microservices testing

It's important to have tests that ensure external systems are available and working correctly but these tests should not be the same as the tests which verify thast code is working as expected.

External systems should be tested independently and monitored with appropriate hardware and/or device monitoring systems.

Where are integration tests on the microservice testing pyramid?

There are however occasions where having a fully working copy of a production system in a controlled environment can be of great benefit and where mocking dependencies is not an appropriate solution.

https://martinfowler.com/articles/practical-test-pyramid.html
https://www.gocd.org/2018/05/08/continuous-delivery-microservices-test-strategy/

final and static methods are often unmockable (however PowerMock does allow them to be mocked, but this might not be available on Android).

Using new can be problematic as we can't mock this. Using factories instead can be better, where we can mock the factory and call .create() to create the object.
```java
private EmailerFactory factory;

public void doSomethingWithFactory(boolean someValue) {

    Emailer emailer = factory.create(); // <== Mockable

    if(someValue) {
        emailer.sendConfirmationEmail();
    }
    else {
        emailer.sendErrorEmail();
    }
}
```

 Another way of doing this is to use `new` in a private method and use something like PowerMock to mock this.
```java
public void doSomething(boolean someValue) {

    Emailer emailer = newEmailer(); // <== Mockable

    if(someValue) {
        emailer.sendConfirmationEmail();
    }
    else {
        emailer.sendErrorEmail();
    }
}

// Mockable
protected Emailer newEmailer() {
    return new Emailer();
}
```

We CAN use spies to check the internal workings of a class, but we should be hesitant to do this, as it may be a code smell (need to use reflection, brittle).

PowerMock

jMocker?

## Practical Test Pyramid
Continuous delivery is a practice where you automatically ensure that your software can be released into produiction any time. YOu use a build pipeline to automatically test your software ande dpeloy it to your testing and production envirnoments.

Mike Cohn's original test pyramid had three layers:
1. Unit Tests
2. Service Tests
3. User Interface Tests

What we should take from this is:
Write lots of small and fast unit tests. Write some more coarse-grained tests and very few high-levle tests that test your application from end to end.

### Unit Tests
Solitary unit tests = stub all collaborators  
Social unit tests = talk to real collaborators.

Unit tests should ensure that all your non-trivial code paths are tests, but at the same time they shouldn't be tied to your implementation too closely. If they break as soon as you refactor then you lose one big benefit of unit tests: acting as a safety net for code changes. Don't reflect your internal code structure within your unit tests. Test for observable behaviour instead.

If you really need to test a private method it's most liekly a design problem rather than a scoping problem. Most likely the class you're testing is too complexy and violates the SRP. The solution that often works is to split the class in two.

We should follow arrange, act, assert.

MockMVC gives a nice DSL you can use to fire fake requests against your spring controllers. @WebMvcTest is part of that.

### Integration Tests
Integration tests should test the integration of your application with all the parts that live outside your application.

For some people, integration testing means to test through the entire stack of your application connected to other apps within your system. Martin Fowler prefers to treat integration testing more narrowly and test on one integration point at a time by replacing separate services and database with test doubles. Together with contract testing and running contract tests against test doubles as well as the real implementations you can come up with integration tests that are faster, more independent and usually easier to reason about.

Narrow integration tests live at the boundary of your services. An example would be a databse integration test.  Start the db and execute a function that tests this.

For testing a separate servie via a REST API:
1. start your app
2. start an instnace of the separate service or a test double with the same interface.
3. trigger a function within your code that reads from the separate service's API
4. Check that your app can parse the response correctly.

Write integration tests for all pieces of code where you can either serialise or deserialise data.

When writing narrow integration tests you should aim to run yoour external dependencies locally: spin up a local MySQL database, test against a local ext4 filesystem. If you'rte integrating with a separate service either run an instance of that service locally or build and run a fake versiopn that mimics the behaviour of the real service.

If there's no way to run a third-party service locally you should opt for running a dedicated test instance and point at this test instance when running your integration tests.

We should use tools like wiremock to mock out services like darksky, so we don't call the real service.

Running contract tests against the fake and the real server ensures that the fake we use in our integration tests is a faithful test double. 

### Contract Tests
Automated ocntract tests make sure that the implementations on the consumer and provider side still stick to the define contract. Consumer-Driven Contact tests (CDC tests) let the consumers drive the implementation of a contract. Using CDC, consumers of an interface write tests that check the interface for all data they need from that interface. The comsuming team then publishes these tests os that the pbulishing team can fetch and execute these tests easily. The providing team can now develop their API by running the CDC tests. Ince all tests pass they know they have implemented everything the consuming team needs.

If your organisation adopts a microservices approach, having CDC tests is a big step towards establishing autonomous teams. CDC tests are an automated way to foster team communication. 

Pact is a good approach of writing tests for the consumer and the provider side, gives you stubs for separate services out fo the box and allows you to exchange CDC tests with other teams..

### UI Tests
These can just be unit tests for UI, not end to end tests.

### End to End Tests
Testing your deployed application via its user interface is the most end-to-end way you could test your application. The previously described, webdriver driven UI tests are a good example of end-to-end tests.

End to end tests are also called broad stack tests.

Often they are flaky.

In a microservices world there's also the big question of who's in charge of writing these tests. Since they span multiple services (your entire system) there's no single team responsible for writing end-to-end tests.

Due to their high maintenance cost you should aim to reduce the number of end-to-end tests to a bare minimum.

Think about the high value interactions users will have with your application. Try to come up with user journeys that define the core value of your produce and translate the most important steps of these user journeys into automated end-to-end tests.

Avoid a graphical user interface whne testign your application can be a good idea to come up with tests that are less flakey than full end-to-end tests while still covering a broad part of your application's stack. This can come in handy when testing through the web interface of your application is particularly hard. Maybe you don't evne havea web UI but serve a REST API instead. 

These are called Subcutaneous tests. This means a test that operates just under the UI of an application. This is particularly valuable when doing functional testing of an application: when you want to test end-to-end behaviour, but its difficult to test through the UI itself.

Subcutaneous testing can avoid difficulties with hard-to-test presentation technologies and usually is much fsater than testing through the UI. The big danger is that, unless you are a firm follower of keeping all useful logic out of your UI< subcutaneous testing will leave important behaviour out of its test.

REST-assured can be agood library for writing these kind of tests.

### Acceptance tests
Make sure your software works correctly from a user's perspective, not just from a technical perspective.

Functional and acceptance tests are the same thing.

Cna come in different levels of granularity. Write them at the lowest level you can. Acceptance testing is orthogonal to your test pyramid

### Exploratory Testing
Take some time on a regular schedule to try and break your app.

### The Confusion About Testing Terminology
Don't get hung up on terminology, means something different to every team, no consensus.

### Putting Tests Into Your Deployment Pipeline
A good build pipeline tells you that you messed up as quick as possible. Put fast running tests first in your pipeline. Defining the stages of your deployment pipeline is not driven by the types of tests but rather by their speed and scope. 

Where to put longer running integration tests in pipeline?

### Avoid Test Duplication
Keep two rules of thumb in mind:
1. If a higher level test spots an error and there's no lower-level test failing, you need to write a lower-level test
2. Push your tests as far down the test pyramind as you can.

If a higher-level test gives you more confidence that your application works correctly, you should have it. Writing a unit test for a Controller class helps to test the logic within the Controller itself. Still, this won't tell you whether the REST endpoint this Controller provides actually responds to HTTP requests. So you move up the test pyramid and add a test that checks for exactly that - but nothing more. You don't test all the conditional logic and edge cases that tyour lower-level tests already cover in the higher-level test again. Make sure that the higher-level test focuses on the part that the lower-level tests couldn't cover.

### Write clean test code
- test one condition per test.
- Readability matters. Don't try to be overly DRY. Duplication is okay if it improves readability. Try to find a balance between DRY and DAMP code.
- When it doubt use the role of three to decide when to refactor. 

https://blog.codinghorror.com/rule-of-three


## Microservices testing strategy

Have a pyramid of:
- Exploratory
- End to end
- Component
- Integration
- Unit

### Unit
"A unit test exercises the smallest piece of testable software in the application to determine whether it behaves as expected."

A unit test can be broken down into two different types:
- Sociable unit testing: Focusses on testing the behaviour of modules by observing changes in their state. This treats the unit under test as a black box entirely through its interface.
- Solitary unit testing: looks at the interactions and collaborations between an object and its dependencies, which are replaced by test doubles.

Our domain layrer tends to use sociable unit testing, as we use real domain/value objects in testing. If a domain object ahs a lot of logic (e.g. does lots of chyecks in the constructor) and it makes it difficult to use in a unit test then we should mock it. Use your judgement!

#### Examples
back end: query_withANullContactId_returnsAnEmptyOptionalContact (tests a single function with any dependencies mocked)
front end: getContactFromDataService_withValidId_returnsContactObject (tests a single function in a service with any dependencies and external boundaries mocked).

### Integration
"An integration test verifies the communication paths and interactions between components to detect interface defects."
Integration tests collect modules trogether and test them as a subsystem in order to verify that they collaborate as intended.

In microservices, these tests typically are used to verify interactions between layers of integration code and extenral components. When we are testing interacting with external components the goal is to verify that the module can communicate sufficiently rather than to acceptance test the external component.

Examples of the kinds of external components against which such integration tests can be useful include other microservices, data stores, and caches. Stubbing out the other services over HTTP can easily be done using wiremock. If we CAN use real services we should, e.g. databases, file systems, etc. However these may need to be out of the CI build pipeline.

#### Examples
back end: getAllContactsByFirstName_withFirstNameShane_returnsAllContactsWithNameShane (calls custom query against the database)
back end: updateCompany_withValidCompany_updatesCompanyAndTeam (calls function which wires in multiple functions and the repository with mocked external boundaries)
front end: viewContacts_withAssistantKerberos_addsBankersContactsToScope (calls method on controller, which wires in real implementation of services with mocked external boundaries).

### Component
"A component test limites the scope of the exercised software to a portion of the system under test, manipulating the system through internal code interfaces and using test doubles to isolate the code under test from other components."

In microservices the components are the services themselves. Here we are testing the contact of the API from the perspective of a consumer. Isolation of the service is achieved by replacing external collaborators with test doubles.

Component tests are split into two types:
- In-process: The tesets execute in the same process as the service.
- Out-of-process: the tests execute against the microservice deployed as a separate services, where the test harness

Out-of-process tests are good because they test the system completely as a black box, however they are more expernsive. We should favour in-process tests over out-of-process tests.

#### Examples
back end: addContact_withContactWithEmailAddress+addsContactToDatabase (in-process, cal call resource directly)
back end: editContact_withRemovedMandatoryFields_returnsBadRequest(prefer in-process if possible)
back end: getCompany_withNonnumericEntityQueryParam_returnsBadRequest (should be out-of-process)
front end: addContact_withValidCOntact_appearsInGridAfterRefresh (out-of-process, UI test clicks buttons and looks at the elements in the grid)

### End to end
"An end-to-end test verifies that a system meets external requirements and achieves its goals, testing the entire system, from end to end."

The intetion of end-to-end tests is to verify that the system as a whole meets business goals irrespective of the component architecture it uses. They provide value by adding coverage of the gaps between microservices. End-to-end tests also allow a microservice architectue to evolve over time. As more is learnt about the problem domain, services are likely to split or merge and end-to-end tests give confidence that the business functions provided by the system remain inteact during such large scale architectural refactorings.

One of the problem with end-to-end tests ithe amount of time they take to run. One solution is this:

"One strategy that works well in keeping an end-to-end test suite small is to apply a time budget, an amount of time the team is happy to wait for the test suite to run. As the suite grows, if the run time begins to exceed the time budget, the least valuable tests are deleted to keep within the the alloted time. The time budget should be of the ordfer of minutes, not hours."

One thng we can do instead to reduce our tests is to focus on user journeys for personas, rather than adding an end-to-end test for every story:

"To ensure all tests in an end-to-end suite are valuable, model them around personas of users of the system and the journeys those users make through the system. This provides confidence in the parts othe system the users vlaue the most and leaves coverage of anything else to other types of testing."

#### Examples (for user journeys)
giveIAddAContact_whenTheGridRefreshes_thenICanSeeThemInTheGrid
givenIAddAContact_whenISearchForTheContact_thenICanSeeTheirProfilePage
givenIAddAContact_whenIGoToSubscribeMyCOntactsToTMTWeekly_thenICanSuccessfullySubscribeMyNewContact
givenIAddAContactAsAnAssistant_whenIChangeMyViewToLookAtMyOtherBankersCOntacts_thenICannotSeeTheNewContact

### Exploratory
"Manually exploring the system in ways that haven't been considered as part of the scripted tests. Exploratory testing allows the team to learn about the system and to educate and improve their automated tests."

Exploratory testing is something which is done manually with no real plan in place. The tester will go in and explore the system, using their skill and creativity to find bugs.

#### Examples
I'll try adding a contact, deleting the company ,adding a new company ,searching for the new contact and see if the new details appear on the profile page  
I'll try hitting the favourite button 5 times really fast and see if it breaks the system   
I'll try adding a contact before the grid is loaded   
I'll try adding 2000 contacts and see if the system can handle it.  

### Acceptance/Business Facing Test
"A business-facing test is a test that's intended to be used as an aid to communicating with the non-progeramming members of a development team such as custmer,s users, business analysts and the like."

An acceptance test checks that the functionality that you have written apsses a criterion. You'll notice that acceptance testing is not 8in the pyramid, that is becuase an acceptance criteria can be in any of the layers. For example, if you're implementing a small feature, e.,g. addModifiedDate to a DTO your acceptance criteria could be satidsified with just a unit test.

Martin Fowler talks about how acceptance tests are commonly implemented as BoradStackTests (meaning end-to-end tests) but these are often slower (and shouldn't have too many tests as this will break the testing pyramid_. A better idea is to implement thee as component tests since these result in easier maintenance and faster execution.

#### Examples
givenIAddAContactAsAnAssistant_whenIChangeMyViewTOLookAtMyOtherBankersContacts_thenICannotSeeTheNewContact (can do this as a UI test)
givenIAddAJapaneeContact_whenIAmNotAJapaneseBanker_thenIAmNotAllowedToAddTheContact (this can be a component test on the contacts data service)

## Mutation Testing
the process of intentially injecting faults (mutants) into your code, then your tests are run. If your test fail then the mutation is killed (good becaue your test successfullly found the fault), if your tests pass then the mutation lived (bad because the test didjn't find the fault).

As a result  the quality of your tests can be assessed from the percentage of mutations killed.

It is a white box technique.

### White box testing
Structural testing itself measures testing quality based on internal code structure, such as:
- statement coverage
    - A statement is covered if there is at least one test case that executes this statement
    - This operates under the incentive that a fault in a statement can only be revealed by executing the statement
- branch (decision) coverage
    - Builds on top of statement coverage, just becase we cover each statement doesn't mean we cover all branches
    - A branch is covered if there is at least one test case that executes each branch
- condition coverage
    - builds on top of branch coverage, by evaluating combinations of conditionals
    - A condition is covereed if there is at least one test case that evaluates 
- modified condition/decision coverage (MC/DC)
    - requires both condition and decision coverage, but also each boolean sub-expression needs to have been shown to affect the final outcome independently.

Need to continue with this.

Image by <a href="https://pixabay.com/users/tiburi-2851152/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1554745">Tibor Janosi Mozes</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1554745">Pixabay</a>
