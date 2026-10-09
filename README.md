# Kuunda Banda — ICT251 Personal Portfolio

A responsive student portfolio built with HTML5, CSS3 and JavaScript for ICT251 Web Technologies (Activity 3).

## Live Site
Deployed on Render: (paste your Render link here after deployment)

## Sections
- Intro / Hero
- About Me
- My Hobbies
- My Learning Plan
- Projects & Skills
- My Photos
- My Media (video + audio)
- Contact

## JavaScript Features
1. **Contact form validation and preview** — validates name, email and message on submit, shows inline errors, and displays a local preview of the data (no message is sent).
2. **Project / skills search filter** — live filter across the three projects with a Reset button and a "no match" message.
3. **Photo gallery viewer** — Previous / Next buttons cycle through the three photos, wrapping around at the ends, with a live counter and updated caption.
4. **Theme switch + mobile navigation** — toggles light/dark mode (saved in localStorage) and provides a hamburger menu on narrow screens.

## How to Test
1. Open the site in a browser.
2. **Form:** submit it empty → error appears. Fill in a valid name, email and message → preview appears below the form. No page reload.
3. **Filter:** type "css" or "javascript" in the Projects search box → list filters. Type gibberish → "no projects match" message. Click **Reset**.
4. **Gallery viewer:** click Next/Previous — image, caption and counter change. At photo 1, Previous wraps to 3; at photo 3, Next wraps to 1.
5. **Theme:** click 🌙 Dark → page switches to dark mode. Reload → choice is remembered.
6. **Mobile nav:** resize the browser below 600px → ☰ Menu appears. Click it to open/close.

## Folder Structure