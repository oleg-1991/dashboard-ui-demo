document.addEventListener("DOMContentLoaded", function () {
    // Обработчик для крестиков на вкладках
    document.querySelectorAll(".tab-close").forEach(icon => {
        const defaultSrc = icon.src;
        const hoverSrc = icon.getAttribute("data-hover");

        icon.addEventListener("mouseenter", () => { icon.src = hoverSrc; });
        icon.addEventListener("mouseleave", () => { icon.src = defaultSrc; });
    });

    // Обработчик для кнопки добавления вкладки
    document.querySelectorAll(".add-tab").forEach(button => {
        const icon = button.querySelector(".add-tab-icon");
        if (!icon) return;

        const defaultSrc = icon.src;
        const hoverSrc = icon.getAttribute("data-hover");

        button.addEventListener("mouseenter", () => {
            icon.src = hoverSrc;
            button.style.background = "#E0822D"; 
        });

        button.addEventListener("mouseleave", () => {
            icon.src = defaultSrc;
            button.style.background = "#F6F6F6"; 
        });
    });

    // Скрытие плейсхолдера в поле поиска при фокусе
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.addEventListener("focus", function () {
            this.setAttribute("data-placeholder", this.getAttribute("placeholder"));
            this.setAttribute("placeholder", "");
        });

        searchInput.addEventListener("blur", function () {
            this.setAttribute("placeholder", this.getAttribute("data-placeholder"));
        });
    }

    // Разворачивание блока с результатами поиска
    document.querySelectorAll(".search-expand").forEach(button => {
        button.addEventListener("click", function () {
            const parent = this.closest(".inner_search-result"); 
            const expandedBlock = parent.nextElementSibling;
            const icon = this.querySelector("img");
            const resultCard = parent.querySelector(".search-result-card");
            const polosaIcon = parent.querySelector(".search_polosa img");

            if (expandedBlock && expandedBlock.classList.contains("result-card-expanded")) {
                expandedBlock.classList.toggle("visible");

                if (expandedBlock.classList.contains("visible")) {
                    icon.src = "images/strelka_orange_vverh.svg"; 
                    resultCard.classList.add("active-bg"); 
                    polosaIcon.src = "images/polosa_activ.svg"; 
                } else {
                    icon.src = "images/strelka_orange_vniz.svg"; 
                    resultCard.classList.remove("active-bg"); 
                    polosaIcon.src = "images/polosa_static.svg"; 
                }
            }
        });
    });

    // Обработчик раскрытия контента внутри результатов поиска
    document.querySelectorAll(".search-dropdown").forEach(button => {
        button.addEventListener("click", function () {
            const searchItem = this.closest(".search-item");
            const expandedContent = searchItem.nextElementSibling;
            const icon = this.querySelector("img");
            const magnetIcon = searchItem.querySelector(".search-magnet");
            const hiddenText = searchItem.querySelector(".search-description_none");

            if (expandedContent && expandedContent.classList.contains("expanded-content")) {
                expandedContent.classList.toggle("visible");
                searchItem.classList.toggle("active-bg");

                if (expandedContent.classList.contains("visible")) {
                    icon.src = "images/knopka_orange_vniz_hover.svg"; 
                    magnetIcon.src = "images/magnet_icon_hover.svg"; 
                    if (hiddenText) hiddenText.style.display = "none"; 
                } else {
                    icon.src = "images/knopka_orange_vniz.svg"; 
                    magnetIcon.src = "images/magnet_icon.svg"; 
                    if (hiddenText) hiddenText.style.display = "inline"; 
                }
            }
        });
    });

    // Открытие/закрытие выпадающих списков
    function setupDropdown(selectContainerClass, dropdownClass, arrowClass) {
        const selectContainer = document.querySelector(selectContainerClass);
        if (!selectContainer) return;

        const selectedOption = selectContainer.querySelector(".selected-option");
        const dropdown = selectContainer.querySelector(dropdownClass);
        const arrowIcon = selectContainer.querySelector(arrowClass);
        const options = dropdown.querySelectorAll(".search-option");

        selectContainer.addEventListener("click", function (event) {
            event.stopPropagation();
            const isOpen = selectContainer.classList.toggle("open");

            arrowIcon.src = isOpen 
                ? "images/strelochka_orange_vverh.svg" 
                : "images/strelochka_black_vniz.svg";

            dropdown.style.display = isOpen ? "block" : "none"; 
        });

        options.forEach(option => {
            option.addEventListener("click", function (event) {
                event.stopPropagation();
                selectedOption.textContent = this.textContent;

                options.forEach(opt => opt.classList.remove("active"));
                this.classList.add("active");

                // НЕ закрываем список при выборе
            });
        });

        document.addEventListener("click", function (event) {
            if (!selectContainer.contains(event.target) && !event.target.classList.contains("search-option")) {
                selectContainer.classList.remove("open");
                arrowIcon.src = "images/strelochka_black_vniz.svg";
                dropdown.style.display = "none"; 
            }
        });
    }

    // Запускаем обработчики для выпадающих списков
    setupDropdown(".select-container_language", ".search-select_language-dropdown", ".select-arrow_language");
    setupDropdown(".select-container_calendar", ".search-select_calendar-dropdown", ".select-arrow_calendar");

    // Обновленный обработчик для смены иконок у "магнита" при наведении
    document.querySelectorAll(".search-magnet").forEach(magnet => {
        magnet.addEventListener("mouseenter", function () {
            const searchItem = this.closest(".search-item");
            const expandedContent = searchItem.nextElementSibling;
            if (expandedContent && expandedContent.classList.contains("visible")) {
                this.src = "images/magnit_active_hover.svg";
            }
        });

        magnet.addEventListener("mouseleave", function () {
            const searchItem = this.closest(".search-item");
            const expandedContent = searchItem.nextElementSibling;
            this.src = expandedContent && expandedContent.classList.contains("visible") 
                ? "images/magnet_icon_hover.svg" 
                : "images/magnet_icon.svg";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const leftThumb = document.querySelector(".left-thumb");
    const rightThumb = document.querySelector(".right-thumb");
    const sliderTrack = document.querySelector(".custom-slider-track");
    const fillTrack = document.querySelector(".custom-slider-fill");
    const rangeDisplay = document.querySelector(".custom-range-display");

    let minValue = 1;
    let maxValue = 24;

    function updateRangeDisplay() {
        rangeDisplay.value = `from ${minValue}h to ${maxValue === 24 ? "Now" : maxValue + "h"}`;
    }

    function updateFillTrack() {
        const leftPos = parseFloat(leftThumb.style.left);
        const rightPos = parseFloat(rightThumb.style.left);
        fillTrack.style.left = leftPos + "%";
        fillTrack.style.width = (rightPos - leftPos) + "%";
    }

    function moveThumb(thumb, event, isLeft) {
        const trackRect = sliderTrack.getBoundingClientRect();
        let newLeft = event.clientX - trackRect.left;

        if (newLeft < 0) newLeft = 0;
        if (newLeft > trackRect.width) newLeft = trackRect.width;

        let percent = (newLeft / trackRect.width) * 100;
        let hours = Math.round((percent / 100) * 24);

        if (isLeft) {
            if (hours >= maxValue) return;
            minValue = hours;
            leftThumb.style.left = percent + "%";
        } else {
            if (hours <= minValue) return;
            maxValue = hours;
            rightThumb.style.left = percent + "%";
        }

        updateFillTrack();
        updateRangeDisplay();
    }

    [leftThumb, rightThumb].forEach((thumb, index) => {
        const isLeft = index === 0;

        thumb.addEventListener("mousedown", function (event) {
            event.preventDefault();

            function onMouseMove(event) {
                moveThumb(thumb, event, isLeft);
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });

    updateFillTrack();
    updateRangeDisplay();
});


