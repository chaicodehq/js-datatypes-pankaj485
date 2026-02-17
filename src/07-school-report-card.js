/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here

  if (
    !student ||
    typeof student !== "object" ||
    !student.name ||
    typeof student.name !== "string" ||
    !student.marks ||
    typeof student.marks !== "object"
  ) {
    return null;
  }

  const { name, marks } = student;

  const hasInvalidMark = Object.values(marks).some(
    (_) => _ < 0 || _ > 100 || typeof _ !== "number",
  );

  if (hasInvalidMark) {
    return null;
  }

  const result = {
    name,
    totalMarks: null,
    percentage: 0,
    grade: null,
    highestSubject: null,
    lowestSubject: null,
    passedSubjects: [],
    failedSubjects: [],
    subjectCount: Object.keys(marks).length,
  };

  const subjects = Object.entries(marks);

  if (subjects.length === 0) {
    return null;
  }

  const sortedSubjects = Object.entries(marks).sort((a, b) => a[1] - b[1]);

  // total marks
  result.totalMarks = Object.values(sortedSubjects)
    .map((_) => _[1])
    .reduce((p, c) => p + c, 0);

  // hightest and lowest subjects
  result.lowestSubject = sortedSubjects[0][0];
  result.highestSubject = sortedSubjects[sortedSubjects.length - 1][0];

  // passing and failing subjects
  result.passedSubjects = subjects.filter((_) => _[1] >= 40).map((_) => _[0]);
  result.failedSubjects = subjects.filter((_) => _[1] < 40).map((_) => _[0]);

  // precentage
  result.percentage = (result.totalMarks / (result.subjectCount * 100)) * 100;
  result.percentage = Number(result.percentage.toFixed(2));

  // grade
  if (result.percentage >= 90) {
    result.grade = "A+";
  } else if (result.percentage >= 80) {
    result.grade = "A";
  } else if (result.percentage >= 70) {
    result.grade = "B";
  } else if (result.percentage >= 60) {
    result.grade = "C";
  } else if (result.percentage >= 40) {
    result.grade = "D";
  } else {
    result.grade = "F";
  }

  return result;
}
