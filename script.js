// 🔥 Yeh line sabse upar lagana lazmi hai taake 'form' variable define ho sake
const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    formData.delete('access_key');
    formData.append('access_key', '46ab3ba8-61fa-48f8-a30e-cef6e9400fc3'.trim());

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ti ti-loader"></i> Sending...';
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                console.log(response);
                alert(json.message);
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again.");
        })
        .then(function () {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});



document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if(menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
      navLinks.classList.toggle("active");
    });

    // Jab user kisi single navigation component par link click kare to menu auto-collapse ho jaye
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});