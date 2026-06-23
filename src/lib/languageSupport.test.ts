import {
  EXECUTABLE_LANGUAGES,
  getJudge0LanguageId,
  getMonacoLanguage,
  isExecutableLanguage,
} from "./languageSupport";

describe("languageSupport", () => {
  it("recognizes executable languages", () => {
    expect(isExecutableLanguage("JavaScript")).toBe(true);
    expect(isExecutableLanguage("python")).toBe(true);
    expect(isExecutableLanguage("html")).toBe(false);
  });

  it("maps languages to Judge0 ids", () => {
    expect(getJudge0LanguageId("js")).toBe(63);
    expect(getJudge0LanguageId("python")).toBe(71);
  });

  it("maps languages for Monaco editor", () => {
    expect(getMonacoLanguage("js")).toBe("javascript");
    expect(getMonacoLanguage("python")).toBe("python");
  });

  it("lists javascript and python as executable", () => {
    expect(EXECUTABLE_LANGUAGES).toContain("javascript");
    expect(EXECUTABLE_LANGUAGES).toContain("python");
  });
});
