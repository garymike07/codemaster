import { mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const seedSpringBootPart2 = mutation({
  args: {},
  handler: async (ctx) => {
    // Find the Spring Boot course
    const course = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("slug"), "spring-boot-masterclass"))
      .first();

    if (!course) {
      return { error: "Spring Boot course not found. Run seedSpringBootCourse first." };
    }

    const courseId = course._id;

    // ============================================
    // MODULE 4: Spring Data JPA & Hibernate
    // ============================================
    const module4Id = await ctx.db.insert("modules", {
      courseId,
      title: "Spring Data JPA & Hibernate",
      order: 4,
    });

    const module4Lessons = [
      {
        title: "Introduction to JPA and Hibernate",
        type: "theory" as const,
        content: `# Introduction to JPA and Hibernate

## What is JPA?

**Java Persistence API** - A specification for ORM (Object-Relational Mapping) in Java.

## What is Hibernate?

The most popular **implementation** of JPA.

\`\`\`
JPA (Specification)
    ↓
Hibernate (Implementation)
    ↓
Database
\`\`\`

## Why Use JPA/Hibernate?

### Without JPA (Raw JDBC)
\`\`\`java
String sql = "SELECT * FROM users WHERE id = ?";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setLong(1, userId);
ResultSet rs = stmt.executeQuery();
if (rs.next()) {
    User user = new User();
    user.setId(rs.getLong("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
}
\`\`\`

### With JPA
\`\`\`java
User user = entityManager.find(User.class, userId);
// That's it! JPA handles the SQL
\`\`\`

## Key Concepts

1. **Entity**: Java class mapped to database table
2. **EntityManager**: Main interface for CRUD operations
3. **Repository**: Data access layer abstraction
4. **JPQL**: Java Persistence Query Language

## Spring Data JPA

Spring Data JPA adds another layer on top:

\`\`\`java
// Just define an interface - Spring implements it!
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);
}
\`\`\``,
        order: 1,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
      {
        title: "Setting up H2 Database",
        type: "practice" as const,
        content: `# Setting up H2 Database

H2 is an in-memory database perfect for development and testing.

## Adding Dependencies

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

## Configuration (application.properties)

\`\`\`properties
# H2 Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (access at /h2-console)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
\`\`\`

## DDL Auto Options

| Option | Description |
|--------|-------------|
| none | No action |
| validate | Validate schema, no changes |
| update | Update schema |
| create | Create schema (drop first if exists) |
| create-drop | Create on startup, drop on shutdown |

## Accessing H2 Console

1. Run your application
2. Go to http://localhost:8080/h2-console
3. JDBC URL: jdbc:h2:mem:testdb
4. Username: sa
5. Password: (empty)`,
        order: 2,
        xpReward: 20,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Configure H2 database in application.properties format
// TODO: Write the correct property configurations

// Database URL (in-memory named 'mydb')
spring.datasource.url=

// Driver class
spring.datasource.driverClassName=

// Username (use 'sa')
spring.datasource.username=

// Enable H2 console
spring.h2.console.enabled=

// Set DDL auto to 'update'
spring.jpa.hibernate.ddl-auto=

// Show SQL queries
spring.jpa.show-sql=`,
        solution: `# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:mydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console
spring.h2.console.enabled=true

# JPA Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true`,
        testCases: [
          {
            input: "",
            expectedOutput: "jdbc:h2:mem",
            description: "Should use H2 in-memory URL",
          },
        ],
      },
      {
        title: "Entity Classes with @Entity",
        type: "practice" as const,
        content: `# Entity Classes with @Entity

## Basic Entity

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors, getters, setters
}
\`\`\`

## Key Annotations

### @Entity
Marks class as JPA entity.

### @Table
Customize table name and properties.
\`\`\`java
@Table(name = "app_users", schema = "public")
\`\`\`

### @Id
Marks primary key field.

### @GeneratedValue
Auto-generate ID values.
\`\`\`java
@GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
@GeneratedValue(strategy = GenerationType.SEQUENCE)  // Database sequence
@GeneratedValue(strategy = GenerationType.AUTO)      // Let Hibernate decide
\`\`\`

### @Column
Customize column properties.
\`\`\`java
@Column(
    name = "user_email",
    nullable = false,
    unique = true,
    length = 255
)
\`\`\`

## Field Types Mapping

| Java Type | Database Type |
|-----------|---------------|
| String | VARCHAR |
| Integer/Long | INT/BIGINT |
| Double | DOUBLE |
| Boolean | BOOLEAN |
| LocalDate | DATE |
| LocalDateTime | TIMESTAMP |`,
        order: 3,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create a Product entity
// TODO: Add proper JPA annotations

public class Product {
    
    // Primary key, auto-generated
    private Long id;
    
    // Required, max 200 characters
    private String name;
    
    // Required
    private String description;
    
    // Column name "unit_price", required
    private Double price;
    
    // Default value, not null
    private Integer quantity;
    
    // Unique constraint
    private String sku;
    
    // Auto-set on creation
    private LocalDateTime createdAt;
    
    // Constructors
    public Product() {}
    
    public Product(String name, String description, Double price, String sku) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.sku = sku;
        this.quantity = 0;
        this.createdAt = LocalDateTime.now();
    }
    
    // Add getters and setters
}`,
        solution: `import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(nullable = false)
    private String description;
    
    @Column(name = "unit_price", nullable = false)
    private Double price;
    
    @Column(nullable = false)
    private Integer quantity = 0;
    
    @Column(unique = true)
    private String sku;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public Product() {}
    
    public Product(String name, String description, Double price, String sku) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.sku = sku;
        this.quantity = 0;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@Entity",
            description: "Should have @Entity annotation",
          },
          {
            input: "",
            expectedOutput: "@Id",
            description: "Should have @Id annotation",
          },
          {
            input: "",
            expectedOutput: "@GeneratedValue",
            description: "Should have @GeneratedValue",
          },
        ],
      },
      {
        title: "JpaRepository Interface",
        type: "practice" as const,
        content: `# JpaRepository Interface

## Creating a Repository

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    // That's it! Spring provides all basic CRUD methods
}
\`\`\`

## Inherited Methods

\`\`\`java
// From CrudRepository
save(entity)           // Create or update
findById(id)           // Find by ID (returns Optional)
findAll()              // Get all entities
deleteById(id)         // Delete by ID
delete(entity)         // Delete entity
count()                // Count all
existsById(id)         // Check existence

// From JpaRepository
saveAll(entities)      // Save multiple
findAll(Sort sort)     // Find all with sorting
findAll(Pageable)      // Find all with pagination
flush()                // Flush changes to DB
deleteAllInBatch()     // Bulk delete
\`\`\`

## Using the Repository

\`\`\`java
@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
\`\`\``,
        order: 4,
        xpReward: 20,
        estimatedMinutes: 12,
        language: "java",
        codeTemplate: `// Create a repository for the Product entity
// TODO: Define the interface that extends JpaRepository

// Product entity (already defined)
@Entity
class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    // getters and setters...
}

// TODO: Create ProductRepository interface


// TODO: Create ProductService that uses the repository
@Service
class ProductService {
    
    // TODO: Inject repository
    
    // TODO: Implement findAll method
    
    // TODO: Implement findById method
    
    // TODO: Implement save method
    
    // TODO: Implement deleteById method
}`,
        solution: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import jakarta.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}

@Service
class ProductService {
    
    private final ProductRepository productRepository;
    
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public List<Product> findAll() {
        return productRepository.findAll();
    }
    
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }
    
    public Product save(Product product) {
        return productRepository.save(product);
    }
    
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "JpaRepository<Product, Long>",
            description: "Should extend JpaRepository with correct types",
          },
          {
            input: "",
            expectedOutput: "@Repository",
            description: "Should have @Repository annotation",
          },
        ],
      },
      {
        title: "Custom Query Methods",
        type: "practice" as const,
        content: `# Custom Query Methods

Spring Data JPA creates queries from method names!

## Query Method Keywords

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find by single field
    List<User> findByEmail(String email);
    List<User> findByName(String name);
    
    // Find by multiple fields
    List<User> findByNameAndEmail(String name, String email);
    List<User> findByNameOrEmail(String name, String email);
    
    // Comparisons
    List<User> findByAgeGreaterThan(int age);
    List<User> findByAgeLessThanEqual(int age);
    List<User> findByAgeBetween(int start, int end);
    
    // String matching
    List<User> findByNameContaining(String text);
    List<User> findByNameStartingWith(String prefix);
    List<User> findByNameEndingWith(String suffix);
    List<User> findByNameIgnoreCase(String name);
    
    // Null checks
    List<User> findByPhoneIsNull();
    List<User> findByPhoneIsNotNull();
    
    // Boolean
    List<User> findByActiveTrue();
    List<User> findByActiveFalse();
    
    // Ordering
    List<User> findByNameOrderByCreatedAtDesc(String name);
    
    // Limiting
    User findFirstByOrderByCreatedAtDesc();
    List<User> findTop10ByOrderByCreatedAtDesc();
    
    // Exists & Count
    boolean existsByEmail(String email);
    long countByStatus(String status);
}
\`\`\`

## Method Name Parts

| Keyword | Sample | JPQL Equivalent |
|---------|--------|-----------------|
| And | findByNameAndEmail | where name=? and email=? |
| Or | findByNameOrEmail | where name=? or email=? |
| Between | findByAgeBetween | where age between ? and ? |
| LessThan | findByAgeLessThan | where age < ? |
| GreaterThan | findByAgeGreaterThan | where age > ? |
| Like | findByNameLike | where name like ? |
| Containing | findByNameContaining | where name like %?% |
| OrderBy | findByNameOrderByAgeDesc | order by age desc |`,
        order: 5,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Create custom query methods for an Order repository
// TODO: Define methods using Spring Data naming conventions

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find orders by customer ID
    
    // Find orders by status
    
    // Find orders with total greater than amount
    
    // Find orders between two dates
    
    // Find orders by status ordered by date descending
    
    // Count orders by status
    
    // Check if customer has orders
    
    // Find top 5 orders by total amount
    
}

// Order entity reference
@Entity
class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long customerId;
    private String status;  // PENDING, SHIPPED, DELIVERED
    private Double total;
    private LocalDateTime orderDate;
}`,
        solution: `import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long customerId;
    private String status;
    private Double total;
    private LocalDateTime orderDate;
    
    // Getters and setters
}

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find orders by customer ID
    List<Order> findByCustomerId(Long customerId);
    
    // Find orders by status
    List<Order> findByStatus(String status);
    
    // Find orders with total greater than amount
    List<Order> findByTotalGreaterThan(Double amount);
    
    // Find orders between two dates
    List<Order> findByOrderDateBetween(LocalDateTime start, LocalDateTime end);
    
    // Find orders by status ordered by date descending
    List<Order> findByStatusOrderByOrderDateDesc(String status);
    
    // Count orders by status
    long countByStatus(String status);
    
    // Check if customer has orders
    boolean existsByCustomerId(Long customerId);
    
    // Find top 5 orders by total amount
    List<Order> findTop5ByOrderByTotalDesc();
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "findByCustomerId",
            description: "Should have findByCustomerId method",
          },
          {
            input: "",
            expectedOutput: "findByStatus",
            description: "Should have findByStatus method",
          },
          {
            input: "",
            expectedOutput: "OrderByTotalDesc",
            description: "Should have ordering methods",
          },
        ],
      },
      {
        title: "@Query Annotation (JPQL)",
        type: "practice" as const,
        content: `# @Query Annotation (JPQL)

For complex queries, use @Query with JPQL.

## Basic JPQL Query

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmailAddress(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %?1%")
    List<User> searchByName(String name);
}
\`\`\`

## Named Parameters

\`\`\`java
@Query("SELECT u FROM User u WHERE u.name = :name AND u.status = :status")
List<User> findByNameAndStatus(
    @Param("name") String name,
    @Param("status") String status
);
\`\`\`

## Complex Queries

\`\`\`java
@Query("SELECT u FROM User u WHERE u.createdAt > :date ORDER BY u.name")
List<User> findRecentUsers(@Param("date") LocalDateTime date);

@Query("SELECT u FROM User u JOIN u.orders o WHERE o.total > :amount")
List<User> findUsersWithLargeOrders(@Param("amount") Double amount);

@Query("SELECT COUNT(u) FROM User u WHERE u.status = :status")
Long countByStatus(@Param("status") String status);
\`\`\`

## Modifying Queries

\`\`\`java
@Modifying
@Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
int updateUserStatus(@Param("id") Long id, @Param("status") String status);

@Modifying
@Query("DELETE FROM User u WHERE u.status = 'INACTIVE'")
int deleteInactiveUsers();
\`\`\`

**Note:** @Modifying queries must be in a @Transactional method.`,
        order: 6,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `// Write JPQL queries using @Query annotation
// TODO: Complete the repository methods

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // TODO: Find products in a price range using JPQL
    // Parameters: minPrice, maxPrice
    List<Product> findProductsInPriceRange(Double minPrice, Double maxPrice);
    
    // TODO: Search products by name (case-insensitive, contains)
    // Parameter: searchTerm
    List<Product> searchByName(String searchTerm);
    
    // TODO: Find products with low stock (quantity < threshold)
    // Parameter: threshold
    List<Product> findLowStockProducts(Integer threshold);
    
    // TODO: Update product price by ID (modifying query)
    // Parameters: id, newPrice
    int updatePrice(Long id, Double newPrice);
    
    // TODO: Get total value of all inventory (SUM of price * quantity)
    Double getTotalInventoryValue();
}`,
        solution: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findProductsInPriceRange(
        @Param("minPrice") Double minPrice, 
        @Param("maxPrice") Double maxPrice
    );
    
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Product> searchByName(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT p FROM Product p WHERE p.quantity < :threshold")
    List<Product> findLowStockProducts(@Param("threshold") Integer threshold);
    
    @Modifying
    @Query("UPDATE Product p SET p.price = :newPrice WHERE p.id = :id")
    int updatePrice(@Param("id") Long id, @Param("newPrice") Double newPrice);
    
    @Query("SELECT SUM(p.price * p.quantity) FROM Product p")
    Double getTotalInventoryValue();
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@Query",
            description: "Should use @Query annotation",
          },
          {
            input: "",
            expectedOutput: "@Param",
            description: "Should use @Param for named parameters",
          },
          {
            input: "",
            expectedOutput: "@Modifying",
            description: "Should have @Modifying for update query",
          },
        ],
      },
      {
        title: "Entity Relationships",
        type: "practice" as const,
        content: `# Entity Relationships

## One-to-Many / Many-to-One

\`\`\`java
@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}
\`\`\`

## Many-to-Many

\`\`\`java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @ManyToMany
    @JoinTable(
        name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
\`\`\`

## One-to-One

\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private Profile profile;
}

@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bio;
    
    @OneToOne(mappedBy = "profile")
    private User user;
}
\`\`\``,
        order: 7,
        xpReward: 35,
        estimatedMinutes: 20,
        language: "java",
        codeTemplate: `// Create entities with proper relationships
// Scenario: Blog application with Authors, Posts, and Tags

// TODO: Create Author entity (one author has many posts)

// TODO: Create Post entity (many posts belong to one author, many posts have many tags)

// TODO: Create Tag entity (many tags can be on many posts)

@Entity
class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    
    // TODO: Add relationship to posts
}

@Entity  
class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    
    // TODO: Add relationship to author
    
    // TODO: Add relationship to tags
}

@Entity
class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    // TODO: Add relationship to posts
}`,
        solution: `import jakarta.persistence.*;
import java.util.*;

@Entity
class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public List<Post> getPosts() { return posts; }
    public void setPosts(List<Post> posts) { this.posts = posts; }
}

@Entity  
class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;
    
    @ManyToMany
    @JoinTable(
        name = "post_tags",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }
    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }
}

@Entity
class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @ManyToMany(mappedBy = "tags")
    private Set<Post> posts = new HashSet<>();
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Set<Post> getPosts() { return posts; }
    public void setPosts(Set<Post> posts) { this.posts = posts; }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@OneToMany",
            description: "Should have @OneToMany relationship",
          },
          {
            input: "",
            expectedOutput: "@ManyToOne",
            description: "Should have @ManyToOne relationship",
          },
          {
            input: "",
            expectedOutput: "@ManyToMany",
            description: "Should have @ManyToMany relationship",
          },
        ],
      },
    ];

    for (const lesson of module4Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module4Id,
        courseId,
        ...lesson,
      });
    }

    // ============================================
    // MODULE 5: Spring Security Fundamentals
    // ============================================
    const module5Id = await ctx.db.insert("modules", {
      courseId,
      title: "Spring Security Fundamentals",
      order: 5,
    });

    const module5Lessons = [
      {
        title: "Introduction to Spring Security",
        type: "theory" as const,
        content: `# Introduction to Spring Security

## What is Spring Security?

A powerful and customizable authentication and access-control framework for Java applications.

## Core Concepts

### 1. Authentication
**Who are you?**
- Verify user identity
- Username/password, OAuth2, JWT, etc.

### 2. Authorization
**What can you do?**
- Role-based access control (RBAC)
- Method-level security
- URL-based security

## Adding Spring Security

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
\`\`\`

## Default Behavior

After adding the dependency:
- All endpoints require authentication
- Default login form at /login
- Auto-generated password in console
- Default username: "user"

\`\`\`
Using generated security password: a1b2c3d4-e5f6-...
\`\`\`

## Security Filter Chain

\`\`\`
Request → Security Filters → Controller
         ↓
    Authentication
         ↓
    Authorization
         ↓
    Access Decision
\`\`\`

## Key Components

1. **SecurityFilterChain** - Main security configuration
2. **UserDetailsService** - Load user data
3. **PasswordEncoder** - Encode passwords
4. **AuthenticationManager** - Manage authentication`,
        order: 1,
        xpReward: 15,
        estimatedMinutes: 12,
        language: "java",
      },
      {
        title: "Basic Security Configuration",
        type: "practice" as const,
        content: `# Basic Security Configuration

## SecurityFilterChain Bean

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/**").authenticated()
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
\`\`\`

## Authorization Rules

\`\`\`java
.authorizeHttpRequests(auth -> auth
    // Public access
    .requestMatchers("/", "/home", "/register").permitAll()
    .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()
    
    // Role-based access
    .requestMatchers("/admin/**").hasRole("ADMIN")
    .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
    
    // Authority-based access
    .requestMatchers("/reports/**").hasAuthority("VIEW_REPORTS")
    
    // Authenticated users only
    .anyRequest().authenticated()
)
\`\`\`

## In-Memory Users (Development)

\`\`\`java
@Bean
public UserDetailsService userDetailsService() {
    UserDetails user = User.builder()
        .username("user")
        .password(passwordEncoder().encode("password"))
        .roles("USER")
        .build();
    
    UserDetails admin = User.builder()
        .username("admin")
        .password(passwordEncoder().encode("admin"))
        .roles("ADMIN", "USER")
        .build();
    
    return new InMemoryUserDetailsManager(user, admin);
}
\`\`\``,
        order: 2,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `// Create a security configuration
// TODO: Configure security rules for different endpoints

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // TODO: Configure the following rules:
        // - /public/** - accessible by everyone
        // - /api/auth/** - accessible by everyone (login/register)
        // - /api/admin/** - only ADMIN role
        // - /api/user/** - USER or ADMIN role
        // - all other requests - authenticated
        // - use HTTP Basic authentication
        // - disable CSRF for REST API
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        // TODO: Return BCryptPasswordEncoder
        return null;
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
        // TODO: Create two in-memory users:
        // 1. username: "user", password: "user123", role: USER
        // 2. username: "admin", password: "admin123", roles: ADMIN, USER
        
        return null;
    }
}`,
        solution: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder().encode("user123"))
            .roles("USER")
            .build();
        
        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("admin123"))
            .roles("ADMIN", "USER")
            .build();
        
        return new InMemoryUserDetailsManager(user, admin);
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@EnableWebSecurity",
            description: "Should have @EnableWebSecurity",
          },
          {
            input: "",
            expectedOutput: "SecurityFilterChain",
            description: "Should define SecurityFilterChain bean",
          },
          {
            input: "",
            expectedOutput: "BCryptPasswordEncoder",
            description: "Should use BCrypt for password encoding",
          },
        ],
      },
      {
        title: "JWT Authentication",
        type: "theory" as const,
        content: `# JWT Authentication

## What is JWT?

**JSON Web Token** - A compact, URL-safe means of representing claims between two parties.

## JWT Structure

\`\`\`
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

### Header
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

### Payload (Claims)
\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622,
  "roles": ["USER", "ADMIN"]
}
\`\`\`

### Signature
\`\`\`
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
\`\`\`

## JWT Authentication Flow

\`\`\`
1. Client sends credentials
   POST /auth/login
   {"username": "user", "password": "pass"}

2. Server validates and returns JWT
   {"token": "eyJhbGciOiJIUzI1NiIs..."}

3. Client includes JWT in requests
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

4. Server validates JWT and processes request
\`\`\`

## Dependencies

\`\`\`xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>
\`\`\``,
        order: 3,
        xpReward: 20,
        estimatedMinutes: 15,
        language: "java",
      },
      {
        title: "Implementing JWT Service",
        type: "practice" as const,
        content: `# Implementing JWT Service

## JwtService Class

\`\`\`java
@Service
public class JwtService {
    
    @Value("\${jwt.secret}")
    private String secretKey;
    
    @Value("\${jwt.expiration}")
    private long jwtExpiration;
    
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
    
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
\`\`\``,
        order: 4,
        xpReward: 35,
        estimatedMinutes: 20,
        language: "java",
        codeTemplate: `// Implement a JWT service
// TODO: Complete the JWT utility methods

@Service
public class JwtService {
    
    private static final String SECRET_KEY = "your-256-bit-secret-your-256-bit-secret";
    private static final long EXPIRATION_TIME = 86400000; // 24 hours
    
    // TODO: Generate JWT token for a user
    public String generateToken(String username) {
        // Use Jwts.builder() to create token
        // Set subject to username
        // Set issued at to current time
        // Set expiration to current time + EXPIRATION_TIME
        // Sign with SECRET_KEY using HS256
        return null;
    }
    
    // TODO: Extract username from token
    public String extractUsername(String token) {
        // Parse the token and get the subject claim
        return null;
    }
    
    // TODO: Check if token is valid
    public boolean isTokenValid(String token, String username) {
        // Extract username from token
        // Check if it matches and token is not expired
        return false;
    }
    
    // TODO: Check if token is expired
    private boolean isTokenExpired(String token) {
        // Extract expiration date and compare with current time
        return false;
    }
}`,
        solution: `import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    
    private static final String SECRET_KEY = "your-256-bit-secret-your-256-bit-secret-your-256-bit";
    private static final long EXPIRATION_TIME = 86400000; // 24 hours
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
    
    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username)) && !isTokenExpired(token);
    }
    
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "Jwts.builder()",
            description: "Should use Jwts.builder() to create tokens",
          },
          {
            input: "",
            expectedOutput: "setSubject",
            description: "Should set subject in token",
          },
          {
            input: "",
            expectedOutput: "setExpiration",
            description: "Should set expiration time",
          },
        ],
      },
    ];

    for (const lesson of module5Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module5Id,
        courseId,
        ...lesson,
      });
    }

    // ============================================
    // MODULE 6: Testing Spring Boot
    // ============================================
    const module6Id = await ctx.db.insert("modules", {
      courseId,
      title: "Testing Spring Boot Applications",
      order: 6,
    });

    const module6Lessons = [
      {
        title: "Unit Testing with JUnit 5",
        type: "practice" as const,
        content: `# Unit Testing with JUnit 5

## Test Dependencies

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
\`\`\`

## Basic Test Structure

\`\`\`java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    @Test
    @DisplayName("Should add two numbers correctly")
    void testAdd() {
        int result = calculator.add(2, 3);
        assertEquals(5, result);
    }
    
    @Test
    void testDivideByZero() {
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
    }
}
\`\`\`

## Common Assertions

\`\`\`java
// Equality
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);

// Boolean
assertTrue(condition);
assertFalse(condition);

// Null checks
assertNull(object);
assertNotNull(object);

// Exception testing
assertThrows(ExceptionType.class, () -> { ... });

// Collection assertions
assertIterableEquals(expectedList, actualList);
\`\`\`

## Lifecycle Annotations

\`\`\`java
@BeforeEach   // Run before each test
@AfterEach    // Run after each test
@BeforeAll    // Run once before all tests (static)
@AfterAll     // Run once after all tests (static)
\`\`\``,
        order: 1,
        xpReward: 25,
        estimatedMinutes: 15,
        language: "java",
        codeTemplate: `// Write unit tests for a UserService
// TODO: Complete the test methods

class UserService {
    private Map<Long, User> users = new HashMap<>();
    private Long nextId = 1L;
    
    public User createUser(String name, String email) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be blank");
        }
        User user = new User(nextId++, name, email);
        users.put(user.getId(), user);
        return user;
    }
    
    public User findById(Long id) {
        return users.get(id);
    }
    
    public boolean deleteUser(Long id) {
        return users.remove(id) != null;
    }
}

class UserServiceTest {
    
    private UserService userService;
    
    // TODO: Add @BeforeEach to initialize userService
    void setUp() {
        userService = new UserService();
    }
    
    // TODO: Test creating a user successfully
    void shouldCreateUserSuccessfully() {
        // Create user with name "John" and email "john@test.com"
        // Assert user is not null
        // Assert name equals "John"
    }
    
    // TODO: Test that creating user with blank name throws exception
    void shouldThrowExceptionWhenNameIsBlank() {
        // Assert IllegalArgumentException is thrown
    }
    
    // TODO: Test finding user by ID
    void shouldFindUserById() {
        // Create a user, then find by ID
        // Assert found user matches created user
    }
    
    // TODO: Test deleting a user
    void shouldDeleteUser() {
        // Create user, delete, verify cannot find
    }
}`,
        solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.HashMap;
import java.util.Map;

class User {
    private Long id;
    private String name;
    private String email;
    
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}

class UserService {
    private Map<Long, User> users = new HashMap<>();
    private Long nextId = 1L;
    
    public User createUser(String name, String email) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be blank");
        }
        User user = new User(nextId++, name, email);
        users.put(user.getId(), user);
        return user;
    }
    
    public User findById(Long id) {
        return users.get(id);
    }
    
    public boolean deleteUser(Long id) {
        return users.remove(id) != null;
    }
}

class UserServiceTest {
    
    private UserService userService;
    
    @BeforeEach
    void setUp() {
        userService = new UserService();
    }
    
    @Test
    @DisplayName("Should create user successfully")
    void shouldCreateUserSuccessfully() {
        User user = userService.createUser("John", "john@test.com");
        
        assertNotNull(user);
        assertEquals("John", user.getName());
        assertEquals("john@test.com", user.getEmail());
    }
    
    @Test
    @DisplayName("Should throw exception when name is blank")
    void shouldThrowExceptionWhenNameIsBlank() {
        assertThrows(IllegalArgumentException.class, () -> {
            userService.createUser("", "test@test.com");
        });
    }
    
    @Test
    @DisplayName("Should find user by ID")
    void shouldFindUserById() {
        User created = userService.createUser("Jane", "jane@test.com");
        User found = userService.findById(created.getId());
        
        assertNotNull(found);
        assertEquals(created.getId(), found.getId());
        assertEquals("Jane", found.getName());
    }
    
    @Test
    @DisplayName("Should delete user")
    void shouldDeleteUser() {
        User user = userService.createUser("Bob", "bob@test.com");
        boolean deleted = userService.deleteUser(user.getId());
        
        assertTrue(deleted);
        assertNull(userService.findById(user.getId()));
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@BeforeEach",
            description: "Should have @BeforeEach setup",
          },
          {
            input: "",
            expectedOutput: "@Test",
            description: "Should have @Test annotations",
          },
          {
            input: "",
            expectedOutput: "assertThrows",
            description: "Should test exceptions",
          },
        ],
      },
      {
        title: "MockMvc for Controller Testing",
        type: "practice" as const,
        content: `# MockMvc for Controller Testing

## Setup with @WebMvcTest

\`\`\`java
@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void shouldReturnAllUsers() throws Exception {
        when(userService.findAll()).thenReturn(Arrays.asList(
            new User(1L, "John"),
            new User(2L, "Jane")
        ));
        
        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].name", is("John")));
    }
}
\`\`\`

## Common MockMvc Operations

\`\`\`java
// GET request
mockMvc.perform(get("/api/users"))
    .andExpect(status().isOk());

// GET with path variable
mockMvc.perform(get("/api/users/{id}", 1))
    .andExpect(status().isOk());

// POST with JSON body
mockMvc.perform(post("/api/users")
    .contentType(MediaType.APPLICATION_JSON)
    .content("{\\"name\\":\\"John\\",\\"email\\":\\"john@test.com\\"}"))
    .andExpect(status().isCreated());

// PUT request
mockMvc.perform(put("/api/users/{id}", 1)
    .contentType(MediaType.APPLICATION_JSON)
    .content("{\\"name\\":\\"Updated\\"}"))
    .andExpect(status().isOk());

// DELETE request
mockMvc.perform(delete("/api/users/{id}", 1))
    .andExpect(status().isNoContent());
\`\`\`

## Response Assertions

\`\`\`java
.andExpect(status().isOk())              // 200
.andExpect(status().isCreated())         // 201
.andExpect(status().isNotFound())        // 404
.andExpect(content().string("Hello"))
.andExpect(jsonPath("$.name").value("John"))
.andExpect(jsonPath("$.id").exists())
\`\`\``,
        order: 2,
        xpReward: 30,
        estimatedMinutes: 18,
        language: "java",
        codeTemplate: `// Write MockMvc tests for a ProductController
// TODO: Complete the test methods

@WebMvcTest(ProductController.class)
class ProductControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ProductService productService;
    
    // TODO: Test GET /api/products returns list of products
    @Test
    void shouldReturnAllProducts() throws Exception {
        // Mock productService.findAll() to return list of products
        // Perform GET request
        // Assert status 200
        // Assert JSON array size
    }
    
    // TODO: Test GET /api/products/{id} returns single product
    @Test
    void shouldReturnProductById() throws Exception {
        // Mock productService.findById(1L) to return a product
        // Perform GET request with path variable
        // Assert status 200
        // Assert JSON properties
    }
    
    // TODO: Test POST /api/products creates new product
    @Test
    void shouldCreateProduct() throws Exception {
        // Mock productService.save() to return saved product
        // Perform POST with JSON body
        // Assert status 201
    }
    
    // TODO: Test GET /api/products/{id} returns 404 when not found
    @Test
    void shouldReturn404WhenProductNotFound() throws Exception {
        // Mock productService.findById() to return empty
        // Assert status 404
    }
}`,
        solution: `import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Arrays;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ProductService productService;
    
    @Test
    void shouldReturnAllProducts() throws Exception {
        when(productService.findAll()).thenReturn(Arrays.asList(
            new Product(1L, "Laptop", 999.99),
            new Product(2L, "Phone", 599.99)
        ));
        
        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].name", is("Laptop")));
    }
    
    @Test
    void shouldReturnProductById() throws Exception {
        Product product = new Product(1L, "Laptop", 999.99);
        when(productService.findById(1L)).thenReturn(Optional.of(product));
        
        mockMvc.perform(get("/api/products/{id}", 1))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id", is(1)))
            .andExpect(jsonPath("$.name", is("Laptop")))
            .andExpect(jsonPath("$.price", is(999.99)));
    }
    
    @Test
    void shouldCreateProduct() throws Exception {
        Product product = new Product(1L, "Tablet", 399.99);
        when(productService.save(any(Product.class))).thenReturn(product);
        
        mockMvc.perform(post("/api/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\\"name\\":\\"Tablet\\",\\"price\\":399.99}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name", is("Tablet")));
    }
    
    @Test
    void shouldReturn404WhenProductNotFound() throws Exception {
        when(productService.findById(999L)).thenReturn(Optional.empty());
        
        mockMvc.perform(get("/api/products/{id}", 999))
            .andExpect(status().isNotFound());
    }
}`,
        testCases: [
          {
            input: "",
            expectedOutput: "@WebMvcTest",
            description: "Should use @WebMvcTest",
          },
          {
            input: "",
            expectedOutput: "MockMvc",
            description: "Should inject MockMvc",
          },
          {
            input: "",
            expectedOutput: "@MockBean",
            description: "Should mock dependencies",
          },
        ],
      },
    ];

    for (const lesson of module6Lessons) {
      await ctx.db.insert("lessons", {
        moduleId: module6Id,
        courseId,
        ...lesson,
      });
    }

    return {
      message: "Spring Boot Part 2 modules created successfully!",
      courseId,
      modulesAdded: 3,
      totalLessons: module4Lessons.length + module5Lessons.length + module6Lessons.length,
    };
  },
});
