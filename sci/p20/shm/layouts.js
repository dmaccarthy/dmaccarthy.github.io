let shm = {
    title: "Chapter 7: Simple Harmonic Motion", id: "shm", icon: "crane", menu: [
        { title: "Equilibrium & Oscillations", id: "eqm" },
        { title: "Simple Harmonic Motion", id: "shm_eq" },
        { title: "Period of SHM", id: "shm_T" },
        { title: "Energy of SHM", id: "shm_E" },
        { title: "Simple Pendulum", id: "pend" },
        { title: "Mechanical Resonance", id: "res" },
        { title: "Simple Harmonic Motion Review", id: "ch7" },
    ]
};

lesson.chap = "shm";

lesson("eqm", "1FTXkU6VNo1LL4NmXTK2Emg2OJnM1ydcT", { vid: "U80R6pOsyxQ" })[0].icons.push(
    { text: "Lab Handout", icon: "gdrv", url: "1cz7tCF1xBduQoR1s5uGnx1zzUYRIO0hP" }
);
lesson("shm_eq", "1PhJeNOSE3f92d4hiIDY-i5XUBLEduAC1", { img: { src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Simple_harmonic_motion_animation_1.gif", width: 859 } });
lesson("shm_T", "1o46l_UH6EKq5pb7QN_JKSxKlJnQPNFRO", { img: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Myles_Tan_2016-04-16_%28Unsplash%29.jpg/640px-Myles_Tan_2016-04-16_%28Unsplash%29.jpg", width: 607 } })[0].icons.push(
    { text: "Lab Handout", icon: "gdrv", url: "13I0L91ycH2pmhm9Hyd_fG2qS3H-vVbiq" }
);
lesson("pend", "11JPh9J8kLYP_3lxt43mD8WNyXsKaokXR", { img: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Old_Pendulum_clock.jpg/276px-Old_Pendulum_clock.jpg", width: 233 } })[0].icons.push(
    { text: "Lab Handout", icon: "gdrv", url: "16ts9FObOPgd0shk2nHN0mDyW-U2Rfj3B" }
);
lesson("shm_E", "1JuTD2F6wW-FsTy5OcYiPODNUVZB3eTDZ", { img: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Myles_Tan_2016-04-16_%28Unsplash%29.jpg/640px-Myles_Tan_2016-04-16_%28Unsplash%29.jpg", width: 607 } });
lesson("res", "1db_HlOd82UdiPOJeOdfZm5N8DCr3B9gz", { vid: "#PLpVmtCaB-lymgmGIEvph0whN7Fh1WA2SA" })[0].icons.pop();

// layout.x = [uc, 1];
