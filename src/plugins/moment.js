import moment from 'moment';

moment.locale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s',
		s: 'now',
		m: '1m',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: 'd',
		dd: '%dd',
		M: '1mo',
		MM: '%dmo',
		y: '1y',
		yy: '%dy',
	},
});

export default moment;
