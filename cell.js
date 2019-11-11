get_color_string = (color) => {
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

//Color modes:
//0 - this.color
//1 - this.is_filled

function Cell(x, y, size,
					color=[255, 255, 255],
					is_filled=0, 
					fill_color=[0,0,0], 
					rigth_color=[128, 128, 128], 
					empty_color=[255,255,255]){
	this.x = x
	this.y = y
	this.size = size
	this.color = get_color_string(color)
	this.empty_color = get_color_string(empty_color)
	this.fill_color = get_color_string(fill_color)
	this.rigth_color = get_color_string(rigth_color)
	this.is_filled = is_filled
	this.isClicked = 0

	this.on_draw = (color_mode) => {
		stroke(10)
		if(color_mode === 0)
			fill(this.color)
		else if(color_mode === 1){
			fill(this.is_filled===0?this.empty_color:this.fill_color)
		}
		square(this.x, this.y, this.size)
		fill(color_mode===0?0:(this.is_filled===1?this.empty_color:this.fill_color))
		//text(this.is_filled,this.x + this.size/2, this.y + this.size/2)
	}

	this.on_click = click_mode => {
		console.log(click_mode)
		if(this.isClicked === 0){
			this.isClicked = 1
			if(this.is_filled === click_mode){
				
			} else {
				document.getElementById('mistakes').value++
			}
			this.color = this.is_filled===0?this.fill_color:this.rigth_color
		}
	}

	this.set_color = color =>{
		this.color_delta = [(this.color[0]-color[0])/60, (this.color[1]-color[1])/60, (this.color[2]-color[2])/60]
		this.next_color = color
	}
}