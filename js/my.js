
const select1 = document.getElementById("iitem1")
const select2 = document.getElementById("iitem2")
const select3 = document.getElementById("iitem3")
const select4 = document.getElementById("iitem4")

const total = {
	total1: document.querySelector("#total1"),
	total2: document.querySelector("#total2"),
	total3: document.querySelector("#total3"),
	total4: document.querySelector("#total4"),
};

let foods = [];
let fooding = [];
let storageData = [];
const request = "https://www.themealdb.com/api/json/v1/1/filter.php?a=American";

function populate1() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		select1.appendChild(option)
	}
}
function populate2() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		select2.appendChild(option)
	}
}
function populate3() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		select3.appendChild(option)
	}
}
function populate4() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		select4.appendChild(option)
	}
}

const getData = async () => {
	const response = await fetch(request);
	const jsondata = response.json();
	return jsondata;
};
getData()
	.then((value) => {
		let arrfoods = value.meals;
		for (food of arrfoods) {
			foods.push(food.strMeal);
			fooding.push(food.strMealThumb);
		}
		populate1()
		populate2()
		populate3()
		populate4()
	})
	.catch((err) => {
		console.log(err);
		window.location.reload();
	});

class Main {
	constructor(maker) {
		this.maker = maker;

		this.data =
			localStorage.getItem("data") != null
				? JSON.parse(localStorage.getItem("data")) : {
					data: [],
				};
		if(this.data == null){
			this.data = {
				data : []
			}
		}
	}

	makedata(user, id) {
		const items = this.Items();
		const username = user == null ? null : user.toString();
		const orderNumber = id;
		const total = this.sum(items);

		const currentOrder = {
			fullname: username,
			ornumber: orderNumber,
			total: total,
			items: items,
		};

		this.data.data.push(currentOrder);

		return this.data;
	}

	sum = (items) => {
		let total = 0;
		for (let k = 0; k < items.length; k++) {
			total += parseFloat(items[k].iprice) * parseFloat(items[k].iqty);
		}
		return total;
	};

	Items = () => {
		let allItems = [];
		for (let i = 0; i < this.maker.length; i++) {
			const Main1 = this.maker[i];
			let itemInfo = {};
			const keys = ["iprice", "iname", "iqty"];
			for (let j = 0; j < Main1.length; j++) {
				const value = Main1[j].value.toString()
				itemInfo[keys[j]] = value;

				if (j === 1) {
					const index = foods.findIndex((item) => item === value);
					itemInfo.iimg = fooding[index];
				}
			}
			allItems.push(itemInfo);
		}

		return allItems;
	};
}

const costs = document.querySelectorAll(".cost");
const qty = document.querySelectorAll(".qty");

const makeID = (id) => {
	let findId = id.toString().split(" ")[0];
	findId = findId.toString().slice(findId.length - 1, findId.length);
	return findId;
};

window.onload = () => {
	costs.forEach((cost) => {
		cost.addEventListener("change", (event) => {
			const qtyElement = document.getElementById(`qty${makeID(cost.id)}`);
			const price = parseFloat(cost.value) * parseFloat(qtyElement.value);
			const subTotalItem = total[`total${makeID(cost.id)}`];

			subTotalItem.value = price.toString();
		});
	});

	qty.forEach((iqty) => {
		iqty.addEventListener("change", (event) => {
			const priceElement = document.getElementById(`price${makeID(iqty.id)}`);
			const price = parseFloat(iqty.value) * parseFloat(priceElement.value);
			const subTotalItem = total[`total${makeID(iqty.id)}`];

			subTotalItem.value = price.toString();
		});
	});
};

const makeindex = (data) => {
	const arr = [];
	const keys = Object.keys(data);
	for (let i = 0; i < keys.length; i++) {
		const currentSubTotal = data[keys[i]];
		if (currentSubTotal.value.toString() != "") {
			arr.push(i + 1);
		}
	}
	return arr;
};

const findindex = (index) => {
	const keys = ["price", "iitem", "qty"];
	const maker = [];
	for (let j = 0; j < keys.length; j++) {
		const currentKey = keys[j];
		maker.push(document.getElementById(`${currentKey}${index}`));
	}

	return maker;
};

const newOrderModal = document.getElementById("myModal");

function closeModal() {
	newOrderModal.style.display = "none";
}
function showModal() {
	newOrderModal.style.display = "block";
}

const lockdata = () => {
	const id = document.querySelector("#orNum").value;
	const username = document.querySelector("#cName");

	const user = username.value == "" ? null : username.value;
	const enteredIndexes = makeindex(total);

	let searchElements = [];
	for (let i = 0; i < enteredIndexes.length; i++) {
		searchElements.push(findindex(enteredIndexes[i]));
	}
	const data = new Main(searchElements).makedata(user, id);
	localStorage.setItem("data", JSON.stringify(data));

	refresh();
	closeModal();

	window.location.reload()
};

document.querySelector("#btn1").addEventListener("click", lockdata);

const vm = document.getElementById('vm');
const vmb = document.getElementById('vmb');
const vmc = document.getElementById('vmc');

vmc.addEventListener('click', () => {
	vm.style.display = "none";
});
window.addEventListener('click', (event) => {
	if (event.target == vm) {
		vm.style.display = "none";
	}
});

function bp() {
	return document.createElement('br');
}

function CRI(value) {
	const input = document.createElement('input');

	input.value = value;
	input.setAttribute('type', 'text');
	input.setAttribute('disabled', true);
	input.setAttribute('readonly', true);

	return input;
}

function CVH(record) {
	vmb.appendChild(CRI(record.ornumber));
	vmb.appendChild(bp());
  if (record.fullname == null){
    record.fullname = "Not Specified"
  }
	vmb.appendChild(CRI(record.fullname));
	vmb.appendChild(bp());
}

function CVIH() {
	const h2 = document.createElement('h2');
	h2.innerHTML = 'Items';
	vmb.appendChild(h2);
}

function makingpics(src) {
	const img = document.createElement('img');
	img.setAttribute('src', src);
	return img;
}

function makingitemname(value) {
	const h4 = document.createElement('h5');
	h4.innerHTML = value;
	return h4;
}

function makingitemdetail(label, value) {
	const h5 = document.createElement('h5');
	h5.innerHTML = `${label}: ${value}`;
	return h5;
}

function makingcontentitem(data) {
	const td = document.createElement('td');

	td.appendChild(makingpics(data.iimg));
	td.appendChild(makingitemname(data.iname));
	td.appendChild(makingitemdetail('Price', data.iprice));
	td.appendChild(makingitemdetail('Quantity', data.iqty));

	return td;
}

function None() {
	const h3 = document.createElement('h3');
	h3.innerHTML = 'No Items';
	vmb.appendChild(h3);
}

function makeitem(items) {
	CVIH();

	if (items && items.length) {
		const table = document.createElement('table');
		const tr = document.createElement('tr');

		items.forEach((item) => {
			tr.appendChild(makingcontentitem(item))
		});
		table.appendChild(tr);
		vmb.appendChild(table);
	} else {
		None();
	}
}

function look(index) {
	vmb.innerHTML = '';

	const records = JSON.parse(localStorage.getItem('data'));

	const record = records.data[index];

	CVH(record);
	makeitem(record.items);

	vm.style.display = "block";
}

function makebtn(index) {
	const button = document.createElement('button');

	button.innerHTML = 'View';
  button.setAttribute("id","viewButton")

	button.addEventListener('click', () => {
		look(index);
	});

	return button;
}

function cell(data) {
	const td = document.createElement('td');
	if(data == null){
		data = usname(data)
		td.classList.add('red')
	}
	td.innerHTML = data;
	return td;
}

const usname = (data) => {
	console.log(data)
	if(data == null){
		return "Not Specified"
	} else {
		return data
	}
}

function row(data, index) {
	const tr = document.createElement('tr');
	tr.appendChild(cell(index + 1));
	tr.appendChild(cell(data.ornumber));
	tr.appendChild(cell(data.fullname));
	tr.appendChild(cell("₱" + data.total + ".00"));

	
    
    tr.appendChild(makebtn(index));
	return tr;
}

function head(data) {
	const th = document.createElement('th');
	th.innerHTML = data;
	return th;
}

function head1() {
	const tr = document.createElement('tr');
	tr.appendChild(head('#'));
	tr.appendChild(head('Order'));
	tr.appendChild(head('Customer Name'));
	tr.appendChild(head('Total'));
	tr.appendChild(head('Actions'));
	return tr;
}

function None1() {
	const tr = document.createElement('tr');

	const td = cell('no records');

	td.setAttribute('colspan', '6');
	td.setAttribute('align', 'center');

	tr.appendChild(td);
	return tr;
}

function refresh() {
	const table = document.getElementById('myTable');

	table.innerHTML = '';

	table.appendChild(head1());

	const records = JSON.parse(localStorage.getItem('data'));

	if (records && records.data.length) {
		records.data.forEach((data, index) => {
			table.appendChild(row(data, index));
		});
	} else {
		table.appendChild(None1());
	}
}

refresh()
