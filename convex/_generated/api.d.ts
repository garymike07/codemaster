/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as cleanup from "../cleanup.js";
import type * as courses from "../courses.js";
import type * as debugLessons from "../debugLessons.js";
import type * as enrollments from "../enrollments.js";
import type * as examBank from "../examBank.js";
import type * as examPublishing from "../examPublishing.js";
import type * as exams from "../exams.js";
import type * as gamification from "../gamification.js";
import type * as messaging from "../messaging.js";
import type * as progress from "../progress.js";
import type * as seed from "../seed.js";
import type * as seedAdditionalCourses from "../seedAdditionalCourses.js";
import type * as seedCourses from "../seedCourses.js";
import type * as seedExpandedCourses from "../seedExpandedCourses.js";
import type * as subscriptions from "../subscriptions.js";
import type * as teacher from "../teacher.js";
import type * as updateLessonContent from "../updateLessonContent.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  cleanup: typeof cleanup;
  courses: typeof courses;
  debugLessons: typeof debugLessons;
  enrollments: typeof enrollments;
  examBank: typeof examBank;
  examPublishing: typeof examPublishing;
  exams: typeof exams;
  gamification: typeof gamification;
  messaging: typeof messaging;
  progress: typeof progress;
  seed: typeof seed;
  seedAdditionalCourses: typeof seedAdditionalCourses;
  seedCourses: typeof seedCourses;
  seedExpandedCourses: typeof seedExpandedCourses;
  subscriptions: typeof subscriptions;
  teacher: typeof teacher;
  updateLessonContent: typeof updateLessonContent;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
