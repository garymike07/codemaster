# CodeMaster — Full Codebase Bug Audit Report

> Generated: 2026-03-02  
> Audited by: Rovo Dev  
> Total Bugs Found: **21**

---

## 🔴 CRITICAL BUGS (5)

### 1. `convex/users.ts` — No Auth Check on `updateRole`
- **Impact**: Security vulnerability — any user can change any other user's role
- **Description**: The `updateRole` mutation has no authentication or authorization check. A malicious user can escalate their own privileges or demote admins.
- **Suggested Fix**: Add an auth check at the top of the mutation:
```ts
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error("Unauthorized");
// Additionally verify the caller is an admin
```

---

### 2. `src/pages/LessonPlayer.tsx` — Race Condition in `handleSubmit`
- **Impact**: Users can bypass tests and mark lessons complete without passing
- **Description**: `handleSubmit` calls `runTests()` asynchronously but immediately checks `testResults` state before it updates. `testResults` is always empty at that point, so `allPassed` is always `true`.
- **Current Code**:
```ts
await runTests();  // updates state asynchronously
const allPassed = testResults.length === 0 || testResults.every((r) => r.passed);  // testResults still empty!
```
- **Suggested Fix**: Refactor `runTests()` to return results directly instead of relying on state, or use a `useEffect` to react to `testResults` changes after running.

---

### 3. `convex/examPublishing.ts` — `saveProgress` Doesn't Validate Exam Exists
- **Impact**: Orphaned submission records if exam is deleted mid-attempt
- **Description**: The `saveProgress` function creates/updates submissions without first checking if the exam still exists in the database.
- **Suggested Fix**:
```ts
const exam = await ctx.db.get(args.examId);
if (!exam) throw new Error("Exam not found");
```

---

### 4. `src/hooks/useCodeExecution.ts` — Broken API URL Construction
- **Impact**: Code execution is completely broken in LessonPlayer and ModuleLearningHub
- **Description**: The hook constructs a URL by replacing `.cloud` with `.site` on the Convex URL to reach `/api/code/execute`. Convex does not expose this endpoint by default. This causes all code execution via this hook to fail silently.
- **Suggested Fix**: Use a Convex action directly or integrate Judge0 API (as done in Playground.tsx):
```ts
// Option 1: Use Convex action
const result = await convex.action(api.codeExecution.execute, { code, language });

// Option 2: Use Judge0 directly (consistent with Playground.tsx)
const response = await fetch(`${import.meta.env.VITE_JUDGE0_API_URL}/submissions...`);
```

---

### 5. `src/components/TrialBanner.tsx` — Links to Non-Existent `/pricing` Route
- **Impact**: Clicking "Upgrade" in the trial banner leads to a 404/blank page
- **Description**: `TrialBanner` navigates to `/pricing`, but this route is not defined in `App.tsx`. The correct route is `/upgrade` or `/subscription`.
- **Suggested Fix**: Update the link to point to the correct route:
```tsx
navigate("/upgrade"); // or "/subscription"
```

---

## 🟠 HIGH PRIORITY BUGS (6)

### 6. `convex/subscriptions.ts` — `upgradeSubscription` Has No Payment Verification
- **Description**: The `upgradeSubscription` mutation immediately sets the user's subscription to "active" without verifying any payment. This means subscriptions can be activated for free by calling the mutation directly.
- **Suggested Fix**: Gate the mutation behind a verified payment webhook or integrate with a payment provider (e.g. Stripe) before updating subscription status.

---

### 7. `src/pages/ExamRunner.tsx` — Timer Can Trigger Multiple Submissions
- **Description**: When the exam timer hits zero, `handleSubmit()` is called inside `setTimeLeft`. There is no `isSubmitting` guard in the timer callback, so rapid state updates could trigger multiple simultaneous submissions.
- **Suggested Fix**:
```ts
setTimeLeft((prev) => {
  if (prev === null || prev <= 1) {
    if (!isSubmitting) handleSubmit(); // guard added
    return 0;
  }
  return prev - 1;
});
```

---

### 8. `src/pages/ExamWorkspace.tsx` — Language Hardcoded to JavaScript (ID `63`)
- **Description**: All code submissions in exam workspace use language ID `63` (JavaScript) regardless of the actual question language. Non-JavaScript questions will be executed incorrectly.
- **Suggested Fix**: Map language names to Judge0 IDs dynamically:
```ts
const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};
const languageId = languageMap[question.language ?? "javascript"] ?? 63;
```

---

### 9. `src/pages/ExamWorkspace.tsx` — Auto-Save Has No Error Handling
- **Description**: The auto-save `setInterval` calls a Convex mutation without try/catch. If the save fails (network error, validation error), the user's progress is silently lost.
- **Suggested Fix**:
```ts
try {
  await saveProgress({ examId: exam._id, answers: answersArray });
  setLastSaved(new Date());
} catch (error) {
  console.error("Auto-save failed:", error);
  // Show a toast notification to the user
}
```

---

### 10. `src/pages/CourseDetail.tsx` — `module.lessons` Accessed Without Null Check
- **Description**: Both `module.lessons.length` and `module.lessons.map(...)` are called without checking if `lessons` exists on the module. If a module loads without its lessons populated, the page crashes.
- **Suggested Fix**:
```tsx
{(module.lessons ?? []).length} lessons
{(module.lessons ?? []).map((lesson) => { ... })}
```

---

### 11. `src/pages/ExamCentre.tsx` — AI `generateQuestions` Result Not Validated
- **Description**: The result from the AI action is passed directly to `.map()` without checking if `result.questions` is a valid array. A failed or malformed AI response will crash the component.
- **Suggested Fix**:
```ts
if (!result || !Array.isArray(result.questions) || result.questions.length === 0) {
  alert("Failed to generate questions: " + (result?.error || "Unknown error"));
  return;
}
```

---

## 🟡 MEDIUM PRIORITY BUGS (6)

### 12. `src/pages/Playground.tsx` — No Validation of Judge0 Env Vars
- **Description**: The `handleRun` function calls the Judge0 API without checking if `VITE_JUDGE0_API_URL` and `VITE_JUDGE0_API_KEY` are configured. Unconfigured envs cause cryptic failures.
- **Suggested Fix**:
```ts
if (!import.meta.env.VITE_JUDGE0_API_URL || !import.meta.env.VITE_JUDGE0_API_KEY) {
  setError("Code execution is not configured. Please contact support.");
  return;
}
```

---

### 13. `src/pages/ExamCentre.tsx` — Generic Error on AI Generation Failure
- **Description**: The catch block shows a generic alert with no detail. Users can't tell if the failure was a network error, AI error, or data issue.
- **Suggested Fix**:
```ts
catch (error) {
  const errorMsg = error instanceof Error ? error.message : "Unknown error";
  alert(`Failed to generate exam: ${errorMsg}`);
}
```

---

### 14. `src/components/PaywallGate.tsx` — "View Pricing" Button Has No `onClick`
- **Description**: The "View Pricing" button renders without an `onClick` handler, making it completely non-functional. Clicking it does nothing.
- **Suggested Fix**:
```tsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
// ...
<Button onClick={() => navigate("/upgrade")}>View Pricing</Button>
```

---

### 15. `src/pages/LessonPlayer.tsx` — No Completion Screen on Last Lesson
- **Description**: `navigateToNextLesson()` silently returns without any action when the user is on the last lesson. The user gets no feedback that they've completed the course.
- **Suggested Fix**: Navigate to the course page with a completion state, or show a "🎉 Course Complete!" modal:
```ts
if (currentIndex === courseLessons.length - 1) {
  navigate(`/course/${lesson.courseId}?completed=true`);
} else {
  navigate(`/lesson/${courseLessons[currentIndex + 1]._id}`);
}
```

---

### 16. `src/pages/CourseDetail.tsx` — `handleEnroll` Has No Error Handling
- **Description**: Enrollment failure is completely silent — no try/catch, no user feedback, no loading state.
- **Suggested Fix**:
```ts
const handleEnroll = async () => {
  try {
    await enroll({ courseId: course._id });
  } catch (error) {
    console.error("Enrollment failed:", error);
    alert("Failed to enroll. Please try again.");
  }
};
```

---

### 17. `convex/exams.ts` — Fragile `courseId.startsWith("k")` Check
- **Description**: Convex IDs all start with `"k"`, so this check doesn't meaningfully distinguish between ID types. The logic is either always true or semantically incorrect.
- **Suggested Fix**: Use Convex's built-in type system — define `courseId` as `v.id("courses")` in the schema and remove the string check entirely, or use `v.union(v.id("courses"), v.null())`.

---

## 🟢 LOW PRIORITY / UX ISSUES (4)

### 18. `src/pages/Playground.tsx` — Share Button Shows Alert Instead of Being Disabled
- **Description**: The Share button triggers a "coming soon" alert on click. This is poor UX — incomplete features should be visually indicated as disabled.
- **Suggested Fix**:
```tsx
<Button size="sm" variant="ghost" disabled>
  <Share2 className="w-4 h-4 mr-2" />
  Share (Coming Soon)
</Button>
```

---

### 19. `src/pages/ModuleLearningHub.tsx` — Disabled Playground Tab Has No Tooltip
- **Description**: The playground tab is silently disabled for theory lessons and unsupported languages with no explanation. Users may be confused.
- **Suggested Fix**: Add a `title` attribute or tooltip:
```tsx
<TabsTrigger
  value="playground"
  disabled={lesson.type === "theory" || !canExecuteCode}
  title={lesson.type === "theory" ? "Not available for theory lessons" : "Language not supported"}
>
```

---

### 20. `src/pages/Dashboard.tsx` — `handleSeed` Has No Loading State or Error Handling
- **Description**: The seed button fires the mutation with no loading feedback or error handling. If seeding fails, the user has no indication.
- **Suggested Fix**:
```ts
const [isSeeding, setIsSeeding] = useState(false);
const handleSeed = async () => {
  setIsSeeding(true);
  try {
    await seedCourses();
  } catch (e) {
    console.error("Seeding failed:", e);
  } finally {
    setIsSeeding(false);
  }
};
```

---

### 21. `convex/gamification.ts` — Level Calculation Edge Case at Max Level
- **Description**: The level-up logic may behave unexpectedly at the maximum level boundary if no ceiling is enforced, potentially returning `undefined` or an out-of-bounds level.
- **Suggested Fix**: Add a max level cap:
```ts
const newLevel = Math.min(calculatedLevel, MAX_LEVEL);
```

---

## 📊 Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 5 |
| 🟠 High | 6 |
| 🟡 Medium | 6 |
| 🟢 Low / UX | 4 |
| **Total** | **21** |

---

## 🛠️ Recommended Fix Order

1. **Security first**: Fix `updateRole` auth check (#1) and `upgradeSubscription` payment gate (#6)
2. **Broken features**: Fix `useCodeExecution` API URL (#4), TrialBanner route (#5), PaywallGate button (#14)
3. **Data integrity**: Fix `saveProgress` exam validation (#3) and ExamWorkspace auto-save error handling (#9)
4. **Test bypass**: Fix `LessonPlayer` race condition (#2)
5. **Crashes**: Fix null checks in `CourseDetail` (#10) and `ExamCentre` (#11)
6. **UX polish**: Fix remaining medium and low priority issues (#12–#21)
