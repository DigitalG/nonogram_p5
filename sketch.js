//Canvar
let margin = 20
let canvas_size = 600
let number_padding = 100
let mistakes = 0

//Grid
let grid_cells = []
let grid_numbers = []
let grid_size = 10
let color_mode = 0
let cell_size = 0

//Numbers
let x_numbers = []
let y_numbers = []

//click mode
//0 - Solid
//1 - X-mode
let click_mode = 0

const changeColorMode = () =>{
	color_mode = color_mode===1?0:1
	console.log(color_mode)
}

const getRowValue = (row) => {
	result = []
	temp = 0
	row.forEach(num => {
		if(num === 0)
		{
			if(temp !== 0){
				result.push(temp)
				temp = 0
			}
		}else{
			temp++
		} 
	})
	if(temp!==0){
		result.push(temp)
	}
	return result
}

const checkGrid = () =>{
	
}


function setup(){
	createCanvas(canvas_size+number_padding+margin*2, canvas_size+number_padding+margin*2)

	cell_size = canvas_size/grid_size

	for(let x = 0; x<grid_size; x++){
		for(let y = 0; y<grid_size; y++){
			grid_cells.push(new Cell(x*cell_size+margin+number_padding,
									 y*cell_size+margin+number_padding,
									 cell_size,
									 color=[255,255,255],
									 is_filled=random()>0.5?1:0))
		}
	}

	temp_num = []
	for(let x = 0; x<grid_size; x++){
		for(let y = 0; y<grid_size; y++){
			temp_num.push(grid_cells[x*grid_size + y].is_filled)
		}
		x_numbers.push(getRowValue(temp_num).reverse())
		temp_num = []
	}

	for(let y = 0; y<grid_size; y++){
		for(let x = 0; x<grid_size; x++){
			temp_num.push(grid_cells[x*grid_size + y].is_filled)
		}
		y_numbers.push(getRowValue(temp_num))
		temp_num = []
	}
}

function draw(){
	background(0)
	grid_cells.forEach(cell => {cell.on_draw(color_mode)})
	let x_delta = 0
	for(let i =0; i<grid_size;i++){
		fill('white')
		text(y_numbers[i], margin ,number_padding+margin+cell_size/2+cell_size*i)
		x_numbers[i].forEach(num =>{
 			text(num, number_padding+margin+cell_size/2+cell_size*i, number_padding-x_delta)
			x_delta+=15
		})
		x_delta = 0
	}
}

function mouseClicked(){
	let x = Math.trunc((mouseX - number_padding - margin)/(canvas_size/grid_size));
	let y = Math.trunc((mouseY - number_padding - margin)/(canvas_size/grid_size));
	grid_cells[grid_size*x + y].on_click(click_mode)
	checkGrid()
}