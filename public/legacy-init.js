document.addEventListener('DOMContentLoaded', function() {
        // Get current language from localStorage or default to 'en'
        let currentLang = localStorage.getItem('language') || 'en';
        let currentDir = localStorage.getItem('direction') || 'ltr';
        
        // Translation dictionary (global)
        window.translations = {
          en: {
            'nav.home': 'Home',
            'nav.blogs': 'blogs',
            'footer.tagline': 'Redefining dental care with precision, comfort, and lasting results.',
            'page.blogs.title': 'Blogs',
            'blog.related': 'Related Blogs',
            'button.appointment': 'Appointment',
            'button.book_appointment': 'Book appointment',
            'doctors.available': 'Available Doctors',
            'doctors.select': 'Select Doctor',
            'doctors.talk_to_over': 'Talk to over',
            'doctors.doctor': 'doctor',
            'doctors.talk_to_over_count': '',
            'branch.working_hours': 'Working Hours:',
            'branch.office_address': 'Office Address:',
            'footer.copyright': 'All Rights Reserved.',
            'section.best_dentist': 'Best Dentist',
            'section.about_services': 'About Services',
            'section.patient_testimonials': 'What our patient say about us'
          },
          ar: {
            'nav.home': 'الرئيسية',
            'nav.blogs': 'المدونة',
            'footer.tagline': 'تعيد تعريف رعاية الأسنان بدقة وراحة ونتائج دائمة.',
            'page.blogs.title': 'المدونة',
            'blog.related': 'مقالات ذات صلة',
            'button.appointment': 'حجز موعد',
            'button.book_appointment': 'احجز موعد',
            'doctors.available': 'الأطباء المتاحون',
            'doctors.select': 'اختر الطبيب',
            'doctors.talk_to_over': 'تحدث مع أكثر من',
            'doctors.doctor': 'طبيب',
            'doctors.talk_to_over_count': '',
            'branch.working_hours': 'ساعات العمل:',
            'branch.office_address': 'عنوان المكتب:',
            'footer.copyright': 'جميع الحقوق محفوظة.',
            'section.best_dentist': 'أفضل طبيب أسنان',
            'section.about_services': 'حول الخدمات',
            'section.patient_testimonials': 'ماذا يقول زائرينا عنا'
          }
        };
        
        // Function to translate static text (global)
        window.translateStaticText = function(lang) {
          document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            
            // Handle dynamic count for doctor count text
            if (key === 'doctors.talk_to_over_count') {
              const count = element.getAttribute('data-count') || '215';
              const talkToOver = window.translations[lang]?.['doctors.talk_to_over'] || 'Talk to over';
              const doctor = window.translations[lang]?.['doctors.doctor'] || 'doctor';
              element.innerHTML = `${talkToOver} <strong>${count}</strong> ${doctor}`;
            } else if (window.translations[lang] && window.translations[lang][key]) {
              element.textContent = window.translations[lang][key];
            }
          });
        };
        
        // Initialize language on page load
        function initLanguage() {
          document.documentElement.lang = currentLang;
          document.documentElement.dir = currentDir;
          document.querySelector('html').setAttribute('dir', currentDir);
          
          // Update globalFetcher language if available
          if (typeof globalFetcher !== 'undefined' && globalFetcher) {
            globalFetcher.setLanguage(currentLang);
          }
          
          // Update dropdown text
          const currentLangSpan = document.getElementById('currentLang');
          if (currentLangSpan) {
            currentLangSpan.textContent = currentLang.toUpperCase();
          }

          // Update switch text
          const currentLangSwitch = document.getElementById('currentLangSwitch');
          if (currentLangSwitch) {
            currentLangSwitch.textContent = currentLang.toUpperCase();
          }
          
          // Mark active language in header dropdown
          document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === currentLang) {
              option.classList.add('active');
            } else {
              option.classList.remove('active');
            }
          });
          
          // Mark active language in fixed dropdown
          document.querySelectorAll('.language-option-fixed').forEach(option => {
            if (option.getAttribute('data-lang') === currentLang) {
              option.classList.add('active');
            } else {
              option.classList.remove('active');
            }
          });
          
          // Translate static text
          if (typeof window.translateStaticText === 'function') {
            window.translateStaticText(currentLang);
          }
        }
        
        // Handle language change
        async function switchLanguage(lang, dir) {
          currentLang = lang;
          currentDir = dir;
          
          // Save to localStorage
          localStorage.setItem('language', lang);
          localStorage.setItem('direction', dir);
          
          // Update HTML attributes
          document.documentElement.lang = lang;
          document.documentElement.dir = dir;
          document.querySelector('html').setAttribute('dir', dir);
          
          // Update dropdown text
          const currentLangSpan = document.getElementById('currentLang');
          if (currentLangSpan) {
            currentLangSpan.textContent = lang.toUpperCase();
          }

          // Update switch text
          const currentLangSwitch = document.getElementById('currentLangSwitch');
          if (currentLangSwitch) {
            currentLangSwitch.textContent = lang.toUpperCase();
          }
          
          // Update active state for header dropdown
          document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
              option.classList.add('active');
            } else {
              option.classList.remove('active');
            }
          });
          
          // Update active state for fixed dropdown
          document.querySelectorAll('.language-option-fixed').forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
              option.classList.add('active');
            } else {
              option.classList.remove('active');
            }
          });
          
          // Reload data with new language if fetcher is available
          if (typeof globalFetcher !== 'undefined' && globalFetcher) {
            try {
              await globalFetcher.reloadDataWithLanguage(lang);
            } catch (error) {
              console.error('Error reloading data with new language:', error);
            }
          }
          
          // Translate static text
          if (typeof window.translateStaticText === 'function') {
            window.translateStaticText(lang);
          }
        }
        
        // Initialize on page load
        initLanguage();
        
        // Toggle header dropdown
        const dropdownButton = document.getElementById('languageDropdown');
        const dropdownMenu = dropdownButton?.nextElementSibling;
        
        if (dropdownButton && dropdownMenu) {
          dropdownButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            dropdownMenu.classList.toggle('show');
          });
          
          // Close dropdown when clicking outside
          document.addEventListener('click', function(e) {
            if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
              dropdownButton.setAttribute('aria-expanded', 'false');
              dropdownMenu.classList.remove('show');
            }
          });
        }
        
        // Add event listeners to header language options
        document.querySelectorAll('.language-option').forEach(option => {
          option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            const dir = this.getAttribute('data-dir');
            switchLanguage(lang, dir);
            
            // Close dropdown
            if (dropdownButton && dropdownMenu) {
              dropdownButton.setAttribute('aria-expanded', 'false');
              dropdownMenu.classList.remove('show');
            }
          });
        });

        // Language switch button - toggle between languages
        const languageSwitchBtn = document.getElementById('languageSwitchMobile');
        if (languageSwitchBtn) {
          languageSwitchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Toggle between languages
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
            switchLanguage(newLang, newDir);
          });
        }
        
        // Toggle fixed language dropdown
        const languageFixedButton = document.getElementById('languageFixedButton');
        const languageFixedDropdown = document.getElementById('languageFixedDropdown');

        if (languageFixedButton && languageFixedDropdown) {
          languageFixedButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            languageFixedDropdown.classList.toggle('show');
          });

          // Close dropdown if clicked outside
          document.addEventListener('click', function (e) {
            if (!languageFixedButton.contains(e.target) && !languageFixedDropdown.contains(e.target)) {
              languageFixedDropdown.classList.remove('show');
            }
          });
        }

        // Add event listeners to fixed language options
        document.querySelectorAll('.language-option-fixed').forEach(option => {
          option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            const dir = this.getAttribute('data-dir');
            switchLanguage(lang, dir);
            
            // Close dropdown
            if (languageFixedDropdown) {
              languageFixedDropdown.classList.remove('show');
            }
          });
        });
      });

document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.querySelector('.w3menu-toggler');
        const menu = document.getElementById('W3Menu');
        const body = document.body;
        const menuClose = document.querySelector('.menu-close');
        
        if (toggleBtn && menu) {
          toggleBtn.addEventListener('click', function() {
            toggleBtn.classList.toggle('open');
            body.classList.toggle('fixed');
            menu.classList.toggle('show');
          });
        }
        
        if (menuClose && menu && toggleBtn) {
          menuClose.addEventListener('click', function() {
            toggleBtn.classList.remove('open');
            body.classList.remove('fixed');
            menu.classList.remove('show');
          });
        }
      });

document.addEventListener('DOMContentLoaded', function() {
        const splashScreen = document.getElementById('splash-screen');
        const splashLogo = document.querySelector('.splash-logo');
        const preloader = document.getElementById('dzPreloader');
        
        // Show splash screen initially
        splashScreen.style.display = 'flex';
        
        // Hide the regular preloader since we're using splash screen
        if (preloader) {
          preloader.style.display = 'none';
        }
        
        // Trigger SVG animation
        setTimeout(function() {
          splashLogo.classList.add('active');
        }, 200);
        
      });
