import { mutation } from "./_generated/server";

export const seedSpringBootPart3 = mutation({
  args: {},
  handler: async (ctx) => {
    const course = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("slug"), "spring-boot-masterclass"))
      .first();

    if (!course) {
      return { error: "Spring Boot course not found. Run seedSpringBootCourse first." };
    }

    const courseId = course._id;

    // ============================================
    // MODULE 7: Microservices Fundamentals
    // ============================================
    const module7Id = await ctx.db.insert("modules", {
      courseId,
      title: "Microservices Fundamentals",
      order: 7,
    });

    const module7Lessons = [
      {
        title: "Monolith vs Microservices",
        type: "theory" as const,
        content: `# Monolith vs Microservices

## Monolithic Architecture

All components in a single deployable unit.

\`\`\`
┌─────────────────────────────────────┐
│           Monolith App              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ UI  │ │Users│ │Order│ │ Pay │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│         Single Database             │
└─────────────────────────────────────┘
\`\`\`

**Pros:**
- Simple to develop initially
- Easy to test
- Simple deployment

**Cons:**
- Difficult to scale
- Technology lock-in
- Single point of failure
- Slow deployments

## Microservices Architecture

Loosely coupled, independently deployable services.

\`\`\`
┌─────────┐  ┌─────────┐  ┌─────────┐
│  User   │  │  Order  │  │ Payment │
│ Service │  │ Service │  │ Service │
│   DB    │  │   DB    │  │   DB    │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
     └────────────┼────────────┘
                  │
           API Gateway
\`\`\`

**Pros:**
- Independent scaling
- Technology flexibility
- Fault isolation
- Faster deployments
- Team autonomy

**Cons:**
- Distributed complexity
- Network latency
- Data consistency challenges
- Operational overhead

## When to Use Microservices?

✅ Use when:
- Large, complex applications
- Multiple teams working on same product
- Need independent scaling
- Different technology requirements

❌ Avoid when:
- Small applications
- Small teams
- Tight deadlines
- Simple business logic`,
        order: 1,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
      {
        title: "Service Discovery with Eureka",
        type: "practice" as const,
        content: `# Service Discovery with Netflix Eureka

## Why Service Discovery?

In microservices, services need to find each other dynamically.

\`\`\`
Without Discovery:
Service A → hardcoded URL → Service B
(What if Service B moves or scales?)

With Discovery:
Service A → Ask Eureka → Get Service B address → Service B
\`\`\`

## Setting Up Eureka Server

### Dependencies (pom.xml)
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
\`\`\`

### Main Application
\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
\`\`\`

### application.yml
\`\`\`yaml
server:
  port: 8761

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    wait-time-in-ms-when-sync-empty: 0
\`\`\`

## Setting Up Eureka Client

### Dependencies
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

### application.yml
\`\`\`yaml
spring:
  application:
    name: user-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
\`\`\`

Access Eureka Dashboard: http://localhost:8761`,
        order: 2,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `// Create a Eureka Server application
// TODO: Add the necessary annotations and configuration

// Eureka Server Main Class
@SpringBootApplication
// TODO: Add annotation to enable Eureka Server
public class DiscoveryServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(DiscoveryServerApplication.class, args);
    }
}

// Eureka Client - User Service Main Class  
@SpringBootApplication
// TODO: Add annotation to enable discovery client
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// Write the application.yml for Eureka Server
/*
server:
  port: ???

eureka:
  client:
    register-with-eureka: ???
    fetch-registry: ???
*/

// Write the application.yml for User Service
/*
spring:
  application:
    name: ???

server:
  port: 8081

eureka:
  client:
    service-url:
      defaultZone: ???
*/`,
        solution: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(DiscoveryServerApplication.class, args);
    }
}

// User Service (Eureka Client)
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

/*
Eureka Server - application.yml:

server:
  port: 8761

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false

---

User Service - application.yml:

spring:
  application:
    name: user-service

server:
  port: 8081

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
*/`,
        testCases: [
          {
            input: "",
            expectedOutput: "@EnableEurekaServer",
            description: "Should have Eureka Server annotation",
          },
          {
            input: "",
            expectedOutput: "@EnableDiscoveryClient",
            description: "Should have Discovery Client annotation",
          },
        ],
      },
      {
        title: "Spring Cloud Gateway",
        type: "practice" as const,
        content: `# Spring Cloud Gateway

## What is API Gateway?

Single entry point for all client requests to microservices.

\`\`\`
Client → API Gateway → Route to appropriate service
                    ├→ User Service
                    ├→ Order Service
                    └→ Payment Service
\`\`\`

## Features
- Request routing
- Load balancing
- Authentication
- Rate limiting
- Circuit breaking

## Setting Up Gateway

### Dependencies
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

### application.yml
\`\`\`yaml
server:
  port: 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/orders/**

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
\`\`\`

## Route Predicates

\`\`\`yaml
predicates:
  - Path=/api/**           # Path matching
  - Method=GET,POST        # HTTP method
  - Header=X-Request-Id    # Header exists
  - Query=name             # Query parameter exists
  - After=2024-01-01T00:00:00  # Time-based
\`\`\`

## Filters

\`\`\`yaml
filters:
  - AddRequestHeader=X-Request-Id, 123
  - AddResponseHeader=X-Response-Id, 456
  - RewritePath=/api/(?<segment>.*), /\${segment}
  - CircuitBreaker=name=myCircuitBreaker
\`\`\``,
        order: 3,
        xpReward: 35,
        estimatedMinutes: 20,
        language: "java",
        codeTemplate: `// Configure Spring Cloud Gateway
// TODO: Write the application.yml configuration

/*
Gateway should:
1. Run on port 8080
2. Connect to Eureka at localhost:8761
3. Route /users/** to USER-SERVICE
4. Route /orders/** to ORDER-SERVICE  
5. Route /products/** to PRODUCT-SERVICE
6. Add a custom header to all requests
*/

// Write application.yml here:
server:
  port: ???

spring:
  application:
    name: ???
  cloud:
    gateway:
      routes:
        # TODO: Define routes for user-service
        
        # TODO: Define routes for order-service
        
        # TODO: Define routes for product-service

eureka:
  client:
    service-url:
      defaultZone: ???`,
        solution: `# Spring Cloud Gateway Configuration

server:
  port: 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      default-filters:
        - AddRequestHeader=X-Gateway-Request, true
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/users/**
          filters:
            - RewritePath=/users/(?<segment>.*), /api/users/\${segment}
            
        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/orders/**
          filters:
            - RewritePath=/orders/(?<segment>.*), /api/orders/\${segment}
            
        - id: product-service
          uri: lb://PRODUCT-SERVICE
          predicates:
            - Path=/products/**
          filters:
            - RewritePath=/products/(?<segment>.*), /api/products/\${segment}

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/`,
        testCases: [
          {
            input: "",
            expectedOutput: "api-gateway",
            description: "Should name the application api-gateway",
          },
          {
            input: "",
            expectedOutput: "lb://",
            description: "Should use load-balanced URIs",
          },
        ],
      },
      {
        title: "Inter-Service Communication with Feign",
        type: "practice" as const,
        content: `# Inter-Service Communication with Feign

## What is Feign?

Declarative REST client that makes service-to-service calls easy.

## Setting Up Feign

### Dependencies
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
\`\`\`

### Enable Feign Clients
\`\`\`java
@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
\`\`\`

### Define Feign Client Interface
\`\`\`java
@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {
    
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable Long id);
    
    @GetMapping("/api/users")
    List<User> getAllUsers();
    
    @PostMapping("/api/users")
    User createUser(@RequestBody User user);
}
\`\`\`

### Using the Feign Client
\`\`\`java
@Service
public class OrderService {
    
    private final UserServiceClient userServiceClient;
    
    public OrderService(UserServiceClient userServiceClient) {
        this.userServiceClient = userServiceClient;
    }
    
    public Order createOrder(Long userId, OrderRequest request) {
        // Call User Service to get user details
        User user = userServiceClient.getUserById(userId);
        
        if (user == null) {
            throw new UserNotFoundException(userId);
        }
        
        // Create order with user info
        Order order = new Order();
        order.setUserId(userId);
        order.setUserEmail(user.getEmail());
        order.setItems(request.getItems());
        
        return orderRepository.save(order);
    }
}
\`\`\`

## Error Handling with Fallback

\`\`\`java
@FeignClient(name = "USER-SERVICE", fallback = UserServiceFallback.class)
public interface UserServiceClient {
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable Long id);
}

@Component
class UserServiceFallback implements UserServiceClient {
    @Override
    public User getUserById(Long id) {
        // Return default user or throw custom exception
        return new User(id, "Unknown", "N/A");
    }
}
\`\`\``,
        order: 4,
        xpReward: 35,
        estimatedMinutes: 20,
        language: "java",
        codeTemplate: `// Create Feign clients for inter-service communication
// Scenario: Order Service needs to call User Service and Product Service

// TODO: Enable Feign clients in main application
@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

// TODO: Create Feign client for User Service
// Methods: getUserById(Long id), getUserByEmail(String email)
public interface UserClient {
    
}

// TODO: Create Feign client for Product Service  
// Methods: getProductById(Long id), checkStock(Long productId, int quantity)
public interface ProductClient {
    
}

// TODO: Create OrderService that uses both clients
@Service
public class OrderService {
    
    // Inject clients
    
    // Method to create order:
    // 1. Get user from User Service
    // 2. Check product stock from Product Service
    // 3. Create and save order
    public Order createOrder(Long userId, Long productId, int quantity) {
        return null;
    }
}`,
        solution: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

@FeignClient(name = "USER-SERVICE")
interface UserClient {
    
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable("id") Long id);
    
    @GetMapping("/api/users/email/{email}")
    User getUserByEmail(@PathVariable("email") String email);
}

@FeignClient(name = "PRODUCT-SERVICE")
interface ProductClient {
    
    @GetMapping("/api/products/{id}")
    Product getProductById(@PathVariable("id") Long id);
    
    @GetMapping("/api/products/{productId}/stock")
    boolean checkStock(@PathVariable("productId") Long productId, 
                       @RequestParam("quantity") int quantity);
}

@Service
class OrderService {
    
    private final UserClient userClient;
    private final ProductClient productClient;
    private final OrderRepository orderRepository;
    
    public OrderService(UserClient userClient, ProductClient productClient, 
                       OrderRepository orderRepository) {
        this.userClient = userClient;
        this.productClient = productClient;
        this.orderRepository = orderRepository;
    }
    
    public Order createOrder(Long userId, Long productId, int quantity) {
        // 1. Get user from User Service
        User user = userClient.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found: " + userId);
        }
        
        // 2. Check product stock from Product Service
        boolean inStock = productClient.checkStock(productId, quantity);
        if (!inStock) {
            throw new RuntimeException("Product out of stock: " + productId);
        }
        
        // 3. Get product details
        Product product = productClient.getProductById(productId);
        
        // 4. Create and save order
        Order order = new Order();
        order.setUserId(userId);
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setTotalPrice(product.getPrice() * quantity);
        
        return orderRepository.save(order);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@EnableFeignClients",
            description: "Should enable Feign clients",
          },
          {
            input: "",
            expectedOutput: "@FeignClient",
            description: "Should use @FeignClient annotation",
          },
        ],
      },
    ];

    for (const lesson of module7Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module7Id,
        courseId,
        ...lesson,
      });
    }

    // ============================================
    // MODULE 8: Docker & Deployment
    // ============================================
    const module8Id = await ctx.db.insert("modules", {
      courseId,
      title: "Docker & Deployment",
      order: 8,
    });

    const module8Lessons = [
      {
        title: "Dockerizing Spring Boot Applications",
        type: "practice" as const,
        content: `# Dockerizing Spring Boot Applications

## Basic Dockerfile

\`\`\`dockerfile
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Multi-Stage Build (Optimized)

\`\`\`dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Building and Running

\`\`\`bash
# Build the image
docker build -t my-spring-app:1.0 .

# Run the container
docker run -d -p 8080:8080 --name myapp my-spring-app:1.0

# View logs
docker logs -f myapp

# Stop container
docker stop myapp
\`\`\`

## Environment Variables

\`\`\`dockerfile
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

\`\`\`bash
# Override at runtime
docker run -e SPRING_PROFILES_ACTIVE=dev -p 8080:8080 my-spring-app
\`\`\`

## Spring Boot with Buildpacks (No Dockerfile needed!)

\`\`\`bash
# Using Spring Boot Maven plugin
./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=myapp:latest
\`\`\``,
        order: 1,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `# Create an optimized Dockerfile for a Spring Boot application
# TODO: Complete the Dockerfile

# Build stage
FROM ???
WORKDIR /app

# Copy Maven files first (for caching)
COPY pom.xml .
# TODO: Download dependencies (optional optimization)

# Copy source and build
COPY src ./src
# TODO: Build the application

# Run stage  
FROM ???
WORKDIR /app

# TODO: Copy JAR from build stage

# Set environment variables
ENV JAVA_OPTS=""
ENV SPRING_PROFILES_ACTIVE=prod

# Expose port
EXPOSE 8080

# TODO: Define entrypoint with JAVA_OPTS support
ENTRYPOINT ???`,
        solution: `# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven files first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Set environment variables
ENV JAVA_OPTS=""
ENV SPRING_PROFILES_ACTIVE=prod

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

# Expose port
EXPOSE 8080

# Entrypoint with JAVA_OPTS support
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`,
        testCases: [
          {
            input: "",
            expectedOutput: "FROM maven",
            description: "Should use Maven for build stage",
          },
          {
            input: "",
            expectedOutput: "COPY --from=build",
            description: "Should copy from build stage",
          },
        ],
      },
      {
        title: "Docker Compose for Microservices",
        type: "practice" as const,
        content: `# Docker Compose for Microservices

## docker-compose.yml Structure

\`\`\`yaml
version: '3.8'

services:
  eureka-server:
    build: ./eureka-server
    ports:
      - "8761:8761"
    networks:
      - microservices-network

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - eureka-server
    environment:
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
    networks:
      - microservices-network

  user-service:
    build: ./user-service
    ports:
      - "8081:8081"
    depends_on:
      - eureka-server
      - postgres
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/userdb
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
    networks:
      - microservices-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=userdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - microservices-network

networks:
  microservices-network:
    driver: bridge

volumes:
  postgres-data:
\`\`\`

## Commands

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Scale a service
docker-compose up -d --scale user-service=3
\`\`\``,
        order: 2,
        xpReward: 35,
        estimatedMinutes: 20,
        language: "java",
        codeTemplate: `# Create docker-compose.yml for a microservices stack
# Services: eureka-server, api-gateway, user-service, order-service, mysql

version: '3.8'

services:
  # TODO: Eureka Server on port 8761
  
  # TODO: API Gateway on port 8080, depends on eureka
  
  # TODO: User Service on port 8081, depends on eureka and mysql
  
  # TODO: Order Service on port 8082, depends on eureka and mysql
  
  # TODO: MySQL database

networks:
  # TODO: Create network

volumes:
  # TODO: Create volume for MySQL data`,
        solution: `version: '3.8'

services:
  eureka-server:
    build: ./eureka-server
    container_name: eureka-server
    ports:
      - "8761:8761"
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8761/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 5

  api-gateway:
    build: ./api-gateway
    container_name: api-gateway
    ports:
      - "8080:8080"
    depends_on:
      eureka-server:
        condition: service_healthy
    environment:
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
    networks:
      - app-network

  user-service:
    build: ./user-service
    container_name: user-service
    ports:
      - "8081:8081"
    depends_on:
      eureka-server:
        condition: service_healthy
      mysql:
        condition: service_healthy
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/userdb
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=password
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
    networks:
      - app-network

  order-service:
    build: ./order-service
    container_name: order-service
    ports:
      - "8082:8082"
    depends_on:
      eureka-server:
        condition: service_healthy
      mysql:
        condition: service_healthy
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/orderdb
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=password
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
    networks:
      - app-network

  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=userdb
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 30s
      timeout: 10s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  mysql-data:`,
        testCases: [
          {
            input: "",
            expectedOutput: "depends_on",
            description: "Should define service dependencies",
          },
          {
            input: "",
            expectedOutput: "networks",
            description: "Should define networks",
          },
        ],
      },
      {
        title: "Production Best Practices",
        type: "theory" as const,
        content: `# Production Best Practices

## 1. Configuration Management

\`\`\`yaml
# Use environment variables for sensitive data
spring:
  datasource:
    url: \${DATABASE_URL}
    username: \${DATABASE_USER}
    password: \${DATABASE_PASSWORD}

# Never hardcode secrets!
\`\`\`

## 2. Health Checks & Monitoring

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

\`\`\`yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when_authorized
\`\`\`

## 3. Logging Configuration

\`\`\`yaml
logging:
  level:
    root: INFO
    com.myapp: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: /var/log/myapp/application.log
\`\`\`

## 4. Security Checklist

- ✅ Use HTTPS in production
- ✅ Enable CSRF protection for web apps
- ✅ Implement rate limiting
- ✅ Validate all inputs
- ✅ Use parameterized queries (JPA does this)
- ✅ Keep dependencies updated
- ✅ Don't expose stack traces
- ✅ Use security headers

## 5. Performance Optimization

\`\`\`yaml
# Connection pooling
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000

# Enable caching
spring:
  cache:
    type: redis
\`\`\`

## 6. JVM Settings

\`\`\`bash
java -Xms512m -Xmx1024m \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -jar app.jar
\`\`\``,
        order: 3,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
      },
    ];

    for (const lesson of module8Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module8Id,
        courseId,
        ...lesson,
      });
    }

    // Update course with final lesson count
    const allLessons = await ctx.db
      .query("lessons")
      .filter((q) => q.eq(q.field("courseId"), courseId))
      .collect();

    await ctx.db.patch(courseId, {
      totalLessons: allLessons.length,
    });

    return {
      message: "Spring Boot Part 3 (Microservices & Docker) created successfully!",
      courseId,
      modulesAdded: 2,
      totalLessons: module7Lessons.length + module8Lessons.length,
      grandTotalLessons: allLessons.length,
    };
  },
});
