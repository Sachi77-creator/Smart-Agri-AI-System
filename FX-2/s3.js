let students = []; 

const MAX_STUDENTS = 50; 

function addStudent() { 

  if (students.length >= MAX_STUDENTS) { 

    alert("Maximum of 50 students reached!"); 

    return; 

  } 

  let name = document.getElementById("name").value.trim(); 

  let age = Number(document.getElementById("age").value); 

  let course = document.getElementById("course").value.trim(); 

  if (name === "" || course === "") { 

    alert("Name and course are required"); 

    return; 

  } 

  if (age < 4 || age > 24) { 

    alert("Age must be between 4 and 24"); 

    return; 

  } 

  const alphaRegex = /^[A-Za-z\s]+$/;  

  if (!alphaRegex.test(name)) { 

    alert("Name must contain only letters and spaces"); 

    return; 

  } 

  if (!alphaRegex.test(course)) { 

    alert("Course must contain only letters and spaces"); 

    return; 

  } 

  let student = { name, age, course }; 

  students.push(student); 

  displayStudents(); 

  clearInputs(); 

} 

function removeStudent(index) { 

  students.splice(index, 1); 

  displayStudents(); 

} 

function displayStudents() { 

  let output = ""; 

  students.forEach((s, index) => {   

    output += ` 

      <div class="student-box"> 

        <div class="student-info"> 

          <strong>${index + 1}. ${s.name}</strong><br> 

          Age: ${s.age}<br> 

          Course: ${s.course} 

        </div> 

        <button class="remove-btn" onclick="removeStudent(${index})">Remove</button> 

      </div> 

    `; 

  }); 

  document.getElementById("studentList").innerHTML = output; 

} 

function clearInputs() { 

  document.getElementById("name").value = ""; 

  document.getElementById("age").value = ""; 

  document.getElementById("course").value = ""; 

} 