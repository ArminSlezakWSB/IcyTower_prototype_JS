//Objects
class Player//Player Object
{
    constructor()//Player Object
    {
        this.position = {//Player Object
            x : 20,
            y : 630
        }
        this.velocity = {//Player Object
            x : 0,
            y : 20
        }
        this.width = 50;
        this.height = this.width;//Player Object
        
    } 

    draw()//Player Object
    {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);//Player Object
    }
    update()//Player Object
    {   
        this.draw();//Player Object
        

        //y-update
        this.position.y += this.velocity.y;  
        if(this.position.y + this.velocity.y +  this.height <= platforms[0].position.y)//Player Object
        {
            this.velocity.y += gravity;
            //keys.up = false;
        }
        else 
        {
            this.velocity.y = 0;//Player Object
            keys.up = true;
        }
           
        

        //x-update
        if(keys.right) 
        { 
            this.velocity.x = 15;
            this.position.x += this.velocity.x;//Player Object
        }
        else if(keys.left)//Player Object
        {
            this.velocity.x = -15
            this.position.x += this.velocity.x//Player Object
        }
    }

}//Player Object END
class Platform //Platform Object
{  
    constructor(x, y, w=150)
    {
        this.position = {
            x,
            y
        }
        this.width = w || 150;
        this.height = 25;
        this.color = 'orange';
        this.draw();
    }

    draw()
    {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}//Platform Object END

//Canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//game variables
const gravity = .5;

const keys = {
    right : false,
    left : false,
    up: false
}

//objects aliases
const player = new Player();
const playerPos = player.position;

//let scrollOfsetY = player.position.y;
let scrollOfsetY;

//Platform aliases
const platforms = [];
platforms[0] = new Platform(0, canvas.height-25, canvas.width);
//platforms[0].draw();

function generatePlatforms(number)
{
    const platformDistance = 150;
    if(platforms.length>0)
    {
        let yPos = platforms[0].position.y - platformDistance;
        for(let i=1; i<=number; i++)
        {
            let xPos = Math.floor(Math.random()*canvas.width)-50;
            let platformWidth = Math.floor(Math.random()*(canvas.width-200))+150;
            if(i%20 ==0)
            {
                platformWidth = canvas.width;
                xPos = 0;
            }
            if(i == 19) Platform.color = 'green';
            if(i == 39) Platform.color = 'blue';
            if(i == 59) Platform.color = 'brown';
            if(i == 79) Platform.color = 'pink'; 
            platforms.push(new Platform(xPos, yPos, platformWidth));
            yPos -= platformDistance;
        }
    }
}
generatePlatforms(100);
for(let i=0; i<platforms.length; i++)
{
    if(i>19 && i<=39) platforms[i].color = 'green';
    if(i>39 && i<=59) platforms[i].color = 'blue';
    if(i>59 && i<=79) platforms[i].color = 'pink';
    if(i>79 && i<=99) platforms[i].color = 'brown';
}
const end = platforms[platforms.length-1].position.y;

function scrollOffsetY(offset)
{
    return Math.abs((1/platforms[platforms.length-1].position.y + offset));
}

function scrollOfset(offset){
    if(player.position.y < offset)
        return player.position.y;
    else return offset;
}

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    player.update();  

    //scroll screen Y
    //scrollOfsetY = scrollOfset(scrollOfsetY);
    scrollOfsetY = Math.abs(platforms[platforms.length-1].position.y - end)
    console.log(1 + scrollOfsetY/2000);

    //platforms collision detection
    platforms.forEach( (platform) => {
        platform.draw();
        if(player.position.y + player.velocity.y + player.height >= platform.position.y &&
            player.position.y + player.height <= platform.position.y &&
            player.position.x + player.width >= platform.position.x && 
            player.position.x <= platform.width + platform.position.x)
            {
                player.velocity.y =0;   
            }
        if(platforms.length >5 &&
            player.position.y <= platforms[3].position.y &&
            player.position.y + player.height < canvas.height)    
                {platform.position.y += 1 + scrollOfsetY/800;}
    });
}
animate();

addEventListener('keydown', (key) =>{ 
    switch(key.keyCode)
    {
        case 32: //space
        case 87: //w
        case 38: //upArrow
            if(keys.up){
                player.velocity.y -= 15;
                //keys.up = false;
            }
            break;
        case 65: //a
        case 37: //leftArrow
            keys.left = true;
            break;
        case 68: //d 
        case 39: //rightArrow
            keys.right = true;
            break;
    } 
})
addEventListener('keyup', (key) =>{
    switch(key.keyCode)
    {
        case 65: //a
        case 37: //leftArrow
            keys.left = false;
            break;
        case 68: //d 
        case 39: //rightArrow
            keys.right = false;
            break;
    } 
})



