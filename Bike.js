function Bike(x, y, xV, yV, c) {
    this.trail = [];
    
    this.c = c;
    
    this.loc = createVector(x, y);
    this.vel = createVector(xV, yV);
}

Bike.prototype.draw = function() {
    noStroke();
    fill(this.c);  
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 3;
    drawingContext.shadowColor = this.c;
    
    for (var i = 0; i < this.trail.length; i++)
        rect(this.trail[i].x * SCL, this.trail[i].y * SCL, SCL, SCL);
};

Bike.prototype.update = function() {
    this.trail.push(createVector(this.loc.x, this.loc.y));
    this.loc.add(this.vel);
};

Bike.prototype.setVelocity = function(velocity) {
    // Prevent player from moving the opposite direction
	if (Math.abs(velocity.y - this.vel.y) > 1 || Math.abs(velocity.x - this.vel.x) > 1)
		return;
    this.vel = velocity;
};

Bike.prototype.collidesWith = function (trail) {
    for (var i = 0; i < trail.length; i++) {
        var d = dist(trail[i].x, trail[i].y, this.loc.x, this.loc.y);
        
        if (d < 1)
            return true;
    }
    
    return false;
};

Bike.prototype.collidesWithBounds = function() {
    return (this.loc.x < 0 || this.loc.x > (width / SCL) || this.loc.y < 0 || this.loc.y > height);
};