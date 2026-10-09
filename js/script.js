/* =========================================================
   ICT251 Activity 3 — Interactive features
   Four features:
   1. Contact form validation + preview (compulsory)
   2. Project / skills search filter
   3. Photo gallery viewer (Previous / Next)
   4. Light / dark theme switch + mobile nav
   ========================================================= */

/* ---------- 1. CONTACT FORM VALIDATION + PREVIEW ---------- */

const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const preview = document.getElementById("form-preview");

// Simple email pattern check (something@something.something)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the contact form on submit.
 * Prevents page reload and either shows an error or a preview.
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value.trim();

    // Reset previous state
    feedback.textContent = "";
    feedback.classList.remove("error", "success");
    preview.hidden = true;
    preview.textContent = "";

    // Validate
    if (name === "") {
        feedback.textContent = "Please enter your name.";
        feedback.classList.add("error");
        return;
    }
    if (!EMAIL_PATTERN.test(email)) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.classList.add("error");
        return;
    }
    if (message === "") {
        feedback.textContent = "Please enter a message.";
        feedback.classList.add("error");
        return;
    }

    // All good — show local preview
    feedback.textContent = "Your data was validated successfully. (No message was sent.)";
    feedback.classList.add("success");

    preview.hidden = false;
    preview.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = "Preview of your submission";
    preview.appendChild(title);

    const list = document.createElement("ul");
    const rows = [
        ["Name", name],
        ["Email", email],
        ["Topic", topic],
        ["Message", message]
    ];

    rows.forEach(function (row) {
        const li = document.createElement("li");
        const strong = document.createElement("strong");
        strong.textContent = row[0] + ": ";
        li.appendChild(strong);
        li.appendChild(document.createTextNode(row[1]));
        list.appendChild(li);
    });

    preview.appendChild(list);

    form.reset();
}

form.addEventListener("submit", handleFormSubmit);


/* ---------- 2. PROJECT / SKILLS SEARCH FILTER ---------- */

const searchInput = document.getElementById("project-search");
const resetBtn = document.getElementById("project-reset");
const projectItems = Array.from(document.querySelectorAll(".project-item"));
const emptyMsg = document.getElementById("project-empty");

/**
 * Filters the project list based on text typed by the user.
 */
function filterProjects() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectItems.forEach(function (item) {
        const text = (item.textContent + " " + (item.dataset.tags || "")).toLowerCase();
        const match = text.includes(query);
        item.hidden = !match;
        if (match) visibleCount++;
    });

    emptyMsg.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProjects);

resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    filterProjects();
});


/* ---------- 3. PHOTO GALLERY VIEWER ---------- */

const photos = [
    { src: "images/photo_1.jpg", alt: "Kuunda Banda smiling at campus", caption: "Me on campus, first week of the semester." },
    { src: "images/photo_3.jpg", alt: "Kuunda Banda playing an electric guitar", caption: "Practicing guitar, one of my favorite hobbies." },
    { src: "images/photo_2.jpg", alt: "Kuunda Banda at a computer coding", caption: "Working on a coding project in my room." }
];

let photoIndex = 0;

const viewerImage = document.getElementById("viewer-image");
const viewerCaption = document.getElementById("viewer-caption");
const viewerCounter = document.getElementById("photo-counter");
const prevBtn = document.getElementById("photo-prev");
const nextBtn = document.getElementById("photo-next");

/**
 * Shows the photo at the current index in the viewer.
 */
function showPhoto() {
    const photo = photos[photoIndex];
    viewerImage.src = photo.src;
    viewerImage.alt = photo.alt;
    viewerCaption.textContent = photo.caption;
    viewerCounter.textContent = (photoIndex + 1) + " / " + photos.length;
}

prevBtn.addEventListener("click", function () {
    // Wrap to last photo when going back from the first
    photoIndex = (photoIndex - 1 + photos.length) % photos.length;
    showPhoto();
});

nextBtn.addEventListener("click", function () {
    // Wrap to first photo when going forward from the last
    photoIndex = (photoIndex + 1) % photos.length;
    showPhoto();
});

showPhoto();


/* ---------- 4. THEME SWITCH + MOBILE NAV ---------- */

const themeBtn = document.getElementById("theme-toggle");
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

/**
 * Toggles between light and dark appearance and saves the choice.
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark");
    themeBtn.textContent = isDark ? "☀ Light" : "🌙 Dark";
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) { }
}

// Restore saved theme on load
try {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀ Light";
    }
} catch (e) { }

themeBtn.addEventListener("click", toggleTheme);

/**
 * Opens / closes the mobile navigation menu.
 */
function toggleNav() {
    const open = nav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.textContent = open ? "✕ Close" : "☰ Menu";
}

navToggle.addEventListener("click", toggleNav);

// Close menu when a nav link is tapped on mobile
nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        if (nav.classList.contains("nav-open")) toggleNav();
    });
});