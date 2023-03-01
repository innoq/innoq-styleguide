const filter = document.querySelector('#filter');
const industries = document.querySelectorAll('.industry');

filter.addEventListener('change', function() {
  const selectedCategory = this.value;
  industries.forEach(function(industry) {
    if (selectedCategory === 'all' || industry.dataset.category === selectedCategory) {
      industry.style.display = 'block';
    } else {
      industry.style.display = 'none';
    }
  });
});