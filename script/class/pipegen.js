function PipeGenerator(program)
{
	var self = this;
	this.program = program;

	this.pipes = []
    this.genivl = null;
}

PipeGenerator.prototype.update = function(dt, t)
{
	for(var i = 0; i < this.pipes.length; i++)
	{
		this.pipes[i].update(dt, t);
	}
}

PipeGenerator.prototype.generatePipe = function()
{
	var updown = chance.integer({ min: 0, max: 1 });
	var length = chance.integer({ min: Global.height / 8, max: Global.height / 2 });

	this.pipes.push(new Shipe(updown, length, this.program));
}

PipeGenerator.prototype.Begin = function(t)
{
	var self = this;

	this.End();

	this.genivl = setInterval(function()
	{
		self.generatePipe();
	}, t);
}

PipeGenerator.prototype.End = function()
{
	clearInterval(this.genivl);
}