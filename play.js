let upKey;
let downKey;

let paddle1;
let paddle2;
let paddle_velocity = 600;

let ball;
let ball_launched;
let ballVelocity= 900;
let ballRandomStartingAngleLeft= [-60, 60];
let ballRandomStartingAngleRight= [-60, 60];
let ballStartDelay= 1;

let scoreToWin = 1;
let winner;

let score1_text;
let score2_text;

let score2 = 0;
let score1 = 0;
let playState = {

    create: function()
    {
       
        //game settings
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#000";

        //controls for paddle
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        //creation of paddles
        paddle1 = this.create_paddle(0,game.world.centerY);
        paddle2 = this.create_paddle(game.world.width-8,game.world.centerY);
        paddle1.scale.setTo(0.5);
        paddle2.scale.setTo(0.5);

        //create the ball
        ball = this.create_ball(game.world.centerX,game.world.centerY);

        //movement of the ball
        ball.visible = false;
        game.time.events.add(Phaser.Timer.SECOND * ballStartDelay, this.launch_ball, this);
        

        //text rendering
        score1_text = game.add.text(128,128,'0',{font: "64px Gabriella", fill:"#ffffff", align: "center"});
        score2_text = game.add.text(game.world.width - 128,128,'0',{font: "64px Gabriella", fill:"#ffffff", align: "center"});
    },

    update: function()
    {
        this.control_paddle(paddle1,game.input.y);

        //collisions ball with paddles
        game.physics.arcade.collide(paddle1,ball);
        game.physics.arcade.collide(paddle2,ball);

        //adding scores when hit the wall
        score1_text.text = score1;
        score2_text.text = score2;

        if (ball.body.blocked.left)
        {
            score2 +=1;
            this.resetBall();
        }
        else if (ball.body.blocked.right)
        {
            score1 +=1;
            this.resetBall();
        }

        if(score2 == scoreToWin)
        {
            game.state.start('end');
            winner = "player2";
        }
        if(score1 == scoreToWin)
        {
            game.state.start('end');
            winner = "player1";
        }
    },

    create_paddle: function(x,y)
    {
        let paddle = game.add.sprite(x,y,'paddle')
        paddle.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable=true;
        return paddle;
    },

    create_ball:function(x,y)   
    { 
        let ball = game.add.sprite(x,y,'ball') 
        ball.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1,1);

        return ball;
    },


    control_paddle: function(paddle,y)
    {
        
        if (upKey.isDown)
        {
            paddle.body.velocity.y = -paddle_velocity;
        }
        else if (downKey.isDown)
        {
            paddle.body.velocity.y = paddle_velocity;
        }else{
            paddle.body.velocity.y = 0;
        }
    },

    launch_ball: function()
    {
        ball.visible = true;
        let randomAngle = game.rnd.pick(ballRandomStartingAngleRight.concat(ballRandomStartingAngleLeft));
        
        game.physics.arcade.velocityFromAngle(randomAngle, ballVelocity, ball.body.velocity);
    },
    resetBall: function () {
        ball.reset(game.world.centerX, game.rnd.between(0, game.world.height));
        ball.visible = false;
        game.time.events.add(Phaser.Timer.SECOND * ballStartDelay, this.launch_ball, this);
    }
    

}
