let vec2d = {title:"Chapter 2: 2D Vectors", id:"vec", icon:"soccer", menu:[
    {title:"Magnitude & Direction", id:"mag"},
    {title:"Vector Diagrams", id:"vdiag"},
    {title:"Polar & Cartesian Forms", id:"polar"},
    {title:"Vector Arithmetic", id:"arith"},
    {title:"Projectile Motion", id:"proj"},
    {title:"Vectors Review", id:"ch2"},
]};

layout.vec = [{icons:[
    {text:"2D Vectors Applet", url:"../applet/vec.html"},
]}, 0, 1];

lesson.chap = "vec";
lesson("mag", "12m-3vZXq8s_sF_N6yZeOItDSTXySTHTM", {vid:"lMbTTjejaug"}); // Activity... 1MIg3JWB8dxKHzXXAWK61ubq_wFUzMFxx
lesson("vdiag", "1euqYcnG8VgNLl0ql2sUnxYGuQJH8T-nj", {img:{src:"vec/img/vector_diag.png", width:378}})[0].icons.splice(0, 1);
lesson("polar", "1c4OIONZR0k8KlWOawAfa8dLyUniRsUiQ", {vid:"BtUXa0JNXro"});
lesson("arith", "1Q1QUWAW-5hjwp1JYm4hqxMy7I4S3PJOz", {vid:"ggzAUnK4J2E"});
lesson("proj", "1NYVm2BoDRpfasewYhOHzjllS2CLbLyJ_", {vid:"KjJdh2jbuPA"});
