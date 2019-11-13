//Color modes:
//0 - this.color Show current color
//1 - this.is_filled Show answers

function Cell(x, y, size,
              is_filled = 0,
              empty_color = color(255, 255, 255),
              fill_color = color(0, 0, 0),
              right_color = color(128, 128, 128)) {

    this.x = x //X grid position
    this.y = y //Y grid position
    this.size = size //cell size in pixels
    this.current_color = empty_color //Current cell color
    this.hasX = false //IF X on cell is needed
    this.empty_color = empty_color //Color to show when cell is empty
    this.fill_color = fill_color //Color to show when cell is checked

    this.color_fade_to = color(0,0,0)
    this.color_fade_delta = color(0,0,0)
    this.fade_ticks = 0

    this.is_filled = is_filled //IF this cell needs to be filled
    this.isClicked = 0


    this.on_draw = (color_mode) => {
        if(this.fade_ticks > 1){
            this.current_color.setRed(red(this.current_color) + red(this.color_fade_delta))
            this.current_color.setGreen(green(this.current_color) + green(this.color_fade_delta))
            this.current_color.setBlue(blue(this.current_color) + blue(this.color_fade_delta))
            this.fade_ticks--
            console.log('tick')
        }

        stroke(10)
        fill(this.current_color)
        square(this.x, this.y, this.size)
        if(this.hasX) {
            line(this.x, this.y, this.x + this.size, this.y + this.size)
            line(this.x + this.size, this.y, this.x, this.y + this.size)
        }
    }

    this.on_click = click_mode => {
        this.fade_to_color(color('green'), 1)
        if (this.isClicked === 0) {
            this.isClicked = 1
            if (this.is_filled === click_mode) {

            } else {
                document.getElementById('mistakes').value++
            }
            this.color = this.is_filled === 0 ? this.fill_color : this.rigth_color
        }
    }

    this.fade_to_color = (color, fade_time) => {
        this.fade_ticks = fade_time*60
        this.color_fade_to = color
        this.color_fade_delta.setRed((red(this.current_color) - red(color)))
        this.color_fade_delta.setGreen((green(this.current_color) - green(color)))
        this.color_fade_delta.setBlue((blue(this.current_color) - blue(color)))
    }

}