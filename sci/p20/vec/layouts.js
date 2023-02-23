let vec2d = {title:"Chapter 2: 2D Vectors", id:"vec", icon:"soccer", menu:[
    {title:"Magnitude & Direction", id:"mag"},
    {title:"Polar & Cartesian Forms", id:"polar"},
    {title:"Vector Arithmetic", id:"arith"},
    {title:"Projectile Motion", id:"proj"},
    {title:"Vectors Review", id:"ch2"},
]};

layout.vec = [{icons:[
    {text:"2D Vectors Applet", url:"../applet/vec.html"},
]}, 0, 1];

lesson.chap = "vec";
lesson("mag", "", {vid:"lMbTTjejaug"}); // Activity... 1MIg3JWB8dxKHzXXAWK61ubq_wFUzMFxx
lesson("polar", "", {vid:"BtUXa0JNXro"});
lesson("arith", "", {vid:"ggzAUnK4J2E"});
lesson("proj", "", {vid:"KjJdh2jbuPA"});
