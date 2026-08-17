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
  if(Array.isArray(student)||student===null||typeof student!=='object'||typeof student.name!=='string'||student.name.trim().length===0||Array.isArray(student.marks)||
student.marks===null||typeof student.marks!=='object'||Object.keys(student.marks).length===0) return null;
for(let marks of Object.values(student.marks)){
  if(marks<0||marks>100||typeof marks!=='number'||Number.isNaN(marks)) return null;
}
let {name,marks}=student;
let totalMarks=Object.values(marks).reduce((acc,current)=>{
  return acc+current;
},0)
let numSubjects=Object.keys(marks).length;
let percentage=parseFloat(((totalMarks / (numSubjects * 100)) * 100).toFixed(2))
let grade="F"
if(percentage>=90) grade="A+";
else if(percentage>=80) grade="A";
else if(percentage>=70) grade="B";
else if(percentage>=60) grade="C";
else if(percentage>=40) grade="D";
else grade="F";
let subjectCount=Object.keys(marks).length;
let passedSubjects=Object.entries(marks)
.filter(([s,m])=>{
  return m>=40;
}).map(([s,m])=>s)

let failedSubjects=Object.entries(marks)
.filter(([s,m])=>{
  return m<40;
}).map(([s,m])=>s)

let marksArray=Object.values(marks);
let maxMarks=Math.max(...marksArray);
let minMarks=Math.min(...marksArray);
let highest=-Infinity;
let lowest=Infinity;
for(let [s,m] of Object.entries(marks)){
  if(m===maxMarks) highest=s
}
for(let [s,m] of Object.entries(marks)){
  if(m===minMarks) lowest=s;
}
return { name, totalMarks, percentage, grade,
highestSubject:highest, lowestSubject:lowest,
passedSubjects, failedSubjects,subjectCount}
}

  // let highestMarksArray=Object.entries(x).reduce((highest,current)=>{
//   if(current[1]>highest[1]) highest=current;
//     return highest
// },['',-Infinity])
// let highest=highestMarksArray[0];
// let lowestMarksArray=Object.entries(x).reduce((lowest,current)=>{
//   if(current[1]<lowest[1]) lowest=current;
//     return lowest
// },['',Infinity])
// let lowest=lowestMarksArray[0]; You could have gone for this kinda approach as well...