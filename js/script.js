document.addEventListener('DOMContentLoaded', () => {
	// responsive menu
	const menuBtn = document.querySelector('.menu-btn');
	const nav = document.querySelector("header .nav");
	const navBg = document.querySelector('.nav-bg');

	menuBtn.addEventListener('click', () => {
		menuBtn.classList.toggle('active');
		nav.classList.toggle('active');
		navBg.classList.toggle('active');
	})

	nav.addEventListener('click', (e) => {
		if (e.target && e.target.classList.contains('nav')) {
			menuBtn.classList.remove('active');
			nav.classList.remove('active');
			navBg.classList.remove('active');
		}
	})

	// advertising box
	const advertisingCard = document.querySelector('.advertising-card');
	const heroSection = document.querySelector('.hero-section');
	const closeBtn = document.querySelector('#close-btn');
	closeBtn.addEventListener('click', () => {
		advertisingCard.classList.add('hidden');
		heroSection.classList.remove('pb-[102px]');
		heroSection.classList.remove('md:pb-[212px]');
		heroSection.classList.add('pb-[60px]')
	})

	// // validate input
	// const errorBox = document.querySelectorAll('.error-box');

	// errorBox.forEach(box => {
	// 	const validateInput = box.querySelector('.form-input');
	// 	const errorText = box.querySelector('.error_input');

	// 	validateInput.addEventListener("keypress", function (evt) {
	// 		if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
	// 			evt.preventDefault();
	// 		}
	// 	});

	// 	validateInput.addEventListener('input', () => {
	// 		const inputValue = validateInput.value.trim();
	// 		if (!inputValue) {
	// 			errorText.classList.remove('hidden');
	// 			validateInput.classList.add('warning');
	// 		} else {
	// 			errorText.classList.add('hidden');
	// 		}
	// 	})
	// })

	function initializeInputValidation() {
		const errorBoxes = document.querySelectorAll('.error-box');

		errorBoxes.forEach(box => {
			const validateInput = box.querySelector('.form-input');
			const errorText = box.querySelector('.error_input');

			validateInput.addEventListener("keypress", function (evt) {
				if (evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) {
					evt.preventDefault();
				}
			});

			validateInput.addEventListener('input', () => {
				const inputValue = validateInput.value.trim();
				if (!inputValue) {
					setInputWarning(validateInput, errorText);
				} else {
					removeInputWarning(validateInput, errorText);
				}
			});
		});
	}

	function setInputWarning(inputElement, errorElement) {
		errorElement.classList.remove('hidden');
		inputElement.classList.add('warning');
	}

	function removeInputWarning(inputElement, errorElement) {
		errorElement.classList.add('hidden');
		inputElement.classList.remove('warning');
	}

	initializeInputValidation();


	// validate select 
	const warningText = document.querySelectorAll('.warning-text');
	const dropdownErrors = {};

	function show(value, textBox, optionContainer) {
		textBox.value = value;
		optionContainer.classList.add('hidden');
	}

	function initializeDropdown(dropdown, idx) {
		const textBox = dropdown.querySelector('.textBox');
		const options = dropdown.querySelector('.option');
		const optionItems = options.querySelectorAll('.option-item');
		const clearIcon = dropdown.querySelector(".clear-icon");
		const loaderIcon = dropdown.querySelector('.circle-icon');
		const checkIcon = dropdown.querySelector('.check-icon');
		const calculateInput = document.querySelector('.calculate-input');

		if (options.classList.contains('calculate-option')) {
			optionItems[0].classList.add('active');
		}
		dropdownErrors[idx] = 0;

		clearIcon.addEventListener('click', () => {
			textBox.value = '';
			clearIcon.classList.add('hidden');
			clearIcon.classList.remove('block');
			dropdownErrors[idx] = 0;
			warningText[idx].classList.remove('hidden');
			textBox.classList.add('error');
			optionItems.forEach(el => el.classList.remove('active'));
		});

		optionItems.forEach((item) => {
			item.addEventListener('click', function () {
				optionItems.forEach(el => {
					el.classList.remove('active');
				});
				if (options.classList.contains('calculate-option')) {
					optionItems[0].classList.remove('active');
				}

				if (item.classList.contains('calculate-item')) {
					calculateInput.value = 15;
				} else {
					calculateInput.value = 6;
				}

				show(item.textContent.trim(), textBox, options);
				clearIcon.classList.add('block');
				clearIcon.classList.remove('hidden');

				this.parentNode.parentNode.parentNode.classList.remove('active');
				item.classList.add('active');
				warningText[idx].classList.add('hidden');
				textBox.classList.remove('error');
			});
		});

		textBox.addEventListener('click', function () {
			if (options.classList.contains('not-found')) {
				clearIcon.classList.add('hidden');
				loaderIcon.classList.remove('hidden');
			}
			options.classList.toggle('hidden');
			this.parentNode.classList.add('active');
			dropdownErrors[idx] = 1;
		});
	}

	const dropdowns = document.querySelectorAll('.sellect-dropdown');
	dropdowns.forEach(initializeDropdown);


	document.addEventListener('click', (event) => {

		for (const [key, value] of Object.entries(dropdownErrors)) {
			if (value) {
				const withinBoundaries = event.composedPath().includes(dropdowns[+key]);
				if (withinBoundaries) {
				} else {
					let input = dropdowns[+key].querySelector('.textBox');
					if (input.value === '') {
						warningText[+key].classList.remove('hidden');
						input.classList.add('error');
					} else {
						warningText[+key].classList.add('hidden');
						input.classList.remove('error');
					}
					dropdownErrors[key] = 0;
					dropdowns[+key].querySelector('.option').classList.add('hidden');
					dropdowns[+key].classList.remove('active');
				}
			}
		}
	})

	// tabs
	const tabItems = document.querySelectorAll('.tab-item');
	const tabContent = document.querySelectorAll('.tab-content');

	function hiddenTabContent() {
		tabContent.forEach(content => content.classList.remove('active'));
		tabItems.forEach(tabItem => tabItem.classList.remove('active'));
	}
	function showTabContent(idx = 0) {
		tabContent[idx].classList.add('active');
		tabItems[idx].classList.add('active');
	}

	hiddenTabContent();
	showTabContent();

	tabItems.forEach((btn, idx) => {
		btn.addEventListener('click', () => {
			hiddenTabContent();
			showTabContent(idx);
		})

	})

	// accordion
	const openBtn = document.querySelector('.open-box');
	const contentBox = document.querySelector(".content-box");
	openBtn.addEventListener("click", () => {
		contentBox.classList.toggle('h-0');
		openBtn.classList.toggle('active');
	});

	const accordion = document.querySelectorAll('.accordion');

	accordion.forEach((el) => {
		const accordionHeader = el.querySelector('.accordion-header');
		const accordionHeaderIconPlus = el.querySelector('.accordion-header__icon-plus');
		const accordionHeaderIconMinus = el.querySelector('.accordion-header__icon-minus');
		const accordionContent = el.querySelector('.accordion-content');
		accordionHeader.addEventListener('click', () => {
			accordionHeaderIconPlus.classList.toggle('hidden');
			accordionHeaderIconMinus.classList.toggle('hidden');
			accordionContent.classList.toggle('hidden');
		})
	})

	const copyText = document.querySelector('.copy-btn span');
	const copyBtn = document.querySelector('.copy-btn');
	const clickIcon = document.querySelector('.click-icon')
	const addFolder = document.querySelector('.add-folder');
	copyBtn.addEventListener('click', () => {
		if (copyText.textContent === 'Сохранить данные') {
			copyText.textContent = 'Сохранили в браузере';
			copyText.parentNode.classList.add('active');
			clickIcon.classList.remove('hidden');
			addFolder.classList.add('hidden');
		}
	})

	const reviewsCards = document.querySelectorAll('.read-more__card');

	reviewsCards.forEach(reviewsCard => {
		const readMoreBtn = reviewsCard.querySelector('.read-more__btn');
		const customerComment = reviewsCard.querySelector('.customer-comment');

		const fullText = customerComment.textContent;
		const maxLength = 167;

		if (fullText.length > maxLength) {
			const trimmedText = fullText.slice(0, maxLength) + '...';
			customerComment.textContent = trimmedText;

			readMoreBtn.addEventListener('click', () => {
				if (customerComment.textContent === trimmedText) {
					customerComment.textContent = fullText;
					readMoreBtn.textContent = 'Читать меньше';
				} else {
					customerComment.textContent = trimmedText;
					readMoreBtn.textContent = 'Читать полностью ';
				}
			});
		} else {
			readMoreBtn.style.display = 'none';
		}
	});



	try {
		const counters = document.querySelectorAll('.counter');

		if (counters) {
			counters.forEach(counter => {
				const plusCount = counter.querySelector('.plus-count');
				const minusCount = counter.querySelector('.minus-count');
				const count = counter.querySelectorAll('.count');
				const countPrice = counter.querySelector('.count-price');

				let countNumber = 1;


				const updateCounter = () => {
					if (countPrice) {
						count.forEach(item => {
							item.textContent = `${countNumber} карточка`;
						})
						switch (countNumber) {
							case 1:
								countPrice.textContent = '35 00₽';
								break;
							case 2:
								countPrice.textContent = '7000₽';
								break;
							case 3:
								countPrice.textContent = '9975₽';
								break;
							case 4:
								countPrice.textContent = '13300₽';
								break;
							case 5:
								countPrice.textContent = '16625₽';
								break;
							case 6:
								countPrice.textContent = '19950₽';
								break;
							case 7:
								countPrice.textContent = '23275₽';
								break;
							case 8:
								countPrice.textContent = '26600₽';
								break;
							case 9:
								countPrice.textContent = '29925₽';
								break;
							case 10:
								countPrice.textContent = '33250₽';
								break;
							default:
								break;
						}
					};
				}
				const calculatePrice = () => {
					if (countNumber <= 10) {
						if (countNumber <= 2) {
							currentCountPrice = countNumber * 3500;
						} else {
							currentCountPrice = countNumber * 3325;
						}
						countPrice.textContent = prettify(currentCountPrice) + '₽';
					}
				};


				if (plusCount) {
					plusCount.addEventListener('click', () => {
						if (countNumber < 10) {
							countNumber++;
							updateCounter();
							calculatePrice()
						}
					});
				}

				if (minusCount) {
					minusCount.addEventListener('click', () => {
						if (countNumber > 1) {
							countNumber--;
							updateCounter();
							calculatePrice()
						}
					});
				}

				updateCounter();
			});
		}


		function prettify(num) {
			var n = num.toString();
			var separator = " ";
			return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
		}

		// const counters = document.querySelectorAll('.counter');

		// if (counters) {
		// 	counters.forEach(counter => {
		// 		const plusCount = counter.querySelector('.plus-count');
		// 		const minusCount = counter.querySelector('.minus-count');
		// 		const count = counter.querySelector('.count');
		// 		const countPrice = counter.querySelector('.count-price');
		// 		prettify(count);

		// 		let countNumber = 1;

		// 		const updateCounter = () => {
		// 			count.textContent = `${countNumber} карточка`;
		// 			switch (countNumber) {
		// 				case 1:
		// 					countPrice.textContent = '3500₽';
		// 					break;
		// 				case 2:
		// 					countPrice.textContent = '7000₽';
		// 					break;
		// 				case 3:
		// 					countPrice.textContent = '9975₽';
		// 					break;
		// 				case 4:
		// 					countPrice.textContent = '13300₽';
		// 					break;
		// 				case 5:
		// 					countPrice.textContent = '16625₽';
		// 					break;
		// 				case 6:
		// 					countPrice.textContent = '19950₽';
		// 					break;
		// 				case 7:
		// 					countPrice.textContent = '23275₽';
		// 					break;
		// 				case 8:
		// 					countPrice.textContent = '26600₽';
		// 					break;
		// 				case 9:
		// 					countPrice.textContent = '29925₽';
		// 					break;
		// 				case 10:
		// 					countPrice.textContent = '33250₽';
		// 					break;
		// 				default:
		// 					break;
		// 			}
		// 		};

		// 		const calculatePrice = () => {
		// 			if (countNumber <= 10) {
		// 				if (countNumber <= 2) {
		// 					currentCountPrice = countNumber * 3500;
		// 				} else {
		// 					currentCountPrice = countNumber * 3325;
		// 				}
		// 				countPrice.textContent = prettify(currentCountPrice) + '₽';
		// 			}
		// 		};

		// 		if (plusCount) {
		// 			plusCount.addEventListener('click', () => {
		// 				if (countNumber < 10) {
		// 					countNumber++;
		// 					calculatePrice();
		// 				}
		// 			});
		// 		}

		// 		if (minusCount) {
		// 			minusCount.addEventListener('click', () => {
		// 				if (countNumber > 1) {
		// 					countNumber--;
		// 					calculatePrice();
		// 				}
		// 			});
		// 		}

		// 		updateCounter();
		// 	});
		// }

	} catch (error) {
		throw error
	}
})