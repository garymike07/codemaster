import { mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

type LessonType = "theory" | "practice" | "challenge" | "project" | "quiz";

interface Example {
    title: string;
    description: string;
    code: string;
    explanation: string;
    output?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
}

interface CommonMistake {
    mistake: string;
    explanation: string;
    howToAvoid: string;
}

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
    examples?: Example[];
    keyTakeaways?: string[];
    commonMistakes?: CommonMistake[];
}

interface ModuleData {
    title: string;
    lessons: LessonData[];
}

// Helper to create lessons with enhanced fields
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
            ...(lesson.examples && { examples: lesson.examples }),
            ...(lesson.keyTakeaways && { keyTakeaways: lesson.keyTakeaways }),
            ...(lesson.commonMistakes && { commonMistakes: lesson.commonMistakes }),
        });
    }
}

export const seedEnhancedSpringBoot = mutation({
    args: {},
    handler: async (ctx) => {
        // Delete existing course if present
        const existing = await ctx.db
            .query("courses")
            .filter((q) => q.eq(q.field("slug"), "spring-boot-enhanced"))
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
            slug: "spring-boot-enhanced",
            title: "Spring Boot Masterclass (Enhanced)",
            description: "Master Spring Boot with comprehensive notes, multiple examples, and AI-powered learning assistance. Learn IoC, DI, REST APIs, JPA, Security, and more.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
            language: "java",
            difficulty: "beginner",
            totalLessons: 12,
            estimatedHours: 50,
            isPublished: true,
            createdAt: Date.now(),
        });

        // ========== MODULE 1: Introduction to Spring Boot ==========
        const m1 = await ctx.db.insert("modules", { courseId, title: "Introduction to Spring Boot", order: 1 });
        await createLessons(ctx, m1, courseId, [
            {
                title: "What is Spring Boot?",
                type: "theory",
                content: `# What is Spring Boot?

## 📚 What You'll Learn
- What Spring Boot is and why it exists
- The difference between Spring Framework and Spring Boot
- Key features that make Spring Boot powerful
- When to use Spring Boot for your projects

## 📖 Simple Explanation

Think of Spring Boot as a **smart assistant** for building Java applications. 

Imagine you're building a house. The traditional Spring Framework gives you all the tools (hammer, nails, wood), but YOU have to figure out how to put everything together. Spring Boot is like having a construction crew that already knows the best way to build a house - they bring pre-assembled parts and do most of the setup work for you!

### What Makes Spring Boot Special?

Spring Boot takes the powerful Spring Framework and makes it **much easier to use**. Instead of spending hours configuring your application, Spring Boot does most of the work automatically.

## 🎯 Why This Matters

In the real world, companies need to build applications **quickly** and **reliably**. Spring Boot helps developers:

- **Start projects in minutes** instead of hours
- **Focus on business logic** instead of configuration
- **Deploy applications easily** with embedded servers
- **Follow best practices** automatically

### Real-World Example

Companies like **Netflix**, **Amazon**, and **Uber** use Spring Boot to build their microservices. Why? Because they can create hundreds of small, independent services quickly and reliably.

## 💡 How It Works

Spring Boot uses three main "magic tricks":

### 1. Auto-Configuration
Spring Boot looks at your project and automatically sets up what you need.

**Example:** If you add a database library, Spring Boot automatically configures a database connection for you!

### 2. Starter Dependencies
Instead of adding 20 different libraries, you add ONE "starter" that includes everything.

**Example:** Adding \`spring-boot-starter-web\` gives you everything needed for a web application.

### 3. Embedded Server
Your application comes with a web server built-in. No need to install Tomcat separately!

**Example:** Just run your Java application, and it starts a web server automatically.

## 🔍 Spring Framework vs Spring Boot

| Feature | Spring Framework | Spring Boot |
|---------|-----------------|-------------|
| Configuration | Lots of XML files | Minimal, mostly automatic |
| Setup Time | Hours to days | Minutes |
| Server | Install separately | Built-in (embedded) |
| Dependencies | Add each one manually | Use "starters" |
| Best For | Large, custom projects | Quick development, microservices |

## 🚀 A Simple Spring Boot Application

Here's ALL the code you need for a working web application:

\`\`\`java
@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Spring Boot!";
    }
}
\`\`\`

That's it! This creates a web server that responds to http://localhost:8080/hello

## 🎓 Key Concepts Explained Simply

### @SpringBootApplication
This is like a "master switch" that turns on all of Spring Boot's features. It does three things:
1. Marks this as a configuration class
2. Enables auto-configuration
3. Scans for components (controllers, services, etc.)

### SpringApplication.run()
This starts your application. Think of it as pressing the "power button" on your app.

### @RestController
This tells Spring Boot: "This class handles web requests." It's like putting up a sign that says "Open for business!"

### @GetMapping
This says: "When someone visits this URL, run this method." It's like setting up a doorbell for a specific address.`,
                order: 1,
                xpReward: 50,
                estimatedMinutes: 15,
                examples: [
                    {
                        title: "Minimal Spring Boot Application",
                        description: "The simplest possible Spring Boot application - just the essentials",
                        code: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`,
                        explanation: `This is the bare minimum for a Spring Boot application:

1. **@SpringBootApplication**: This single annotation does three important things:
   - Marks this as a configuration class (@Configuration)
   - Enables auto-configuration (@EnableAutoConfiguration)
   - Enables component scanning (@ComponentScan)

2. **main method**: Every Java application needs a main method - this is where execution starts.

3. **SpringApplication.run()**: This is the "magic" that starts Spring Boot. It:
   - Creates the application context (the container for all your beans)
   - Scans for components
   - Starts the embedded web server (if you have web dependencies)
   - Applies auto-configuration

When you run this, Spring Boot starts up and waits for requests. Even though it doesn't do much yet, it's a complete, running application!`,
                        output: "Application started on port 8080",
                        difficulty: "beginner"
                    },
                    {
                        title: "Hello World REST API",
                        description: "A simple REST API that responds to HTTP requests",
                        code: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/")
    public String home() {
        return "Welcome to Spring Boot!";
    }
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
    
    @GetMapping("/about")
    public String about() {
        return "This is a Spring Boot application";
    }
}`,
                        explanation: `This example adds a REST controller with three endpoints:

**@RestController**: Combines @Controller and @ResponseBody. It tells Spring:
- This class handles HTTP requests
- Return values should be sent directly to the client (not rendered as HTML)

**@GetMapping**: Maps HTTP GET requests to methods. Think of it as:
- @GetMapping("/") → "When someone visits the home page, run this method"
- @GetMapping("/hello") → "When someone visits /hello, run this method"

**How it works:**
1. User visits http://localhost:8080/
2. Spring Boot sees the @GetMapping("/") annotation
3. It calls the home() method
4. The return value "Welcome to Spring Boot!" is sent back to the user

This is the foundation of building REST APIs in Spring Boot!`,
                        output: `Visit http://localhost:8080/ → "Welcome to Spring Boot!"
Visit http://localhost:8080/hello → "Hello, World!"
Visit http://localhost:8080/about → "This is a Spring Boot application"`,
                        difficulty: "beginner"
                    },
                    {
                        title: "Personalized Greeting API",
                        description: "A REST API that accepts parameters and returns personalized responses",
                        code: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
@RequestMapping("/api")
class GreetingController {
    
    @GetMapping("/greet")
    public String greet(@RequestParam(defaultValue = "Guest") String name) {
        return "Hello, " + name + "! Welcome to Spring Boot!";
    }
    
    @GetMapping("/greet/{name}")
    public String greetPath(@PathVariable String name) {
        return "Hi " + name + "! Nice to meet you!";
    }
    
    @GetMapping("/time")
    public String currentTime() {
        return "Current time: " + java.time.LocalDateTime.now();
    }
}`,
                        explanation: `This example shows how to work with URL parameters:

**@RequestMapping("/api")**: Sets a base path for all endpoints in this controller. All URLs will start with /api

**@RequestParam**: Gets parameters from the query string (after the ?)
- Example: /api/greet?name=John
- If no name is provided, it uses "Guest" as the default

**@PathVariable**: Gets parameters from the URL path itself
- Example: /api/greet/John
- The {name} in the URL matches the parameter name

**Real-world use case:**
This is how you build APIs that respond differently based on user input. For example:
- /api/greet?name=Alice → "Hello, Alice! Welcome to Spring Boot!"
- /api/greet/Bob → "Hi Bob! Nice to meet you!"
- /api/time → Shows current server time

This pattern is used everywhere - search engines, social media, e-commerce sites, etc.`,
                        output: `GET /api/greet?name=Alice → "Hello, Alice! Welcome to Spring Boot!"
GET /api/greet/Bob → "Hi Bob! Nice to meet you!"
GET /api/time → "Current time: 2024-12-03T11:30:45"`,
                        difficulty: "intermediate"
                    }
                ],
                keyTakeaways: [
                    "Spring Boot is a framework that makes Spring development faster and easier",
                    "@SpringBootApplication is the main annotation that enables all Spring Boot features",
                    "Spring Boot includes an embedded web server - no need to install Tomcat separately",
                    "Auto-configuration automatically sets up your application based on dependencies",
                    "Starter dependencies bundle related libraries together for easy setup",
                    "@RestController and @GetMapping are used to create REST API endpoints"
                ],
                commonMistakes: [
                    {
                        mistake: "Forgetting @SpringBootApplication annotation",
                        explanation: "Without this annotation, Spring Boot won't enable auto-configuration and component scanning",
                        howToAvoid: "Always put @SpringBootApplication on your main class (the one with the main method)"
                    },
                    {
                        mistake: "Putting controllers in a different package than the main class",
                        explanation: "Spring Boot only scans for components in the same package (and sub-packages) as the @SpringBootApplication class",
                        howToAvoid: "Keep your main class at the root of your package structure, or use @ComponentScan to specify additional packages"
                    },
                    {
                        mistake: "Confusing @Controller and @RestController",
                        explanation: "@Controller is for web pages (returns HTML), @RestController is for APIs (returns data like JSON)",
                        howToAvoid: "Use @RestController when building REST APIs, use @Controller when building traditional web applications with views"
                    }
                ]
            }
        ]);

        return {
            message: "Enhanced Spring Boot course created successfully!",
            courseId,
            note: "This is a sample with enhanced content. Run this seed to see the new format in action."
        };
    },
});
