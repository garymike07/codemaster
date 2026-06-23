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
import type * as aiChat from "../aiChat.js";
import type * as aiRouter from "../aiRouter.js";
import type * as cleanup from "../cleanup.js";
import type * as constants from "../constants.js";
import type * as courses from "../courses.js";
import type * as enrollments from "../enrollments.js";
import type * as ensureSeeded from "../ensureSeeded.js";
import type * as examBank from "../examBank.js";
import type * as examPublishing from "../examPublishing.js";
import type * as exams from "../exams.js";
import type * as gamification from "../gamification.js";
import type * as http from "../http.js";
import type * as lessons from "../lessons.js";
import type * as messaging from "../messaging.js";
import type * as modules from "../modules.js";
import type * as playgrounds from "../playgrounds.js";
import type * as progress from "../progress.js";
import type * as seed from "../seed.js";
import type * as seed_badges from "../seed/badges.js";
import type * as seed_contentFactory from "../seed/contentFactory.js";
import type * as seed_courses from "../seed/courses.js";
import type * as seed_courses_ai_assisted_development from "../seed/courses/ai_assisted_development.js";
import type * as seed_courses_ai_foundations from "../seed/courses/ai_foundations.js";
import type * as seed_courses_build_with_ai_apis from "../seed/courses/build_with_ai_apis.js";
import type * as seed_courses_javascript_fundamentals from "../seed/courses/javascript_fundamentals.js";
import type * as seed_courses_modern_javascript from "../seed/courses/modern_javascript.js";
import type * as seed_courses_nodejs_apis from "../seed/courses/nodejs_apis.js";
import type * as seed_courses_python_data_automation from "../seed/courses/python_data_automation.js";
import type * as seed_courses_python_fundamentals from "../seed/courses/python_fundamentals.js";
import type * as seed_courses_python_web_apis from "../seed/courses/python_web_apis.js";
import type * as seed_courses_react_frontend from "../seed/courses/react_frontend.js";
import type * as seed_courses_react_fundamentals from "../seed/courses/react_fundamentals.js";
import type * as seed_enhancements from "../seed/enhancements.js";
import type * as seed_enhancements_ai_assisted_development from "../seed/enhancements/ai_assisted_development.js";
import type * as seed_enhancements_ai_foundations from "../seed/enhancements/ai_foundations.js";
import type * as seed_enhancements_build_with_ai_apis from "../seed/enhancements/build_with_ai_apis.js";
import type * as seed_enhancements_javascript_fundamentals from "../seed/enhancements/javascript_fundamentals.js";
import type * as seed_enhancements_modern_javascript from "../seed/enhancements/modern_javascript.js";
import type * as seed_enhancements_nodejs_apis from "../seed/enhancements/nodejs_apis.js";
import type * as seed_enhancements_python_data_automation from "../seed/enhancements/python_data_automation.js";
import type * as seed_enhancements_python_fundamentals from "../seed/enhancements/python_fundamentals.js";
import type * as seed_enhancements_python_web_apis from "../seed/enhancements/python_web_apis.js";
import type * as seed_enhancements_react_frontend from "../seed/enhancements/react_frontend.js";
import type * as seed_enhancements_react_fundamentals from "../seed/enhancements/react_fundamentals.js";
import type * as seed_exams from "../seed/exams.js";
import type * as seed_utils from "../seed/utils.js";
import type * as submissions from "../submissions.js";
import type * as subscriptions from "../subscriptions.js";
import type * as teacher from "../teacher.js";
import type * as updateLessonContent from "../updateLessonContent.js";
import type * as userNotes from "../userNotes.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  aiChat: typeof aiChat;
  aiRouter: typeof aiRouter;
  cleanup: typeof cleanup;
  constants: typeof constants;
  courses: typeof courses;
  enrollments: typeof enrollments;
  ensureSeeded: typeof ensureSeeded;
  examBank: typeof examBank;
  examPublishing: typeof examPublishing;
  exams: typeof exams;
  gamification: typeof gamification;
  http: typeof http;
  lessons: typeof lessons;
  messaging: typeof messaging;
  modules: typeof modules;
  playgrounds: typeof playgrounds;
  progress: typeof progress;
  seed: typeof seed;
  "seed/badges": typeof seed_badges;
  "seed/contentFactory": typeof seed_contentFactory;
  "seed/courses": typeof seed_courses;
  "seed/courses/ai_assisted_development": typeof seed_courses_ai_assisted_development;
  "seed/courses/ai_foundations": typeof seed_courses_ai_foundations;
  "seed/courses/build_with_ai_apis": typeof seed_courses_build_with_ai_apis;
  "seed/courses/javascript_fundamentals": typeof seed_courses_javascript_fundamentals;
  "seed/courses/modern_javascript": typeof seed_courses_modern_javascript;
  "seed/courses/nodejs_apis": typeof seed_courses_nodejs_apis;
  "seed/courses/python_data_automation": typeof seed_courses_python_data_automation;
  "seed/courses/python_fundamentals": typeof seed_courses_python_fundamentals;
  "seed/courses/python_web_apis": typeof seed_courses_python_web_apis;
  "seed/courses/react_frontend": typeof seed_courses_react_frontend;
  "seed/courses/react_fundamentals": typeof seed_courses_react_fundamentals;
  "seed/enhancements": typeof seed_enhancements;
  "seed/enhancements/ai_assisted_development": typeof seed_enhancements_ai_assisted_development;
  "seed/enhancements/ai_foundations": typeof seed_enhancements_ai_foundations;
  "seed/enhancements/build_with_ai_apis": typeof seed_enhancements_build_with_ai_apis;
  "seed/enhancements/javascript_fundamentals": typeof seed_enhancements_javascript_fundamentals;
  "seed/enhancements/modern_javascript": typeof seed_enhancements_modern_javascript;
  "seed/enhancements/nodejs_apis": typeof seed_enhancements_nodejs_apis;
  "seed/enhancements/python_data_automation": typeof seed_enhancements_python_data_automation;
  "seed/enhancements/python_fundamentals": typeof seed_enhancements_python_fundamentals;
  "seed/enhancements/python_web_apis": typeof seed_enhancements_python_web_apis;
  "seed/enhancements/react_frontend": typeof seed_enhancements_react_frontend;
  "seed/enhancements/react_fundamentals": typeof seed_enhancements_react_fundamentals;
  "seed/exams": typeof seed_exams;
  "seed/utils": typeof seed_utils;
  submissions: typeof submissions;
  subscriptions: typeof subscriptions;
  teacher: typeof teacher;
  updateLessonContent: typeof updateLessonContent;
  userNotes: typeof userNotes;
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
