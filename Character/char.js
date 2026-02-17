const textarea = document.getElementById("text");
const totalChars = document.getElementById("para");
const remainingChars = document.getElementById("count");

const maxLength = 200; 
textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length; 
    totalChars.textContent = `Total Characters: ${currentLength}`;
    remainingChars.textContent = `Remaining: ${maxLength - currentLength}`;

    if (currentLength > maxLength) {
        alert(`You cannot type more than ${maxLength} characters!`);
        textarea.value = "";
    }
});
