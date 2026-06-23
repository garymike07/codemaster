import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const py = (code: string) => ({ language: "python", code });
const stdinWrap = (body: string) => `${body}\n\nimport sys\ndata = sys.stdin.read().strip()\n`;

const MODULES: ModuleSpec[] = [
  {
    title: "Data with pandas",
    description: "Load, inspect, and transform tabular data",
    lessons: [
      theory("Why pandas?", 15, [
        { heading: "DataFrames", body: "pandas provides DataFrame — a table with labeled rows/columns. Essential for data analysis in Python." },
      ], py("import pandas as pd\ndf = pd.DataFrame({'name': ['a','b'], 'score': [90, 85]})\nprint(df)")),
      theory("Reading CSV Files", 15, [
        { heading: "pd.read_csv", body: "Load CSV into DataFrame. Specify dtypes, parse_dates, and handle missing values." },
      ]),
      theory("Inspecting Data", 12, [
        { heading: "head, info, describe", body: "Quick summaries: `.head()`, `.info()`, `.describe()`, `.shape`." },
      ]),
      practice("Column Mean", 25, "**Task:** Given comma-separated numbers on stdin, print their average rounded to 2 decimals.", [], {
        language: "python",
        codeTemplate: stdinWrap("nums = [float(x) for x in data.split(',')]\nprint(round(sum(nums)/len(nums), 2))"),
        solution: stdinWrap("nums = [float(x) for x in data.split(',')]\nprint(round(sum(nums)/len(nums), 2))"),
        testCases: [{ input: "10,20,30", expectedOutput: "20.0", isHidden: false }],
      }),
    ],
  },
  {
    title: "Cleaning & Transforming",
    description: "Prepare real-world messy data",
    lessons: [
      theory("Handling Missing Values", 15, [
        { heading: "dropna / fillna", body: "Drop rows with nulls or impute with mean/median/mode." },
      ]),
      theory("Filtering Rows", 15, [
        { heading: "Boolean indexing", body: "`df[df['age'] > 18]` — combine conditions with `&` and `|`." },
      ]),
      theory("Adding Columns", 12, [
        { heading: "Vectorized ops", body: "`df['total'] = df['price'] * df['qty']` — avoid row loops." },
      ]),
      theory("GroupBy Aggregations", 15, [
        { heading: "Split-apply-combine", body: "`df.groupby('category')['sales'].sum()`" },
      ]),
    ],
  },
  {
    title: "Visualization",
    description: "Communicate insights with charts",
    lessons: [
      theory("matplotlib Basics", 15, [
        { heading: "pyplot", body: "Create line, bar, and scatter plots. Always label axes and add titles." },
      ], py("import matplotlib.pyplot as plt\nplt.plot([1,2,3],[1,4,9])\nplt.savefig('chart.png')")),
      theory("Choosing Chart Types", 12, [
        { heading: "Match data to chart", body: "Trends → line; categories → bar; distributions → histogram." },
      ]),
      theory("Seaborn intro", 12, [
        { heading: "Statistical plots", body: "Seaborn builds on matplotlib with attractive defaults." },
      ]),
      theory("Exporting Reports", 12, [
        { heading: "Share results", body: "Save PNG/PDF or export summary tables to Excel with `to_excel`." },
      ]),
    ],
  },
  {
    title: "Web APIs & requests",
    description: "Automate data collection from HTTP APIs",
    lessons: [
      theory("HTTP with requests", 15, [
        { heading: "GET and POST", body: "`requests.get(url, params=..., headers=...)` returns Response with `.json()`." },
      ], py("import requests\n# r = requests.get('https://api.example.com/data')")),
      theory("API Keys & Auth", 12, [
        { heading: "Security", body: "Store API keys in environment variables, never commit to git." },
      ]),
      theory("Pagination", 12, [
        { heading: "Fetch all pages", body: "Loop while `next` cursor or page param exists." },
      ]),
      practice("JSON Field Extract", 20, "**Task:** Parse stdin as JSON `{\"value\": N}` and print value.", [], {
        language: "python",
        codeTemplate: stdinWrap("import json\nprint(json.loads(data)['value'])"),
        solution: stdinWrap("import json\nprint(json.loads(data)['value'])"),
        testCases: [{ input: '{"value": 42}', expectedOutput: "42", isHidden: false }],
      }),
    ],
  },
  {
    title: "Automation Scripts",
    description: "Automate repetitive tasks",
    lessons: [
      theory("Scheduling with cron / Task Scheduler", 12, [
        { heading: "Run on interval", body: "Use OS schedulers or Python `schedule` library for periodic jobs." },
      ]),
      theory("Working with Files", 15, [
        { heading: "pathlib", body: "Glob folders, rename batches, move files by pattern." },
      ]),
      theory("Email & Notifications", 12, [
        { heading: "smtplib / webhooks", body: "Send alerts when scripts finish or detect anomalies." },
      ]),
      theory("Logging Automation", 12, [
        { heading: "logging module", body: "Log to files with rotation for long-running scripts." },
      ]),
    ],
  },
  {
    title: "Text & Regex",
    description: "Parse and clean unstructured text",
    lessons: [
      theory("Regular Expressions", 15, [
        { heading: "re module", body: "`re.search`, `re.findall`, groups for extracting patterns from logs and emails." },
      ], py("import re\nprint(re.findall(r'\\d+', 'order 42 and 7'))")),
      theory("String Methods", 12, [
        { heading: "strip, split, join", body: "Often enough without regex for simple cleaning." },
      ]),
      theory("JSON Lines", 12, [
        { heading: "ndjson", body: "One JSON object per line — common in data exports." },
      ]),
      practice("Extract Digits", 20, "**Task:** Print all digits concatenated from stdin string.", [], {
        language: "python",
        codeTemplate: stdinWrap("import re\nprint(''.join(re.findall(r'\\d', data)))"),
        solution: stdinWrap("import re\nprint(''.join(re.findall(r'\\d', data)))"),
        testCases: [{ input: "a1b23", expectedOutput: "123", isHidden: false }],
      }),
    ],
  },
  {
    title: "Excel & Reporting",
    description: "Business-friendly outputs",
    lessons: [
      theory("read_excel / to_excel", 12, [
        { heading: "openpyxl", body: "Read and write Excel workbooks from pandas." },
      ]),
      theory("Pivot Tables", 15, [
        { heading: "pd.pivot_table", body: "Summarize metrics by dimensions like Excel pivots." },
      ]),
      theory("Automated Reports", 12, [
        { heading: "Pipeline", body: "Extract → transform → chart → email PDF on schedule." },
      ]),
      theory("Data Quality Checks", 12, [
        { heading: "Assertions", body: "Validate row counts, null rates, and ranges before publishing." },
      ]),
    ],
  },
  {
    title: "Capstone",
    description: "End-to-end automation project",
    lessons: [
      theory("Project: Sales Dashboard", 15, [
        { heading: "Steps", body: "1) Download CSV from URL 2) Clean 3) Aggregate by region 4) Plot 5) Save report." },
      ]),
      theory("Best Practices", 12, [
        { heading: "Reproducibility", body: "requirements.txt, README, idempotent scripts." },
      ]),
      theory("Next: Web APIs", 12, [
        { heading: "Continue", body: "Expose your cleaned data via FastAPI in the Python Web & APIs course." },
      ]),
      theory("Resources", 12, [
        { heading: "Keep learning", body: "pandas docs, Kaggle datasets, Real Python tutorials." },
      ]),
    ],
  },
];

export async function seedPythonDataAutomation(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "python");
  await applyEnhancementsToCourse(ctx, "python-data-automation");
  return lessonIds;
}
