import { mutation } from "./_generated/server";

export const seedSpringBootCourse = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if course already exists
    const existing = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("slug"), "spring-boot-masterclass"))
      .first();

    if (existing) {
      return { message: "Spring Boot course already exists", courseId: existing._id };
    }

    // Create the Spring Boot course
    const courseId = await ctx.db.insert("courses", {
      slug: "spring-boot-masterclass",
      title: "Spring Boot Masterclass",
      description: "Master Spring Boot from fundamentals to microservices. Build production-ready REST APIs, implement security with JWT, work with databases using JPA/Hibernate, and deploy containerized applications.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      language: "java",
      difficulty: "beginner",
      totalLessons: 150,
      estimatedHours: 40,
      isPublished: true,
      createdAt: Date.now(),
    });

    // ============================================
    // MODULE 1: Introduction to Spring Boot
    // ============================================
    const module1Id = await ctx.db.insert("modules", {
      courseId,
      title: "Introduction to Spring Boot",
      order: 1,
    });

    const module1Lessons = [
      {
        title: "What is Spring Boot?",
        type: "theory" as const,
        content: `# What is Spring Boot?

Spring Boot is an open-source Java framework that makes it easy to create stand-alone, production-grade Spring-based applications.

## Key Features

- **Auto-Configuration**: Automatically configures your application based on dependencies
- **Standalone**: Create applications that can run independently
- **Opinionated Defaults**: Sensible defaults to get started quickly
- **No Code Generation**: No XML configuration required

## Why Spring Boot?

\`\`\`java
// Traditional Spring requires extensive XML configuration
// Spring Boot simplifies this to just a few annotations

@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
\`\`\`

## Benefits

1. **Rapid Development**: Get started in minutes
2. **Microservices Ready**: Perfect for building microservices
3. **Production Ready**: Built-in health checks, metrics, and externalized configuration
4. **Large Ecosystem**: Extensive library of starters for common tasks`,
        order: 1,
        xpReward: 10,
        estimatedMinutes: 10,
        language: "java",
      },
      {
        title: "Spring Boot vs Spring Framework",
        type: "theory" as const,
        content: `# Spring Boot vs Spring Framework

## Spring Framework

The original Spring Framework provides:
- Dependency Injection (IoC Container)
- Aspect-Oriented Programming (AOP)
- Data Access
- Transaction Management
- MVC Web Framework

**Challenges:**
- Complex XML configuration
- Manual dependency management
- Boilerplate code

## Spring Boot

Spring Boot builds ON TOP of Spring Framework and adds:

\`\`\`java
// Spring Framework (Traditional)
// Requires: web.xml, applicationContext.xml, dispatcher-servlet.xml
// Multiple configuration files needed

// Spring Boot (Modern)
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
// That's it! No XML needed
\`\`\`

## Comparison Table

| Feature | Spring Framework | Spring Boot |
|---------|-----------------|-------------|
| Configuration | XML/Java Config | Auto-configuration |
| Server | External (Tomcat, etc.) | Embedded Server |
| Dependencies | Manual | Starter POMs |
| Deployment | WAR file | JAR file |
| Setup Time | Hours | Minutes |`,
        order: 2,
        xpReward: 10,
        estimatedMinutes: 8,
        language: "java",
      },
      {
        title: "Setting up Development Environment",
        type: "theory" as const,
        content: `# Setting up Development Environment

## Prerequisites

### 1. Java Development Kit (JDK 17+)

\`\`\`bash
# Check Java version
java -version

# Should output: java version "17.x.x" or higher
\`\`\`

### 2. Maven or Gradle

\`\`\`bash
# Check Maven version
mvn -version

# Or Gradle
gradle -version
\`\`\`

### 3. IDE (Choose one)
- **IntelliJ IDEA** (Recommended) - Community or Ultimate
- **Eclipse** with Spring Tools Suite
- **VS Code** with Java extensions

## Installing JDK 17

**Windows:**
1. Download from Oracle or AdoptOpenJDK
2. Run installer
3. Set JAVA_HOME environment variable

**macOS:**
\`\`\`bash
brew install openjdk@17
\`\`\`

**Linux:**
\`\`\`bash
sudo apt install openjdk-17-jdk
\`\`\`

## Verifying Installation

\`\`\`bash
# Verify all tools
java -version
mvn -version
echo $JAVA_HOME
\`\`\`

You're ready to create your first Spring Boot project!`,
        order: 3,
        xpReward: 10,
        estimatedMinutes: 15,
        language: "java",
      },
      {
        title: "Creating Your First Spring Boot Project",
        type: "practice" as const,
        content: `# Creating Your First Spring Boot Project

## Using Spring Initializr

The easiest way to create a Spring Boot project is using [start.spring.io](https://start.spring.io)

### Steps:

1. Go to https://start.spring.io
2. Select:
   - **Project**: Maven
   - **Language**: Java
   - **Spring Boot**: 3.x.x (latest stable)
   - **Group**: com.example
   - **Artifact**: demo
   - **Dependencies**: Spring Web

3. Click "Generate" to download

## Project Structure

\`\`\`
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
├── pom.xml
└── mvnw
\`\`\`

## The Main Class

\`\`\`java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
\`\`\`

**Practice:** Create a Spring Boot project and identify all the generated files.`,
        order: 4,
        xpReward: 20,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create the main application class
// TODO: Add the correct annotation to make this a Spring Boot application
// TODO: Implement the main method to run the application

public class MyFirstApplication {
    
    public static void main(String[] args) {
        // TODO: Start the Spring Boot application
    }
}`,
        solution: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyFirstApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(MyFirstApplication.class, args);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@SpringBootApplication",
            description: "Should have @SpringBootApplication annotation",
          },
        ],
      },
      {
        title: "Understanding Project Structure",
        type: "theory" as const,
        content: `# Understanding Spring Boot Project Structure

## Standard Maven Project Layout

\`\`\`
my-project/
├── src/
│   ├── main/
│   │   ├── java/                 # Java source code
│   │   │   └── com/example/
│   │   │       ├── Application.java
│   │   │       ├── controller/   # REST Controllers
│   │   │       ├── service/      # Business Logic
│   │   │       ├── repository/   # Data Access
│   │   │       ├── model/        # Entity Classes
│   │   │       └── config/       # Configuration
│   │   └── resources/
│   │       ├── application.properties  # Configuration
│   │       ├── application.yml         # Alternative config
│   │       ├── static/                  # Static files (CSS, JS)
│   │       └── templates/               # View templates
│   └── test/
│       └── java/                 # Test classes
├── pom.xml                       # Maven dependencies
├── mvnw                          # Maven wrapper (Unix)
├── mvnw.cmd                      # Maven wrapper (Windows)
└── .gitignore
\`\`\`

## Key Files Explained

### pom.xml
\`\`\`xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
\`\`\`

### application.properties
\`\`\`properties
# Server configuration
server.port=8080

# Application name
spring.application.name=my-app

# Logging level
logging.level.root=INFO
\`\`\``,
        order: 5,
        xpReward: 10,
        estimatedMinutes: 10,
        language: "java",
      },
      {
        title: "Running Your First Application",
        type: "practice" as const,
        content: `# Running Your First Application

## Methods to Run Spring Boot

### 1. Using Maven
\`\`\`bash
# From project root directory
mvn spring-boot:run
\`\`\`

### 2. Using the JAR file
\`\`\`bash
# First, build the project
mvn clean package

# Then run the JAR
java -jar target/demo-0.0.1-SNAPSHOT.jar
\`\`\`

### 3. From IDE
- Right-click on main class → Run

## What Happens When You Run?

\`\`\`
  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

Started DemoApplication in 2.5 seconds
\`\`\`

## Verify It's Running

Open your browser and go to:
\`\`\`
http://localhost:8080
\`\`\`

You'll see a "Whitelabel Error Page" - that's normal! It means the server is running but we haven't created any endpoints yet.`,
        order: 6,
        xpReward: 15,
        estimatedMinutes: 10,
        language: "java",
        codeTemplate: `// Create a simple REST endpoint to verify the application is running
// TODO: Add the necessary annotations
// TODO: Create a method that returns "Hello, Spring Boot!" when accessing /hello

public class HelloController {
    
    public String hello() {
        return "Hello, Spring Boot!";
    }
}`,
        solution: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@RestController",
            description: "Should have @RestController annotation",
          },
          {
            input: "",
            expectedOutput: "@GetMapping",
            description: "Should have @GetMapping annotation",
          },
        ],
      },
      {
        title: "Spring Boot Starters Explained",
        type: "theory" as const,
        content: `# Spring Boot Starters

Starters are a set of convenient dependency descriptors that you can include in your application.

## What Are Starters?

Instead of hunting for individual dependencies, starters provide everything you need for a specific functionality.

## Common Starters

\`\`\`xml
<!-- Web applications -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Database with JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
\`\`\`

## What spring-boot-starter-web Includes

- Spring MVC
- Jackson (JSON processing)
- Embedded Tomcat
- Validation
- Logging

## Popular Starters

| Starter | Purpose |
|---------|---------|
| spring-boot-starter-web | Web applications |
| spring-boot-starter-data-jpa | JPA with Hibernate |
| spring-boot-starter-security | Security features |
| spring-boot-starter-test | Testing utilities |
| spring-boot-starter-actuator | Monitoring & metrics |
| spring-boot-starter-validation | Bean validation |`,
        order: 7,
        xpReward: 10,
        estimatedMinutes: 10,
        language: "java",
      },
      {
        title: "Auto-Configuration Magic",
        type: "theory" as const,
        content: `# Auto-Configuration Magic

## How Does Spring Boot Know What to Configure?

Spring Boot uses **conditional configuration** based on:
1. Classes on the classpath
2. Existing beans
3. Property values

## The @SpringBootApplication Annotation

\`\`\`java
@SpringBootApplication
// This is equivalent to:
@SpringBootConfiguration  // Marks as configuration class
@EnableAutoConfiguration  // Enables auto-configuration
@ComponentScan           // Scans for components
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

## Auto-Configuration in Action

When you add \`spring-boot-starter-web\`:

\`\`\`java
// Spring Boot automatically:
// 1. Configures embedded Tomcat
// 2. Sets up DispatcherServlet
// 3. Configures Jackson for JSON
// 4. Sets up error handling

// You don't write any of this!
\`\`\`

## Viewing Auto-Configuration

Add to application.properties:
\`\`\`properties
debug=true
\`\`\`

This shows:
- **Positive matches**: Configurations that were applied
- **Negative matches**: Configurations that were skipped

## Customizing Auto-Configuration

\`\`\`properties
# Change server port
server.port=9090

# Change context path
server.servlet.context-path=/api

# Disable specific auto-config
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
\`\`\``,
        order: 8,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
    ];

    for (const lesson of module1Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module1Id,
        courseId,
        ...lesson,
      });
    }

    // ============================================
    // MODULE 2: Spring Boot Fundamentals
    // ============================================
    const module2Id = await ctx.db.insert("modules", {
      courseId,
      title: "Spring Boot Fundamentals",
      order: 2,
    });

    const module2Lessons = [
      {
        title: "@SpringBootApplication Deep Dive",
        type: "theory" as const,
        content: `# @SpringBootApplication Deep Dive

## The Most Important Annotation

\`\`\`java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

## What It Contains

\`\`\`java
@SpringBootApplication
// Is a combination of:

@SpringBootConfiguration
// - Indicates this class provides Spring Boot configuration
// - Specialized @Configuration

@EnableAutoConfiguration
// - Tells Spring Boot to auto-configure beans
// - Based on classpath and defined beans

@ComponentScan
// - Scans current package and sub-packages
// - Finds @Component, @Service, @Repository, @Controller
\`\`\`

## Component Scanning Example

\`\`\`
com.example.myapp/
├── Application.java          # @SpringBootApplication here
├── controller/
│   └── UserController.java   # ✓ Scanned
├── service/
│   └── UserService.java      # ✓ Scanned
└── repository/
    └── UserRepository.java   # ✓ Scanned

com.other.package/
└── OtherClass.java           # ✗ NOT scanned
\`\`\`

## Customizing Component Scan

\`\`\`java
@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.myapp",
    "com.other.package"
})
public class Application {
    // Now scans both packages
}
\`\`\``,
        order: 1,
        xpReward: 15,
        estimatedMinutes: 10,
        language: "java",
      },
      {
        title: "Application Properties & YAML",
        type: "practice" as const,
        content: `# Application Properties & YAML Configuration

## application.properties

\`\`\`properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Application Info
spring.application.name=my-app

# Logging
logging.level.root=INFO
logging.level.com.example=DEBUG

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
\`\`\`

## application.yml (Alternative)

\`\`\`yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: my-app
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret

logging:
  level:
    root: INFO
    com.example: DEBUG
\`\`\`

## Accessing Properties in Code

\`\`\`java
@Component
public class MyComponent {
    
    @Value("\${spring.application.name}")
    private String appName;
    
    @Value("\${server.port:8080}")  // Default value
    private int port;
}
\`\`\`

## Using @ConfigurationProperties

\`\`\`java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private int maxUsers;
    // getters and setters
}
\`\`\``,
        order: 2,
        xpReward: 20,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create a component that reads configuration values
// TODO: Add the @Component annotation
// TODO: Use @Value to inject the application name
// TODO: Use @Value with a default value for the port

public class AppConfig {
    
    // Inject spring.application.name
    private String appName;
    
    // Inject server.port with default 8080
    private int serverPort;
    
    public void printConfig() {
        System.out.println("App: " + appName + " on port: " + serverPort);
    }
}`,
        solution: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {
    
    @Value("\${spring.application.name}")
    private String appName;
    
    @Value("\${server.port:8080}")
    private int serverPort;
    
    public void printConfig() {
        System.out.println("App: " + appName + " on port: " + serverPort);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@Component",
            description: "Should have @Component annotation",
          },
          {
            input: "",
            expectedOutput: "@Value",
            description: "Should use @Value for injection",
          },
        ],
      },
      {
        title: "Profiles (dev, prod, test)",
        type: "theory" as const,
        content: `# Spring Boot Profiles

Profiles allow you to define different configurations for different environments.

## Creating Profile-Specific Files

\`\`\`
src/main/resources/
├── application.properties        # Common config
├── application-dev.properties    # Development
├── application-prod.properties   # Production
└── application-test.properties   # Testing
\`\`\`

## Example Configurations

### application.properties (Common)
\`\`\`properties
spring.application.name=my-app
\`\`\`

### application-dev.properties
\`\`\`properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:devdb
logging.level.root=DEBUG
\`\`\`

### application-prod.properties
\`\`\`properties
server.port=80
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
logging.level.root=WARN
\`\`\`

## Activating Profiles

### Method 1: application.properties
\`\`\`properties
spring.profiles.active=dev
\`\`\`

### Method 2: Command Line
\`\`\`bash
java -jar app.jar --spring.profiles.active=prod
\`\`\`

### Method 3: Environment Variable
\`\`\`bash
export SPRING_PROFILES_ACTIVE=prod
\`\`\`

## Profile-Specific Beans

\`\`\`java
@Configuration
public class DataSourceConfig {
    
    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        // H2 in-memory database
    }
    
    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        // MySQL production database
    }
}
\`\`\``,
        order: 3,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
      {
        title: "Dependency Injection with @Autowired",
        type: "practice" as const,
        content: `# Dependency Injection with @Autowired

## What is Dependency Injection?

Instead of creating objects yourself, Spring creates and injects them for you.

## Without DI (Bad Practice)
\`\`\`java
public class UserController {
    // Creating dependency manually - tight coupling!
    private UserService userService = new UserService();
}
\`\`\`

## With DI (Best Practice)
\`\`\`java
@RestController
public class UserController {
    
    private final UserService userService;
    
    // Constructor injection (recommended)
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
}
\`\`\`

## Types of Injection

### 1. Constructor Injection (Recommended)
\`\`\`java
@Service
public class UserService {
    private final UserRepository repository;
    
    @Autowired  // Optional for single constructor
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}
\`\`\`

### 2. Field Injection
\`\`\`java
@Service
public class UserService {
    @Autowired
    private UserRepository repository;
}
\`\`\`

### 3. Setter Injection
\`\`\`java
@Service
public class UserService {
    private UserRepository repository;
    
    @Autowired
    public void setRepository(UserRepository repository) {
        this.repository = repository;
    }
}
\`\`\`

## Why Constructor Injection is Best

1. **Immutability**: Fields can be final
2. **Required Dependencies**: Clear at construction
3. **Testability**: Easy to mock in tests
4. **No Null Issues**: Dependencies guaranteed`,
        order: 4,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create a service and controller with proper dependency injection
// TODO: Add appropriate annotations
// TODO: Use constructor injection

public class OrderService {
    
    private OrderRepository orderRepository;
    
    // TODO: Add constructor with @Autowired
    
    public Order findById(Long id) {
        return orderRepository.findById(id);
    }
}

public class OrderController {
    
    private OrderService orderService;
    
    // TODO: Add constructor injection
    
    public Order getOrder(Long id) {
        return orderService.findById(id);
    }
}`,
        solution: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    public Order findById(Long id) {
        return orderRepository.findById(id);
    }
}

@RestController
public class OrderController {
    
    private final OrderService orderService;
    
    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    @GetMapping("/orders/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.findById(id);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@Service",
            description: "Service should have @Service annotation",
          },
          {
            input: "",
            expectedOutput: "@RestController",
            description: "Controller should have @RestController annotation",
          },
        ],
      },
      {
        title: "Component Scanning",
        type: "theory" as const,
        content: `# Component Scanning

## How Spring Finds Your Beans

Spring automatically scans for classes annotated with stereotype annotations.

## Stereotype Annotations

\`\`\`java
@Component      // Generic component
@Service        // Business logic layer
@Repository     // Data access layer
@Controller     // Web MVC controller
@RestController // REST API controller
@Configuration  // Configuration class
\`\`\`

## Package Structure

\`\`\`
com.example.app/
├── Application.java          # @SpringBootApplication
├── controller/
│   └── UserController.java   # @RestController
├── service/
│   └── UserService.java      # @Service
├── repository/
│   └── UserRepository.java   # @Repository
└── model/
    └── User.java             # Plain class (no annotation needed)
\`\`\`

## Scanning Rules

1. Scans from the package where @SpringBootApplication is located
2. Includes all sub-packages
3. Does NOT scan sibling or parent packages

## Custom Component Scan

\`\`\`java
@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.app",
    "com.example.common"
})
public class Application {
    // Scans multiple packages
}

// Or scan specific classes
@ComponentScan(basePackageClasses = {
    UserService.class,
    OrderService.class
})
\`\`\`

## Excluding Components

\`\`\`java
@ComponentScan(
    basePackages = "com.example",
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = TestConfig.class
    )
)
\`\`\``,
        order: 5,
        xpReward: 15,
        estimatedMinutes: 10,
        language: "java",
      },
      {
        title: "@Component, @Service, @Repository Annotations",
        type: "practice" as const,
        content: `# @Component, @Service, @Repository

## When to Use Each

### @Component
Generic stereotype for any Spring-managed component.
\`\`\`java
@Component
public class EmailValidator {
    public boolean isValid(String email) {
        return email.contains("@");
    }
}
\`\`\`

### @Service
For business logic layer.
\`\`\`java
@Service
public class UserService {
    public User createUser(UserDTO dto) {
        // Business logic here
    }
}
\`\`\`

### @Repository
For data access layer. Provides exception translation.
\`\`\`java
@Repository
public class UserRepository {
    public User findById(Long id) {
        // Database operations
    }
}
\`\`\`

## The Difference

\`\`\`java
// All three are functionally equivalent for component scanning:
@Component
@Service     // Semantic: indicates service layer
@Repository  // Semantic + exception translation

// @Repository special feature:
// Translates database exceptions to Spring's DataAccessException
\`\`\`

## Best Practice Architecture

\`\`\`
Controller (@RestController)
    ↓
Service (@Service)
    ↓
Repository (@Repository)
    ↓
Database
\`\`\``,
        order: 6,
        xpReward: 20,
        estimatedMinutes: 12,
        language: "java",
        codeTemplate: `// Create a layered architecture with proper annotations
// TODO: Add the correct stereotype annotation to each class

// Data access layer
public class ProductRepository {
    public Product findById(Long id) {
        // Database query
        return new Product(id, "Sample Product", 29.99);
    }
}

// Business logic layer  
public class ProductService {
    private final ProductRepository repository;
    
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }
    
    public Product getProduct(Long id) {
        return repository.findById(id);
    }
}

// Utility component
public class PriceCalculator {
    public double calculateDiscount(double price, int percent) {
        return price * (100 - percent) / 100;
    }
}`,
        solution: `import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public class ProductRepository {
    public Product findById(Long id) {
        return new Product(id, "Sample Product", 29.99);
    }
}

@Service
public class ProductService {
    private final ProductRepository repository;
    
    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }
    
    public Product getProduct(Long id) {
        return repository.findById(id);
    }
}

@Component
public class PriceCalculator {
    public double calculateDiscount(double price, int percent) {
        return price * (100 - percent) / 100;
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@Repository",
            description: "Repository should have @Repository annotation",
          },
          {
            input: "",
            expectedOutput: "@Service",
            description: "Service should have @Service annotation",
          },
          {
            input: "",
            expectedOutput: "@Component",
            description: "Utility should have @Component annotation",
          },
        ],
      },
      {
        title: "Bean Lifecycle",
        type: "theory" as const,
        content: `# Bean Lifecycle

## Lifecycle Phases

1. **Instantiation** - Bean is created
2. **Populate Properties** - Dependencies injected
3. **BeanNameAware** - Set bean name
4. **BeanFactoryAware** - Set bean factory
5. **Pre-Initialization** - @PostConstruct
6. **Initialization** - InitializingBean.afterPropertiesSet()
7. **Post-Initialization** - Bean is ready
8. **Destruction** - @PreDestroy

## Using @PostConstruct and @PreDestroy

\`\`\`java
@Service
public class DatabaseService {
    
    @PostConstruct
    public void init() {
        System.out.println("Bean initialized!");
        // Setup: open connections, load cache, etc.
    }
    
    @PreDestroy
    public void cleanup() {
        System.out.println("Bean destroying!");
        // Cleanup: close connections, flush cache, etc.
    }
}
\`\`\`

## Using InitializingBean and DisposableBean

\`\`\`java
@Service
public class CacheService implements InitializingBean, DisposableBean {
    
    @Override
    public void afterPropertiesSet() {
        // Initialize cache
    }
    
    @Override
    public void destroy() {
        // Clear cache
    }
}
\`\`\`

## Bean Scopes

\`\`\`java
@Component
@Scope("singleton")  // Default - one instance per container
public class SingletonBean { }

@Component
@Scope("prototype")  // New instance every time requested
public class PrototypeBean { }

@Component
@Scope("request")    // One per HTTP request (web only)
public class RequestBean { }

@Component
@Scope("session")    // One per HTTP session (web only)
public class SessionBean { }
\`\`\``,
        order: 7,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
      {
        title: "Configuration Classes with @Configuration",
        type: "practice" as const,
        content: `# Configuration Classes

## What is @Configuration?

Marks a class as a source of bean definitions.

## Basic Configuration

\`\`\`java
@Configuration
public class AppConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }
}
\`\`\`

## Bean Dependencies

\`\`\`java
@Configuration
public class DatabaseConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        ds.setUsername("root");
        ds.setPassword("password");
        return ds;
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        // dataSource is automatically injected
        return new JdbcTemplate(dataSource);
    }
}
\`\`\`

## Conditional Beans

\`\`\`java
@Configuration
public class ConditionalConfig {
    
    @Bean
    @ConditionalOnProperty(name = "cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }
    
    @Bean
    @ConditionalOnMissingBean
    public MyService defaultService() {
        return new DefaultMyService();
    }
}
\`\`\``,
        order: 8,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create a configuration class with multiple beans
// TODO: Add @Configuration annotation
// TODO: Create beans for RestTemplate and a custom service

public class WebConfig {
    
    // TODO: Create a RestTemplate bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    // TODO: Create a bean that depends on RestTemplate
    public ApiClient apiClient(RestTemplate restTemplate) {
        return new ApiClient(restTemplate);
    }
}

class ApiClient {
    private final RestTemplate restTemplate;
    
    public ApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public String fetchData(String url) {
        return restTemplate.getForObject(url, String.class);
    }
}`,
        solution: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class WebConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @Bean
    public ApiClient apiClient(RestTemplate restTemplate) {
        return new ApiClient(restTemplate);
    }
}

class ApiClient {
    private final RestTemplate restTemplate;
    
    public ApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public String fetchData(String url) {
        return restTemplate.getForObject(url, String.class);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@Configuration",
            description: "Should have @Configuration annotation",
          },
          {
            input: "",
            expectedOutput: "@Bean",
            description: "Should have @Bean annotations",
          },
        ],
      },
    ];

    for (const lesson of module2Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module2Id,
        courseId,
        ...lesson,
      });
    }

    // ============================================
    // MODULE 3: Building REST APIs
    // ============================================
    const module3Id = await ctx.db.insert("modules", {
      courseId,
      title: "Building REST APIs",
      order: 3,
    });

    const module3Lessons = [
      {
        title: "REST API Fundamentals",
        type: "theory" as const,
        content: `# REST API Fundamentals

## What is REST?

**RE**presentational **S**tate **T**ransfer - An architectural style for distributed systems.

## REST Principles

1. **Client-Server**: Separation of concerns
2. **Stateless**: No session state on server
3. **Cacheable**: Responses can be cached
4. **Uniform Interface**: Consistent API design
5. **Layered System**: Client can't tell if connected directly to server

## HTTP Methods (CRUD Operations)

| Method | Operation | Example |
|--------|-----------|---------|
| GET | Read | GET /users - List all users |
| POST | Create | POST /users - Create user |
| PUT | Update (full) | PUT /users/1 - Update user |
| PATCH | Update (partial) | PATCH /users/1 - Partial update |
| DELETE | Delete | DELETE /users/1 - Delete user |

## HTTP Status Codes

\`\`\`
2xx - Success
  200 OK - Request succeeded
  201 Created - Resource created
  204 No Content - Success, no body

4xx - Client Error
  400 Bad Request - Invalid request
  401 Unauthorized - Authentication required
  403 Forbidden - No permission
  404 Not Found - Resource not found

5xx - Server Error
  500 Internal Server Error - Server failed
\`\`\`

## REST URL Design

\`\`\`
Good:
GET    /users           - List users
GET    /users/123       - Get user 123
POST   /users           - Create user
PUT    /users/123       - Update user 123
DELETE /users/123       - Delete user 123
GET    /users/123/orders - Get orders for user 123

Bad:
GET    /getUsers
POST   /createUser
GET    /getUserById?id=123
\`\`\``,
        order: 1,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
      {
        title: "@RestController and @Controller",
        type: "theory" as const,
        content: `# @RestController vs @Controller

## @Controller

Used for traditional MVC - returns view names.

\`\`\`java
@Controller
public class WebController {
    
    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("message", "Hello!");
        return "home";  // Returns view name "home.html"
    }
    
    @GetMapping("/api/data")
    @ResponseBody  // Needed to return JSON
    public Data getData() {
        return new Data("value");
    }
}
\`\`\`

## @RestController

Combines @Controller + @ResponseBody. Perfect for REST APIs.

\`\`\`java
@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/users")
    public List<User> getUsers() {
        // Automatically serialized to JSON
        return userService.findAll();
    }
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
\`\`\`

## Comparison

\`\`\`java
// These are equivalent:

@Controller
public class MyController {
    @GetMapping("/data")
    @ResponseBody
    public Data getData() { ... }
}

@RestController
public class MyController {
    @GetMapping("/data")
    public Data getData() { ... }
}
\`\`\`

## When to Use

| Annotation | Use Case |
|------------|----------|
| @Controller | Server-side rendered views (Thymeleaf, JSP) |
| @RestController | REST APIs returning JSON/XML |`,
        order: 2,
        xpReward: 15,
        estimatedMinutes: 10,
        language: "java",
      },
      {
        title: "HTTP Method Mappings",
        type: "practice" as const,
        content: `# HTTP Method Mappings

## Mapping Annotations

\`\`\`java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    // GET - Retrieve
    @GetMapping
    public List<Product> getAll() { }
    
    @GetMapping("/{id}")
    public Product getOne(@PathVariable Long id) { }
    
    // POST - Create
    @PostMapping
    public Product create(@RequestBody Product product) { }
    
    // PUT - Full Update
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) { }
    
    // PATCH - Partial Update
    @PatchMapping("/{id}")
    public Product partialUpdate(@PathVariable Long id, @RequestBody Map<String, Object> updates) { }
    
    // DELETE - Remove
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { }
}
\`\`\`

## Using @RequestMapping

\`\`\`java
// Old style - still works
@RequestMapping(value = "/users", method = RequestMethod.GET)
public List<User> getUsers() { }

@RequestMapping(value = "/users", method = RequestMethod.POST)
public User createUser(@RequestBody User user) { }

// Modern style (preferred)
@GetMapping("/users")
@PostMapping("/users")
\`\`\`

## Multiple Paths

\`\`\`java
@GetMapping({"/", "/home", "/index"})
public String home() {
    return "Welcome!";
}
\`\`\``,
        order: 3,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create a REST controller for a Book resource
// TODO: Add proper annotations for CRUD operations

@RestController
@RequestMapping("/api/books")
public class BookController {
    
    private final BookService bookService;
    
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    
    // TODO: GET all books
    public List<Book> getAllBooks() {
        return bookService.findAll();
    }
    
    // TODO: GET book by ID
    public Book getBook(Long id) {
        return bookService.findById(id);
    }
    
    // TODO: POST create new book
    public Book createBook(Book book) {
        return bookService.save(book);
    }
    
    // TODO: PUT update book
    public Book updateBook(Long id, Book book) {
        return bookService.update(id, book);
    }
    
    // TODO: DELETE book
    public void deleteBook(Long id) {
        bookService.delete(id);
    }
}`,
        solution: `import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    
    private final BookService bookService;
    
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.findAll();
    }
    
    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.findById(id);
    }
    
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.save(book);
    }
    
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.update(id, book);
    }
    
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.delete(id);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@GetMapping",
            description: "Should have GET mappings",
          },
          {
            input: "",
            expectedOutput: "@PostMapping",
            description: "Should have POST mapping",
          },
          {
            input: "",
            expectedOutput: "@DeleteMapping",
            description: "Should have DELETE mapping",
          },
        ],
      },
      {
        title: "Path Variables with @PathVariable",
        type: "practice" as const,
        content: `# Path Variables with @PathVariable

## Basic Usage

\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.findById(id);
}

// Request: GET /users/123
// id = 123
\`\`\`

## Multiple Path Variables

\`\`\`java
@GetMapping("/users/{userId}/orders/{orderId}")
public Order getOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId) {
    return orderService.findByUserAndId(userId, orderId);
}

// Request: GET /users/1/orders/42
// userId = 1, orderId = 42
\`\`\`

## Custom Variable Name

\`\`\`java
@GetMapping("/products/{product-id}")
public Product getProduct(
        @PathVariable("product-id") Long productId) {
    return productService.findById(productId);
}
\`\`\`

## Optional Path Variable

\`\`\`java
@GetMapping({"/items", "/items/{id}"})
public Object getItems(
        @PathVariable(required = false) Long id) {
    if (id == null) {
        return itemService.findAll();
    }
    return itemService.findById(id);
}
\`\`\`

## Path Variable with Regex

\`\`\`java
@GetMapping("/files/{filename:.+}")
public Resource getFile(@PathVariable String filename) {
    // Captures filename with extension
    return fileService.load(filename);
}

// Request: GET /files/document.pdf
// filename = "document.pdf"
\`\`\``,
        order: 4,
        xpReward: 20,
        estimatedMinutes: 12,
        language: "java",
        codeTemplate: `// Create endpoints with path variables
// TODO: Implement the methods with proper @PathVariable usage

@RestController
@RequestMapping("/api")
public class PathVariableController {
    
    // TODO: Get user by ID
    // Endpoint: /api/users/{id}
    public User getUser(Long id) {
        return new User(id, "John Doe");
    }
    
    // TODO: Get order for a specific user
    // Endpoint: /api/users/{userId}/orders/{orderId}
    public Order getUserOrder(Long userId, Long orderId) {
        return new Order(orderId, userId, 99.99);
    }
    
    // TODO: Get product with custom path variable name
    // Endpoint: /api/products/{product-id}
    public Product getProduct(Long productId) {
        return new Product(productId, "Laptop");
    }
}`,
        solution: `import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PathVariableController {
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return new User(id, "John Doe");
    }
    
    @GetMapping("/users/{userId}/orders/{orderId}")
    public Order getUserOrder(
            @PathVariable Long userId,
            @PathVariable Long orderId) {
        return new Order(orderId, userId, 99.99);
    }
    
    @GetMapping("/products/{product-id}")
    public Product getProduct(@PathVariable("product-id") Long productId) {
        return new Product(productId, "Laptop");
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@PathVariable",
            description: "Should use @PathVariable annotation",
          },
        ],
      },
      {
        title: "Request Parameters with @RequestParam",
        type: "practice" as const,
        content: `# Request Parameters with @RequestParam

## Basic Usage

\`\`\`java
@GetMapping("/search")
public List<Product> search(@RequestParam String query) {
    return productService.search(query);
}

// Request: GET /search?query=laptop
// query = "laptop"
\`\`\`

## Optional Parameter with Default

\`\`\`java
@GetMapping("/products")
public Page<Product> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String category) {
    return productService.findAll(page, size, category);
}

// Request: GET /products
// page = 0, size = 10, category = null

// Request: GET /products?page=2&size=20&category=electronics
// page = 2, size = 20, category = "electronics"
\`\`\`

## Multiple Values

\`\`\`java
@GetMapping("/filter")
public List<Product> filter(
        @RequestParam List<String> colors) {
    return productService.filterByColors(colors);
}

// Request: GET /filter?colors=red&colors=blue&colors=green
// colors = ["red", "blue", "green"]
\`\`\`

## Map All Parameters

\`\`\`java
@GetMapping("/dynamic")
public String handleDynamic(
        @RequestParam Map<String, String> params) {
    return params.toString();
}

// Request: GET /dynamic?foo=bar&hello=world
// params = {foo=bar, hello=world}
\`\`\``,
        order: 5,
        xpReward: 20,
        estimatedMinutes: 12,
        language: "java",
        codeTemplate: `// Create a search endpoint with query parameters
// TODO: Add @RequestParam annotations with appropriate defaults

@RestController
@RequestMapping("/api/products")
public class ProductSearchController {
    
    // TODO: Create search endpoint
    // - query: required search term
    // - page: optional, default 0
    // - size: optional, default 10
    // - sortBy: optional, default "name"
    @GetMapping("/search")
    public SearchResult search(
            String query,
            int page,
            int size,
            String sortBy) {
        return new SearchResult(query, page, size, sortBy);
    }
}

class SearchResult {
    public String query;
    public int page;
    public int size;
    public String sortBy;
    
    public SearchResult(String query, int page, int size, String sortBy) {
        this.query = query;
        this.page = page;
        this.size = size;
        this.sortBy = sortBy;
    }
}`,
        solution: `import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductSearchController {
    
    @GetMapping("/search")
    public SearchResult search(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return new SearchResult(query, page, size, sortBy);
    }
}

class SearchResult {
    public String query;
    public int page;
    public int size;
    public String sortBy;
    
    public SearchResult(String query, int page, int size, String sortBy) {
        this.query = query;
        this.page = page;
        this.size = size;
        this.sortBy = sortBy;
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@RequestParam",
            description: "Should use @RequestParam",
          },
          {
            input: "",
            expectedOutput: "defaultValue",
            description: "Should have default values",
          },
        ],
      },
      {
        title: "Request Body with @RequestBody",
        type: "practice" as const,
        content: `# Request Body with @RequestBody

## Basic Usage

\`\`\`java
@PostMapping("/users")
public User createUser(@RequestBody User user) {
    return userService.save(user);
}

// Request: POST /users
// Body: {"name": "John", "email": "john@example.com"}
\`\`\`

## Using DTOs

\`\`\`java
// Request DTO
public class CreateUserRequest {
    private String name;
    private String email;
    private String password;
    // getters and setters
}

// Response DTO
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    // no password exposed
}

@PostMapping("/users")
public UserResponse createUser(@RequestBody CreateUserRequest request) {
    User user = userService.create(request);
    return new UserResponse(user);
}
\`\`\`

## With Validation

\`\`\`java
public class CreateUserRequest {
    @NotBlank
    private String name;
    
    @Email
    @NotBlank
    private String email;
    
    @Size(min = 8)
    private String password;
}

@PostMapping("/users")
public User createUser(@Valid @RequestBody CreateUserRequest request) {
    // Validation happens automatically
    return userService.create(request);
}
\`\`\`

## JSON Serialization

\`\`\`java
public class Product {
    private Long id;
    private String name;
    
    @JsonProperty("unit_price")  // Custom JSON key
    private double price;
    
    @JsonIgnore  // Excluded from JSON
    private String internalCode;
}
\`\`\``,
        order: 6,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create a user registration endpoint
// TODO: Create DTOs and implement the endpoint

// TODO: Create request DTO with fields: name, email, password

// TODO: Create response DTO with fields: id, name, email (no password!)

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    // TODO: Implement POST endpoint that:
    // 1. Accepts CreateUserRequest as body
    // 2. Returns UserResponse
    @PostMapping
    public UserResponse registerUser(CreateUserRequest request) {
        // Simulate user creation
        return new UserResponse(1L, request.getName(), request.getEmail());
    }
}`,
        solution: `import org.springframework.web.bind.annotation.*;

class CreateUserRequest {
    private String name;
    private String email;
    private String password;
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class UserResponse {
    private Long id;
    private String name;
    private String email;
    
    public UserResponse(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    public UserResponse registerUser(@RequestBody CreateUserRequest request) {
        return new UserResponse(1L, request.getName(), request.getEmail());
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@RequestBody",
            description: "Should use @RequestBody",
          },
          {
            input: "",
            expectedOutput: "UserResponse",
            description: "Should return UserResponse",
          },
        ],
      },
      {
        title: "Response Entity and Status Codes",
        type: "practice" as const,
        content: `# ResponseEntity and Status Codes

## Basic ResponseEntity

\`\`\`java
@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    if (user == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
}
\`\`\`

## Common Status Codes

\`\`\`java
// 200 OK
return ResponseEntity.ok(data);
return ResponseEntity.ok().body(data);

// 201 Created
return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);

// 204 No Content
return ResponseEntity.noContent().build();

// 400 Bad Request
return ResponseEntity.badRequest().body("Invalid input");

// 404 Not Found
return ResponseEntity.notFound().build();

// 500 Internal Server Error
return ResponseEntity.internalServerError().body("Error occurred");
\`\`\`

## Full Example

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User saved = userService.save(user);
        URI location = URI.create("/api/users/" + saved.getId());
        return ResponseEntity.created(location).body(saved);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userService.exists(id)) {
            return ResponseEntity.notFound().build();
        }
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
\`\`\``,
        order: 7,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Implement a controller with proper HTTP status codes
// TODO: Return appropriate status codes for each operation

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private Map<Long, Task> tasks = new HashMap<>();
    private Long nextId = 1L;
    
    // TODO: GET task by ID
    // Return 200 if found, 404 if not found
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        // Implement
        return null;
    }
    
    // TODO: POST create task
    // Return 201 Created with Location header
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        // Implement
        return null;
    }
    
    // TODO: DELETE task
    // Return 204 No Content if deleted, 404 if not found
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        // Implement
        return null;
    }
}

class Task {
    private Long id;
    private String title;
    private boolean completed;
    // getters and setters
}`,
        solution: `import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private Map<Long, Task> tasks = new HashMap<>();
    private Long nextId = 1L;
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = tasks.get(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task);
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        task.setId(nextId++);
        tasks.put(task.getId(), task);
        URI location = URI.create("/api/tasks/" + task.getId());
        return ResponseEntity.created(location).body(task);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (!tasks.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        tasks.remove(id);
        return ResponseEntity.noContent().build();
    }
}

class Task {
    private Long id;
    private String title;
    private boolean completed;
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "ResponseEntity",
            description: "Should use ResponseEntity",
          },
          {
            input: "",
            expectedOutput: "notFound()",
            description: "Should return 404 for missing resources",
          },
          {
            input: "",
            expectedOutput: "created(",
            description: "Should return 201 for creation",
          },
        ],
      },
      {
        title: "Exception Handling with @ControllerAdvice",
        type: "practice" as const,
        content: `# Exception Handling with @ControllerAdvice

## Global Exception Handler

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        return ResponseEntity.internalServerError().body(error);
    }
}
\`\`\`

## Error Response DTO

\`\`\`java
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private List<String> errors;
    
    // constructors, getters, setters
}
\`\`\`

## Custom Exception

\`\`\`java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id: " + id);
    }
}

// Usage in service
public User findById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User", id));
}
\`\`\``,
        order: 8,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `// Create a global exception handler
// TODO: Implement exception handlers for different scenarios

// Error response class
class ErrorResponse {
    private int status;
    private String message;
    private String timestamp;
    
    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = java.time.LocalDateTime.now().toString();
    }
    
    // getters
    public int getStatus() { return status; }
    public String getMessage() { return message; }
    public String getTimestamp() { return timestamp; }
}

// Custom exception
class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User not found with id: " + id);
    }
}

// TODO: Create the exception handler class
// 1. Handle UserNotFoundException -> 404
// 2. Handle IllegalArgumentException -> 400
// 3. Handle generic Exception -> 500

public class GlobalExceptionHandler {
    
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        // Implement
        return null;
    }
    
    public ResponseEntity<ErrorResponse> handleBadRequest(IllegalArgumentException ex) {
        // Implement
        return null;
    }
    
    public ResponseEntity<ErrorResponse> handleGenericError(Exception ex) {
        // Implement
        return null;
    }
}`,
        solution: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

class ErrorResponse {
    private int status;
    private String message;
    private String timestamp;
    
    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = java.time.LocalDateTime.now().toString();
    }
    
    public int getStatus() { return status; }
    public String getMessage() { return message; }
    public String getTimestamp() { return timestamp; }
}

class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User not found with id: " + id);
    }
}

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericError(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An unexpected error occurred"
        );
        return ResponseEntity.internalServerError().body(error);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@RestControllerAdvice",
            description: "Should use @RestControllerAdvice",
          },
          {
            input: "",
            expectedOutput: "@ExceptionHandler",
            description: "Should have @ExceptionHandler methods",
          },
        ],
      },
      {
        title: "Input Validation with @Valid",
        type: "practice" as const,
        content: `# Input Validation with @Valid

## Adding Validation Dependency

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`

## Validation Annotations

\`\`\`java
public class CreateUserRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Must be at least 18")
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;
    
    @Pattern(regexp = "^\\\\+?[0-9]{10,14}$", message = "Invalid phone number")
    private String phone;
    
    // getters and setters
}
\`\`\`

## Using @Valid in Controller

\`\`\`java
@PostMapping("/users")
public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
    // If validation fails, MethodArgumentNotValidException is thrown
    return ResponseEntity.ok(userService.create(request));
}
\`\`\`

## Handling Validation Errors

\`\`\`java
@RestControllerAdvice
public class ValidationExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }
}
\`\`\``,
        order: 9,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `// Create a validated DTO for product creation
// TODO: Add validation annotations to the fields

public class CreateProductRequest {
    
    // Name: required, 3-100 characters
    private String name;
    
    // Description: optional, max 500 characters
    private String description;
    
    // Price: required, minimum 0.01
    private Double price;
    
    // SKU: required, pattern ABC-12345 format
    private String sku;
    
    // Quantity: required, minimum 0
    private Integer quantity;
    
    // getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}`,
        solution: `import jakarta.validation.constraints.*;

public class CreateProductRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be 3-100 characters")
    private String name;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be at least 0.01")
    private Double price;
    
    @NotBlank(message = "SKU is required")
    @Pattern(regexp = "^[A-Z]{3}-\\\\d{5}$", message = "SKU must be in ABC-12345 format")
    private String sku;
    
    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@NotBlank",
            description: "Should have @NotBlank validations",
          },
          {
            input: "",
            expectedOutput: "@Size",
            description: "Should have @Size constraints",
          },
          {
            input: "",
            expectedOutput: "@Pattern",
            description: "Should have @Pattern for SKU",
          },
        ],
      },
      {
        title: "Building a Complete CRUD API",
        type: "challenge" as const,
        content: `# Challenge: Build a Complete CRUD API

Build a complete REST API for a **Task Management** system.

## Requirements

### Task Entity
- id (Long)
- title (String, required, 3-100 chars)
- description (String, optional, max 500 chars)
- status (enum: PENDING, IN_PROGRESS, COMPLETED)
- priority (enum: LOW, MEDIUM, HIGH)
- dueDate (LocalDate, optional)
- createdAt (LocalDateTime)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List all tasks |
| GET | /api/tasks/{id} | Get task by ID |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| GET | /api/tasks/status/{status} | Filter by status |

### Requirements

1. Use proper HTTP status codes
2. Implement validation on create/update
3. Handle exceptions globally
4. Use DTOs for request/response
5. Include proper error messages`,
        order: 10,
        xpReward: 50,
        estimatedMinutes: 30,
        language: "java",
        codeTemplate: `// Build a complete Task Management API
// This is a challenge - implement all the components!

// TODO: 1. Create Task entity with all fields

// TODO: 2. Create TaskStatus and Priority enums

// TODO: 3. Create CreateTaskRequest DTO with validation

// TODO: 4. Create TaskResponse DTO

// TODO: 5. Create TaskService with in-memory storage

// TODO: 6. Create TaskController with all CRUD endpoints

// TODO: 7. Create GlobalExceptionHandler

// Start with the basic structure:

public class Task {
    // Add fields: id, title, description, status, priority, dueDate, createdAt
}

enum TaskStatus {
    PENDING, IN_PROGRESS, COMPLETED
}

enum Priority {
    LOW, MEDIUM, HIGH
}

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    // Implement all CRUD endpoints
}`,
        solution: `import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.net.URI;

enum TaskStatus { PENDING, IN_PROGRESS, COMPLETED }
enum Priority { LOW, MEDIUM, HIGH }

class Task {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Priority priority;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }
    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

class CreateTaskRequest {
    @NotBlank @Size(min = 3, max = 100)
    private String title;
    @Size(max = 500)
    private String description;
    @NotNull
    private Priority priority;
    private LocalDate dueDate;
    
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public Priority getPriority() { return priority; }
    public LocalDate getDueDate() { return dueDate; }
}

@RestController
@RequestMapping("/api/tasks")
class TaskController {
    private final Map<Long, Task> tasks = new HashMap<>();
    private Long nextId = 1L;
    
    @GetMapping
    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks.values());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = tasks.get(id);
        return task != null ? ResponseEntity.ok(task) : ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskRequest request) {
        Task task = new Task();
        task.setId(nextId++);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        tasks.put(task.getId(), task);
        return ResponseEntity.created(URI.create("/api/tasks/" + task.getId())).body(task);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody CreateTaskRequest request) {
        Task task = tasks.get(id);
        if (task == null) return ResponseEntity.notFound().build();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        return ResponseEntity.ok(task);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (!tasks.containsKey(id)) return ResponseEntity.notFound().build();
        tasks.remove(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(@PathVariable TaskStatus status) {
        return tasks.values().stream()
            .filter(t -> t.getStatus() == status)
            .collect(Collectors.toList());
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@RestController",
            description: "Should have REST controller",
          },
          {
            input: "",
            expectedOutput: "@Valid",
            description: "Should validate input",
          },
          {
            input: "",
            expectedOutput: "ResponseEntity",
            description: "Should use ResponseEntity",
          },
        ],
      },
    ];

    for (const lesson of module3Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module3Id,
        courseId,
        ...lesson,
      });
    }

    return {
      message: "Spring Boot course created successfully!",
      courseId,
      modules: 3,
      lessons: module1Lessons.length + module2Lessons.length + module3Lessons.length,
    };
  },
});
