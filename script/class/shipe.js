function Shipe(updown, length, program)
{
	this.updown = updown;
	this.length = length;
	this.program = program;

	this.x = Global.width + Global.pipewidth;

	if(updown === 0)
	{
		this.y = 0;
	}
	else
	{
		this.y = Global.height - this.length;
	}

	this.tex = new PIXI.Graphics();
	this.tex.clear();
    this.tex.beginFill(0xff00ff, 1);
    this.tex.drawRect(0, 0, Global.pipewidth, length);
    this.tex.endFill();   

	this.g = new PIXI.Sprite(this.tex.generateTexture());
	this.g.x = this.x;
	this.g.y = this.y;
	this.program.stage.addChild(this.g);
}

Shipe.prototype.update = function(dt, t)
{
	this.x -= Global.pipespeed * dt;
	this.g.x = this.x;
}