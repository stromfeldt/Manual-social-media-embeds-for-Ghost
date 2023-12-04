(function () {
	function convertUTCDateToLocalDate(date) {
		return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
	}

	const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: 'medium'});
	const timeFormatter = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
	// eslint-disable-next-line unicorn/no-array-for-each
	document.querySelectorAll('.msme-date').forEach(msme => {
		const parent = msme.parentElement;
		const date = parent.getAttribute('datetime');
		if (!date) {
			return;
		}

		const relativeDate = convertUTCDateToLocalDate(new Date(date));
		parent.querySelector('.msme-time').textContent = timeFormatter.format(relativeDate);
		msme.textContent = dateFormatter.format(relativeDate);
	});

	globalThis.convertUTCDateToLocalDate = convertUTCDateToLocalDate;
})();