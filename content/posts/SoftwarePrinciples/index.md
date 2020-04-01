---
path: "/software-principles"
cover: "./software-principles.jpg"
title: "Software Principles"
published: true
---

# Design Patterns
- Creational
- Structural
- Behavioural

## Creational

### Singleton
Most used

Only one instance creatred

gurantees control of a resource

lazily loaded

examples:
- runtime
- Spring Beans
- Logger
- Graphics Managers

It is static in nature but not a static class - not thread safe in nature (why is that?).

No parameters required for constructor.

If we want our singleton to be lazily loaded, we should instantiate our private singleton in our getInstance() methhod.

To make our singleton thread safe we can do:
```java
public class DbSingleton {
    private static volatile DbSingleton instance = null;

    private DbSingleton() {
        // protect against reflection class instantiating this.
        if(instance != null) throw new RuntimeException("Use get instance method");
    }

    public static DbSingleton getInstance() {
        if(instance == null) {
            instance = new DbSIngleton();
        } 

        return instance;
    }
}
```
This will ensure that this instance will remain a singleton through any of the changes inside the JVM.

You don't want to make getInstance synchronized as it slows down whole method.

we also need double lock
```java
public static DbSingleton getInstance() {
        if(instance == null) {
            synchronized(DbSingleton.class) {
                if(instance == null) instance = new DbSIngleton();
            }
        } 

        return instance;
    }
```

What does volatile do?

If you want to have a dbSingleton where you instantiate a driver and provide a connection you can instantiate the drive on the getInstance method and then provide a non-static method for getting a connection, but the connection is also a singleton. It makes the code more readable.
```java
public static void main(String[] args) {
    DbSingleton singleton = DbSingleton.getInstance();
    Connection connection = singleton.getConnection();
}
```


Pitfalls:
- often overused
- difficult to unit test
    - people will use them in their code as hard-coded dependencies
        - you can't pass them into the constructor really, as there is no instance yet.
- they decrease performance - if we havea number of lazily initialised singletons, the compilre cannot fold multiple SingleDemo.getInstance() calls into one. This is because each call to getInstance() will cause a branch instruction and possibly a cache mismatch.
- they promote tight coupling between classes. They tightly couple the code to the exact object type and remove the scope of polymorphism.
- if not careful, they are not thread safe
- Sometimes confused for a factory - if the getInstance method needs a parameter, it is no longer a singleton.

Singleton
- return same instance
    - one constructor method - no args
- no interface

Factory
- returns various instances
    - multiple constructors
- interface driven
- adaptable to environment more easily

(put this in a table).

### Builder
Good for constructing objects which have a lot of parameters or we want them to be immutable when we've constructed them.  

Examples are:
- StringBuilder
- DocumentBuilder

Creating constructors for different use cases is called telescoping constructors - builder pattern helps solve this.

How to force builder pattern to have manadatory fields?

Example of builder
```java
public class LunchOrder {

	public static class Builder {
		private String bread;
		private String condiments;
		private String dressing;
		private String meat;
		
		public Builder() {
			
		}
		
		public LunchOrder build() {
			return new LunchOrder(this);
		}
		
		public Builder bread(String bread) {
			this.bread = bread;
			return this;
		}
		
		public Builder condiments(String condiments) {
			this.condiments = condiments;
			return this;
		}
		
		public Builder dressing(String dressing) {
			this.dressing = dressing;
			return this;
		}
		
		public Builder meat(String meat) {
			this.meat = meat;
			return this;
		} 
		
	}
	
	private final String bread;
	private final String condiments;
	private final String dressing;
	private final String meat;

	private LunchOrder(Builder builder) {
		this.bread = builder.bread;
		this.condiments = builder.condiments;
		this.dressing = builder.dressing;
		this.meat = builder.meat;
	}

	public String getBread() {
		return bread;
	}

	public String getCondiments() {
		return condiments;
	}
	
	public String getDressing() {
		return dressing;
	}
	
	public String getMeat() {
		return meat;
	}
	
}
```

if you don't want to put it in the same class you can refactor to add it into a seperate class.

Can negate the anti-pattern of exposing setters for every parameter we pass in.

#### Comparison
Builder
- Handles complex constructors
- no interface required
- can be a seperate class
- works with legacy code

Prototype:
- implemented around a clone
- avoids calling complex constructors
- difficult to implement in legacy code

### Prototype
USed when the object creation is costly, but you have a similar object already existing.

Provides a mechanism to copy the original object to a new object and then modify it according to our needs.

There are 3 parts:
- Prototype: This is the prototype of actual object
- Prototype registry: This is used as a registry service to have all prototypes accessible using simple string parameters.
- Client: Client will be responsible for using registry service to access prototype instances.

It is good for when instances of a class can have one of only a few different combinations of state. It may be more convenient to install a corresponding number of prototypes and clone them rather than instantiating the class manually each time with the appropriate state.

We don't have to use the registry, but it is good if we havea pre-defined set of objects to clone from. 

Example:
```java
public abstract class Item implements Cloneable {
	private String title;
	private double price;
	private String url;
	
	@Override
	protected Object clone() throws CloneNotSupportedException {
		return super.clone();
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
}

public class Book extends Item {

	private int numberOfPages;

	public int getNumberOfPages() {
		return numberOfPages;
	}

	public void setNumberOfPages(int numberOfPages) {
		this.numberOfPages = numberOfPages;
	}
}

public class Movie extends Item {

	private String runtime;

	public String getRuntime() {
		return runtime;
	}

	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}
	
}

public class Registry {

	private Map<String, Item> items = new HashMap<String, Item>();
	
	public Registry() {
		loadItems();
	}
	
	public Item createItem (String type) {
		Item item = null;
		
		try {
			item = (Item)(items.get(type)).clone();
		}
		catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		
		return item;
	}
	
	private void loadItems() {
		Movie movie = new Movie();
		movie.setTitle("Basic Movie");
		movie.setPrice(24.99);
		movie.setRuntime("2 hours");
		items.put("Movie", movie);
		
		Book book = new Book();
		book.setNumberOfPages(335);
		book.setPrice(19.99);
		book.setTitle("Basic Book");
		items.put("Book", book);
	}
}

public class PrototypeDemo {

	public static void main(String[] args) {
		Registry registry = new Registry();
		Movie movie = (Movie) registry.createItem("Movie");
		movie.setTitle("Creational Patterns in Java");
		
		System.out.println(movie);
		System.out.println(movie.getRuntime());
		System.out.println(movie.getTitle());
		System.out.println(movie.getUrl());
		
		Movie anotherMovie = (Movie) registry.createItem("Movie");
		anotherMovie.setTitle("Gang of Four");
		
		System.out.println(anotherMovie);
		System.out.println(anotherMovie.getRuntime());
		System.out.println(anotherMovie.getTitle());
		System.out.println(anotherMovie.getUrl());
	}

}
```

#### Comparison
Prototype:
- lighter weight construction
- shallow or deep
- copy of itself

Factory:
- flexible objects based on request
    - mulltiple constructors
- Concrete instance
- Fresh instance
    - don't typically set default params

One issue is shallow vs deep copy - your clone method will be a shallow copy, but you might want a deep copy. You can change your clone method to do a deep copy, but then is the prototype pattern doing much for you?

## Factory
- DOesn't expose instantiation logic
- Defer to subcxlass
- common interface
- SPecified by architecture, implemented by user.
- Examples
    - Calendar
    - ResourceBundle
    - NumberFormat

Create methods are usually parameterised - this is used to determine the concrete type used.

```java
public class AboutPage extends Page {

}

public class CartPage extends Page {

}

public class CommentPage extends Page {

}

public class ContactPage extends Page {

}

public class ItemPage extends Page {

}

public abstract class Page {

}

public abstract class Website {

	protected List<Page> pages = new ArrayList<>();
	
	public List<Page> getPages() {
		return pages;
	}

	public Website() {
		this.createWebsite();
	}
	
	public abstract void createWebsite();
	
}

public class Shop extends Website {

	@Override
	public void createWebsite() {
		pages.add(new CartPage());
		pages.add(new ItemPage());
		pages.add(new SearchPage());
	}

}

public class Blog extends Website {

	@Override
	public void createWebsite() {
		pages.add(new PostPage());
		pages.add(new AboutPage());
		pages.add(new CommentPage());
		pages.add(new ContactPage());
	}

}


public class WebsiteFactory {

	public static Website getWebsite(WebsiteType siteType) {
		switch(siteType) {
			case BLOG : {
				return new Blog();
			}
		
			case SHOP : {
				return new Shop();
			}
			
			default : {
				return null;
			}
 		}
	}
	
}

public enum WebsiteType {

	BLOG,SHOP;
	
}

public class FactoryDemo {

	public static void main(String[] args) {
		Website site = WebsiteFactory.getWebsite(WebsiteType.BLOG);
		
		System.out.println(site.getPages());
		
		site = WebsiteFactory.getWebsite(WebsiteType.SHOP);
		
		System.out.println(site.getPages());
	}

}

```

Consider designing an internal "object pool" that will allow objects to be reused instead of created from scratch.

Abstract Factory classes are often implemented with Factory Methods, but they can be implemented using Prototype.

Factory Method: creation through inheritance. Prototype: creation through delegation.

Often, designs start out using Factory Method (less complicated, more customizable, subclasses proliferate) and evolve toward Abstract Factory, Prototype, or Builder (more flexible, more complex) as the designer discovers where more flexibility is needed.

#### Comparison
Singleton
- Returns same instance
    - one constructor method - no args
- no interface
- no subclass

Factory:
- Returns various instances
    - multiple constructors
- interface driven
- Subclasses
- Adaptable to environment more easily

## Abstract Factory Pattern
Factory of factory
- factory of related objects
- Common interface
- defer to subclass
- Examples:
    - DocumentBuilderFactory
    - Frameworks

One distinction is that the abstract factory method is typically built using composition, which is not the case with a factory.

It also has a paramterised create method. The factory is responsible for the lifecycle.

Imagine you have a family of related products: say chair, sofa, and coffee table. For each of these you also have several designs: Modern, Victorian, ArtDeco. You need a way to create individual furniooture objects so that they match other objects of the same family. 

We can use a, abstract factory pattern here:
```java
public interface FurnitureFactory {
    Chair createChair();
    CoffeeTable createCoffeeTable();
    Sofa createSofa();
}

public class VictoriaFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() {
        return new VictorianChair();
    }

    public createCoffeeTable() {
        return new VictorianCoffeeTable();
    }

    public createSofa() {
        return new VictorianSofa();
    }
}

public class ModernFurnitureFactory implements FurnitureFactory {
    // Implement methods like above
}

public class ArtDecoFurnitureFactory implements FurnitureFactory {
    // Implement methods like above
}
```

Usually, the application creates a concrete factory object at the initialization stage. 

#### Advantages/Disadvantages
- You can be sure that the products you’re getting from a factory are compatible with each other.
- You avoid tight coupling between concrete products and client code.
- Single Responsibility Principle. You can extract the product creation code into one place, making the code easier to support.
- Open/Closed Principle. You can introduce new variants of products without breaking existing client code.

- The code may become more complicated than it should be, since a lot of new interfaces and classes are introduced along with the pattern.

## Structural Patterns
Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

### Adapter
Is a structural design pattern that allows objects with incompatible interfaces to collaborate.

Adapters can not only convert data into various formats but can also help objects with different interfaces collaborate. Here’s how it works:
1. The adapter gets an interface, compatible with one of the existing objects.
2. Using this interface, the existing object can safely call the adapter’s methods.
3. Upon receiving a call, the adapter passes the request to the second object, but in a format and order that the second object expects.


By using an interface for the client code (which the adapter implements), we can swap out adapters later. The adapter wraps the incompatible service, and calls its methods after translating the data.

You can also use this pattern when you want to reuse several existing subclasses that lack some common functionality that can't be added to the superclass.

#### Advantages/Disadvantages
- Single Responsibility Principle. You can separate the interface or data conversion code from the primary business logic of the program.
- Open/Closed Principle. You can introduce new types of adapters into the program without breaking the existing client code, as long as they work with the adapters through the client interface.

- The overall complexity of the code increases because you need to introduce a set of new interfaces and classes. Sometimes it’s simpler just to change the service class so that it matches the rest of your code.

### Bridge
Lets you split a large class or a set of closely related classes into two separate hierarchies — abstraction and implementation — which can be developed independently of each other.

An example of where this is useful is the following:  
Say you have a geometric Shape class with a pair of subclasses: Circle and Square. You want to extend this class hierarchy to incorporate colors, so you plan to create Red and Blue shape subclasses. However, since you already have two subclasses, you’ll need to create four class combinations such as BlueCircle and RedSquare. Adding new shape types and colors to the hierarchy will grow it exponentially. This problem occurs because we’re trying to extend the shape classes in two independent dimensions: by form and by color.

The Bridge pattern attempts to solve this problem by switching from inheritance to the object composition. What this means is that you extract one of the dimensions into a separate class hierarchy, so that the original classes will reference an object of the new hierarchy, instead of having all of its state and behaviors within one class.

So Shape will have Circle and Square subclasses, and Colour will have blue and Red subclasses, and Shape will contain a Colour

![pattern](https://refactoring.guru/images/patterns/diagrams/bridge/structure-en-indexed.png)

When:
- Use the Bridge pattern when you want to divide and organize a monolithic class that has several variants of some functionality.
- Use the pattern when you need to extend a class in several orthogonal (independent) dimensions.

#### Advantages/Disadvantages
- You can create platform-independent classes and apps.
- The client code works with high-level abstractions. It isn’t exposed to the platform details.
- Open/Closed Principle. You can introduce new abstractions and implementations independently from each other.
- Single Responsibility Principle. You can focus on high-level logic in the abstraction and on platform details in the implementation.

- You might make the code more complicated by applying the pattern to a highly cohesive class.

### Composite
lets you compose objects into tree structures and then work with these structures as if they were individual objects.

Using the Composite pattern makes sense only when the core model of your app can be represented as a tree.

As example, say you wanted to calculate the total price of this order:
![total price](https://refactoring.guru/images/patterns/diagrams/composite/problem-en.png)

The Composite pattern suggests that you work with Products and Boxes through a common interface which declares a method for calculating the total price. A product would return its price, a box would go over each item in the box and ask its price, and return the total price for the box.

![composite](https://refactoring.guru/images/patterns/diagrams/composite/structure-en-indexed.png)

#### Advantages/Disadvantages
- You can work with complex tree structures more conveniently: use polymorphism and recursion to your advantage.
- Open/Closed Principle. You can introduce new element types into the app without breaking the existing code, which now works with the object tree.

- It might be difficult to provide a common interface for classes whose functionality differs too much. In certain scenarios, you’d need to overgeneralize the component interface, making it harder to comprehend.

### Decorator
lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

An exmaple of this is when you have a Notifier class which you want to extend to be abel to send out SMS, Facebook, Slack, and others. A natural idea is to have these as subclasses of the Notifier class. However you may also want to send out SMS and Facebook. In that case you would need another subclass which is FacebookAndSlack, etc.
![badDecorator](https://refactoring.guru/images/patterns/diagrams/decorator/problem3.png)

The idea is that inheritance is bad and aggregation or composition is better.

Wrapper is the alternative nickname for the Decorator pattern. The difference is that a Decorate allows you to wrap an object in multiple wrappers, adding the combined behaviour of all the wrappers to it.

When you go to call your send method, you need to unwrap all of your decorators.

![decorator](https://refactoring.guru/images/patterns/diagrams/decorator/solution2.png)

The client code would then need to wrap the basic notifier object int oa set of decorators that match the client's preferences. The resulting objects will be structured like a stack. 
![decorator code](https://refactoring.guru/images/patterns/diagrams/decorator/solution3.png)

The structure of the pattern is like this:
![decorator structure](https://refactoring.guru/images/patterns/diagrams/decorator/structure-indexed.png)


#### Advantages/Disadvantages
- You can extend an object’s behavior without making a new subclass.
- You can add or remove responsibilities from an object at runtime.
- You can combine several behaviors by wrapping an object into multiple decorators.
- Single Responsibility Principle. You can divide a monolithic class that implements many possible variants of behavior into several smaller classes.

- It’s hard to remove a specific wrapper from the wrappers stack.
- It’s hard to implement a decorator in such a way that its behavior doesn’t depend on the order in the decorators stack.
- The initial configuration code of layers might look pretty ugly.

### Facade
provides a simplified interface to a library, a framework, or any other complex set of classes.

A facade might provide limited functionality in comparison to working with the subsystem directly. However, it includes only those features that clients really care about.

Having a facade is handy when you need to integrate your app with a sophisticated library that has dozens of features, but you just need a tiny bit of its functionality.

An example would be a video converter:
![Video Converter](https://refactoring.guru/images/patterns/diagrams/facade/example.png)

Here is the sturcture:
![Facade](https://refactoring.guru/images/patterns/diagrams/facade/structure-indexed.png)

Use the Facade when you want to structure a subsystem into layers.

#### Advantages/Disadvantages
- You can isolate your code from the complexity of a subsystem.

- A facade can become a god object coupled to all classes of an app.

### Flyweight
lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.

Used in video games for things like particle physics for bullets.

![game example](https://refactoring.guru/images/patterns/diagrams/flyweight/problem-en.png)

In this example, we can move colour and sprite to an immutable class, and share that:
![flyweight example](https://refactoring.guru/images/patterns/diagrams/flyweight/solution1-en.png)
![flyweight example 2](https://refactoring.guru/images/patterns/diagrams/flyweight/solution3-en.png)

The constant data of an object is usually called the intrinsic state. It lives within the object; other objects can only read it, not change it. The rest of the object's state, often altered "from the outside" by other objects, is called the extrinsic state.

An object which stores the intrinsic state is called a flyweight.

For more convenient access to various flyweights, you can create a factory method that manages a pool of existing flyweight objects. The method accepts the intrinsic state of the desired flyweight from a client, looks for an existing flyweight object matching this state, and returns it if it was found. If not, it creates a new flyweight and adds it to the pool. There are several options where this method could be placed. The most obvious place is a flyweight container. Alternatively, you could create a new factory class. Or you could make the factory method static and put it inside an actual flyweight class.

![Flyweight Structure](https://refactoring.guru/images/patterns/diagrams/flyweight/structure-indexed.png)

#### Advantages/Disadvantages
- You can save lots of RAM, assuming your program has tons of similar objects.

- You might be trading RAM over CPU cycles when some of the context data needs to be recalculated each time somebody calls a flyweight method.
- The code becomes much more complicated. New team members will always be wondering why the state of an entity was separated in such a way.

### Proxy
lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

If you want to access a heavy weight object, but only want to do it through lazy initialisation, and you can't change the implementation of the heavy object, then you may want to use a proxy to control access to the object. 

The proxy class should have the same interface as the original service object. If you need to execute something either before or after the primary logic of the class, the proxy lets you do this without changing that class. Since the proxy implements the same interface as the original class, it can be passed to any client that expects a real service object.

![Proxy structure](https://refactoring.guru/images/patterns/diagrams/proxy/structure-indexed.png)

Here is an example:
![Proxy example](https://refactoring.guru/images/patterns/diagrams/proxy/example.png)

When to use a proxy:
- remote proxy - when the service object is located on a remote server. Proxy hides network details.
- Caching proxy - when you need to cache results of client requests
- smart reference - when you need to be able to dismiss a heavyweight object once there are no more clients that use it.

#### Advantages/Disadvantages
- You can control the service object without clients knowing about it.
- You can manage the lifecycle of the service object when clients don’t care about it.
- The proxy works even if the service object isn’t ready or is not available.
- Open/Closed Principle. You can introduce new proxies without changing the service or clients.

- The code may become more complicated since you need to introduce a lot of new classes.
- The response from the service might get delayed.

## Behavioural Patterns

### Chain of Responsibility
lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

An example is if you have a lot of filters that need to be applied for user authentication.

the Chain of Responsibility relies on transforming particular behaviors into stand-alone objects called handlers.

In the example above, each check should be extracted to its own class with a single method that performs the check. The request, along with its data, is passed to this method as an argument. 

The pattern suggests that you link these handlers into a chain. Each linked handler has a field for storing a reference ot the next handler in the chain. In addition to processing a request, handlers pass the request further along the chain. The request travels along the chain until all handlers have had a chance to process it. A handler can decide not to pass the request further down the chain and effectively stop any further processing.

![Example of chain](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution1-en.png)

However, there’s a slightly different approach (and it’s a bit more canonical) in which, upon receiving a request, a handler decides whether it can process it. If it can, it doesn’t pass the request any further. So it’s either only one handler that processes the request or none at all. This approach is very common when dealing with events in stacks of elements within a graphical user interface. 

For instance, when a user clicks a button, the event propagates through the chain of GUI elements that starts with the button, goes along its containers (like forms or panels), and ends up with the main application window. THe event is processed by the first element in the chain that's capable of handling it. 
![Example of tree chain](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution2-en.png)

It’s crucial that all handler classes implement the same interface. Each concrete handler should only care about the following one having the execute method. This way you can compose chains at runtime, using various handlers without coupling your code to their concrete classes.

Here is the common structure:
![chain structure](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/structure-indexed.png)

An example of a tree chain of responsibility:
![example tree chain 2](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/example-en.png)
![Example tree chain 3](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/example2-en.png)


#### Advantages/Disadvantages
- You can control the order of request handling.
- Single Responsibility Principle. You can decouple classes that invoke operations from classes that perform operations.
- Open/Closed Principle. You can introduce new handlers into the app without breaking the existing client code.

- Some requests may end up unhandled.

### Command
 turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.

 If we look an example of creating a text editor. We have a toolbar with a bunch of buttons for various operations of the editor. We can createa Button class that hcan be used for buttons on the toolbar. We could subclass these button class but we would end up with lots of different buttons, with quite a few sharing the same functionality, such as Save, SaveAs, SaveShortcut, SaveMenuItem, etc.

What we need to do is seperate the concerns of the application, which means breaking the app down into layers. The GUI layer should only be responsible for rendering the image, but it shouldn't be responsbile for creating an annual report. The GUI layer should delegate the work to the underlying layer of business logic.
![seperate layers](https://refactoring.guru/images/patterns/diagrams/command/solution1-en.png)

The command pattern suggests that the GUI objects shouldn't send these request directly. Instead, you should extract all of the request details, such as the object being called, the name of the method, and the list of arguments into a separate command class with a single method that triggers this request.

Command objects serve as links between various GUI and business logic objects. From now on, the GUI object doesn’t need to know what business logic object will receive the request and how it’ll be processed. The GUI object just triggers the command, which handles all the details
![layers with command](https://refactoring.guru/images/patterns/diagrams/command/solution2-en.png)

All of our commands should implement the same interface so that various commands can be used with the same request sender. We can then have commands which hold the right data:
![command text editor](https://refactoring.guru/images/patterns/diagrams/command/solution3.png)
A Button or Shortcut can then have a reference to a command object and make we can make the button execute that command on a click.

Here is the structure:
![command structure](https://refactoring.guru/images/patterns/diagrams/command/structure-indexed.png)

#### Advantages/Disadvantages
- Single Responsibility Principle. You can decouple classes that invoke operations from classes that perform these operations.
- Open/Closed Principle. You can introduce new commands into the app without breaking existing client code.
- You can implement undo/redo.
- You can implement deferred execution of operations.
- You can assemble a set of simple commands into a complex one.

- The code may become more complicated since you’re introducing a whole new layer between senders and receivers.

### Iterator
lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

The main idea of the Iterator pattern is to extract the traversal behavior of a collection into a separate object called an iterator.
![Tree Iterator](https://refactoring.guru/images/patterns/diagrams/iterator/solution1.png)

In addition to implementing the algorithm itself, an iterator object encapsulates all of the traversal details, such as the current position and how many elements are left till the end. Because of this, several iterators can go through the same collection at the same time, independently of each other.

![structure](https://refactoring.guru/images/patterns/diagrams/iterator/structure-indexed.png)


#### Advantages/Disadvantages
- Single Responsibility Principle. You can clean up the client code and the collections by extracting bulky traversal algorithms into separate classes.
- Open/Closed Principle. You can implement new types of collections and iterators and pass them to existing code without breaking anything.
- You can iterate over the same collection in parallel because each iterator object contains its own iteration state.
- For the same reason, you can delay an iteration and continue it when needed.

- Applying the pattern can be an overkill if your app only works with simple collections.
- Using an iterator may be less efficient than going through elements of some specialized collections directly.

### Mediator
lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.

The Mediator pattern suggests that you should cease all direct communication between the components which you want to make independent of each other. Instead, these components must collaborate indirectly, by calling a special mediator object that redirects the calls to appropriate components. As a result, the components depend only on a single mediator class instead of being coupled to dozens of their colleagues.

As an example, say we had the following structure for our web app:
![example 1](https://refactoring.guru/images/patterns/diagrams/mediator/problem1.png)

We could change this so the dialog class is the mediator:
![example 2](https://refactoring.guru/images/patterns/diagrams/mediator/solution1.png)

Most likely the dialog class is already aware of all its sub-elements, so you won't even need to introduce new dependnecies into this class.

THe most singificant change happens the actual form elements. If before the submit button had to validate the values of all individual form elements, we should now get the dialog itself to perform these validations. The submit button should only be responsbile for notifying the dialog about the click.

We should createa an interface for all dialogs that have a notification method.

The structure of the pattern looks like this:
![structure](https://refactoring.guru/images/patterns/diagrams/mediator/structure-indexed.png)

Each component has some business logic and a reference to the mediator. Components must not be aware of other components.

Use this pattern when
- it's hard to change some of the classes because they are tighly coupled to a bunch of other classes. We can extract all the relationships between classes into the mediator, isolating any changes to a specific component from the rest of the components.
- you can't reuse a component in a different program because it's too dependent on other components. After you apply the Mediator, components don't speak to other components. Can reuse components by providing it with a different mediator class.
- you find yourself creating tons of component subclasses just to reuse some basic behaviour in various contexnts. Since all relations between components are contained within the mediator, its easy to define entirely new ways for these components to collaborate by introducing new mediator classes, without having to change the components themselves.

#### Advantages/Disadvantages
- Single Responsibility Principle. You can extract the communications between various components into a single place, making it easier to comprehend and maintain.
- Open/Closed Principle. You can introduce new mediators without having to change the actual components.
- You can reduce coupling between various components of a program.
- You can reuse individual components more easily.

- Over time a mediator can evolve into a God Object.

### Memento
Lets you save and restore the previous state of an object without revealing the details of its implementation.

You don't want something outside an object to copy state as this will need to break encapsulation. These objects try to do more than they're supposed ot. To collect the data required to perform some action, they invade the private space of other objects instead of letting these objects perform the actual action.

The memento pattern delegates creating the state snapshotts to the actual owner of that state, the originator object. Hence, instead of other objects trying to copy the editor's state from the "outside", the editor class itself makes the snapshot since it has full access to its own state.

The pattern suggests storing the copy of the object's state in a special object called memento. This contents of the memento aren't accessible to any other object except the one that produced it. Other objects must communicate with mementos using a limited interface which may allow fetching the snapshot's metadata (creation time, the name of the the performed operation, etc.), but not the original object's state contained in the snapshot.

If we're using an example of a text editor where we need the history for undo:

!!insert editor example

Such a restrictive policy lets you store memntos inside other objects, usually called caretakers. Since the caretaker works with the memento only via the limited interface, its not able to tamper with the state sotred inside the memento. At the same time, the originator has access to all fields inside the memnto, allowing it to restore its previous state at will. In the example above, the history class is the caretaker.

When a user triggers the undo, the history grabs the most recent memento from the stack passes it back to the editor, requesting a roll-back. Since the editor has full access to the memnto, it changes its own state with the values taken from the mento.

!!Structure image

Usually the mento pattern relies on nested classes. In the structure the memnto class is nested inside the originator. This lets the originator access the fields and methods of the memnto, even though they're declared private. On the other hand, the caretake has very limited access ot the memnto's fields and methods, which lets it store memntors in a stack but not tamper with their state.

#### Advantages/Disadvantages
- You can produce snapshots of the object's state without violating its encapsulation.
- You can simplify the originator's code by letting the caretaker maintain the history of the originator's state.

- The app might consume lots of RAM if clients create memntors too often.
- Caretakers should track the originator's lifecycle to be able to destroy obsolete memntos.
- Most dynamic programming languages, such as PHP, Python, and JavaScript, can't guarantee that the state within the memnto stays untouched.

### Observer
Lets you define a subscription mechanism to notify multiple objects about any events thaat happen to the object they're observing.

Rather than letting something poll, or spamming everyone in the world with updates, the observe poattern allows things who are interesting in events to subscribe to them.

The object that has some interesting state is often called subject or publisher. All other objects that want to track changes to the publisher's state are called subscribers.

The obseerver pattern says we should add a subscription mechanism to the publishers class so individual objects can subscribe to or unsubscribe from a stream of events coming from that publisher. This consists of an array field for storing a list of references to subscriber objects and several public methods which allow adding subscribers to and removing them from that list. 

When an important event hapopens to the publisher, it goes over its subscribers and calls the specific motification method on their objects.

So that the publisher isn't coupled to all of the subscribers, the subscriber should all implement the same interface. This interface should declare the notification method along with a set of parameters that the publisher can use to apss some contextual data along wit hthe notification. 

!!Add structure and pseudocode image

USe the observer pattern when changes to the state of one object may require changing other objects, and the actual set of objeects is unkown beforehand or changes dynamically. Or when some objects in your app must observe others, but only for a limited time or in specific cases.

You can often experience this problem when working with classes of the graphical user interface. For example, you created a custom button class, and you want to let the clients hook some custom code to your buttons so that it fires whenever a user presses a button.

Should go over how to use observer with lambdas and concurrency.

#### Advantages/Disadvantages
- Open/Closed principle. You can itroduce noew subscriber classes without having to change the publisher's code (and vice versa if there's a publisher interface).
- You can establish relations between objects at runtime.

- Subscribers are notified in random order.

### State
Lets an object alter its behaviour when its internal state changes. It appears as if the object changed its class.

The main idea is that, at any given moment, there's a finite number of states which a program can be in. Within any unique state, the program behaves differently, and the program can be switched from one state to another instantaneously. However, depending on a current state, the program may or may not swithc to certain other states. THese switching rules, called transitions, are also finite and predetermined.

State machines are usually implemented iwth lots of conditional operators. However this can snowball quickly.

The state pattern suggests that you create new classes for all possible states of an object and extract all state-specific behaviours into these classes. Instead of implementing all behaviours on its own, the original object, called context, stores a reference to one of the state objects thate represents its current state, and delegates all state-related work to that object.

!!Add solution diagram

To move the context to anotehr state, change the active state object with another object.

Similar to strategy, however the difference is the states may be aware of each other and initiate transitions from one state to anotehr, whereas strategies never known about eahc other.

!! Add structure diagram.

Use the State pattern when you have an boejct that behaves differently depending on its current state, the number of states is enormous, and the state-specific code changes frequently.
Use the pattern when you have a class polluted with massive conditions that alter how the class behaves according to the current values of the class's fields.  
Use State when you have a lot of duplicated code across simiolar states and transitions of a conditional-based state machine. 

#### Advantages/Disadvantages
- Single Responsibility Principle. Organise code related to particular states into separate classes.
- Open/Closed Principle. Introduce new states without changing existing state classes or the context.
- Simplify the code of the context by eliminating bulky state machine conditionals.

- Applying the pattern can be overkill if a state machine has onlyu a few states or rarely change.s

### Strategy
Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

This pattern is good for problems that do something specific in lots of different ways.

The strategy pattern suggests that you take a class that does something specific in lots of different ways and extract all of the algorithms into separate classes called strategies.

The original class, called context, must have a field for storing a reference to one of the strategies. The context delegates the work ot the strategy.

The context is not responsible for selecting an appropriate algorithm, instead the client passes the desired strategy to the context. It works with all strategies through the same generic inteface which only exposes a single method for triggering the algorithm encapsulated within the selected strategy.

The context then becomes independent of concrete strategies, so you can add new algorithms or modify existing ones without changing the code of the context or other strategies.

![example](https://refactoring.guru/images/patterns/diagrams/strategy/solution.png)

The clients, such as the buttons on a user inteface can replace the selected strategy.

the structure looks as follows:
![structure](https://refactoring.guru/images/patterns/diagrams/strategy/structure-indexed.png)
The context calls the execution method on the linked strategy object each time it needs to run the algorithm. The client creates a specific strategy object and passes it to the context. The context exposes a setter which lets clients replace the strategy associated with the context at runtime.

Use the strategy pattern when:
- you want to use different vairants of an algorithm.
- you have a lot of similar classes that only differen in the way they execute some behaviour.
- you have a massive conditional operator that switches between different variants of the same algorithm.

#### Advantages/Disadvantages
- You can swap algorithms used inside an object at runtime.
- You can isolate the implementation details of an algorithm from the code that uses it.
- You can replace inheritance with composition.
- Open/Closed Principle. You can introduce new strategies without having to change the context.

- If you only have a couple of algorithms and they rarely change, there’s no real reason to overcomplicate the program with new classes and interfaces that come along with the pattern.
- Clients must be aware of the differences between strategies to be able to select a proper one.
- A lot of modern programming languages have functional type support that lets you implement different versions of an algorithm inside a set of anonymous functions. Then you could use these functions exactly as you’d have used the strategy objects, but without bloating your code with extra classes and interfaces.

### Template Method
defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.

The Template Method pattern suggests that you break down an algorithm into a series of steps, turn these steps into methods, and put a series of calls to these methods inside a single “template method.” The steps may either be abstract, or have some default implementation. To use the algorithm, the client is supposed to provide its own subclass, implement all abstract steps, and override some of the optional ones if needed (but not the template method itself).

![Example](https://refactoring.guru/images/patterns/diagrams/template-method/solution-en.png)

There are three types of steps:
- abstract steps must be implemented by every subclass
- optional steps already have some default implementation, but still can be overridden if needed
- Hooks are an optional step with an empty body. A template method would work evne if a kook isn't overrriden. Usually placed before and after crucial steps of algorithms, providing subclasses with additional extension points for an algorithm.

This is the structure of the template method pattern:
![structure](https://refactoring.guru/images/patterns/diagrams/template-method/structure-indexed.png)

Use the template method pattern when:
- you want to let clients extend only particular steps of an algorithm, but not the whole algorithm or its structure.
- you have several classes that contain almost identical algorithms with some minor differences. As a result, you might need to modify all classes when the algorithm changes.

#### Advantages/Disadvantages
- You can let clients override only certain parts of a large algorithm, making them less affected by changes that happen to other parts of the algorithm.
- You can pull the duplicate code into a superclass.

- Some clients may be limited by the provided skeleton of an algorithm.
- You might violate the Liskov Substitution Principle by suppressing a default step implementation via a subclass.
- Template methods tend to be harder to maintain the more steps they have.

### Visitor
lets you separate algorithms from the objects on which they operate.

The Visitor pattern suggests that you place the new behavior into a separate class called visitor, instead of trying to integrate it into existing classes. The original object that had to perform the behavior is now passed to one of the visitor’s methods as an argument, providing the method access to all necessary data contained within the object.

Now, what if that behavior can be executed over objects of different classes? For example, in our case with XML export, the actual implementation will probably be a little bit different across various node classes. Thus, the visitor class may define not one, but a set of methods, each of which could take arguments of different types, like this:
```
class ExportVisitor implements Visitor is
    method doForCity(City c) { ... }
    method doForIndustry(Industry f) { ... }
    method doForSightSeeing(SightSeeing ss) { ... }
    // ...
```

INstead of letting the client select a propert version of the method to call (using conditionals and instanceof), we should delegate this choice ot objects we're passing to the visitor as an argument:
```
// Client code
foreach (Node node in graph)
    node.accept(exportVisitor)

// City
class City is
    method accept(Visitor v) is
        v.doForCity(this)
    // ...

// Industry
class Industry is
    method accept(Visitor v) is
        v.doForIndustry(this)
    // ...
```

The structure looks as follows:
![Structure](https://refactoring.guru/images/patterns/diagrams/visitor/structure-indexed.png)

Use the visitor pattern when:
- you need to perform an operation on all elements of a complex object structure (for example, an object tree).
- you want to clean up the business logic of auxiliary behaviors.
- a behavior makes sense only in some classes of a class hierarchy, but not in others.

#### Advantages/Disadvantages
- Open/Closed Principle. You can introduce a new behavior that can work with objects of different classes without changing these classes.
- Single Responsibility Principle. You can move multiple versions of the same behavior into the same class.
- A visitor object can accumulate some useful information while working with various objects. This might be handy when you want to traverse some complex object structure, such as an object tree, and apply the visitor to each object of this structure.


-  You need to update all visitors each time a class gets added to or removed from the element hierarchy.
- Visitors might lack the necessary access to the private fields and methods of the elements that they’re supposed to work with.


# SOLID Principles

## Single-Responsibility Principle
A class should have one and only one reason to chyang,e meaning that a class should have only one job.

As an example, say we had some shapes and wanted to sum up the area dof these. We could create an area class to sum up the areas and output the sum. However say that there was a requirement to print out the data in JSON. We would have tochange the area calculator. This breaks the SRP as we have to change the calculator to change tyhe print format. The calculator should only be responsbile for summing the area.

## Open-Closed Principle
Entites (classes, modules, functions, etc.) should be open for extension but closed for modification.

Should be able to write code so that you will be able to add new functionality without chaqnging the existing code. This prevents situations in which a change to one of your classes also requires you to adapt all depending classes. Originally it was proposed to use inheritance, where a class is closed since it may be compiled, but it is open since any new class may use it as a parent. Unfortunately inheritance introduces tight coupling if the subclasses depend on implementation details of their parent class.

Instead we can use the polymorphic open-closed principle. It uses interfaces instead of superclasses to allow different implementations which you can easily substitute without changing the code that uses them. The interfaces are closed for modifications, and you can provide new implementations to extend the functionality of your software.

The main benefit of this approach ios that an interface introduces an additional level of abstraction which enables loose coupling. The implementations of an interface are independent of each other and don't need to share any code. If you consider it beneficial that two implementations of an interface share some code, you can either use inheritance or composition.

In terms of the area calculator, if we wanted to add a new shape, to get the claculator to be able to calculate the sum, we would need to add an extra else if to check for the new shape. This violates the OCP because we had to modify the sum method. We can make this better by adding an interface for a shape which as a sum method, and getting both shapes to implement this interface.

## Liskov Substitution Principle
Let q(x) be a property provable about objects of `x` of type `T`. Then `q(y)` should be provable for objects `y` of type `S` where `S` is a subtype of `T`.

The pricnple defines that objects of a superclass shall be replacable with objects of its subclasses without breaking the application.

An override method of a subclass needs to accept the same input aprameter values as the method of the superclass. That means you can implement less restricetive validation rules, but you are not allowed to enforce stricter ones in your subclass. Otherwise, any code that class this method on a object of the superclass might cause an exception, if it gts called with an object of the subclass. The return value of a method of the subclass needs to comply with the same rules as the return value of the method of the superclass.

We have two coffee machines, basic and premium, which bot hhave tow methods addCofee and brewCoffee.  
The basic coffee machines' brewCofee check that its filter coffee, the premium machine checks that its filter coffee or espresso.  
The basic coffee machine's addCoffee takes a GroundCoffee object, and the premium machine takes a CoffeeBean object. If we define a subclass or interface with the brewCoffee method we can still meet the LSP as long as we guarantee that the method is only guaranteed to be called with filter coffee (how can we guarantee this with an interface?).

We could add an interface for Coffee and get GroundCoffee and CoffeeBean to implement it, however this still can't be part of the shared interface, as neither implementation will overlap. Basic needs to check for ground, and premium needs to check for coffee bean.

Think I need more info on this one?

## Interface Segregation Principle
A client should never be forced to implement an interface that it doesn't use or clients shouldn't be forced to depend on methods they do not use.

An example is putting a method `volume()` on your ShapeInterface. Not all shapes (like square) have volume, so this interface would force the square class to implement a method that it has no use of.

This breaks ISP, instead we could create another interface called SolidShapeInterface that has the volume contract, and solid shapes could implement both.

Another example is with animal. We could have an Animal interface which has `eat()`, `walk()`, `sleep()`. However this is a monolithic interface as not all animals can walk. A better solution is to split interfaces into roles, CanEat, CanSleep, CanWalk. By breaking down interfaces, we favor composition instead of inheritance. and decoupling over coupling. We favour composition by separating by roles (responsibilities) and decoupling by not coupling derivative classes with unneeded responsibilties inside a monolith.

## Dependency Inversion Principle
Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the low level module, but they should depend on abstractions. 

Having a class like this breaks the principle:

```java
poublic class passwordReminder {
    private MySQLConnection dbConnection;

    public PasswordReminder(MySQLConnection dbConnection) {
        this.dbConnection = dbConnection;
    }   
}
```

Later if we  were to change the database engine, you would also have to edit the PasswordReminder class and this violates Open-Close principle.

The PasswordReminder class should not care what database your application uses, to fix this again we "code to an interface", since high level and low level modules should depend on abstreaction, we can create an interface:
```java
interface DBConnectionInterface {
    public void connect();
}

class MySQLConnection implements DbConnectionInterface {
    public void connect() {
        return "Database Connection";
    }
}

class PasswordReminder {
    private dbConnection;

    public PasswordReminder(DbConnectionInterface dbConnection) {
        this.dbConnection = dbConnection
    }
}
```

### Using interfaces
Having classes like PersonServieImpl is useless. If there is a second implementation what would you call it? Also a big problem is that implementations are shipped with thier interfaces. It's useless if you tie the contract and the implementation toghether. The purpose of an implementation is to be replaceable when it comes to dependency injection. By injecting interfaces instead of implementations, you allow the implementation to be replaces by antoehr as the code doesn't depend on it. By shipping both the interface the implementation tied together, you will never be able to replace the implementation with another without editing the code.

This is where the API pattern comes to the rescue. We've seen that most developers just ship interfaces with thier associated impl together. The API pattern aims to separate the contract, namely the interface, and the implementation. This way, when you need to replace one implementation by another inside your application, you just need to swap the dependency pointing to the right implementation. No code change.

We could have something like:
- engine-api: contains the interfaces defining the engine contract
- engine-electric: implementation of an electric engine which depends on engine-api
engine-gas: implementation of a gas engine which depends on engine-api.

Any other maven module which depends on the engine only relies on the API.

This is a benefit of splitting out your layers into mavem modules? You could change the underlying maven moduole, without recompiling everything.

# Design Patterns

Design pattersn are categorised into: creational, behavourial, and structural.

## Creational

### Singleton
ensures that at most one instance of a class exists at any given time. 

Singletons are also sometimes used as a substitute for global variables, but this doesn’t avoid any of the global state problems that plague global variables, so many people consider this use an anti-pattern. 

Singletons are bettern than a set of static methods because:
- Inheritance and interfaces: Singletons are objects, they can inherit from base classes and implement interfaces.
- Possible Multiplicity: You can change your mind and create multiple objects without chaing a lot of code.
- Dynamic binding: The actual class used to create the singleton can be determined at run time, not at compile time.

Disadvantages:
- testing, hard coded in to classes
- Methods must be synchronised in multithreaded environments, slowing access to the singleton's state.
- may slow down the application's startup time as it initialisations, and may hold onto resources longer than necessary.

### Builder
Creates objects in a stepwise manner without knowing or caring how those objects are constructed.  Instead of constructing an object directly (or via a factory), you instantiate a Builder and let it create the object on your behalf. 
Builders are particularly useful for initializing objects that require multiple constructor parameters, especially parameters of the same or similar types.

Not only is the object initialization much clearer and easier to understand, but initialization parameters can be easily added and removed. Certain parameters can be mandatory, and the others can be made optional with default values. 

Simpler initialization is one use for builders. Sometimes it’s also useful to create a hierarchy of builders. At the top of the hierarchy is an abstract builder class that defines the methods for initializing the different parts of an object. Concrete subclasses override these methods to build the object in different ways. For example, a generic document builder would expose abstract methods like addHeading and addParagraph, which would be implemented by different subclasses to create HTML documents, PDF documents, and so on. 

Use Builder when objects are complex to construct and are constructed in several steps. Otherwise, Abstract Factory may be simpler to use.

### Factory Method
A factory method is Technically any method whose primary purpose is to create and return a new object. the factory method pattern applies this concept to a class hierarchy.

A base class defines a factory method that can be overriden in a subclass, enabling the subclass to determine how a new object is created. 

The base class may or may not provide a default implementation for the method, but it always uses the factory method to create a new object of the required type. 

### In the Observer pattern, what strategies can the subject use to efficiently update its observers?

A naïve implementation of the Observer pattern can yield poor performance if many objects are observing other objects. The most obvious problem is that a subject updates its state too often, causing it to spend most of its time updating its observers. This can happen when multiple properties are changed many times in rapid succession in a single code sequence. In such situations it may make more sense to briefly turn updates off, make the changes, then turn updates on and send a single update notification to all interested objects. Another potential problem relates to how observers determine what has changed. In many windowing systems, for example, it’s much more efficient to redraw just the part of the screen that has changed, rather than the entire display. To do this properly, the view (the observer) needs to know which part of the model (the subject) has changed. Rather than have the observer query the subject to determine what changed, why not have the subject pass the information along as part of the update notification? 


## What is autoboxing?
Autoboxing = casting a primitive type to a wrapper type. auto-unboxing is the opposite.


Image by <a href="https://pixabay.com/users/Wounds_and_Cracks-218774/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3306859">Christos Giakkas</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3306859">Pixabay</a>

