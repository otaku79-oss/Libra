// DOM Elements
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const borrowedCount = document.getElementById('borrowedCount');
const historyCount = document.getElementById('historyCount');
const borrowedBooksGrid = document.getElementById('borrowedBooksGrid');
const readingHistory = document.getElementById('readingHistory');
const logoutBtn = document.getElementById('logoutBtn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Sample book data (in a real application, this would come from a database)
const books = [
    {
        id: 1,
        title: "Introduction to Computer Science",
        author: "John Smith",
        category: "Technology",
        cover: "https://source.unsplash.com/random/300x400?book,computer",
        description: "A comprehensive guide to computer science fundamentals."
    },
    {
        id: 2,
        title: "Advanced Mathematics",
        author: "Sarah Johnson",
        category: "Mathematics",
        cover: "https://source.unsplash.com/random/300x400?book,math",
        description: "Advanced mathematical concepts and problem-solving techniques."
    },
    {
        id: 3,
        title: "World History",
        author: "Michael Brown",
        category: "History",
        cover: "https://source.unsplash.com/random/300x400?book,history",
        description: "A journey through the major events of world history."
    },
    {
        id: 4,
        title: "Modern Physics",
        author: "Emily Davis",
        category: "Science",
        cover: "https://source.unsplash.com/random/300x400?book,physics",
        description: "Exploring the principles of modern physics."
    }
];

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Check Authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    return user;
}

// Update User Profile
function updateProfile(user) {
    userName.textContent = user.name;
    userEmail.textContent = user.email;
}

// Display Borrowed Books
function displayBorrowedBooks() {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    borrowedCount.textContent = borrowedBooks.length;

    borrowedBooksGrid.innerHTML = '';
    borrowedBooks.forEach(bookId => {
        const book = books.find(b => b.id === bookId);
        if (book) {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <img src="${book.cover}" alt="${book.title}">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="category">${book.category}</p>
                    <button class="btn btn-danger" onclick="returnBook(${book.id})">Return Book</button>
                </div>
            `;
            borrowedBooksGrid.appendChild(bookCard);
        }
    });
}

// Return Book
function returnBook(bookId) {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const updatedBooks = borrowedBooks.filter(id => id !== bookId);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBooks));
    
    // Add to reading history
    const readingHistory = JSON.parse(localStorage.getItem('readingHistory')) || [];
    readingHistory.push({
        bookId,
        returnDate: new Date().toISOString()
    });
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
    
    displayBorrowedBooks();
    displayReadingHistory();
}

// Display Reading History
function displayReadingHistory() {
    const history = JSON.parse(localStorage.getItem('readingHistory')) || [];
    historyCount.textContent = history.length;

    readingHistory.innerHTML = '';
    history.reverse().forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book) {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <img src="${book.cover}" alt="${book.title}">
                <div class="history-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="return-date">Returned on: ${new Date(item.returnDate).toLocaleDateString()}</p>
                </div>
            `;
            readingHistory.appendChild(historyItem);
        }
    });
}

// Logout
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth();
    if (user) {
        updateProfile(user);
        displayBorrowedBooks();
        displayReadingHistory();
    }
}); 