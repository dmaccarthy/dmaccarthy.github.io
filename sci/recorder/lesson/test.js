say.cast = [6, 8];

let _ = goTime; // Next marker

play.script = [
    // {voice:1, rate:0.9, pitch:1},
    // "Hello there!",
    {voice:0, rate:1, pitch:1},
    {action:_},
    {action:vpp, pause:8000},
    {action:_},
    "Today's lesson is about algebra.",
    {pause:2000},
    "In physics, relationships between variables are often described by equations.",
    "Suppose we have an equation; y = 3x + 8.",
    "This tells us how to calculate y, when we know x.",
    {action:_, pause:2000},
    "Suppose we already know the value of y; and want to find x",
    "We need to rearrange the equation, to isolate x",
    {action:_, pause:2000},
    "The basic idea is that we can perform any operation on an equation, as long as we do the same thing to both sides.",
];
