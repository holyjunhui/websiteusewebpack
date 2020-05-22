import './index.scss'
import "@/assets/css/common.css"
import 'bootstrap'

function component() {
	var ele = document.createElement("div")
	ele.innerHTML = "wo shiyigerenhaoren "
	console.log(1111)
	return ele;
}

document.body.appendChild(component())