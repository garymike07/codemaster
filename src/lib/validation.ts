import { z } from 'zod';

export const emailSchema = z.string().trim().email('Please provide a valid email address');

export const examGeneratorConfigSchema = z.object({
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.string().trim().min(1, 'Language is required'),
  topic: z.string().trim().min(2, 'Topic must be at least 2 characters'),
});

export const lessonNoteSchema = z.object({
  content: z.string().trim().min(1, 'Note content cannot be empty'),
  lessonId: z.string().trim().min(1, 'Lesson id is required'),
});

export type ExamGeneratorConfig = z.infer<typeof examGeneratorConfigSchema>;
export type LessonNoteInput = z.infer<typeof lessonNoteSchema>;
