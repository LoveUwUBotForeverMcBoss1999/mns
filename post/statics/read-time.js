// read-time.js
function calculateReadTime() {
    // Select all text content from the post
    const content = document.querySelector('.post-content').textContent;
    
    // Average reading speed (words per minute)
    const wordsPerMinute = 200;
    
    // Count words (split by spaces and filter empty strings)
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Calculate reading time
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Update the read time element
    const readTimeElement = document.querySelector('.read-time');
    if (readTimeElement) {
        readTimeElement.textContent = `${readTime} minute read`;
    }
}

// Calculate read time when the document loads
document.addEventListener('DOMContentLoaded', calculateReadTime);