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
    },
    {
        id: 5,
        title: "Data Structures and Algorithms",
        author: "David Wilson",
        category: "Technology",
        cover: "https://source.unsplash.com/random/300x400?book,code",
        description: "Learn about fundamental data structures and algorithms."
    },
    {
        id: 6,
        title: "Calculus Made Easy",
        author: "Lisa Anderson",
        category: "Mathematics",
        cover: "https://source.unsplash.com/random/300x400?book,calculus",
        description: "A simplified approach to calculus concepts."
    },
    {
        id: 7,
        title: "The Art of Programming",
        author: "Robert Chen",
        category: "Technology",
        cover: "https://source.unsplash.com/random/300x400?book,programming",
        description: "Master the art of writing clean and efficient code."
    },
    {
        id: 8,
        title: "Organic Chemistry",
        author: "Maria Garcia",
        category: "Science",
        cover: "https://source.unsplash.com/random/300x400?book,chemistry",
        description: "A comprehensive guide to organic chemistry principles."
    },
    {
        id: 9,
        title: "Ancient Civilizations",
        author: "James Wilson",
        category: "History",
        cover: "https://source.unsplash.com/random/300x400?book,ancient",
        description: "Explore the rise and fall of ancient civilizations."
    },
    {
        id: 10,
        title: "Linear Algebra",
        author: "Thomas Lee",
        category: "Mathematics",
        cover: "https://source.unsplash.com/random/300x400?book,algebra",
        description: "Understanding linear algebra concepts and applications."
    },
    {
        id: 11,
        title: "Web Development Bootcamp",
        author: "Rachel Martinez",
        category: "Technology",
        cover: "https://source.unsplash.com/random/300x400?book,web",
        description: "Complete guide to modern web development."
    },
    {
        id: 12,
        title: "Genetics and Evolution",
        author: "Daniel Kim",
        category: "Science",
        cover: "https://source.unsplash.com/random/300x400?book,genetics",
        description: "Study of genetic principles and evolutionary biology."
    }
];

// DOM Elements
const catalogBooksContainer = document.getElementById('catalog-books');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Display Books
function displayBooks(booksToShow) {
    catalogBooksContainer.innerHTML = '';
    booksToShow.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="category">${book.category}</p>
            </div>
        `;
        bookCard.addEventListener('click', () => showBookDetails(book));
        catalogBooksContainer.appendChild(bookCard);
    });
}

// Filter Books
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayBooks(filteredBooks);
}

// Show Book Details Modal
function showBookDetails(book) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${book.cover}" alt="${book.title}" style="width: 100%; max-height: 300px; object-fit: cover;">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p>${book.description}</p>
            <button class="btn" onclick="borrowBook(${book.id})">Borrow Book</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Close Modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
    };
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// Borrow Book Function
function borrowBook(bookId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('Please login to borrow books');
        window.location.href = 'login.html';
        return;
    }

    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    if (borrowedBooks.includes(bookId)) {
        alert('You have already borrowed this book');
        return;
    }

    borrowedBooks.push(bookId);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    alert('Book borrowed successfully!');
}

// Event Listeners
searchInput.addEventListener('input', filterBooks);
categoryFilter.addEventListener('change', filterBooks);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
}); 