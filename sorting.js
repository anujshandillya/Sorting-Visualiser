let bars = [];
const def = "#a3a3a3", change = "#431f91", finished = "#5fa5ff", selected = "#97ff37";

window.onload = setup();
async function setup() {
	let b = document.getElementById("bars");
	let d = document.getElementById("delay");
	document.getElementById("b").innerText = b.value;
	document.getElementById("d").innerText = d.value + "ms";

	if (bars.length != parseInt(b.value)) {
		generateBars(parseInt(b.value));
	}
}


function reset() {
	location.reload();
}


function Disable_The_Input() {
	let x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = true;
	return parseInt(document.getElementById("delay").value);
}


function Finished_Sorting() {
	let x = document.getElementsByClassName("bar");
	for (let i = 0; i < x.length; i++)
		x[i].style.backgroundColor = finished;
	x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = false;

}


function generateBars(n = -1) {
	bars = [];
	let container = document.getElementById("container");
	n = n < 0 ? Math.random() * 20 : n;
	for (let i = 0; i < n; i++) {
		bars.push('<div class="bar" id="' + i + '" style="height:' + Math.floor(2 + Math.random() * 98) + '%"></div>');
	}
	container.innerHTML = bars.join('');
}


function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function MapRange(value, in_min, in_max, out_min, out_max) {
	return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



async function SelectionSort() {
	let delay = Disable_The_Input();

	let container = document.getElementById("container");
	for (let i = 0; i < bars.length; i++) {
		let mn_ind = i;
		let curr_id = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		for (let j = i + 1; j < bars.length; j++) {
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = change;
			let a = parseInt(bars[mn_ind].split(/[:%]/)[1]);
			let b = parseInt(bars[j].split(/[:%]/)[1]);
			if (a > b) mn_ind = j;
			await Sleep(delay / 5.0);
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}

		let nxt_ele = bars[mn_ind].split('id="')[1].split('"')[0];
		document.getElementById(nxt_ele).style.backgroundColor = selected;
		await Sleep(2 * delay / 5.0);

		let tmp = bars[mn_ind];
		bars[mn_ind] = bars[i];
		bars[i] = tmp;

		container.innerHTML = bars.join('');
		await Sleep(2 * delay / 5.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	Finished_Sorting();
}



async function BubbleSort() {
	let delay = Disable_The_Input();
	let container = document.getElementById("container");

	for (let i = 0; i < bars.length - 1; i++) {
		let has_swap = false;
		for (let j = 0; j < bars.length - i - 1; j++) {
			let curr_id = bars[j].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j + 1].split('id="')[1].split('"')[0];

			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = change;
			await Sleep(delay / 2);
			let a = parseInt(bars[j].split(/[:%]/)[1]);
			let b = parseInt(bars[j + 1].split(/[:%]/)[1]);
			if (a > b) {
				has_swap = true;

				let t = bars[j];
				bars[j] = bars[j + 1];
				bars[j + 1] = t;

				container.innerHTML = bars.join('');
			}
			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = change;
			await Sleep(delay / 2.0);
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if (has_swap == false) break;
	}
	Finished_Sorting();
}


 
async function InsertionSort() {
	let delay = Disable_The_Input();
	let container = document.getElementById("container");
	for (let i = 1; i < bars.length; i++) {
		let j = i - 1;
		let key = bars[i];
		let curr_id = key.split('id="')[1].split('"')[0];
		let nxt_ele = bars[j].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		
		while (j >= 0 && parseInt(bars[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) {
			document.getElementById(nxt_ele).style.backgroundColor = def;
			nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = change;
			await Sleep(delay);
			bars[j + 1] = bars[j];
			j--;
		}

		bars[j + 1] = key;
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = change;
		await Sleep(delay * 3.0 / 5);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	Finished_Sorting();
}



function Slide_down(l, r) {
	let temp = bars[r];
	for (let i = r - 1; i >= l; i--) {
		bars[i + 1] = bars[i];
	}
	bars[l] = temp;
}


async function merge(l, m, r, d) {
	let y = l;
	let i = l;
	let j = m + 1;

	while (i < j && j <= r) {
		let curr_id = bars[j].split('id="')[1].split('"')[0];
		let nxt_ele = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = change;
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[i].split(/[:%]/)[1]);

		if (a > b) i++;
		else {
			Slide_down(i, j);
			i++; j++;
		}
		await Sleep(d / 2.0);
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = change;
		
		await Sleep(d / 2.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
		
	}
}


async function mergeSort(l, r, d) {
	if (l < r) {
		let m = parseInt(l + (r - l) / 2);
		await mergeSort(l, m, d);
		await mergeSort(m + 1, r, d);
		await merge(l, m, r, d);
	}
}


async function MergeSort() {
	let delay = Disable_The_Input();
	await mergeSort(0, bars.length - 1, delay);
	Finished_Sorting();
}



async function Partition(l, r, d) {
	let i = l - 1;
	let j = l;
	let id = bars[r].split('id="')[1].split('"')[0];
	document.getElementById(id).style.backgroundColor = selected;
	for (j = l; j < r; j++) {
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[r].split(/[:%]/)[1]);
		if (a < b) {
			i++;
			let curr_id = bars[i].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(curr_id).style.backgroundColor = change;
			document.getElementById(nxt_ele).style.backgroundColor = change;

			let temp = bars[i];
			bars[i] = bars[j];
			bars[j] = temp;

			await Sleep(d / 3.0);
			container.innerHTML = bars.join('');
			document.getElementById(curr_id).style.backgroundColor = change;
			document.getElementById(nxt_ele).style.backgroundColor = change;
			document.getElementById(id).style.backgroundColor = selected;
			
			await Sleep(d / 3.0)
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
	}

	let temp = bars[i + 1];
	bars[i + 1] = bars[r];
	bars[r] = temp;

	container.innerHTML = bars.join(' ');
	document.getElementById(id).style.backgroundColor = selected;
	await Sleep(d / 3.0);
	document.getElementById(id).style.backgroundColor = def;
	return i + 1;
}


async function quickSort(l, r, d) {
	if (l < r) {
		let p = await Partition(l, r, d);
		await quickSort(l, p - 1, d);
		await quickSort(p + 1, r, d);
	}
}


async function QuickSort() {
	let delay = Disable_The_Input();
	await quickSort(0, bars.length - 1, delay);
	Finished_Sorting();
}