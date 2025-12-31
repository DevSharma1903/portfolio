document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"]), a[href$=".html"]:not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('#')) {
                e.preventDefault();
                const destination = this.href;
                
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = destination;
                }, 300);
            }
        });
    });
});
