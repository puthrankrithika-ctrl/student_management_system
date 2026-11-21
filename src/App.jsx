/*import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App*/
/*import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentForm from './components/StudentForm';
import StudentFormPage from './pages/StudentFormPage';
import StudentTable from './components/StudentTable';
import StudentsPage from './pages/StudentsPage';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import StudentFormPage from './pages/StudentFormPage';
import './App.css';
// This is the name used to save our student list in the browser.
const STORAGE_KEY = 'student-management-students';
function App() {
return (
<>
<Navbar />
<main className="page">
<h1>Student Manager</h1>
<p>Our student system starts here.</p>
</main>
<HomePage studentCount={0} />
<StudentForm onSave={(data) => console.log(data)} />
<StudentFormPage onSave={(data) => console.log(data)} />
<StudentTable students={[]} onDelete={() => {}} />
<StudentsPage students={[]} onDelete={() => {}} />
</>
);
}
export default App;*/
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import StudentFormPage from './pages/StudentFormPage';
import './App.css';
// This is the name used to save our student list in the browser.
const STORAGE_KEY = 'student-management-students';
function App() {
// Read saved students when the app starts. If there are none, use an empty list.
const [students, setStudents] = useState(() => {
const savedStudents = localStorage.getItem(STORAGE_KEY);
return savedStudents ? JSON.parse(savedStudents) : [];
});
// Keep the browser's saved copy in sync whenever the list changes.
useEffect(() => {
localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}, [students]);
// The URL path tells us which simple page to display.
const path = window.location.pathname;
const editMatch = path.match(/^\/edit\/([^/]+)$/);
const studentToEdit = editMatch
? students.find((student) => student.id === editMatch[1])
: null;
// Add a unique id, save the new list, then show the students page.
function addStudent(studentDetails) {
const updatedStudents = [
...students,
{ ...studentDetails, id: Date.now().toString() },
];
localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents));
setStudents(updatedStudents);
window.location.href = '/students';
console.log('add students data:', updatedStudents);
}
// Replace the matching student while keeping the rest of the list.
function updateStudent(updatedStudent) {
const updatedStudents = students.map((student) =>
student.id === updatedStudent.id ? updatedStudent : student,
);
localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents));
setStudents(updatedStudents);
window.location.href = '/students';
}
// Ask for confirmation, then make a new list without the deleted student.
function deleteStudent(id) {
if (window.confirm('Delete this student?')) {
setStudents(students.filter((student) => student.id !== id));
}
}
// Choose a page based on the current URL.
let page;
if (path === '/students') {
page = <StudentsPage students={students} onDelete={deleteStudent} />;
} else if (path === '/add-student') {
page = <StudentFormPage onSave={addStudent} />;
} else if (editMatch && studentToEdit) {
page = <StudentFormPage student={studentToEdit} onSave={updateStudent} />;
} else {
page = <HomePage studentCount={students.length} />;
}
console.log('students data:', students);
// The navbar is shared by every page; the selected page appears below it.
return (
<>
<Navbar />
{page}
</>
);
}
export default App;