function Program()
{
	var self = this;


	/*********************************************************************************
	* INIT STAGE AND RENDERER
	*********************************************************************************/

	this.stage = new PIXI.Container();

	this.renderer = PIXI.autoDetectRenderer(Global.width, Global.height, 
	{ 
		view: document.querySelector('canvas'),
		backgroundColor: 0x000000,
		antialias: true
	});

	Global.stageoffset = 
	{
		x: $(canvas).offset().left,
		y: $(canvas).offset().top
	}


	/*********************************************************************************
	* INIT PERFORMANCE STATS
	*********************************************************************************/

	this.stats = new Stats();
	this.stats.setMode(0);

	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.left = '0px';
	this.stats.domElement.style.top = '0px';

	document.body.appendChild(this.stats.domElement);


	/*********************************************************************************
	* INIT INTERACTIVITY
	*********************************************************************************/

    this.stage.interactive = true;

    this.stage.on('mousemove', function(data)
	{
		var evt = data.data.originalEvent;

		Global.mouse.x = evt.clientX - Global.stageoffset.x;
		Global.mouse.y = evt.clientY - Global.stageoffset.y;
	});

	this.stage.on('mousedown', function(data)
	{
		var evt = data.data.originalEvent;
		Global.mouse.isdown = true;
		Global.mouse.isup = false;

		var x = evt.clientX - Global.stageoffset.x;
		var y = evt.clientY - Global.stageoffset.y;
	});

	this.stage.on('mouseup', function(data)
	{
		var evt = data.data.originalEvent;
		Global.mouse.isdown = false;
		Global.mouse.isup = true;
	});

	this.stage.on('click', function(data)
	{
		var evt = data.data.originalEvent;
		var vx = evt.clientX - Global.stageoffset.x;
		var vy = evt.clientY - Global.stageoffset.y;

		self.shird.acceleration = 2000;
	});

	this.stage.on('tap', function(data)
	{
		var evt = data.data.originalEvent;
		var vx = data.data.global.x;
		var vy = data.data.global.y;
	});

	this.clickhack = new PIXI.Graphics();
	this.clickhack.clear();
    this.clickhack.beginFill(0xffffff, 0);
    this.clickhack.drawRect(0, 0, Global.width, Global.height)
    this.clickhack.endFill();   

    this.stage.addChild(this.clickhack);

    this.shird = new Shird(this);
    this.pipegen = new PipeGenerator(this);
    this.pipegen.Begin(Global.pipet);


    /*********************************************************************************
	* INIT DEBUGGER
	*********************************************************************************/

    PixiDebugger.SetProgram(this);
}

Program.prototype.run = function()
{
	var self = this;

	Global.stageoffset = 
	{
		x: $(canvas).offset().left,
		y: $(canvas).offset().top
	}

	

	requestAnimationFrame(function(t) { self.animate(self); });
}

Program.prototype.animate = function(program)
{
	this.stats.begin();

	Time.now = JSUtil.timestamp();
	Time.ft = Time.now - Time.last;

	if(Time.ft > 0.25)
		Time.ft = 0.25;

	Time.last = Time.now; 
	Time.acc += Time.ft;

	while(Time.acc >= Time.dt) 
	{
		program.update(Time.dt, Time.time);

		Time.time += Time.dt;
		Time.acc -= Time.dt;
	}

	program.render();
	this.stats.end();

	requestAnimationFrame(function(t) { program.animate(program); });
}

Program.prototype.update = function(dt, t)
{
	Lerppu.update(t);
	PixiDebugger.UpdateDebugState(dt, t);
	this.shird.update(dt, t);
	this.pipegen.update(dt, t);
}

Program.prototype.render = function()
{
	this.renderer.render(this.stage);
}