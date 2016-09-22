	$(document).ready(function(){

		$('.slide-navs').on('click', function(event) {
			event.preventDefault();
			var slide = $(this).data('slide');

			if (slide == 'next' || slide == 'prev') {
				if(slide == 'next') Slider.next();
				else Slider.prev();
			} else{
				Slider.goTo(slide);
			};
		});

		Slider.init();
	});

	


	var Slider = {
		// Flag to prevent overlapping transitions between sections
		canScroll: true,

		// Set the array with all the screens to manipulate
		screens: [],

		// Set the current active section
		sectionActive: 0,

		// Duration of transition animations
		duration: 600,

		// Initiate function
		init: function(){
			// Init the array of section screens to slide
			Slider.screens = $('.slides');
		},

		// Go prev section
		prev: function(){
			var index = Slider.sectionActive - 1;
			if (index < 0) {
				Slider.goTo(Slider.screens.length - 1);
			} else {
				Slider.goTo(index);
			};
		},

		// Go next section
		next: function(){
			var index = Slider.sectionActive + 1;
			if (index >= Slider.screens.length) {
				Slider.goTo(0);
			} else {
				Slider.goTo(index);
			};
		},

		// Navigation function
		goTo: function(index){
			// Change of section only after any transition ends
			if (Slider.canScroll) {
				// Turn on the flag to prevent overlapping section transitions
				Slider.canScroll = false;

				// Declare variables to define the direction of the animations
				var currentSectionMove;
				var newSectionMove;

				// Detect if user is going to the Next or prev section, sectionActive < index means Next
				if (Slider.sectionActive < index){
					currentSectionMove = 'up';
					newSectionMove = 'down';
				} else if (Slider.sectionActive > index){
					currentSectionMove = 'down';
					newSectionMove = 'up';
				};

				// Move the current section outside the space
				$('#slide-' + Slider.sectionActive).addClass(currentSectionMove);

				// Set the new section in position to enter
				$('#slide-' + index).addClass(newSectionMove);
				$('#slide-' + index).addClass('active');

				// Make a tiny pause(100ms) until the new section is in position
				setTimeout(function(){

					// Move the new section to show it
					$('#slide-' + index).removeClass(newSectionMove);

					// Wait untill the new section is in position, then disappear the old current section, update the sectionActive var and turn on the 'canScroll' flag again
					setTimeout(function(){
						$('#slide-' + Slider.sectionActive).removeClass('active');
						$('#slide-' + Slider.sectionActive).removeClass(currentSectionMove);
						Slider.setStates(index);
						Slider.canScroll = true;
					}, (Slider.duration));

				},100);

			};
		},

		// Update the sections position according to goTo() function
		setStates: function(index){
			Slider.sectionActive = index;
		}
	}
