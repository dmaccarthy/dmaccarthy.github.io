lesson.chap = "kin";
lesson("displ", "1XvdcX6IwBg6z0L-ym2CWYCM6PfknFJGu", {vid:"V8hJhTE3bUk"});
lesson("vel", "1_fo8hJcfQ9f-UWzkJPmyunAzUzbOYQvd", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/NASCAR_practice.jpg/640px-NASCAR_practice.jpg", width:"620"}});
lesson("graph", "1pxA-hl9ItTPGPenLMfR_d3DX4F7_NPt0", {desmos:"kwqpohvljl", width:720, "data-aspect":"16/9"});
lesson("accel", "18yTk0T7qPaf_jZAY2t8Vn6gbS0AxgH7n", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Soyuz_TMA-5_launch.jpg/493px-Soyuz_TMA-5_launch.jpg", width:"260"}});
lesson("uam", "1VweXaNwNxpGu8zc2DzUCFzj6xdmjXz98", {img:{src:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flive.staticflickr.com%2F335%2F18368635894_4d51bd02af_b.jpg&f=1&nofb=1&ipt=62ab6b5624c94b11f3e1f8587f89721d2f80ce82385cbbf8513c035e6ae52b17&ipo=images", width:"671"}, link:"https://www.flickr.com/photos/15215996@N08/with/18368635894/"});

layout.rball = [
    {icons:[
        {icon:"gdrv", text:"Logger Pro Setup", url:"1xPepAdIKoIzIembAw02G4gXEbVIeh_27"},
        {icon:"gdrv", text:"Lab: Motion of a Rolling Ball", url:"1M2mIt19u-JUTA85g0hBGg16G2lx0ef47"},
    ]},
    {vid:"@ball.mp4?autoplay=1&loop=1"}, 1
];

layout.bball = [
    {icons:[
        {icon:"gdrv", text:"Logger Pro Setup", url:"1pI39R2RcajEK35gwJq-gko6mjtzH-w1m"},
        {icon:"gdrv", text:"Lab: Motion of a Bouncing Ball", url:"1K4FfWTyN2LLdPeTP8jYqpHmMryJ8Ljz2"},
        {icon:"link", text:"Bouncing Ball Simulation", url:"../applet/bounce.html"},
        // {icon:"open", text:"Bouncing Ball Data", url:"https://www.desmos.com/calculator/mop5f8vzxj"},
    ]},
    {vid:"bTjeqNOvupk?autoplay=1"}, 1
];

let kin = {title:"Chapter 1: Kinematics (1D)", show:"2023.2", id:"kin", icon:"train", menu:[
    {title:"Position & Displacement", id:"displ"},
    {title:"Velocity & Speed", id:"vel"},
    {title:"Lab: Rolling Basketball", id:"rball", icon:"ball"},
    {title:"Motion Graphs", id:"graph"},
    {title:"Acceleration", id:"accel"},
    {title:"Lab: Bouncing Basketball", id:"bball", icon:"ball"},
    {title:"Uniform Accelerated Motion", id:"uam"},
    {title:"Kinematics Review", id:"ch1"},
]};
