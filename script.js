/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {

    mainNav.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (mainNav.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll("#mainNav a").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   COUNTDOWN TIMER
===================================================== */

const countdownTarget =
    new Date().getTime() + (24 * 60 * 60 * 1000);


function updateCountdown() {

    const now = new Date().getTime();

    const distance = countdownTarget - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);

updateCountdown();


/* =====================================================
   PACKAGE SELECTION
===================================================== */

const packageButtons =
    document.querySelectorAll(".order-package");

const packageSelect =
    document.getElementById("package");

const selectedPackage =
    document.getElementById("selectedPackage");


function updateSelectedPackage(packageName, price) {

    selectedPackage.textContent =
        `${packageName} — ₦${Number(price).toLocaleString()}`;

    packageSelect.value =
        `${packageName}|${price}`;
}


packageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const packageName =
            button.dataset.package;

        const price =
            button.dataset.price;

        updateSelectedPackage(
            packageName,
            price
        );

        document.getElementById("order")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


packageSelect.addEventListener("change", () => {

    const values =
        packageSelect.value.split("|");

    const packageName = values[0];

    const price = values[1];

    updateSelectedPackage(
        packageName,
        price
    );

});


/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const answer =
                    otherItem.querySelector(".faq-answer");

                answer.style.maxHeight = null;
            }

        });


        item.classList.toggle("active");

        const answer =
            item.querySelector(".faq-answer");

        if (item.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/* =====================================================
   ORDER FORM
===================================================== */

const orderForm =
    document.getElementById("orderForm");


orderForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const state =
        document.getElementById("state").value;

    const packageValue =
        document.getElementById("package").value;


    if (!name || !phone || !address || !state) {

        alert(
            "Please complete all required fields."
        );

        return;
    }


    const packageData =
        packageValue.split("|");

    const packageName =
        packageData[0];

    const price =
        Number(packageData[1]);


    /*
       Replace this number with your actual
       WhatsApp business number.

       IMPORTANT:
       Use country code without "+"
       Example:
       2348012345678
    */

    const whatsappNumber =
        "2348000000000";


    const message =

`Hello, I would like to order Ginseng Five Treasure Tea.

Name: ${name}
Phone: ${phone}
Package: ${packageName}
Price: ₦${price.toLocaleString()}
State: ${state}
Delivery Address: ${address}`;


    const whatsappURL =
        `https://wa.me/${+234810435374}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

});


/* =====================================================
   CURRENT YEAR
===================================================== */

document.getElementById("year")
    .textContent = new Date().getFullYear();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".benefit-card, .review-card, .step, .price-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});