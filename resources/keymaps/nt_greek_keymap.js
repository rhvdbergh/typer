const firstStageKeymap = {
	a: 'α',
	b: 'β',
	c: 'χ',
	d: 'δ',
	e: 'ε',
	g: 'γ',
	h: 'η',
	i: 'ι',
	k: 'κ',
	m: 'μ',
	o: 'ο',
	p: 'π',
	r: 'ρ',
	s: 'σ',
	t: 'τ',
	v: 'ω',
	x: 'χ',
}

const secondStageKeymap = {
	j: 'ξ',
	u: 'θ',
	w: 'ς',
	z: 'ζ',
	f: 'φ',
	l: 'λ',
	n: 'ν',
	y: 'υ',
}

const thirdStageKeymap = {
	';a': 'ά',
	';e': 'έ',
	';o': 'ό',
	';i': 'ί',
	';y': 'ύ',
	';v': 'ώ',
	';h': 'ή',
}


const fourthStageKeymap = {
	A: 'Α',
	B: 'Β',
	C: 'Χ',
	D: 'Δ',
	E: 'Ε',
	G: 'Γ',
	H: 'Η',
	I: 'Ι',
	K: 'Κ',
	M: 'Μ',
	O: 'Ο',
	P: 'Π',
	R: 'Ρ',
	S: 'Σ',
	T: 'Τ',
	V: 'Ω',
	X: 'Χ',
	J: 'Ξ',
	L: 'Λ',
	N: 'Ν',
	U: 'Θ',
	W: 'Σ',
	Y: 'Υ',
	Z: 'Ζ',
	F: 'Φ',
}

const fifthStageKeymap = {
	';A': 'Ά',
	';E': 'Έ',
	';O': 'Ό',
	';I': 'Ί',
	';U': 'Ύ',
	';V': 'Ώ',
	';H': 'Ή',
}

const sixthStageKeymap = {
	"'e": 'ἐ',
	"'a": 'ἀ',
	"'i": 'ἰ',
	"'h": 'ἠ',
	"'o": 'ὀ',
	"'y": 'ὐ',
	"'v": 'ὠ',

	"'A": 'Ἀ',
	"'E": 'Ἐ',
	"'H": 'Ἠ',
	"'I": 'Ἰ',
	"'O": 'Ὀ',
	"'V": 'Ὠ',
}

const seventhStageKeymap = {
	'"a': 'ἁ',
	'"e': 'ἑ',
	'"h': 'ἡ',
	'"i': 'ἱ',
	'"o': 'ὁ',
	'"y': 'ὑ',
	'"v': 'ὡ',
	'"r': 'ῥ',

	'"A': 'Ἁ',
	'"E': 'Ἑ',
	'"H': 'Ἡ',
	'"I': 'Ἱ',
	'"O': 'Ὁ',
	'"Y': 'Ὑ',
	'"V': 'Ὡ',
	'"R': 'Ῥ',
}

const eighthStageKeymap = {
	']a': 'ὰ',
	']e': 'ὲ',
	']h': 'ὴ',
	']i': 'ὶ',
	']o': 'ὸ',
	']u': 'ὺ',
	']v': 'ὼ',

	']A': 'Ὰ',
	']E': 'Ὲ',
	']H': 'Ὴ',
	']I': 'Ὶ',
	']O': 'Ὸ',
	']U': 'Ὺ',
	']V': 'Ὼ',
}

const ninthStageKeymap = {
	Q: ':',
	q: ';',

	'[a': 'ᾶ',
	'[h': 'ῆ',
	'[i': 'ῖ',
	'[y': 'ῦ',
	'[v': 'ῶ',

	'{a': 'ᾳ',
	'{h': 'ῃ',
	'{v': 'ῳ',

	'{A': 'ᾼ',
	'{H': 'ῌ',
	'{V': 'ῼ',
}

const tenthStageKeymap = {
	'=a': 'ἂ',
	'=e': 'ἒ',
	'=h': 'ἢ',
	'=i': 'ἲ',
	'=o': 'ὂ',
	'=y': 'ὒ',
	'=v': 'ὢ',

	'=A': 'Ἂ',
	'=E': 'Ἒ',
	'=H': 'Ἢ',
	'=I': 'Ἲ',
	'=O': 'Ὂ',

	'+a': 'ἃ',
	'+e': 'ἓ',
	'+h': 'ἣ',
	'+i': 'ἳ',
	'+o': 'ὃ',
	'+y': 'ὓ',
	'+v': 'ὣ',

	'+A': 'Ἃ',
	'+E': 'Ἓ',
	'+H': 'Ἣ',
	'+I': 'Ἳ',
	'+O': 'Ὃ',
	'+Y': ' Ὓ',
	'+V': 'Ὣ',
}

const eleventhStageKeymap = {
	'/a': 'ἄ',
	'/e': 'ἔ',
	'/h': 'ἤ',
	'/i': 'ἴ',
	'/o': 'ὄ',
	'/y': 'ὔ',
	'/v': 'ὤ',

	'/A': 'Ἄ',
	'/E': 'Ἔ',
	'/H': 'Ἤ',
	'/I': 'Ἴ',
	'/O': 'Ὄ',
	'/V': 'Ὤ',

	'?a': 'ἅ',
	'?e': 'ἕ',
	'?h': 'ἥ',
	'?i': 'ἵ',
	'?o': 'ὅ',
	'?y': 'ὕ',
	'?v': 'ὥ',

	'?A': 'Ἅ',
	'?E': 'Ἕ',
	'?H': 'Ἥ',
	'?I': 'Ἵ',
	'?O': 'Ὅ',
	'?Y': ' Ὕ',
	'?V': 'Ὥ',
}

const twelfthStageKeymap = {
	'-a': 'ἆ',
	'-h': 'ἦ',
	'-i': 'ἶ',
	'-y': 'ὖ',
	'-v': 'ὦ',

	'-A': 'Ἆ',
	'-H': 'Ἦ',
	'-I': 'Ἶ',
	'-V': 'Ὦ',

	'_a': 'ἇ',
	'_h': 'ἧ',
	'_i': 'ἷ',
	'_y': 'ὗ',
	'_v': 'ὧ',

	'_A': 'Ἇ',
	'_H': 'Ἧ',
	'_I': 'Ἷ',
	'_Y': 'Ὗ',
	'_V': 'Ὧ',
}

const thirteenthStageKeymap = {

	';{a': 'ᾴ',
	'{;a': 'ᾴ',
	';{h': 'ῄ',
	'{;h': 'ῄ',
	';{v': 'ῴ',
	'{;v': 'ῴ',

	'{[a': 'ᾷ',
	'[{a': 'ᾷ',
	'{[h': 'ῇ',
	'[{h': 'ῇ',
	'{[v': 'ῷ',
	'[{v': 'ῷ',

	"'{h": 'ᾐ',
	"{'h": 'ᾐ',
	"{'v": 'ᾠ',
	"'{v": 'ᾠ',

	"{'H": 'ᾘ',
	"'{H": 'ᾘ',
	"{'V": 'ᾨ',
	"'{V": 'ᾨ',
}

const fourteenthStageKeymap = {
	'/{a': 'ᾄ',
	'/{h': 'ᾔ',

	'/{A': 'ᾌ',
	'/{H': 'ᾜ',

	'?{a': 'ᾅ',

	'?{A': 'ᾍ',


	'"{h': 'ᾑ',
	'{"h': 'ᾑ',

	'"{H': 'ᾙ',
	'{"H': 'ᾙ',

	'-{h': 'ᾖ',

	'-{H': 'ᾞ',

	'_{h': 'ᾗ',
	'_{v': 'ᾧ',

	'_{H': 'ᾟ',
	'_{V': 'ᾯ',
}

const fifteenthStageKeymap = {

	':i': 'ϊ',
	':y': 'ϋ',

	'Wi': 'ΐ',
	']:i': 'ῒ',
	':]i': 'ῒ',
	';:i': 'ΐ',
	':;i': 'ΐ',
	']:y': 'ῢ',
	':]y': 'ῢ',
	'Wy': 'ΰ',

	"' ": '᾽',
	"; ": '’',
	'`': '·', // shift-alt-`
}

module.exports.firstStageKeymap = firstStageKeymap;
module.exports.secondStageKeymap = secondStageKeymap;
module.exports.thirdStageKeymap = thirdStageKeymap;
module.exports.fourthStageKeymap = fourthStageKeymap;
module.exports.fifthStageKeymap = fifthStageKeymap;
module.exports.sixthStageKeymap = sixthStageKeymap;
module.exports.seventhStageKeymap = seventhStageKeymap;
module.exports.eighthStageKeymap = eighthStageKeymap;
module.exports.ninthStageKeymap = ninthStageKeymap;
module.exports.tenthStageKeymap = tenthStageKeymap;
module.exports.eleventhStageKeymap = eleventhStageKeymap;
module.exports.twelfthStageKeymap = twelfthStageKeymap;
module.exports.thirteenthStageKeymap = thirteenthStageKeymap;
module.exports.fourteenthStageKeymap = fourteenthStageKeymap;
module.exports.fifteenthStageKeymap = fifteenthStageKeymap;

module.exports.keymap = {
	...firstStageKeymap,
	...secondStageKeymap,
	...thirdStageKeymap,
	...fourthStageKeymap,
	...fifthStageKeymap,
	...sixthStageKeymap,
	...seventhStageKeymap,
	...eighthStageKeymap,
	...ninthStageKeymap,
	...tenthStageKeymap,
	...eleventhStageKeymap,
	...twelfthStageKeymap,
	...thirteenthStageKeymap,
	...fourteenthStageKeymap,
	...fifteenthStageKeymap
};