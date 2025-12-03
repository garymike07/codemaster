import { mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

type LessonType = "theory" | "practice" | "challenge" | "project" | "quiz";

interface LessonData {
  title: string;
  type: LessonType;
  content: string;
  order: number;
  xpReward: number;
  estimatedMinutes: number;
  codeTemplate?: string;
  solution?: string;
  testCases?: string;
}

interface ModuleData {
  title: string;
  lessons: LessonData[];
}

// Helper to create lessons with courseId
async function createLessons(
  ctx: any, 
  moduleId: Id<"modules">, 
  courseId: Id<"courses">, 
  lessons: LessonData[]
) {
  for (const lesson of lessons) {
    await ctx.db.insert("lessons", {
      moduleId,
      courseId,
      title: lesson.title,
      type: lesson.type,
      content: lesson.content,
      order: lesson.order,
      xpReward: lesson.xpReward,
      estimatedMinutes: lesson.estimatedMinutes,
      language: "java",
      ...(lesson.codeTemplate && { codeTemplate: lesson.codeTemplate }),
      ...(lesson.solution && { solution: lesson.solution }),
      ...(lesson.testCases && { testCases: JSON.parse(lesson.testCases) }),
    });
  }
}

export const seedSpringBootV2 = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete existing course if present
    const existing = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("slug"), "spring-boot-masterclass"))
      .first();

    if (existing) {
      const modules = await ctx.db.query("modules").filter((q) => q.eq(q.field("courseId"), existing._id)).collect();
      for (const module of modules) {
        const lessons = await ctx.db.query("lessons").filter((q) => q.eq(q.field("moduleId"), module._id)).collect();
        for (const lesson of lessons) await ctx.db.delete(lesson._id);
        await ctx.db.delete(module._id);
      }
      await ctx.db.delete(existing._id);
    }

    // Create course
    const courseId = await ctx.db.insert("courses", {
      slug: "spring-boot-masterclass",
      title: "Spring Boot Masterclass",
      description: "Master Spring Boot from zero to production. Learn IoC, DI, REST APIs, JPA, Security, Testing, Microservices, and Docker deployment.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      language: "java",
      difficulty: "beginner",
      totalLessons: 69,
      estimatedHours: 50,
      isPublished: true,
      createdAt: Date.now(),
    });

    // ========== MODULE 1: Introduction ==========
    const m1 = await ctx.db.insert("modules", { courseId, title: "Introduction to Spring Boot", order: 1 });
    await createLessons(ctx, m1, courseId, [
      {
        title: "What is Spring Framework vs Spring Boot?",
        type: "theory",
        content: `# What is Spring Framework vs Spring Boot?

## Spring Framework
Spring Framework provides IoC, DI, AOP, and MVC capabilities but requires extensive XML configuration.

## Spring Boot
Spring Boot builds ON TOP of Spring and adds:
- **Auto-configuration**: Configure beans automatically
- **Embedded servers**: No need for external Tomcat
- **Starter dependencies**: Pre-packaged dependencies
- **No XML**: Pure Java configuration

\`\`\`java
@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
\`\`\``,
        order: 1, xpReward: 10, estimatedMinutes: 12
      },
      {
        title: "Setting Up Your First Project",
        type: "practice",
        content: `# Setting Up Your First Project

## Using Spring Initializr
1. Go to start.spring.io
2. Select Maven, Java, latest Spring Boot
3. Add Spring Web dependency
4. Generate and unzip

## Project Structure
\`\`\`
src/main/java/com/example/demo/
├── DemoApplication.java
src/main/resources/
├── application.properties
\`\`\`

## Run the Application
\`\`\`bash
./mvnw spring-boot:run
\`\`\``,
        order: 2, xpReward: 20, estimatedMinutes: 15,
        codeTemplate: `package com.example.demo;

// TODO: Add @SpringBootApplication annotation
public class DemoApplication {
    public static void main(String[] args) {
        // TODO: Start the Spring application
    }
}`,
        solution: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`,
        testCases: JSON.stringify([{ input: "", expectedOutput: "@SpringBootApplication present" }])
      },
      {
        title: "Understanding @SpringBootApplication",
        type: "theory",
        content: `# Understanding @SpringBootApplication

This annotation combines three annotations:

\`\`\`java
@SpringBootConfiguration  // Configuration class
@EnableAutoConfiguration  // Auto-configure beans
@ComponentScan           // Scan for components
\`\`\`

## How It Works
1. Scans classpath for dependencies
2. Auto-configures matching beans
3. Scans for @Component, @Service, @Repository, @Controller

## Excluding Auto-Configuration
\`\`\`java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
\`\`\``,
        order: 3, xpReward: 15, estimatedMinutes: 10
      },
      {
        title: "Your First REST Endpoint",
        type: "challenge",
        content: `# Your First REST Endpoint

Create a controller that returns "Hello, Spring Boot!" at /hello.

\`\`\`java
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
\`\`\``,
        order: 4, xpReward: 30, estimatedMinutes: 15,
        codeTemplate: `package com.example.demo;

// TODO: Add @RestController
public class HelloController {
    // TODO: Add @GetMapping for /hello
    public String hello() {
        return null;
    }
}`,
        solution: `package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}`,
        testCases: JSON.stringify([{ input: "GET /hello", expectedOutput: "Hello, Spring Boot!" }])
      }
    ]);

    // ========== MODULE 2: IoC & Dependency Injection ==========
    const m2 = await ctx.db.insert("modules", { courseId, title: "IoC & Dependency Injection", order: 2 });
    await createLessons(ctx, m2, courseId, [
      {
        title: "Inversion of Control Explained",
        type: "theory",
        content: `# Inversion of Control (IoC)

## Without IoC
\`\`\`java
public class OrderService {
    private EmailService email = new EmailService(); // YOU create
}
\`\`\`

## With IoC
\`\`\`java
@Service
public class OrderService {
    private final EmailService email;
    public OrderService(EmailService email) { // Spring creates & injects
        this.email = email;
    }
}
\`\`\`

## Benefits
- Loose coupling
- Easy testing (inject mocks)
- Flexible configuration`,
        order: 1, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "Dependency Injection Types",
        type: "theory",
        content: `# Dependency Injection Types

## 1. Constructor Injection (RECOMMENDED)
\`\`\`java
@Service
public class OrderService {
    private final PaymentService payment;
    
    public OrderService(PaymentService payment) {
        this.payment = payment;
    }
}
\`\`\`

## 2. Setter Injection
\`\`\`java
@Service
public class OrderService {
    private PaymentService payment;
    
    @Autowired
    public void setPayment(PaymentService payment) {
        this.payment = payment;
    }
}
\`\`\`

## 3. Field Injection (NOT RECOMMENDED)
\`\`\`java
@Service
public class OrderService {
    @Autowired
    private PaymentService payment;
}
\`\`\``,
        order: 2, xpReward: 20, estimatedMinutes: 18
      },
      {
        title: "Bean Scopes and Lifecycle",
        type: "theory",
        content: `# Bean Scopes and Lifecycle

## Scopes
- **singleton** (default): One instance per container
- **prototype**: New instance each time
- **request**: One per HTTP request
- **session**: One per HTTP session

\`\`\`java
@Component
@Scope("prototype")
public class ShoppingCart { }
\`\`\`

## Lifecycle Callbacks
\`\`\`java
@Service
public class CacheService {
    @PostConstruct
    public void init() { /* After construction */ }
    
    @PreDestroy
    public void cleanup() { /* Before destruction */ }
}
\`\`\``,
        order: 3, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "Stereotype Annotations",
        type: "theory",
        content: `# Stereotype Annotations

| Annotation | Use Case |
|------------|----------|
| @Component | Generic component |
| @Service | Business logic |
| @Repository | Data access (+ exception translation) |
| @Controller | MVC controller |
| @RestController | REST API controller |

\`\`\`java
@Service
public class UserService {
    private final UserRepository repo;
    
    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> { }
\`\`\``,
        order: 4, xpReward: 15, estimatedMinutes: 12
      },
      {
        title: "@Autowired and @Qualifier",
        type: "practice",
        content: `# @Autowired and @Qualifier

## Multiple Implementations Problem
\`\`\`java
interface MessageService { void send(String msg); }

@Service class EmailService implements MessageService { }
@Service class SmsService implements MessageService { }

// Which one to inject?
@Service
public class NotificationService {
    @Autowired
    @Qualifier("emailService")
    private MessageService service;
}
\`\`\`

## @Primary Alternative
\`\`\`java
@Service
@Primary  // Default choice
class EmailService implements MessageService { }
\`\`\``,
        order: 5, xpReward: 25, estimatedMinutes: 18,
        codeTemplate: `// Create a PaymentService that uses @Qualifier to inject CreditCardProcessor
interface PaymentProcessor { void process(double amount); }

@Service class CreditCardProcessor implements PaymentProcessor { }
@Service class PayPalProcessor implements PaymentProcessor { }

@Service
public class PaymentService {
    // TODO: Inject CreditCardProcessor using @Autowired and @Qualifier
    private PaymentProcessor processor;
}`,
        solution: `@Service
public class PaymentService {
    @Autowired
    @Qualifier("creditCardProcessor")
    private PaymentProcessor processor;
}`,
        testCases: JSON.stringify([{ input: "", expectedOutput: "@Qualifier used correctly" }])
      },
      {
        title: "@Configuration and @Bean",
        type: "theory",
        content: `# @Configuration and @Bean

Use @Bean for third-party classes or complex initialization:

\`\`\`java
@Configuration
public class AppConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate template = new RestTemplate();
        // Configure timeouts, interceptors...
        return template;
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
            .registerModule(new JavaTimeModule());
    }
}
\`\`\``,
        order: 6, xpReward: 20, estimatedMinutes: 15
      }
    ]);

    // ========== MODULE 3: Building REST APIs ==========
    const m3 = await ctx.db.insert("modules", { courseId, title: "Building REST APIs", order: 3 });
    await createLessons(ctx, m3, courseId, [
      {
        title: "REST Principles and HTTP Methods",
        type: "theory",
        content: `# REST Principles

## HTTP Methods
| Method | Operation | Example |
|--------|-----------|---------|
| GET | Read | GET /users |
| POST | Create | POST /users |
| PUT | Replace | PUT /users/1 |
| PATCH | Update | PATCH /users/1 |
| DELETE | Remove | DELETE /users/1 |

## HTTP Status Codes
- 200 OK, 201 Created, 204 No Content
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 500 Server Error`,
        order: 1, xpReward: 15, estimatedMinutes: 12
      },
      {
        title: "Request Mapping Annotations",
        type: "theory",
        content: `# Request Mapping Annotations

\`\`\`java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @GetMapping              // GET /api/products
    public List<Product> getAll() { }
    
    @GetMapping("/{id}")     // GET /api/products/123
    public Product getById(@PathVariable Long id) { }
    
    @PostMapping             // POST /api/products
    public Product create(@RequestBody Product p) { }
    
    @PutMapping("/{id}")     // PUT /api/products/123
    public Product update(@PathVariable Long id, @RequestBody Product p) { }
    
    @DeleteMapping("/{id}")  // DELETE /api/products/123
    public void delete(@PathVariable Long id) { }
}
\`\`\``,
        order: 2, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "Path Variables and Request Parameters",
        type: "practice",
        content: `# Path Variables and Request Parameters

## @PathVariable
\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) { }

@GetMapping("/users/{userId}/orders/{orderId}")
public Order getOrder(@PathVariable Long userId, @PathVariable Long orderId) { }
\`\`\`

## @RequestParam
\`\`\`java
@GetMapping("/search")
public List<User> search(
    @RequestParam String query,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) { }
\`\`\``,
        order: 3, xpReward: 25, estimatedMinutes: 18,
        codeTemplate: `@RestController
@RequestMapping("/api/books")
public class BookController {
    // TODO: GET /api/books/{id} - return "Book: " + id
    
    // TODO: GET /api/books/search?author=x&year=2024 - return "Author: " + author + ", Year: " + year
}`,
        solution: `@RestController
@RequestMapping("/api/books")
public class BookController {
    @GetMapping("/{id}")
    public String getBook(@PathVariable Long id) {
        return "Book: " + id;
    }
    
    @GetMapping("/search")
    public String search(@RequestParam String author, @RequestParam(defaultValue = "2024") int year) {
        return "Author: " + author + ", Year: " + year;
    }
}`,
        testCases: JSON.stringify([{ input: "GET /api/books/42", expectedOutput: "Book: 42" }])
      },
      {
        title: "ResponseEntity for HTTP Responses",
        type: "practice",
        content: `# ResponseEntity

Control status codes and headers:

\`\`\`java
@GetMapping("/{id}")
public ResponseEntity<User> getById(@PathVariable Long id) {
    return userService.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PostMapping
public ResponseEntity<User> create(@RequestBody User user) {
    User saved = userService.save(user);
    URI location = URI.create("/api/users/" + saved.getId());
    return ResponseEntity.created(location).body(saved);
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}
\`\`\``,
        order: 4, xpReward: 25, estimatedMinutes: 20,
        codeTemplate: `// Create a TaskController with proper ResponseEntity usage`,
        solution: `@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private Map<Long, Task> tasks = new HashMap<>();
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        Task task = tasks.get(id);
        return task != null ? ResponseEntity.ok(task) : ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task) {
        tasks.put(task.getId(), task);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
}`,
        testCases: JSON.stringify([{ input: "404 scenario", expectedOutput: "ResponseEntity.notFound()" }])
      },
      {
        title: "Exception Handling with @ControllerAdvice",
        type: "theory",
        content: `# Exception Handling

\`\`\`java
class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String msg) { super(msg); }
}

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(404, ex.getMessage()));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(400, "Validation failed", errors));
    }
}
\`\`\``,
        order: 5, xpReward: 30, estimatedMinutes: 22
      },
      {
        title: "Input Validation with @Valid",
        type: "practice",
        content: `# Input Validation

\`\`\`java
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    private String name;
    
    @Email(message = "Invalid email")
    private String email;
    
    @Min(18) @Max(120)
    private Integer age;
}

@PostMapping
public User create(@Valid @RequestBody CreateUserRequest request) {
    return userService.create(request);
}
\`\`\``,
        order: 6, xpReward: 25, estimatedMinutes: 18,
        codeTemplate: `public class CreateProductRequest {
    // TODO: Add @NotBlank, @Size(2-100) to name
    private String name;
    
    // TODO: Add @NotNull, @Positive to price
    private Double price;
}`,
        solution: `public class CreateProductRequest {
    @NotBlank @Size(min = 2, max = 100)
    private String name;
    
    @NotNull @Positive
    private Double price;
}`,
        testCases: JSON.stringify([{ input: "Validation annotations", expectedOutput: "Present" }])
      }
    ]);

    // ========== MODULE 4: Spring Data JPA ==========
    const m4 = await ctx.db.insert("modules", { courseId, title: "Spring Data JPA", order: 4 });
    await createLessons(ctx, m4, courseId, [
      {
        title: "Introduction to ORM and JPA",
        type: "theory",
        content: `# ORM and JPA

**ORM**: Object-Relational Mapping - map Java objects to database tables
**JPA**: Java Persistence API - specification for ORM
**Hibernate**: Most popular JPA implementation
**Spring Data JPA**: Makes JPA even easier

\`\`\`java
// Without ORM
ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id = ?");
User user = new User();
user.setId(rs.getLong("id"));
user.setName(rs.getString("name"));

// With JPA
User user = entityManager.find(User.class, id);
\`\`\``,
        order: 1, xpReward: 15, estimatedMinutes: 12
      },
      {
        title: "Entity Mapping",
        type: "theory",
        content: `# Entity Mapping

\`\`\`java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }
}
\`\`\``,
        order: 2, xpReward: 20, estimatedMinutes: 18
      },
      {
        title: "Entity Relationships",
        type: "theory",
        content: `# Entity Relationships

## @OneToMany / @ManyToOne
\`\`\`java
@Entity
public class Author {
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Book> books;
}

@Entity
public class Book {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;
}
\`\`\`

## @ManyToMany
\`\`\`java
@Entity
public class Student {
    @ManyToMany
    @JoinTable(name = "enrollments",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses;
}
\`\`\``,
        order: 3, xpReward: 25, estimatedMinutes: 22
      },
      {
        title: "JpaRepository and Query Methods",
        type: "practice",
        content: `# JpaRepository

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Derived queries
    List<User> findByName(String name);
    Optional<User> findByEmail(String email);
    List<User> findByAgeGreaterThan(int age);
    List<User> findByNameContainingIgnoreCase(String keyword);
    long countByActive(boolean active);
    
    // Custom JPQL
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmailAddress(@Param("email") String email);
}
\`\`\``,
        order: 4, xpReward: 30, estimatedMinutes: 25,
        codeTemplate: `@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // TODO: Find by category
    // TODO: Find by price less than
    // TODO: Find by name containing (case insensitive)
    // TODO: Count by category
}`,
        solution: `@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByPriceLessThan(BigDecimal price);
    List<Product> findByNameContainingIgnoreCase(String keyword);
    long countByCategory(String category);
}`,
        testCases: JSON.stringify([{ input: "Query methods", expectedOutput: "Derived queries present" }])
      },
      {
        title: "Pagination and Sorting",
        type: "theory",
        content: `# Pagination and Sorting

\`\`\`java
@GetMapping
public Page<Product> getProducts(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "id") String sortBy) {
    
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
    return productRepository.findAll(pageable);
}

// Page object properties
page.getContent()      // List of items
page.getTotalElements() // Total count
page.getTotalPages()    // Total pages
page.hasNext()          // Has next page?
\`\`\``,
        order: 5, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "@Transactional",
        type: "theory",
        content: `# Transaction Management

\`\`\`java
@Service
@Transactional
public class OrderService {
    
    public Order createOrder(OrderRequest req) {
        Order order = orderRepo.save(new Order(req));
        paymentService.charge(req.getUserId(), order.getTotal());
        inventoryService.decreaseStock(req.getItems());
        emailService.sendConfirmation(order);
        return order;
        // If ANY step fails, ALL are rolled back
    }
    
    @Transactional(readOnly = true)  // Optimization
    public List<Order> findAll() {
        return orderRepo.findAll();
    }
}
\`\`\``,
        order: 6, xpReward: 25, estimatedMinutes: 18
      }
    ]);

    // ========== MODULE 5: CRUD Project ==========
    const m5 = await ctx.db.insert("modules", { courseId, title: "CRUD Operations Project", order: 5 });
    await createLessons(ctx, m5, courseId, [
      {
        title: "Service Layer Pattern",
        type: "theory",
        content: `# Service Layer Pattern

\`\`\`java
@Service
@Transactional
public class ProductService {
    private final ProductRepository repo;
    
    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }
    
    public List<Product> findAll() { return repo.findAll(); }
    
    public Product findById(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }
    
    public Product create(CreateProductRequest req) {
        Product p = new Product(req.getName(), req.getPrice());
        return repo.save(p);
    }
    
    public Product update(Long id, UpdateProductRequest req) {
        Product p = findById(id);
        if (req.getName() != null) p.setName(req.getName());
        if (req.getPrice() != null) p.setPrice(req.getPrice());
        return repo.save(p);
    }
    
    public void delete(Long id) {
        repo.delete(findById(id));
    }
}
\`\`\``,
        order: 1, xpReward: 25, estimatedMinutes: 20
      },
      {
        title: "DTO Pattern",
        type: "theory",
        content: `# DTO Pattern

Separate API contract from entities:

\`\`\`java
// Request DTO
public class CreateUserRequest {
    @NotBlank private String name;
    @Email private String email;
    @Size(min = 8) private String password;
}

// Response DTO (no password!)
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), 
            user.getEmail(), user.getCreatedAt());
    }
}
\`\`\``,
        order: 2, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "Complete CRUD API Challenge",
        type: "challenge",
        content: `# Complete CRUD API

Build a Book Management API with:
- Entity: Book (id, title, author, isbn, price)
- Repository: BookRepository
- Service: BookService with CRUD + exception handling
- Controller: REST endpoints
- Validation on DTOs

Endpoints:
- GET /api/books (paginated)
- GET /api/books/{id}
- POST /api/books
- PUT /api/books/{id}
- DELETE /api/books/{id}`,
        order: 3, xpReward: 50, estimatedMinutes: 45,
        codeTemplate: `// Implement a complete Book CRUD API`,
        solution: `@Entity
public class Book {
    @Id @GeneratedValue private Long id;
    private String title;
    private String author;
    private BigDecimal price;
}

@Repository
interface BookRepository extends JpaRepository<Book, Long> { }

@Service @Transactional
class BookService {
    private final BookRepository repo;
    public Book create(Book b) { return repo.save(b); }
    public Book findById(Long id) { return repo.findById(id).orElseThrow(); }
}

@RestController @RequestMapping("/api/books")
class BookController {
    private final BookService svc;
    @GetMapping public Page<Book> getAll(Pageable p) { return svc.findAll(p); }
    @PostMapping public ResponseEntity<Book> create(@Valid @RequestBody Book b) { 
        return ResponseEntity.status(201).body(svc.create(b)); 
    }
}`,
        testCases: JSON.stringify([{ input: "CRUD implementation", expectedOutput: "All endpoints working" }])
      }
    ]);

    // ========== MODULE 6: Spring Security ==========
    const m6 = await ctx.db.insert("modules", { courseId, title: "Spring Security", order: 6 });
    await createLessons(ctx, m6, courseId, [
      {
        title: "Authentication vs Authorization",
        type: "theory",
        content: `# Authentication vs Authorization

**Authentication (AuthN)**: "Who are you?" - Verify identity
**Authorization (AuthZ)**: "What can you do?" - Check permissions

HTTP Status Codes:
- 401 Unauthorized: Authentication failed
- 403 Forbidden: Authenticated but not authorized`,
        order: 1, xpReward: 15, estimatedMinutes: 10
      },
      {
        title: "Basic Security Configuration",
        type: "practice",
        content: `# Security Configuration

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\``,
        order: 2, xpReward: 30, estimatedMinutes: 25,
        codeTemplate: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // TODO: Configure SecurityFilterChain
    // - /public/** permitAll
    // - /admin/** requires ADMIN role
    // - Everything else authenticated
}`,
        solution: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable())
            .authorizeHttpRequests(a -> a
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
        testCases: JSON.stringify([{ input: "Security config", expectedOutput: "Properly configured" }])
      },
      {
        title: "JWT Authentication",
        type: "theory",
        content: `# JWT Authentication

\`\`\`java
@Component
public class JwtUtils {
    private final String secret = "mySecretKey256BitsLong";
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }
    
    public String getUsername(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
\`\`\``,
        order: 3, xpReward: 35, estimatedMinutes: 30
      },
      {
        title: "Role-Based Access Control",
        type: "theory",
        content: `# Role-Based Access Control

\`\`\`java
@Configuration
@EnableMethodSecurity
public class SecurityConfig { }

@RestController
public class AdminController {
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) { }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/reports")
    public List<Report> getReports() { }
    
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/users/{userId}/profile")
    public Profile getProfile(@PathVariable Long userId) { }
}
\`\`\``,
        order: 4, xpReward: 25, estimatedMinutes: 20
      }
    ]);

    // ========== MODULE 7: Testing ==========
    const m7 = await ctx.db.insert("modules", { courseId, title: "Testing Spring Boot", order: 7 });
    await createLessons(ctx, m7, courseId, [
      {
        title: "Unit Testing with Mockito",
        type: "theory",
        content: `# Unit Testing with Mockito

\`\`\`java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void findById_shouldReturnUser() {
        User user = new User(1L, "John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        User result = userService.findById(1L);
        
        assertEquals("John", result.getName());
        verify(userRepository).findById(1L);
    }
}
\`\`\``,
        order: 1, xpReward: 30, estimatedMinutes: 25
      },
      {
        title: "Testing Controllers with @WebMvcTest",
        type: "practice",
        content: `# @WebMvcTest

\`\`\`java
@WebMvcTest(ProductController.class)
class ProductControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ProductService productService;
    
    @Test
    void getAll_shouldReturnProducts() throws Exception {
        when(productService.findAll()).thenReturn(List.of(new Product("Test", 10.0)));
        
        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value("Test"));
    }
}
\`\`\``,
        order: 2, xpReward: 35, estimatedMinutes: 28,
        codeTemplate: `@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;
    
    // TODO: Test GET /api/users returns list
    // TODO: Test GET /api/users/{id} returns 404 when not found
}`,
        solution: `@Test
void getAll_shouldReturnUsers() throws Exception {
    when(userService.findAll()).thenReturn(List.of(new User(1L, "John")));
    mockMvc.perform(get("/api/users"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("John"));
}

@Test
void getById_notFound() throws Exception {
    when(userService.findById(99L)).thenThrow(new ResourceNotFoundException("Not found"));
    mockMvc.perform(get("/api/users/99"))
        .andExpect(status().isNotFound());
}`,
        testCases: JSON.stringify([{ input: "MockMvc tests", expectedOutput: "Pass" }])
      },
      {
        title: "@DataJpaTest and @SpringBootTest",
        type: "theory",
        content: `# Integration Testing

## @DataJpaTest - Repository Tests
\`\`\`java
@DataJpaTest
class UserRepositoryTest {
    @Autowired private UserRepository repo;
    @Autowired private TestEntityManager em;
    
    @Test
    void findByEmail_shouldReturnUser() {
        User user = new User("John", "john@test.com");
        em.persistAndFlush(user);
        
        Optional<User> found = repo.findByEmail("john@test.com");
        assertTrue(found.isPresent());
    }
}
\`\`\`

## @SpringBootTest - Full Integration
\`\`\`java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ApplicationTest {
    @Autowired private TestRestTemplate restTemplate;
    
    @Test
    void getUsers_shouldWork() {
        ResponseEntity<List> response = restTemplate.getForEntity("/api/users", List.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
\`\`\``,
        order: 3, xpReward: 30, estimatedMinutes: 25
      }
    ]);

    // ========== MODULE 8: Configuration ==========
    const m8 = await ctx.db.insert("modules", { courseId, title: "Configuration & Profiles", order: 8 });
    await createLessons(ctx, m8, courseId, [
      {
        title: "application.properties vs application.yml",
        type: "theory",
        content: `# Configuration Files

## application.properties
\`\`\`properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
\`\`\`

## application.yml (hierarchical)
\`\`\`yaml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
\`\`\``,
        order: 1, xpReward: 15, estimatedMinutes: 10
      },
      {
        title: "Profiles for Different Environments",
        type: "theory",
        content: `# Profiles

Create environment-specific configs:
- application-dev.yml
- application-prod.yml

\`\`\`yaml
# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:devdb
  jpa:
    show-sql: true

# application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/app
\`\`\`

Activate: \`java -jar app.jar --spring.profiles.active=prod\``,
        order: 2, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "@ConfigurationProperties",
        type: "practice",
        content: `# Type-Safe Configuration

\`\`\`java
@ConfigurationProperties(prefix = "app.email")
@Validated
public class EmailProperties {
    @NotBlank private String host;
    @Min(1) @Max(65535) private int port;
    private String username;
}

// application.yml
app:
  email:
    host: smtp.gmail.com
    port: 587
    username: myapp
\`\`\``,
        order: 3, xpReward: 25, estimatedMinutes: 18,
        codeTemplate: `@ConfigurationProperties(prefix = "app.db")
public class DatabaseProperties {
    // TODO: Add @NotBlank to url
    // TODO: Add @Min(1), @Max(100) to poolSize
}`,
        solution: `@ConfigurationProperties(prefix = "app.db")
@Validated
public class DatabaseProperties {
    @NotBlank private String url;
    @Min(1) @Max(100) private int poolSize = 10;
}`,
        testCases: JSON.stringify([{ input: "Validation annotations", expectedOutput: "Present" }])
      },
      {
        title: "Spring Boot Actuator",
        type: "theory",
        content: `# Actuator - Production Monitoring

\`\`\`yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always
\`\`\`

Endpoints:
- /actuator/health - App health
- /actuator/info - App info
- /actuator/metrics - Metrics
- /actuator/env - Environment`,
        order: 4, xpReward: 20, estimatedMinutes: 15
      }
    ]);

    // ========== MODULE 9: Microservices ==========
    const m9 = await ctx.db.insert("modules", { courseId, title: "Microservices Fundamentals", order: 9 });
    await createLessons(ctx, m9, courseId, [
      {
        title: "Monolith vs Microservices",
        type: "theory",
        content: `# Architecture Comparison

## Monolith
- Single deployment unit
- Shared database
- Simple but hard to scale parts independently

## Microservices
- Independent services
- Own databases
- Scale independently
- Complex infrastructure

Choose microservices when: large team, complex domain, need independent scaling`,
        order: 1, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "Service Discovery with Eureka",
        type: "theory",
        content: `# Eureka Service Discovery

## Eureka Server
\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApp { }
\`\`\`

## Eureka Client (your services)
\`\`\`yaml
spring:
  application:
    name: user-service
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
\`\`\`

Services register and discover each other automatically.`,
        order: 2, xpReward: 25, estimatedMinutes: 20
      },
      {
        title: "API Gateway",
        type: "theory",
        content: `# Spring Cloud Gateway

Single entry point for all requests:

\`\`\`yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/orders/**
\`\`\`

Features: routing, load balancing, rate limiting, auth`,
        order: 3, xpReward: 25, estimatedMinutes: 20
      },
      {
        title: "OpenFeign for Service Communication",
        type: "practice",
        content: `# OpenFeign - Declarative REST Client

\`\`\`java
@FeignClient(name = "user-service")
public interface UserServiceClient {
    
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable Long id);
    
    @PostMapping("/api/users")
    User createUser(@RequestBody CreateUserRequest req);
}

@Service
public class OrderService {
    private final UserServiceClient userClient;
    
    public Order createOrder(OrderRequest req) {
        User user = userClient.getUserById(req.getUserId());
        // Create order...
    }
}
\`\`\``,
        order: 4, xpReward: 30, estimatedMinutes: 22,
        codeTemplate: `@FeignClient(name = "product-service")
public interface ProductClient {
    // TODO: GET /api/products/{id}
    // TODO: PUT /api/products/{id}/stock with StockRequest body
}`,
        solution: `@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getById(@PathVariable Long id);
    
    @PutMapping("/api/products/{id}/stock")
    Product updateStock(@PathVariable Long id, @RequestBody StockRequest req);
}`,
        testCases: JSON.stringify([{ input: "Feign client", expectedOutput: "Methods declared" }])
      },
      {
        title: "Circuit Breaker with Resilience4j",
        type: "theory",
        content: `# Circuit Breaker Pattern

Prevent cascading failures:

\`\`\`java
@Service
public class OrderService {
    
    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public User getUser(Long id) {
        return userClient.getById(id);
    }
    
    public User getUserFallback(Long id, Exception e) {
        return new User(id, "Unknown", "fallback@example.com");
    }
}
\`\`\`

States: CLOSED (allow) → OPEN (reject) → HALF_OPEN (test)`,
        order: 5, xpReward: 25, estimatedMinutes: 20
      }
    ]);

    // ========== MODULE 10: Docker & Deployment ==========
    const m10 = await ctx.db.insert("modules", { courseId, title: "Docker & Deployment", order: 10 });
    await createLessons(ctx, m10, courseId, [
      {
        title: "Containerizing Spring Boot Apps",
        type: "theory",
        content: `# Docker for Spring Boot

## Dockerfile
\`\`\`dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Commands
\`\`\`bash
docker build -t myapp:1.0 .
docker run -d -p 8080:8080 myapp:1.0
\`\`\``,
        order: 1, xpReward: 25, estimatedMinutes: 20
      },
      {
        title: "Docker Compose",
        type: "practice",
        content: `# Multi-Container Apps

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/myapp
    depends_on:
      - db
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=myapp
    volumes:
      - mysql-data:/var/lib/mysql
volumes:
  mysql-data:
\`\`\`

\`docker-compose up -d\``,
        order: 2, xpReward: 30, estimatedMinutes: 25,
        codeTemplate: `# Create docker-compose.yml for Spring Boot + PostgreSQL`,
        solution: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/myapp
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=postgres
    volumes:
      - pg-data:/var/lib/postgresql/data
volumes:
  pg-data:`,
        testCases: JSON.stringify([{ input: "docker-compose.yml", expectedOutput: "Valid YAML" }])
      },
      {
        title: "Production Best Practices",
        type: "theory",
        content: `# Production Checklist

- Health checks in Dockerfile
- Non-root user
- JVM memory settings for containers
- Graceful shutdown
- Resource limits
- Secrets management (not env vars)
- Structured logging (JSON)
- HTTPS enabled
- Monitoring (Actuator + Prometheus)

\`\`\`yaml
server:
  shutdown: graceful
spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s
\`\`\``,
        order: 3, xpReward: 25, estimatedMinutes: 20
      }
    ]);

    // ========== MODULE 11: Advanced Topics ==========
    const m11 = await ctx.db.insert("modules", { courseId, title: "Advanced Integrations", order: 11 });
    await createLessons(ctx, m11, courseId, [
      {
        title: "Caching with Redis",
        type: "theory",
        content: `# Spring Cache with Redis

\`\`\`java
@EnableCaching
@SpringBootApplication
public class App { }

@Service
public class ProductService {
    
    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        return repo.findById(id).orElse(null);
    }
    
    @CachePut(value = "products", key = "#product.id")
    public Product update(Product product) {
        return repo.save(product);
    }
    
    @CacheEvict(value = "products", key = "#id")
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
\`\`\``,
        order: 1, xpReward: 25, estimatedMinutes: 22
      },
      {
        title: "Scheduling with @Scheduled",
        type: "practice",
        content: `# Task Scheduling

\`\`\`java
@EnableScheduling
@SpringBootApplication
public class App { }

@Service
public class ScheduledTasks {
    
    @Scheduled(fixedRate = 5000)  // Every 5 seconds
    public void runEvery5Seconds() { }
    
    @Scheduled(cron = "0 0 2 * * *")  // Every day at 2 AM
    public void dailyCleanup() { }
    
    @Scheduled(cron = "0 0 9 * * MON")  // Monday 9 AM
    public void weeklyReport() { }
}
\`\`\``,
        order: 2, xpReward: 20, estimatedMinutes: 18,
        codeTemplate: `@Service
public class MaintenanceScheduler {
    // TODO: Run every 30 seconds
    // TODO: Run daily at 2 AM
}`,
        solution: `@Service
public class MaintenanceScheduler {
    @Scheduled(fixedRate = 30000)
    public void healthCheck() { }
    
    @Scheduled(cron = "0 0 2 * * *")
    public void dailyCleanup() { }
}`,
        testCases: JSON.stringify([{ input: "@Scheduled", expectedOutput: "Correct cron expressions" }])
      },
      {
        title: "Async Processing with @Async",
        type: "theory",
        content: `# Async Processing

\`\`\`java
@EnableAsync
@SpringBootApplication
public class App { }

@Service
public class NotificationService {
    
    @Async
    public void sendEmail(String to, String msg) {
        // Runs in separate thread
        emailClient.send(to, msg);
    }
    
    @Async
    public CompletableFuture<Boolean> sendEmailWithResult(String to) {
        boolean success = emailClient.send(to, "Hello");
        return CompletableFuture.completedFuture(success);
    }
}
\`\`\``,
        order: 3, xpReward: 25, estimatedMinutes: 20
      }
    ]);

    // ========== MODULE 12: Best Practices ==========
    const m12 = await ctx.db.insert("modules", { courseId, title: "Best Practices", order: 12 });
    await createLessons(ctx, m12, courseId, [
      {
        title: "Project Structure Best Practices",
        type: "theory",
        content: `# Clean Architecture

\`\`\`
com.example.app/
├── config/
├── user/
│   ├── UserController.java
│   ├── UserService.java
│   ├── User.java
│   ├── UserRepository.java
│   └── dto/
├── order/
│   ├── OrderController.java
│   └── ...
└── common/
    ├── exception/
    └── util/
\`\`\`

Package by feature, not by layer!`,
        order: 1, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "Logging Best Practices",
        type: "theory",
        content: `# Logging with SLF4J

\`\`\`java
@Slf4j
@Service
public class OrderService {
    
    public Order create(OrderRequest req) {
        log.debug("Creating order for user: {}", req.getUserId());
        
        try {
            Order order = processOrder(req);
            log.info("Order created: id={}, total={}", order.getId(), order.getTotal());
            return order;
        } catch (Exception e) {
            log.error("Failed to create order: {}", e.getMessage(), e);
            throw e;
        }
    }
}
\`\`\`

DO: Use {} placeholders
DON'T: String concatenation in logs`,
        order: 2, xpReward: 20, estimatedMinutes: 15
      },
      {
        title: "API Documentation with OpenAPI",
        type: "practice",
        content: `# Swagger/OpenAPI

\`\`\`java
@Tag(name = "Products", description = "Product management")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Operation(summary = "Get all products")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Success"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public List<Product> getAll() { }
}
\`\`\`

Access: http://localhost:8080/swagger-ui.html`,
        order: 3, xpReward: 20, estimatedMinutes: 18,
        codeTemplate: `@RestController
@RequestMapping("/api/books")
public class BookController {
    // TODO: Add @Tag annotation
    // TODO: Document GET /api/books with @Operation
}`,
        solution: `@Tag(name = "Books", description = "Book management")
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Operation(summary = "Get all books")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping
    public List<Book> getAll() { return List.of(); }
}`,
        testCases: JSON.stringify([{ input: "OpenAPI annotations", expectedOutput: "Present" }])
      },
      {
        title: "Course Summary & Next Steps",
        type: "theory",
        content: `# Congratulations! 🎉

## What You've Learned
- Spring Boot fundamentals & IoC/DI
- Building REST APIs
- Spring Data JPA
- Spring Security & JWT
- Testing strategies
- Configuration & Profiles
- Microservices basics
- Docker deployment

## Next Steps
1. Build projects: Todo app, E-commerce API, Blog platform
2. Learn: WebFlux, Kafka, Kubernetes
3. Certify: Spring Professional Certification
4. Contribute: Open source projects

Keep coding!`,
        order: 4, xpReward: 50, estimatedMinutes: 10
      }
    ]);

    return { message: "Spring Boot V2 course seeded successfully! 12 modules, 69 lessons", courseId };
  },
});
