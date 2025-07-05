// Portfolio JavaScript - Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initParticles();
  initNavigation();
  initAnimations();
  initSkillBars();
  initStatCounters();
  initFileUpload();
  initFormSubmission();
  initScrollEffects();
});

// Create floating particles
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = window.innerWidth < 768 ? 30 : 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 20 + 's';
  particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
  
  // Random particle size
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  container.appendChild(particle);
}

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  // Smooth scroll to sections
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Smooth scroll function for buttons
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Project modal functionality
const projectData = {
  project1: {
    title: "Dreamy Mobile App",
    description: "A comprehensive sleep tracking application designed to help users improve their sleep quality through beautiful 3D animations and intuitive user interface. The app features personalized sleep insights, relaxing soundscapes, and smart alarm functionality.",
    technologies: ["React Native", "Three.js", "Node.js", "MongoDB", "Firebase"],
    features: [
      "3D animated sleep visualizations",
      "Smart sleep cycle tracking",
      "Personalized sleep recommendations",
      "Relaxing soundscapes and white noise",
      "Social sleep challenges"
    ],
    liveUrl: "https://dreamy-app-demo.com",
    githubUrl: "https://github.com/alexdesigner/dreamy-app"
  },
  project2: {
    title: "Gradient Dashboard",
    description: "A modern analytics dashboard built with React and D3.js, featuring smooth animations and real-time data visualization. Perfect for businesses looking to track their KPIs with style and efficiency.",
    technologies: ["React", "D3.js", "TypeScript", "Tailwind CSS", "Express.js"],
    features: [
      "Real-time data visualization",
      "Customizable widget layouts",
      "Advanced filtering and sorting",
      "Export functionality",
      "Mobile-responsive design"
    ],
    liveUrl: "https://gradient-dashboard-demo.com",
    githubUrl: "https://github.com/alexdesigner/gradient-dashboard"
  },
  project3: {
    title: "Portfolio Website",
    description: "A creative portfolio website showcasing interactive 3D elements and smooth animations. Built with modern web technologies to create an engaging user experience that stands out from the crowd.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Three.js", "GSAP"],
    features: [
      "Interactive 3D elements",
      "Smooth scroll animations",
      "Responsive design",
      "Performance optimized",
      "SEO friendly"
    ],
    liveUrl: "https://alexdesigner-portfolio.com",
    githubUrl: "https://github.com/alexdesigner/portfolio"
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const project = projectData[projectId];
  
  if (project) {
    modalBody.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      
      <h4 style="color: #ffd93d; margin-top: 1.5rem; margin-bottom: 0.5rem;">Key Features:</h4>
      <ul style="margin-left: 1rem; margin-bottom: 1rem;">
        ${project.features.map(feature => `<li style="margin-bottom: 0.3rem;">${feature}</li>`).join('')}
      </ul>
      
      <h4 style="color: #ffd93d; margin-bottom: 0.5rem;">Technologies Used:</h4>
      <div class="modal-tech">
        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
      </div>
      
      <div class="modal-links">
        <a href="${project.liveUrl}" target="_blank" class="modal-btn">View Live Demo</a>
        <a href="${project.githubUrl}" target="_blank" class="modal-btn">View Code</a>
      </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    closeProjectModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

// Initialize scroll animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Trigger skill bars animation
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
        
        // Trigger stat counters
        if (entry.target.classList.contains('stats-grid')) {
          animateStatCounters();
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.fade-in, .slide-in, #skills, .stats-grid').forEach(el => {
    observer.observe(el);
  });
}

// Animate skill progress bars
function initSkillBars() {
  // This will be triggered by intersection observer
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, Math.random() * 500);
  });
}

// Animate stat counters
function initStatCounters() {
  // This will be triggered by intersection observer
}

function animateStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current);
    }, 16);
  });
}

// File upload functionality
function initFileUpload() {
  const fileUpload = document.getElementById('fileUpload');
  const fileInput = document.getElementById('fileInput');
  const uploadedFiles = document.getElementById('uploadedFiles');
  let selectedFiles = [];
  
  // Click to browse
  fileUpload.addEventListener('click', () => {
    fileInput.click();
  });
  
  // Drag and drop
  fileUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUpload.classList.add('drag-over');
  });
  
  fileUpload.addEventListener('dragleave', () => {
    fileUpload.classList.remove('drag-over');
  });
  
  fileUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUpload.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  });
  
  // File input change
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  });
  
  function handleFiles(files) {
    files.forEach(file => {
      if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
        selectedFiles.push(file);
        displayFile(file);
      }
    });
  }
  
  function displayFile(file) {
    const fileElement = document.createElement('div');
    fileElement.className = 'uploaded-file';
    fileElement.innerHTML = `
      <div class="file-info">
        <span>📎</span>
        <span>${file.name}</span>
        <span style="opacity: 0.7; font-size: 0.8rem;">(${formatFileSize(file.size)})</span>
      </div>
      <button type="button" class="file-remove" onclick="removeFile('${file.name}', ${file.size})">×</button>
    `;
    
    uploadedFiles.appendChild(fileElement);
  }
  
  // Make removeFile globally accessible
  window.removeFile = function(fileName, fileSize) {
    selectedFiles = selectedFiles.filter(f => !(f.name === fileName && f.size === fileSize));
    
    const fileElements = uploadedFiles.querySelectorAll('.uploaded-file');
    fileElements.forEach(element => {
      if (element.textContent.includes(fileName)) {
        element.style.animation = 'slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
        setTimeout(() => {
          element.remove();
        }, 300);
      }
    });
  };
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Form submission
function initFormSubmission() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.querySelector('.btn-submit');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Add loading state
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Remove loading state
    submitBtn.classList.remove('loading');
    
    // Show success message (you can customize this)
    showNotification('Message sent successfully! 🎉', 'success');
    
    // Reset form
    form.reset();
    document.getElementById('uploadedFiles').innerHTML = '';
  });
}

// Scroll effects
function initScrollEffects() {
  let ticking = false;
  
  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for floating elements
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
      floatingElements.style.transform = `translateY(${rate}px)`;
    }
    
    // Update navigation background opacity
    const nav = document.querySelector('.nav-bar');
    const opacity = Math.min(scrolled / 100, 1);
    nav.style.background = `rgba(255, 255, 255, ${0.1 + opacity * 0.1})`;
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Utility function for notifications
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

// Button hover effects
document.addEventListener('mouseover', function(e) {
  if (e.target.matches('.btn-primary, .btn-secondary, .btn-view, .btn-submit')) {
    e.target.style.transform = 'translateY(-3px) scale(1.05)';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.matches('.btn-primary, .btn-secondary, .btn-view, .btn-submit')) {
    e.target.style.transform = '';
  }
});

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Add some interactive sparkle effects
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 6px;
    height: 6px;
    background: #ffd93d;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    animation: sparkleAnimation 1s ease-out forwards;
  `;
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleAnimation {
    0% {
      opacity: 1;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
`;
document.head.appendChild(sparkleStyle);

// Add sparkles on button clicks
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn-primary, .btn-secondary, .btn-view')) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        createSparkle(x, y);
      }, i * 100);
    }
  }
});

// Smooth reveal animations for elements
function revealOnScroll() {
  const reveals = document.querySelectorAll('.fade-in, .slide-in');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('animate-in');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize everything when DOM is loaded
revealOnScroll();
