function Shird(program)
{
	var self = this;

	this.program = program;

	this.w = 10;
	this.h = 10;

	this.x = this.w * 10;
	this.y = ((Global.height / 2));


	// PHYSICS
	this.velocity = 0;
	this.acceleration = 0;
	this.accmax = 1;
	this.velmaxu = 105.5;
	this.velmaxd = 35;
	this.dec = 0.9;



	this.tex = new PIXI.Graphics();
	this.tex.clear();
    this.tex.beginFill(0xff0000, 1);
    this.tex.drawCircle(0, 0, this.w);
    this.tex.endFill();   

    this.g = new PIXI.Sprite(this.tex.generateTexture());
    this.g.anchor = new PIXI.Point(0.5, 0.5);

    this.program.stage.addChild(this.g);
}

Shird.prototype.update = function(dt, t)
{
	this.velocity += Global.gravity;
	this.velocity -= this.acceleration;

	if(this.velocity > this.velmaxd)
		this.velocity = this.velmaxd;

	if(this.velocity < -this.velmaxu)
		this.velocity = -this.velmaxu;

	if(this.acceleration > 0)
		this.acceleration = this.acceleration * this.dec;

	this.y += this.velocity * dt;

	this.g.position.x = this.x;
	this.g.position.y = this.y;
}