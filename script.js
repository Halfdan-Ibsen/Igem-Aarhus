(function () {
    var navLinks = document.querySelectorAll('.nav-links a');
    var path = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === path) {
            link.setAttribute('aria-current', 'page');
        }
    });

    var revealItems = document.querySelectorAll('[data-reveal]');
    if (!revealItems.length) {
        return;
    }

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach(function (item) {
            item.classList.add('is-visible');
        });
        return;
    }

    document.documentElement.classList.add('js-motion');

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealItems.forEach(function (item) {
        observer.observe(item);
    });
})();
